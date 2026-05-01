# JS.CyberHub Server Setup Guide

## 🌟 Overview

Your **JS.CyberHub** platform now has a fully functional backend server powered by **Supabase Edge Functions** running a **Hono web server**. This guide will help you understand and work with the server.

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │ (React + Vite)
│   React Router  │
└────────┬────────┘
         │
         │ HTTPS Requests
         ▼
┌─────────────────┐
│  Hono Server    │ (Supabase Edge Function)
│  /supabase/     │
│  functions/     │
│  server/        │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌──────────────┐
│  Supabase Auth  │  │  KV Store    │
│  (Users/OAuth)  │  │  (Database)  │
└─────────────────┘  └──────────────┘
```

---

## 📁 File Structure

```
/supabase/functions/server/
├── index.tsx          # Main server file (Hono app with all routes)
└── kv_store.tsx       # Key-Value store utilities (protected)

/src/app/utils/
└── api.ts             # Frontend API client

/API_DOCUMENTATION.md  # Complete API reference
```

---

## 🔧 Server Configuration

### Current Setup

- **Runtime**: Deno (Supabase Edge Function)
- **Framework**: Hono (lightweight web framework)
- **Database**: Supabase KV Store
- **Auth**: Supabase Auth with JWT tokens
- **Email**: SendGrid API
- **SMS**: Vonage API

### Environment Variables (Already Configured)

✅ `SUPABASE_URL`
✅ `SUPABASE_ANON_KEY`
✅ `SUPABASE_SERVICE_ROLE_KEY`
✅ `SUPABASE_DB_URL`
✅ `SENDGRID_API_KEY`
✅ `VONAGE_API_KEY`

---

## 🚀 API Endpoints Summary

### Authentication & Users
- `POST /signup` - Create new user account
- `GET /user/:userId` - Get user profile
- `PUT /user/:userId` - Update user profile

### Bookings
- `POST /bookings` - Create booking
- `GET /bookings/user/:userId` - Get user's bookings
- `GET /bookings/provider/:providerId` - Get provider's bookings
- `PUT /bookings/:bookingId` - Update booking status

### Providers
- `GET /provider/:providerId` - Get provider profile
- `PUT /provider/:providerId` - Update provider profile
- `GET /providers` - Get all providers

### Messaging
- `POST /messages` - Send message
- `GET /messages/:userId/:otherUserId` - Get conversation
- `PUT /messages/:messageId/read` - Mark as read

### Reviews
- `POST /reviews` - Create review
- `GET /reviews/provider/:providerId` - Get provider reviews

### Payments
- `POST /payments` - Process payment
- `GET /payments/:paymentId` - Get payment details

### Admin
- `GET /admin/users` - Get all users (admin only)
- `GET /admin/bookings` - Get all bookings (admin only)
- `GET /admin/stats` - Get platform stats (admin only)

### Verification
- `POST /send-email-verification` - Send email OTP
- `POST /verify-email` - Verify email with code
- `POST /send-sms-verification` - Send SMS OTP
- `POST /verify-sms` - Verify SMS with code

### System
- `GET /health` - Health check endpoint

---

## 💻 Frontend Integration

### Using the API Client

```typescript
import { api } from './utils/api';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// 1. Initialize Supabase
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// 2. Sign in user
const { data: { session }, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// 3. Set access token
if (session?.access_token) {
  api.setAccessToken(session.access_token);
}

// 4. Make API calls
try {
  // Create booking
  const booking = await api.createBooking({
    serviceId: 'malware-security',
    providerId: 'provider-123',
    date: '2026-04-20',
    time: '14:00',
    amount: 499,
    notes: 'Urgent security audit needed'
  });

  // Process payment
  const payment = await api.processPayment({
    bookingId: booking.booking.id,
    amount: 499,
    method: 'credit_card'
  });

  // Send message
  await api.sendMessage({
    recipientId: 'provider-123',
    content: 'Booking confirmed!',
    bookingId: booking.booking.id
  });

  console.log('Success!', { booking, payment });
} catch (error) {
  console.error('API Error:', error);
}
```

---

## 🔐 Authentication Flow

### Sign Up Flow

```typescript
// 1. User fills signup form
const signupData = {
  email: 'newuser@example.com',
  password: 'SecurePass123!',
  name: 'John Doe',
  role: 'user', // or 'provider' or 'admin'
  phone: '+1234567890'
};

// 2. Call signup endpoint
const result = await api.signup(signupData);
// Server creates user in Supabase Auth + KV Store

// 3. User can now sign in
const { data: { session } } = await supabase.auth.signInWithPassword({
  email: signupData.email,
  password: signupData.password
});

// 4. Set token for API calls
api.setAccessToken(session.access_token);
```

### Sign In Flow

```typescript
const { data: { session }, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

if (error) {
  console.error('Login failed:', error);
  return;
}

// Store session
api.setAccessToken(session.access_token);
localStorage.setItem('access_token', session.access_token);

// Get user profile from KV store
const userProfile = await api.getUserProfile(session.user.id);
```

### OAuth Sign In (Google)

```typescript
// Trigger Google OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
});

// ⚠️ IMPORTANT: Follow setup at:
// https://supabase.com/docs/guides/auth/social-login/auth-google

// After successful OAuth, get session
const { data: { session } } = await supabase.auth.getSession();
if (session) {
  api.setAccessToken(session.access_token);
}
```

---

## 📊 Data Flow Examples

### Booking a Service

```typescript
// 1. User browses services (from /src/app/data/services.ts)
const selectedService = services.find(s => s.id === 'malware-security');

// 2. User selects provider
const providers = await api.getAllProviders();
const selectedProvider = providers.providers[0];

// 3. Create booking
const booking = await api.createBooking({
  serviceId: selectedService.id,
  providerId: selectedProvider.userId,
  date: '2026-04-25',
  time: '10:00',
  amount: selectedService.price,
  notes: 'Please focus on email security'
});

// 4. Process payment
const payment = await api.processPayment({
  bookingId: booking.booking.id,
  amount: selectedService.price,
  method: 'credit_card'
});

// Booking status automatically updated to "confirmed"
```

### Messaging Between Users

```typescript
const currentUserId = session.user.id;
const providerId = 'provider-123';

// Send message
await api.sendMessage({
  recipientId: providerId,
  content: 'Hello! I have a question about the service.',
  bookingId: 'booking-id' // optional
});

// Get conversation
const conversation = await api.getConversation(currentUserId, providerId);

// Display messages
conversation.messages.forEach(msg => {
  console.log(`${msg.senderId}: ${msg.content}`);
});

// Mark messages as read
for (const msg of conversation.messages) {
  if (msg.recipientId === currentUserId && !msg.read) {
    await api.markMessageAsRead(msg.id);
  }
}
```

### Leaving a Review

```typescript
// After service completion
const review = await api.createReview({
  providerId: 'provider-123',
  bookingId: 'booking-456',
  rating: 5,
  comment: 'Excellent malware removal service! Very thorough and professional.'
});

// Provider's rating automatically updated
const provider = await api.getProviderProfile('provider-123');
console.log(`New rating: ${provider.provider.rating} (${provider.provider.reviewCount} reviews)`);
```

---

## 🛡️ Admin Dashboard Integration

```typescript
// Check if user is admin
const currentUser = await api.getUserProfile(session.user.id);

if (currentUser.user.role === 'admin') {
  // Get platform statistics
  const stats = await api.getPlatformStats();
  console.log('Platform Stats:', stats.stats);
  // {
  //   totalUsers: 1250,
  //   totalBookings: 3847,
  //   totalProviders: 87,
  //   totalRevenue: 1234567.89
  // }

  // Get all users
  const allUsers = await api.getAllUsers();
  
  // Get all bookings
  const allBookings = await api.getAllBookings();
}
```

---

## 🔍 Testing the Server

### Health Check

```typescript
const health = await api.healthCheck();
console.log(health); // { status: "ok" }
```

### Direct fetch example

```typescript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-98f33885/health`,
  {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  }
);
const data = await response.json();
console.log(data); // { status: "ok" }
```

---

## 🐛 Error Handling

```typescript
try {
  const booking = await api.createBooking({
    serviceId: 'invalid-service',
    providerId: 'provider-123',
    date: '2026-04-25',
    time: '10:00',
    amount: 499
  });
} catch (error) {
  // Error is logged to console automatically
  // Handle error in UI
  if (error.message.includes('not found')) {
    alert('Service not found');
  } else if (error.message.includes('Unauthorized')) {
    // Redirect to login
    router.navigate('/login');
  } else {
    alert('An error occurred. Please try again.');
  }
}
```

---

## 🔒 Security Best Practices

### ✅ DO

1. **Always use the API client** - It handles auth headers correctly
2. **Store tokens securely** - Use httpOnly cookies in production
3. **Validate user input** - Always validate on frontend AND backend
4. **Check user permissions** - Server validates, but UI should hide unauthorized actions
5. **Use HTTPS only** - Supabase enforces this by default

### ❌ DON'T

1. **Never expose** `SUPABASE_SERVICE_ROLE_KEY` to frontend
2. **Don't trust client data** - Always verify on server
3. **Don't hardcode sensitive data** - Use environment variables
4. **Don't skip error handling** - Always catch and log errors
5. **Don't bypass auth** - Every protected route checks tokens

---

## 🚀 Deployment Notes

### Current State: ✅ DEPLOYED

Your server is already deployed and running on Supabase Edge Functions!

- **Production URL**: `https://${projectId}.supabase.co/functions/v1/make-server-98f33885`
- **Auto-scaling**: Handled by Supabase
- **Global CDN**: Automatic
- **Monitoring**: Available in Supabase dashboard

### Environment Setup

All required environment variables are already configured:
- ✅ Supabase credentials
- ✅ SendGrid API key
- ✅ Vonage API key

---

## 📈 Performance Optimization

### KV Store Best Practices

```typescript
// ✅ Good: Batch operations when possible
const bookingKeys = await kv.getByPrefix(`user_booking:${userId}:`);

// ❌ Avoid: Multiple individual gets in a loop
for (const id of bookingIds) {
  const booking = await kv.get(`booking:${id}`); // Slow!
}
```

### Caching Strategy

```typescript
// Consider caching frequently accessed data
const cachedProviders = localStorage.getItem('providers');
if (cachedProviders && Date.now() - cachedProviders.timestamp < 300000) {
  // Use cached data (5 minutes)
  return JSON.parse(cachedProviders.data);
} else {
  // Fetch fresh data
  const providers = await api.getAllProviders();
  localStorage.setItem('providers', JSON.stringify({
    data: providers,
    timestamp: Date.now()
  }));
  return providers;
}
```

---

## 🆘 Troubleshooting

### Issue: "Unauthorized" errors

**Solution**: Check if access token is set
```typescript
console.log('Token:', api.getAccessToken());
if (!api.getAccessToken()) {
  // Re-authenticate
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    api.setAccessToken(session.access_token);
  }
}
```

### Issue: CORS errors

**Solution**: Server already has open CORS configured. If issues persist:
1. Check browser console for exact error
2. Verify request headers are correct
3. Ensure using correct base URL

### Issue: "Email service not configured"

**Solution**: Verify SendGrid API key is set in Supabase dashboard

### Issue: "SMS service not configured"

**Solution**: 
1. Verify both `VONAGE_API_KEY` and `VONAGE_API_SECRET` are set
2. Check Vonage account has credits

---

## 📚 Next Steps

1. **Integrate with your UI**: Update components to use `api` client
2. **Add real payment gateway**: Replace mock with Stripe/PayPal
3. **Implement webhooks**: For payment confirmations
4. **Add real-time features**: Consider Supabase Realtime for chat
5. **Set up monitoring**: Track errors and performance
6. **Add rate limiting**: Protect against abuse
7. **Create admin tools**: Build UI for admin endpoints

---

## 📖 Additional Resources

- [API Documentation](./API_DOCUMENTATION.md)
- [Hono Documentation](https://hono.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)

---

## 💡 Example: Complete User Journey

```typescript
// 1. User signs up
const signup = await api.signup({
  email: 'jane@example.com',
  password: 'SecurePass123!',
  name: 'Jane Smith',
  role: 'user',
  phone: '+1234567890'
});

// 2. User signs in
const { data: { session } } = await supabase.auth.signInWithPassword({
  email: 'jane@example.com',
  password: 'SecurePass123!'
});
api.setAccessToken(session.access_token);

// 3. User books a service
const booking = await api.createBooking({
  serviceId: 'network-security',
  providerId: 'provider-abc-123',
  date: '2026-04-22',
  time: '14:00',
  amount: 799
});

// 4. User pays
const payment = await api.processPayment({
  bookingId: booking.booking.id,
  amount: 799,
  method: 'credit_card'
});

// 5. User messages provider
await api.sendMessage({
  recipientId: 'provider-abc-123',
  content: 'Looking forward to the audit!',
  bookingId: booking.booking.id
});

// 6. After service, user leaves review
await api.createReview({
  providerId: 'provider-abc-123',
  bookingId: booking.booking.id,
  rating: 5,
  comment: 'Outstanding network security audit!'
});

// ✅ Complete journey tracked in database
```

---

**Your JS.CyberHub server is now fully operational and ready for integration! 🎉**
