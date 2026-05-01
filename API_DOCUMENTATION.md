# JS.CyberHub API Documentation

## Base URL
```
https://${projectId}.supabase.co/functions/v1/make-server-98f33885
```

## Authentication
Most endpoints require authentication using a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

## 📋 API Endpoints

### 🔐 Authentication

#### Sign Up
**POST** `/signup`
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "role": "user" | "provider" | "admin",
  "phone": "+1234567890" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "userId": "uuid-string"
}
```

---

### 👤 User Management

#### Get User Profile
**GET** `/user/:userId`
- **Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "phone": "+1234567890",
    "createdAt": "2026-04-17T10:00:00.000Z",
    "status": "active"
  }
}
```

#### Update User Profile
**PUT** `/user/:userId`
- **Auth Required:** Yes (own profile or admin)

```json
{
  "name": "Updated Name",
  "phone": "+0987654321"
}
```

---

### 📅 Booking Management

#### Create Booking
**POST** `/bookings`
- **Auth Required:** Yes

```json
{
  "serviceId": "malware-security",
  "providerId": "provider-uuid",
  "date": "2026-04-20",
  "time": "14:00",
  "amount": 499,
  "notes": "Optional booking notes"
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": "booking_1713351234567_abc123",
    "userId": "user-uuid",
    "serviceId": "malware-security",
    "providerId": "provider-uuid",
    "date": "2026-04-20",
    "time": "14:00",
    "status": "pending",
    "amount": 499,
    "notes": "Optional booking notes",
    "createdAt": "2026-04-17T10:00:00.000Z",
    "updatedAt": "2026-04-17T10:00:00.000Z"
  }
}
```

#### Get User Bookings
**GET** `/bookings/user/:userId`
- **Auth Required:** Yes

#### Get Provider Bookings
**GET** `/bookings/provider/:providerId`
- **Auth Required:** Yes

#### Update Booking
**PUT** `/bookings/:bookingId`
- **Auth Required:** Yes

```json
{
  "status": "confirmed" | "cancelled" | "completed"
}
```

---

### 🏢 Provider Management

#### Get Provider Profile
**GET** `/provider/:providerId`
- **Auth Required:** No

**Response:**
```json
{
  "success": true,
  "provider": {
    "userId": "provider-uuid",
    "name": "Provider Name",
    "email": "provider@example.com",
    "services": ["malware-security", "network-security"],
    "bio": "Expert in cybersecurity",
    "verified": true,
    "rating": 4.8,
    "reviewCount": 45,
    "totalBookings": 127,
    "joinedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

#### Update Provider Profile
**PUT** `/provider/:providerId`
- **Auth Required:** Yes (own profile)

```json
{
  "bio": "Updated bio",
  "services": ["malware-security", "network-security", "data-recovery"]
}
```

#### Get All Providers
**GET** `/providers`
- **Auth Required:** No

---

### 💬 Messaging

#### Send Message
**POST** `/messages`
- **Auth Required:** Yes

```json
{
  "recipientId": "recipient-uuid",
  "content": "Hello, I have a question about the service",
  "bookingId": "booking-id" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": {
    "id": "msg_1713351234567_xyz789",
    "senderId": "sender-uuid",
    "recipientId": "recipient-uuid",
    "content": "Hello, I have a question about the service",
    "bookingId": null,
    "read": false,
    "createdAt": "2026-04-17T10:00:00.000Z"
  }
}
```

#### Get Conversation
**GET** `/messages/:userId/:otherUserId`
- **Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "id": "msg_1713351234567_xyz789",
      "senderId": "sender-uuid",
      "recipientId": "recipient-uuid",
      "content": "Message content",
      "read": false,
      "createdAt": "2026-04-17T10:00:00.000Z"
    }
  ]
}
```

#### Mark Message as Read
**PUT** `/messages/:messageId/read`
- **Auth Required:** Yes

---

### ⭐ Reviews

#### Create Review
**POST** `/reviews`
- **Auth Required:** Yes

```json
{
  "providerId": "provider-uuid",
  "bookingId": "booking-id",
  "rating": 5,
  "comment": "Excellent service! Very professional."
}
```

**Response:**
```json
{
  "success": true,
  "review": {
    "id": "review_1713351234567_def456",
    "userId": "user-uuid",
    "providerId": "provider-uuid",
    "bookingId": "booking-id",
    "rating": 5,
    "comment": "Excellent service! Very professional.",
    "createdAt": "2026-04-17T10:00:00.000Z"
  }
}
```

#### Get Provider Reviews
**GET** `/reviews/provider/:providerId`
- **Auth Required:** No

---

### 💳 Payments

#### Process Payment
**POST** `/payments`
- **Auth Required:** Yes

```json
{
  "bookingId": "booking-id",
  "amount": 499,
  "method": "credit_card" | "paypal" | "crypto"
}
```

**Response:**
```json
{
  "success": true,
  "payment": {
    "id": "payment_1713351234567_ghi789",
    "userId": "user-uuid",
    "bookingId": "booking-id",
    "amount": 499,
    "method": "credit_card",
    "status": "completed",
    "transactionId": "txn_1713351234567",
    "createdAt": "2026-04-17T10:00:00.000Z"
  }
}
```

#### Get Payment Details
**GET** `/payments/:paymentId`
- **Auth Required:** Yes

---

### 🛡️ Admin Endpoints

#### Get All Users
**GET** `/admin/users`
- **Auth Required:** Yes (admin only)

**Response:**
```json
{
  "success": true,
  "users": [...]
}
```

#### Get All Bookings
**GET** `/admin/bookings`
- **Auth Required:** Yes (admin only)

#### Get Platform Statistics
**GET** `/admin/stats`
- **Auth Required:** Yes (admin only)

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 1250,
    "totalBookings": 3847,
    "totalProviders": 87,
    "totalRevenue": 1234567.89,
    "generatedAt": "2026-04-17T10:00:00.000Z"
  }
}
```

---

### ✉️ Verification

#### Send Email Verification
**POST** `/send-email-verification`
- **Auth Required:** No

```json
{
  "email": "user@example.com"
}
```

#### Verify Email
**POST** `/verify-email`
- **Auth Required:** No

```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

#### Send SMS Verification
**POST** `/send-sms-verification`
- **Auth Required:** No

```json
{
  "phone": "+1234567890"
}
```

#### Verify SMS
**POST** `/verify-sms`
- **Auth Required:** No

```json
{
  "phone": "+1234567890",
  "code": "123456"
}
```

---

### 🏥 Health Check

#### Health Check
**GET** `/health`
- **Auth Required:** No

**Response:**
```json
{
  "status": "ok"
}
```

---

## 🔧 Using the API Client

### Frontend Usage Example

```typescript
import { api } from './utils/api';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// Initialize Supabase client
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Sign in and set token
const { data: { session }, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

if (session?.access_token) {
  api.setAccessToken(session.access_token);
}

// Now make API calls
const bookings = await api.getUserBookings(userId);
const providers = await api.getAllProviders();
const payment = await api.processPayment({
  bookingId: 'booking-id',
  amount: 499,
  method: 'credit_card'
});
```

---

## 📊 Data Models

### User
```typescript
{
  id: string;
  email: string;
  name: string;
  role: 'user' | 'provider' | 'admin';
  phone: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'suspended';
}
```

### Provider
```typescript
{
  userId: string;
  services: string[];
  bio: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  totalBookings: number;
  joinedAt: string;
}
```

### Booking
```typescript
{
  id: string;
  userId: string;
  serviceId: string;
  providerId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  amount: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  paymentId?: string;
}
```

### Message
```typescript
{
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  bookingId: string | null;
  read: boolean;
  createdAt: string;
}
```

### Review
```typescript
{
  id: string;
  userId: string;
  providerId: string;
  bookingId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}
```

### Payment
```typescript
{
  id: string;
  userId: string;
  bookingId: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  createdAt: string;
}
```

---

## 🔒 Security Notes

1. **Authentication**: Most endpoints require a valid JWT token from Supabase Auth
2. **Authorization**: Users can only access/modify their own data (except admins)
3. **Rate Limiting**: Consider implementing rate limiting for production
4. **CORS**: Server is configured with open CORS for development
5. **Environment Variables**: Never expose `SUPABASE_SERVICE_ROLE_KEY` to the frontend
6. **Payment Processing**: Current implementation is a mock - integrate with Stripe/PayPal for production

---

## 🐛 Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message description",
  "status": 400 | 401 | 403 | 404 | 500
}
```

Common error codes:
- `400`: Bad Request (missing or invalid parameters)
- `401`: Unauthorized (missing or invalid auth token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

---

## 🚀 Production Checklist

- [ ] Set up proper environment variables
- [ ] Configure SendGrid for email
- [ ] Configure Vonage for SMS
- [ ] Integrate payment gateway (Stripe, PayPal)
- [ ] Implement rate limiting
- [ ] Add request validation middleware
- [ ] Set up monitoring and logging
- [ ] Configure CORS for specific domains
- [ ] Add API versioning
- [ ] Implement caching strategy
- [ ] Set up backup and recovery

---

## 📞 Support

For API support, contact: support@jscyberhub.com
