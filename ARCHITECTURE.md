# JS.CyberHub Platform Architecture

## 🏗️ System Architecture Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                               │
│                    (React + TypeScript + Vite)                     │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Homepage   │  │ Auth Pages   │  │  Dashboards  │           │
│  │  /src/app/   │  │   Login/     │  │   User/      │           │
│  │   pages/     │  │   Signup     │  │   Provider/  │           │
│  │              │  │              │  │   Admin      │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              React Router (routes.tsx)                     │  │
│  │  / | /login | /signup | /dashboard | /bookings | /admin   │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                 Custom Hooks Layer                         │  │
│  │  useApi() | useBookings() | useProviders() | useMessages()│  │
│  └───────────────────────┬────────────────────────────────────┘  │
│                          │                                        │
│  ┌───────────────────────▼────────────────────────────────────┐  │
│  │               API Client (utils/api.ts)                    │  │
│  │  Singleton class managing all HTTP requests               │  │
│  └───────────────────────┬────────────────────────────────────┘  │
│                          │                                        │
└──────────────────────────┼────────────────────────────────────────┘
                           │
                           │ HTTPS Requests
                           │ Authorization: Bearer <token>
                           │
┌──────────────────────────▼────────────────────────────────────────┐
│                      SUPABASE PLATFORM                            │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                   Edge Function Layer                       │ │
│  │         /supabase/functions/server/index.tsx                │ │
│  │                  (Hono Web Server)                          │ │
│  └────────┬──────────────────────────────────────┬─────────────┘ │
│           │                                      │               │
│  ┌────────▼────────┐                    ┌───────▼────────┐      │
│  │  Auth Endpoints │                    │ API Endpoints  │      │
│  │  /signup        │                    │ /bookings      │      │
│  │  /verify-email  │                    │ /providers     │      │
│  │  /verify-sms    │                    │ /messages      │      │
│  └─────────────────┘                    │ /reviews       │      │
│                                         │ /payments      │      │
│                                         │ /admin/*       │      │
│                                         └────────────────┘      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  Supabase Auth Service                   │   │
│  │  - JWT Token Management                                  │   │
│  │  - Email/Password Auth                                   │   │
│  │  - OAuth (Google, GitHub, etc.)                          │   │
│  │  - Session Management                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              PostgreSQL Database (KV Store)              │   │
│  │  Table: kv_store_98f33885                                │   │
│  │                                                           │   │
│  │  Key Patterns:                                           │   │
│  │  - user:{userId}                                         │   │
│  │  - provider:{providerId}                                 │   │
│  │  - booking:{bookingId}                                   │   │
│  │  - message:{messageId}                                   │   │
│  │  - review:{reviewId}                                     │   │
│  │  - payment:{paymentId}                                   │   │
│  │  - conversation:{userId}:{otherUserId}:{messageId}       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                           │
                           │ External APIs
                           │
┌──────────────────────────▼────────────────────────────────────────┐
│                    THIRD-PARTY SERVICES                           │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   SendGrid   │  │    Vonage    │  │  Payment     │           │
│  │  Email API   │  │   SMS API    │  │  Gateway     │           │
│  │  (OTP codes) │  │  (OTP codes) │  │ (Stripe/PP)  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagrams

### 1. User Registration & Authentication Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │
     │ 1. Fill signup form
     ▼
┌──────────────────┐
│  SignUp Page     │
└────┬─────────────┘
     │
     │ 2. api.signup({ email, password, name, role })
     ▼
┌──────────────────────────────────┐
│  API Client (utils/api.ts)       │
│  POST /signup                    │
└────┬─────────────────────────────┘
     │
     │ 3. HTTPS Request with body
     ▼
┌────────────────────────────────────────┐
│  Hono Server (Edge Function)           │
│  /supabase/functions/server/index.tsx  │
└────┬───────────────────────────────────┘
     │
     │ 4. Create user in Supabase Auth
     ▼
┌──────────────────────────┐
│  Supabase Auth Service   │
│  admin.createUser()      │
└────┬─────────────────────┘
     │
     │ 5. Store user profile in KV
     ▼
┌──────────────────────────────┐
│  KV Store                    │
│  SET user:{userId} = {...}   │
│  SET provider:{userId} = ... │ (if role=provider)
└────┬─────────────────────────┘
     │
     │ 6. Return userId
     ▼
┌──────────────────────────┐
│  Frontend receives       │
│  { success, userId }     │
└────┬─────────────────────┘
     │
     │ 7. Auto sign-in
     ▼
┌──────────────────────────────┐
│  supabase.auth.signIn()      │
│  Get access_token            │
└────┬─────────────────────────┘
     │
     │ 8. Store token & redirect
     ▼
┌──────────────────────────┐
│  Dashboard Page          │
└──────────────────────────┘
```

---

### 2. Booking Creation Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │
     │ 1. Select service & provider
     ▼
┌──────────────────┐
│  Booking Page    │
└────┬─────────────┘
     │
     │ 2. api.createBooking({ serviceId, providerId, date, time, amount })
     ▼
┌──────────────────────────────────┐
│  API Client                      │
│  POST /bookings                  │
│  Headers: Authorization: Bearer  │
└────┬─────────────────────────────┘
     │
     │ 3. Verify JWT token
     ▼
┌────────────────────────────────┐
│  Server: verifyAuth()          │
│  Extract user from token       │
└────┬───────────────────────────┘
     │
     │ 4. Create booking record
     ▼
┌────────────────────────────────────────┐
│  KV Store                              │
│  SET booking:{bookingId} = {...}       │
│  SET user_booking:{userId}:{id} = id   │
│  SET provider_booking:{pId}:{id} = id  │
└────┬───────────────────────────────────┘
     │
     │ 5. Return booking object
     ▼
┌──────────────────────────┐
│  Frontend receives       │
│  { success, booking }    │
└────┬─────────────────────┘
     │
     │ 6. Process payment
     ▼
┌──────────────────────────────────┐
│  api.processPayment()            │
│  POST /payments                  │
└────┬─────────────────────────────┘
     │
     │ 7. Store payment & update booking
     ▼
┌────────────────────────────────────┐
│  KV Store                          │
│  SET payment:{paymentId} = {...}   │
│  UPDATE booking.status = confirmed │
└────┬───────────────────────────────┘
     │
     │ 8. Send notification message
     ▼
┌──────────────────────────────┐
│  api.sendMessage()           │
│  Notify provider             │
└──────────────────────────────┘
```

---

### 3. Real-Time Messaging Flow

```
┌──────────┐                           ┌──────────┐
│  User A  │                           │  User B  │
└────┬─────┘                           └────┬─────┘
     │                                      │
     │ 1. Type message                      │
     ▼                                      │
┌──────────────────┐                       │
│  Chat Component  │                       │
│  useMessages()   │                       │
└────┬─────────────┘                       │
     │                                      │
     │ 2. sendMessage("Hello")              │
     ▼                                      │
┌──────────────────────────────┐           │
│  API: POST /messages         │           │
│  { recipientId, content }    │           │
└────┬─────────────────────────┘           │
     │                                      │
     │ 3. Store message in DB               │
     ▼                                      │
┌─────────────────────────────────────┐    │
│  KV Store                           │    │
│  SET message:{msgId} = {...}        │    │
│  SET conversation:A:B:{msgId} = id  │    │
│  SET conversation:B:A:{msgId} = id  │    │
└─────────────────────────────────────┘    │
                                            │
     ┌──────────────────────────────────────┘
     │
     │ 4. User B opens chat
     ▼
┌──────────────────────────────┐
│  Chat Component              │
│  useMessages(recipientId=A)  │
└────┬─────────────────────────┘
     │
     │ 5. Load conversation
     ▼
┌──────────────────────────────────────┐
│  API: GET /messages/{B}/{A}          │
│  Returns all messages sorted by time │
└────┬─────────────────────────────────┘
     │
     │ 6. Mark messages as read
     ▼
┌──────────────────────────────┐
│  API: PUT /messages/{id}/read│
│  Updates message.read = true │
└──────────────────────────────┘
```

---

## 📊 Database Schema (KV Store)

### Key-Value Patterns

```
┌─────────────────────────────────────────────────────────────────┐
│                         KV STORE KEYS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  USER DATA                                                      │
│  ├─ user:{userId}                                               │
│  │   Value: { id, email, name, role, phone, status, createdAt }│
│  │                                                              │
│  ├─ provider:{providerId}                                       │
│  │   Value: { userId, services[], bio, verified, rating,       │
│  │            reviewCount, totalBookings, joinedAt }            │
│  │                                                              │
│  BOOKING DATA                                                   │
│  ├─ booking:{bookingId}                                         │
│  │   Value: { id, userId, serviceId, providerId, date, time,   │
│  │            status, amount, notes, createdAt, updatedAt }     │
│  │                                                              │
│  ├─ user_booking:{userId}:{bookingId}                           │
│  │   Value: bookingId (index for quick lookup)                 │
│  │                                                              │
│  ├─ provider_booking:{providerId}:{bookingId}                   │
│  │   Value: bookingId (index for quick lookup)                 │
│  │                                                              │
│  MESSAGING DATA                                                 │
│  ├─ message:{messageId}                                         │
│  │   Value: { id, senderId, recipientId, content, bookingId,   │
│  │            read, createdAt }                                 │
│  │                                                              │
│  ├─ conversation:{userId}:{otherUserId}:{messageId}             │
│  │   Value: messageId (bidirectional conversation index)       │
│  │                                                              │
│  REVIEW DATA                                                    │
│  ├─ review:{reviewId}                                           │
│  │   Value: { id, userId, providerId, bookingId, rating,       │
│  │            comment, createdAt }                              │
│  │                                                              │
│  ├─ provider_review:{providerId}:{reviewId}                     │
│  │   Value: reviewId (index for quick lookup)                  │
│  │                                                              │
│  PAYMENT DATA                                                   │
│  ├─ payment:{paymentId}                                         │
│  │   Value: { id, userId, bookingId, amount, method, status,   │
│  │            transactionId, createdAt }                        │
│  │                                                              │
│  ├─ booking_payment:{bookingId}                                 │
│  │   Value: paymentId (reference)                              │
│  │                                                              │
│  VERIFICATION DATA                                              │
│  ├─ email_otp:{email}                                           │
│  │   Value: { otp, expiresAt }                                 │
│  │                                                              │
│  └─ sms_otp:{phone}                                             │
│      Value: { otp, expiresAt }                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Architecture

### Authentication & Authorization Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. CLIENT SIDE (React)                                          │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ - Route protection (ProtectedRoute component)             │ │
│  │ - Token storage (localStorage/session)                    │ │
│  │ - UI-level permission checks                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                               │                                  │
│                               ▼                                  │
│  2. TRANSPORT LAYER                                              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ - HTTPS only (enforced by Supabase)                       │ │
│  │ - Authorization: Bearer <JWT>                             │ │
│  │ - CORS headers (configured in server)                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                               │                                  │
│                               ▼                                  │
│  3. SERVER SIDE (Hono/Edge Function)                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ - verifyAuth() middleware                                 │ │
│  │ - JWT token validation via Supabase                       │ │
│  │ - Role-based access control                               │ │
│  │ - Resource ownership verification                         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                               │                                  │
│                               ▼                                  │
│  4. DATA LAYER                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ - PostgreSQL RLS (Row Level Security)                     │ │
│  │ - KV store access patterns                                │ │
│  │ - Data encryption at rest                                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

ENVIRONMENT VARIABLES (Server Only)
┌────────────────────────────────────────┐
│  ✅ SUPABASE_URL                       │
│  ✅ SUPABASE_ANON_KEY (public)         │
│  🔒 SUPABASE_SERVICE_ROLE_KEY (secret) │
│  🔒 SENDGRID_API_KEY (secret)          │
│  🔒 VONAGE_API_KEY (secret)            │
│  🔒 VONAGE_API_SECRET (secret)         │
└────────────────────────────────────────┘
```

---

## 📦 File Structure

```
/
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx          # Main Hono server (27+ endpoints)
│           └── kv_store.tsx       # KV store utilities (PROTECTED)
│
├── src/
│   └── app/
│       ├── components/            # React UI components
│       ├── pages/                 # Page components
│       ├── layouts/               # Layout components
│       ├── hooks/
│       │   └── useApi.ts          # Custom API hooks
│       ├── utils/
│       │   └── api.ts             # API client singleton
│       ├── data/
│       │   └── services.ts        # Service definitions
│       ├── context/               # React contexts
│       ├── examples/
│       │   └── api-integration-examples.tsx
│       ├── routes.tsx             # React Router config
│       └── App.tsx                # Main app component
│
├── API_DOCUMENTATION.md           # Complete API reference
├── SERVER_README.md               # Server setup guide
├── QUICK_START.md                 # Quick integration guide
├── ARCHITECTURE.md                # This file
└── package.json
```

---

## 🚀 Deployment Architecture

```
┌────────────────────────────────────────────────────────────┐
│                   PRODUCTION DEPLOYMENT                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  FRONTEND (Static Assets)                                 │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Figma Make Hosting / Vercel / Netlify              │ │
│  │  - React SPA                                         │ │
│  │  - Vite build output                                 │ │
│  │  - Auto-deployed on push                             │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  BACKEND (Serverless)                                      │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Supabase Edge Functions                            │ │
│  │  - Deno runtime                                      │ │
│  │  - Auto-scaling                                      │ │
│  │  - Global CDN                                        │ │
│  │  - Zero cold starts                                  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  DATABASE                                                  │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Supabase PostgreSQL                                 │ │
│  │  - Managed database                                  │ │
│  │  - Automatic backups                                 │ │
│  │  - Point-in-time recovery                            │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘

MONITORING & LOGGING
├─ Supabase Dashboard (built-in)
├─ Edge Function logs
├─ Database metrics
└─ Real-time monitoring
```

---

## 🔄 API Request Lifecycle

```
1. User Action
   └─> Click "Book Service" button

2. React Component
   └─> const result = await api.createBooking({ ... })

3. API Client (utils/api.ts)
   └─> POST https://{project}.supabase.co/.../bookings
       Headers: { Authorization: Bearer <token> }
       Body: { serviceId, providerId, date, time, amount }

4. Supabase Edge Network
   └─> Route to nearest edge location
       Validate SSL/HTTPS

5. Hono Server (Edge Function)
   └─> app.post("/make-server-98f33885/bookings", ...)
       │
       ├─> verifyAuth(authHeader)
       │   └─> Extract JWT token
       │       └─> supabase.auth.getUser(token)
       │           └─> Validate & get user ID
       │
       ├─> Generate booking ID
       │   └─> booking_1713351234567_abc123
       │
       ├─> Create booking object
       │   └─> { id, userId, serviceId, ... }
       │
       └─> Store in KV
           ├─> kv.set(`booking:${id}`, JSON.stringify(booking))
           ├─> kv.set(`user_booking:${userId}:${id}`, id)
           └─> kv.set(`provider_booking:${pId}:${id}`, id)

6. Database (PostgreSQL)
   └─> INSERT INTO kv_store_98f33885
       WHERE key = 'booking:...'

7. Response
   └─> { success: true, booking: { ... } }

8. Frontend Update
   └─> Update UI with new booking
       Show success message
       Redirect to /my-bookings
```

---

## 🎯 Performance Optimization

### Caching Strategy

```
┌───────────────────────────────────────────────────────┐
│             CACHING LAYERS                            │
├───────────────────────────────────────────────────────┤
│                                                       │
│  1. Browser Cache                                     │
│     - Static assets (JS, CSS, images)                │
│     - Service worker (offline support)               │
│                                                       │
│  2. API Response Cache                                │
│     - Provider list (5 min TTL)                      │
│     - Service catalog (10 min TTL)                   │
│     - Reviews (2 min TTL)                            │
│                                                       │
│  3. Database Connection Pool                          │
│     - Persistent connections                          │
│     - Connection reuse                                │
│                                                       │
│  4. Edge Network Cache (Supabase)                     │
│     - Global CDN                                      │
│     - Automatic cache invalidation                   │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## 🛡️ Error Handling Flow

```
Try: API Call
 │
 ├─ Success
 │   └─> Update UI
 │       Show success message
 │       Navigate/Refresh
 │
 └─ Error
     │
     ├─ Network Error
     │   └─> Show "Connection lost" message
     │       Retry button
     │
     ├─ 401 Unauthorized
     │   └─> Clear session
     │       Redirect to /login
     │
     ├─ 403 Forbidden
     │   └─> Show "Access denied" message
     │       Redirect to dashboard
     │
     ├─ 404 Not Found
     │   └─> Show "Resource not found"
     │       Refresh data
     │
     └─ 500 Server Error
         └─> Log to console
             Show generic error
             Offer retry
```

---

## 📈 Scalability Considerations

```
CURRENT CAPACITY
├─ Users: Unlimited (Supabase Auth)
├─ Bookings: Unlimited (KV Store)
├─ Messages: Unlimited (KV Store)
├─ File Storage: Unlimited (Supabase Storage)
└─ API Requests: 500K/month (free tier)

SCALING STRATEGY
├─ Horizontal: Edge Functions auto-scale
├─ Database: Automatic connection pooling
├─ Storage: CDN-backed blob storage
└─ Geographic: Global edge network
```

---

**This architecture is production-ready and built for scale! 🚀**
