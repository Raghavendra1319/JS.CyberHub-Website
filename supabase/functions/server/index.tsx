import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

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