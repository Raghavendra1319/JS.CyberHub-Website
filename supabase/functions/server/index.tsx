import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-98f33885/health", (c) => {
  return c.json({ status: "ok" });
});

// Helper function to generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper function to generate unique ID
function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to verify user authentication
async function verifyAuth(authHeader: string | null) {
  if (!authHeader) {
    return { error: "Missing authorization header", status: 401 };
  }

  const accessToken = authHeader.split(" ")[1];
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user) {
    return { error: "Unauthorized", status: 401 };
  }

  return { user };
}

// ==================== AUTHENTICATION ROUTES ====================

// Sign up new user
app.post("/make-server-98f33885/signup", async (c) => {
  try {
    const { email, password, name, role, phone } = await c.req.json();
    
    if (!email || !password || !name || !role) {
      return c.json({ error: "Email, password, name, and role are required" }, 400);
    }

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role, phone },
      // Automatically confirm the user's email since email server is configured
      email_confirm: true
    });

    if (error) {
      console.error(`Error creating user during signup: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Store user profile in KV store
    const userId = data.user.id;
    await kv.set(`user:${userId}`, JSON.stringify({
      id: userId,
      email,
      name,
      role,
      phone: phone || "",
      createdAt: new Date().toISOString(),
      status: "active"
    }));

    // Initialize role-specific data
    if (role === "provider") {
      await kv.set(`provider:${userId}`, JSON.stringify({
        userId,
        services: [],
        bio: "",
        verified: false,
        rating: 0,
        reviewCount: 0,
        totalBookings: 0,
        joinedAt: new Date().toISOString()
      }));
    }

    return c.json({ 
      success: true, 
      message: "User created successfully",
      userId: data.user.id 
    });
  } catch (error) {
    console.error(`Error in signup endpoint: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== USER MANAGEMENT ROUTES ====================

// Get user profile
app.get("/make-server-98f33885/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    const userProfile = await kv.get(`user:${userId}`);
    
    if (!userProfile) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ success: true, user: JSON.parse(userProfile) });
  } catch (error) {
    console.error(`Error fetching user profile: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update user profile
app.put("/make-server-98f33885/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    // Verify user is updating their own profile or is admin
    if (authResult.user.id !== userId) {
      const currentUser = await kv.get(`user:${authResult.user.id}`);
      const currentUserData = currentUser ? JSON.parse(currentUser) : null;
      if (!currentUserData || currentUserData.role !== "admin") {
        return c.json({ error: "Forbidden" }, 403);
      }
    }

    const updates = await c.req.json();
    const existingUser = await kv.get(`user:${userId}`);
    
    if (!existingUser) {
      return c.json({ error: "User not found" }, 404);
    }

    const userData = JSON.parse(existingUser);
    const updatedUser = { ...userData, ...updates, id: userId };
    
    await kv.set(`user:${userId}`, JSON.stringify(updatedUser));

    return c.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(`Error updating user profile: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== BOOKING ROUTES ====================

// Create new booking
app.post("/make-server-98f33885/bookings", async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    const bookingData = await c.req.json();
    const bookingId = generateId("booking");
    
    const booking = {
      id: bookingId,
      userId: authResult.user.id,
      serviceId: bookingData.serviceId,
      providerId: bookingData.providerId,
      date: bookingData.date,
      time: bookingData.time,
      status: "pending",
      amount: bookingData.amount,
      notes: bookingData.notes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`booking:${bookingId}`, JSON.stringify(booking));
    await kv.set(`user_booking:${authResult.user.id}:${bookingId}`, bookingId);
    await kv.set(`provider_booking:${bookingData.providerId}:${bookingId}`, bookingId);

    return c.json({ success: true, booking });
  } catch (error) {
    console.error(`Error creating booking: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user's bookings
app.get("/make-server-98f33885/bookings/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    const bookingKeys = await kv.getByPrefix(`user_booking:${userId}:`);
    const bookings = [];

    for (const key of bookingKeys) {
      const bookingId = key.split(":")[2];
      const bookingData = await kv.get(`booking:${bookingId}`);
      if (bookingData) {
        bookings.push(JSON.parse(bookingData));
      }
    }

    return c.json({ success: true, bookings });
  } catch (error) {
    console.error(`Error fetching user bookings: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get provider's bookings
app.get("/make-server-98f33885/bookings/provider/:providerId", async (c) => {
  try {
    const providerId = c.req.param("providerId");
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    const bookingKeys = await kv.getByPrefix(`provider_booking:${providerId}:`);
    const bookings = [];

    for (const key of bookingKeys) {
      const bookingId = key.split(":")[2];
      const bookingData = await kv.get(`booking:${bookingId}`);
      if (bookingData) {
        bookings.push(JSON.parse(bookingData));
      }
    }

    return c.json({ success: true, bookings });
  } catch (error) {
    console.error(`Error fetching provider bookings: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update booking status
app.put("/make-server-98f33885/bookings/:bookingId", async (c) => {
  try {
    const bookingId = c.req.param("bookingId");
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    const updates = await c.req.json();
    const existingBooking = await kv.get(`booking:${bookingId}`);
    
    if (!existingBooking) {
      return c.json({ error: "Booking not found" }, 404);
    }

    const bookingData = JSON.parse(existingBooking);
    const updatedBooking = { 
      ...bookingData, 
      ...updates, 
      id: bookingId,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`booking:${bookingId}`, JSON.stringify(updatedBooking));

    return c.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error(`Error updating booking: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== PROVIDER ROUTES ====================

// Get provider profile
app.get("/make-server-98f33885/provider/:providerId", async (c) => {
  try {
    const providerId = c.req.param("providerId");
    
    const providerData = await kv.get(`provider:${providerId}`);
    
    if (!providerData) {
      return c.json({ error: "Provider not found" }, 404);
    }

    const userData = await kv.get(`user:${providerId}`);
    const provider = JSON.parse(providerData);
    const user = userData ? JSON.parse(userData) : null;

    return c.json({ 
      success: true, 
      provider: { ...provider, ...user }
    });
  } catch (error) {
    console.error(`Error fetching provider profile: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update provider profile
app.put("/make-server-98f33885/provider/:providerId", async (c) => {
  try {
    const providerId = c.req.param("providerId");
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    // Verify user is updating their own profile or is admin
    if (authResult.user.id !== providerId) {
      return c.json({ error: "Forbidden" }, 403);
    }

    const updates = await c.req.json();
    const existingProvider = await kv.get(`provider:${providerId}`);
    
    if (!existingProvider) {
      return c.json({ error: "Provider not found" }, 404);
    }

    const providerData = JSON.parse(existingProvider);
    const updatedProvider = { ...providerData, ...updates };
    
    await kv.set(`provider:${providerId}`, JSON.stringify(updatedProvider));

    return c.json({ success: true, provider: updatedProvider });
  } catch (error) {
    console.error(`Error updating provider profile: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get all providers
app.get("/make-server-98f33885/providers", async (c) => {
  try {
    const providerKeys = await kv.getByPrefix("provider:");
    const providers = [];

    for (const key of providerKeys) {
      const providerId = key.split(":")[1];
      const providerData = await kv.get(key);
      const userData = await kv.get(`user:${providerId}`);
      
      if (providerData && userData) {
        const provider = JSON.parse(providerData);
        const user = JSON.parse(userData);
        providers.push({ ...provider, ...user });
      }
    }

    return c.json({ success: true, providers });
  } catch (error) {
    console.error(`Error fetching providers: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== MESSAGING ROUTES ====================

// Send message
app.post("/make-server-98f33885/messages", async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    const { recipientId, content, bookingId } = await c.req.json();
    const messageId = generateId("msg");
    
    const message = {
      id: messageId,
      senderId: authResult.user.id,
      recipientId,
      content,
      bookingId: bookingId || null,
      read: false,
      createdAt: new Date().toISOString()
    };

    await kv.set(`message:${messageId}`, JSON.stringify(message));
    await kv.set(`conversation:${authResult.user.id}:${recipientId}:${messageId}`, messageId);
    await kv.set(`conversation:${recipientId}:${authResult.user.id}:${messageId}`, messageId);

    return c.json({ success: true, message });
  } catch (error) {
    console.error(`Error sending message: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get conversation
app.get("/make-server-98f33885/messages/:userId/:otherUserId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const otherUserId = c.req.param("otherUserId");
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    const messageKeys = await kv.getByPrefix(`conversation:${userId}:${otherUserId}:`);
    const messages = [];

    for (const key of messageKeys) {
      const messageId = key.split(":")[3];
      const messageData = await kv.get(`message:${messageId}`);
      if (messageData) {
        messages.push(JSON.parse(messageData));
      }
    }

    // Sort by timestamp
    messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return c.json({ success: true, messages });
  } catch (error) {
    console.error(`Error fetching messages: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Mark message as read
app.put("/make-server-98f33885/messages/:messageId/read", async (c) => {
  try {
    const messageId = c.req.param("messageId");
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    const messageData = await kv.get(`message:${messageId}`);
    
    if (!messageData) {
      return c.json({ error: "Message not found" }, 404);
    }

    const message = JSON.parse(messageData);
    message.read = true;
    
    await kv.set(`message:${messageId}`, JSON.stringify(message));

    return c.json({ success: true, message });
  } catch (error) {
    console.error(`Error marking message as read: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== REVIEW ROUTES ====================

// Create review
app.post("/make-server-98f33885/reviews", async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    const { providerId, bookingId, rating, comment } = await c.req.json();
    const reviewId = generateId("review");
    
    const review = {
      id: reviewId,
      userId: authResult.user.id,
      providerId,
      bookingId,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };

    await kv.set(`review:${reviewId}`, JSON.stringify(review));
    await kv.set(`provider_review:${providerId}:${reviewId}`, reviewId);

    // Update provider rating
    const providerData = await kv.get(`provider:${providerId}`);
    if (providerData) {
      const provider = JSON.parse(providerData);
      const newReviewCount = (provider.reviewCount || 0) + 1;
      const newRating = ((provider.rating || 0) * (provider.reviewCount || 0) + rating) / newReviewCount;
      
      provider.rating = parseFloat(newRating.toFixed(2));
      provider.reviewCount = newReviewCount;
      
      await kv.set(`provider:${providerId}`, JSON.stringify(provider));
    }

    return c.json({ success: true, review });
  } catch (error) {
    console.error(`Error creating review: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get provider reviews
app.get("/make-server-98f33885/reviews/provider/:providerId", async (c) => {
  try {
    const providerId = c.req.param("providerId");
    
    const reviewKeys = await kv.getByPrefix(`provider_review:${providerId}:`);
    const reviews = [];

    for (const key of reviewKeys) {
      const reviewId = key.split(":")[2];
      const reviewData = await kv.get(`review:${reviewId}`);
      if (reviewData) {
        const review = JSON.parse(reviewData);
        const userData = await kv.get(`user:${review.userId}`);
        const user = userData ? JSON.parse(userData) : null;
        reviews.push({ ...review, user });
      }
    }

    return c.json({ success: true, reviews });
  } catch (error) {
    console.error(`Error fetching reviews: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== PAYMENT ROUTES ====================

// Process payment
app.post("/make-server-98f33885/payments", async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    const { bookingId, amount, method } = await c.req.json();
    const paymentId = generateId("payment");
    
    // In production, integrate with payment gateway (Stripe, PayPal, etc.)
    const payment = {
      id: paymentId,
      userId: authResult.user.id,
      bookingId,
      amount,
      method,
      status: "completed", // In production: "pending" -> process -> "completed"/"failed"
      transactionId: `txn_${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    await kv.set(`payment:${paymentId}`, JSON.stringify(payment));
    await kv.set(`booking_payment:${bookingId}`, paymentId);

    // Update booking status
    const bookingData = await kv.get(`booking:${bookingId}`);
    if (bookingData) {
      const booking = JSON.parse(bookingData);
      booking.status = "confirmed";
      booking.paymentId = paymentId;
      await kv.set(`booking:${bookingId}`, JSON.stringify(booking));
    }

    return c.json({ success: true, payment });
  } catch (error) {
    console.error(`Error processing payment: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get payment details
app.get("/make-server-98f33885/payments/:paymentId", async (c) => {
  try {
    const paymentId = c.req.param("paymentId");
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    const paymentData = await kv.get(`payment:${paymentId}`);
    
    if (!paymentData) {
      return c.json({ error: "Payment not found" }, 404);
    }

    return c.json({ success: true, payment: JSON.parse(paymentData) });
  } catch (error) {
    console.error(`Error fetching payment: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== ADMIN ROUTES ====================

// Get all users (admin only)
app.get("/make-server-98f33885/admin/users", async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    // Verify admin role
    const currentUser = await kv.get(`user:${authResult.user.id}`);
    const currentUserData = currentUser ? JSON.parse(currentUser) : null;
    if (!currentUserData || currentUserData.role !== "admin") {
      return c.json({ error: "Forbidden - Admin access required" }, 403);
    }

    const userKeys = await kv.getByPrefix("user:");
    const users = [];

    for (const key of userKeys) {
      const userData = await kv.get(key);
      if (userData) {
        users.push(JSON.parse(userData));
      }
    }

    return c.json({ success: true, users });
  } catch (error) {
    console.error(`Error fetching all users: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get all bookings (admin only)
app.get("/make-server-98f33885/admin/bookings", async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    // Verify admin role
    const currentUser = await kv.get(`user:${authResult.user.id}`);
    const currentUserData = currentUser ? JSON.parse(currentUser) : null;
    if (!currentUserData || currentUserData.role !== "admin") {
      return c.json({ error: "Forbidden - Admin access required" }, 403);
    }

    const bookingKeys = await kv.getByPrefix("booking:");
    const bookings = [];

    for (const key of bookingKeys) {
      const bookingData = await kv.get(key);
      if (bookingData) {
        bookings.push(JSON.parse(bookingData));
      }
    }

    return c.json({ success: true, bookings });
  } catch (error) {
    console.error(`Error fetching all bookings: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get platform statistics (admin only)
app.get("/make-server-98f33885/admin/stats", async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header("Authorization"));
    
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status);
    }

    // Verify admin role
    const currentUser = await kv.get(`user:${authResult.user.id}`);
    const currentUserData = currentUser ? JSON.parse(currentUser) : null;
    if (!currentUserData || currentUserData.role !== "admin") {
      return c.json({ error: "Forbidden - Admin access required" }, 403);
    }

    const userKeys = await kv.getByPrefix("user:");
    const bookingKeys = await kv.getByPrefix("booking:");
    const paymentKeys = await kv.getByPrefix("payment:");
    const providerKeys = await kv.getByPrefix("provider:");

    let totalRevenue = 0;
    for (const key of paymentKeys) {
      const paymentData = await kv.get(key);
      if (paymentData) {
        const payment = JSON.parse(paymentData);
        if (payment.status === "completed") {
          totalRevenue += payment.amount;
        }
      }
    }

    const stats = {
      totalUsers: userKeys.length,
      totalBookings: bookingKeys.length,
      totalProviders: providerKeys.length,
      totalRevenue,
      generatedAt: new Date().toISOString()
    };

    return c.json({ success: true, stats });
  } catch (error) {
    console.error(`Error fetching platform stats: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== VERIFICATION ROUTES (EXISTING) ====================

// Send email verification code
app.post("/make-server-98f33885/send-email-verification", async (c) => {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Store OTP in key-value store
    await kv.set(`email_otp:${email}`, JSON.stringify({ otp, expiresAt }));

    // Send email via SendGrid
    const sendGridApiKey = Deno.env.get("SENDGRID_API_KEY");
    if (!sendGridApiKey) {
      console.error("SendGrid API key not configured");
      return c.json({ error: "Email service not configured" }, 500);
    }

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sendGridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email }],
          subject: "Your JS.CyberHub Verification Code",
        }],
        from: { email: "raghavendrakanade13@gmail.com", name: "JS.CyberHub" },
        content: [{
          type: "text/html",
          value: `
            <h2>Email Verification</h2>
            <p>Your verification code is: <strong>${otp}</strong></p>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          `,
        }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`SendGrid error while sending email verification: ${errorText}`);
      return c.json({ error: "Failed to send verification email" }, 500);
    }

    return c.json({ success: true, message: "Verification code sent to email" });
  } catch (error) {
    console.error(`Error in send-email-verification endpoint: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Send SMS verification code
app.post("/make-server-98f33885/send-sms-verification", async (c) => {
  try {
    const { phone } = await c.req.json();
    
    if (!phone) {
      return c.json({ error: "Phone number is required" }, 400);
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Store OTP in key-value store
    await kv.set(`sms_otp:${phone}`, JSON.stringify({ otp, expiresAt }));

    // Send SMS via Vonage
    const vonageApiKey = Deno.env.get("VONAGE_API_KEY");
    const vonageApiSecret = Deno.env.get("VONAGE_API_SECRET");
    
    if (!vonageApiKey || !vonageApiSecret) {
      console.error("Vonage API credentials not configured");
      return c.json({ error: "SMS service not configured" }, 500);
    }

    const params = new URLSearchParams({
      api_key: vonageApiKey,
      api_secret: vonageApiSecret,
      to: phone,
      from: "JSCyberHub",
      text: `Your JS.CyberHub verification code is: ${otp}. Valid for 10 minutes.`,
    });

    const response = await fetch(`https://rest.nexmo.com/sms/json?${params.toString()}`, {
      method: "POST",
    });

    const data = await response.json();
    
    if (data.messages[0].status !== "0") {
      console.error(`Vonage error while sending SMS verification: ${data.messages[0]["error-text"]}`);
      return c.json({ error: "Failed to send verification SMS" }, 500);
    }

    return c.json({ success: true, message: "Verification code sent to phone" });
  } catch (error) {
    console.error(`Error in send-sms-verification endpoint: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Verify email code
app.post("/make-server-98f33885/verify-email", async (c) => {
  try {
    const { email, code } = await c.req.json();
    
    if (!email || !code) {
      return c.json({ error: "Email and code are required" }, 400);
    }

    const stored = await kv.get(`email_otp:${email}`);
    
    if (!stored) {
      return c.json({ error: "Invalid or expired verification code" }, 400);
    }

    const { otp, expiresAt } = JSON.parse(stored);

    if (Date.now() > expiresAt) {
      await kv.del(`email_otp:${email}`);
      return c.json({ error: "Verification code has expired" }, 400);
    }

    if (otp !== code) {
      return c.json({ error: "Invalid verification code" }, 400);
    }

    // Clean up used OTP
    await kv.del(`email_otp:${email}`);

    return c.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error(`Error in verify-email endpoint: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Verify SMS code
app.post("/make-server-98f33885/verify-sms", async (c) => {
  try {
    const { phone, code } = await c.req.json();
    
    if (!phone || !code) {
      return c.json({ error: "Phone and code are required" }, 400);
    }

    const stored = await kv.get(`sms_otp:${phone}`);
    
    if (!stored) {
      return c.json({ error: "Invalid or expired verification code" }, 400);
    }

    const { otp, expiresAt } = JSON.parse(stored);

    if (Date.now() > expiresAt) {
      await kv.del(`sms_otp:${phone}`);
      return c.json({ error: "Verification code has expired" }, 400);
    }

    if (otp !== code) {
      return c.json({ error: "Invalid verification code" }, 400);
    }

    // Clean up used OTP
    await kv.del(`sms_otp:${phone}`);

    return c.json({ success: true, message: "Phone verified successfully" });
  } catch (error) {
    console.error(`Error in verify-sms endpoint: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);