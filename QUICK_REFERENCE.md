# 🚀 JS.CyberHub API - Quick Reference Card

## 📞 Base URL
```
https://${projectId}.supabase.co/functions/v1/make-server-98f33885
```

---

## 🔐 Authentication

### Sign Up
```typescript
import { useApi } from './hooks/useApi';

const { signUp } = useApi();
await signUp({
  email: 'user@example.com',
  password: 'SecurePass123!',
  name: 'John Doe',
  role: 'user' // or 'provider' | 'admin'
});
```

### Sign In
```typescript
const { signIn } = useApi();
await signIn('user@example.com', 'SecurePass123!');
```

### Sign Out
```typescript
const { signOut } = useApi();
await signOut();
```

### Google OAuth
```typescript
const { signInWithGoogle } = useApi();
await signInWithGoogle();
```

---

## 👤 User Management

### Get Current User
```typescript
const { user, isAuthenticated } = useApi();
console.log(user); // { id, email, name, role, phone, ... }
```

### Update Profile
```typescript
await api.updateUserProfile(userId, {
  name: 'Updated Name',
  phone: '+1234567890'
});
```

---

## 📅 Bookings

### Create Booking
```typescript
import { useBookings } from './hooks/useApi';

const { createBooking } = useBookings(userId);
await createBooking({
  serviceId: 'malware-security',
  providerId: 'provider-123',
  date: '2026-04-25',
  time: '14:00',
  amount: 499,
  notes: 'Urgent request'
});
```

### Get User Bookings
```typescript
const { bookings, loading } = useBookings(userId);
// bookings = [{ id, serviceId, status, date, time, ... }]
```

### Update Booking Status
```typescript
const { updateBooking } = useBookings(userId);
await updateBooking(bookingId, { 
  status: 'confirmed' // 'pending' | 'confirmed' | 'cancelled' | 'completed'
});
```

---

## 🏢 Providers

### Get All Providers
```typescript
import { useProviders } from './hooks/useApi';

const { providers, loading } = useProviders();
// providers = [{ userId, name, rating, reviewCount, services, ... }]
```

### Get Provider Profile
```typescript
const provider = await api.getProviderProfile(providerId);
// { userId, name, bio, rating, reviewCount, totalBookings, ... }
```

### Update Provider Profile
```typescript
await api.updateProviderProfile(providerId, {
  bio: 'Updated bio',
  services: ['service-1', 'service-2']
});
```

---

## 💬 Messaging

### Send Message
```typescript
import { useMessages } from './hooks/useApi';

const { sendMessage } = useMessages(recipientId);
await sendMessage('Hello!', bookingId); // bookingId optional
```

### Get Conversation
```typescript
const { messages, loading } = useMessages(recipientId);
// messages = [{ id, senderId, content, createdAt, read, ... }]
```

### Auto-Refresh Messages
```typescript
const { messages, refresh } = useMessages(recipientId);

// Manually refresh
await refresh();

// Or use interval
useEffect(() => {
  const interval = setInterval(refresh, 5000); // Every 5 seconds
  return () => clearInterval(interval);
}, [refresh]);
```

---

## ⭐ Reviews

### Leave Review
```typescript
import { useReviews } from './hooks/useApi';

const { createReview } = useReviews(providerId);
await createReview({
  bookingId: 'booking-123',
  rating: 5,
  comment: 'Excellent service!'
});
```

### Get Provider Reviews
```typescript
const { reviews, loading } = useReviews(providerId);
// reviews = [{ id, rating, comment, user: { name }, createdAt, ... }]
```

---

## 💳 Payments

### Process Payment
```typescript
await api.processPayment({
  bookingId: 'booking-123',
  amount: 499,
  method: 'credit_card' // or 'paypal', 'crypto'
});
```

### Get Payment Details
```typescript
const payment = await api.getPaymentDetails(paymentId);
// { id, userId, bookingId, amount, status, transactionId, ... }
```

---

## 🛡️ Admin (Admin Only)

### Get Platform Stats
```typescript
import { useAdminStats } from './hooks/useApi';

const { stats, loading } = useAdminStats();
// stats = { totalUsers, totalProviders, totalBookings, totalRevenue }
```

### Get All Users
```typescript
const { users } = await api.getAllUsers();
```

### Get All Bookings
```typescript
const { bookings } = await api.getAllBookings();
```

---

## ✉️ Verification

### Email Verification
```typescript
// Send code
await api.sendEmailVerification('user@example.com');

// Verify code
await api.verifyEmail('user@example.com', '123456');
```

### SMS Verification
```typescript
// Send code
await api.sendSMSVerification('+1234567890');

// Verify code
await api.verifySMS('+1234567890', '123456');
```

---

## 🔄 Common Patterns

### Protected Component
```typescript
function ProtectedComponent() {
  const { isAuthenticated, loading } = useApi();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>Protected content</div>;
}
```

### Loading State
```typescript
function MyComponent() {
  const { bookings, loading, error } = useBookings(userId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{bookings.map(...)}</div>;
}
```

### Error Handling
```typescript
try {
  const result = await api.createBooking({ ... });
  if (result.success) {
    alert('Success!');
  }
} catch (error) {
  console.error('Error:', error);
  alert('Something went wrong');
}
```

### Complete Booking Flow
```typescript
async function completeBookingFlow() {
  // 1. Create booking
  const booking = await api.createBooking({
    serviceId: 'service-1',
    providerId: 'provider-1',
    date: '2026-04-25',
    time: '14:00',
    amount: 499
  });

  // 2. Process payment
  await api.processPayment({
    bookingId: booking.booking.id,
    amount: 499,
    method: 'credit_card'
  });

  // 3. Send confirmation message
  await api.sendMessage({
    recipientId: 'provider-1',
    content: 'Booking confirmed!',
    bookingId: booking.booking.id
  });

  // 4. Navigate to bookings page
  router.navigate('/my-bookings');
}
```

---

## 🎯 Role-Based UI

### User Dashboard
```typescript
const { user, isAuthenticated } = useApi();
const { bookings } = useBookings(user?.id);

return (
  <div>
    <h1>Welcome, {user?.name}</h1>
    <p>Your bookings: {bookings.length}</p>
  </div>
);
```

### Provider Dashboard
```typescript
const { user, isProvider } = useApi();
const { bookings } = useBookings(user?.id); // Provider bookings
const provider = await api.getProviderProfile(user?.id);

return (
  <div>
    <h1>{provider.name}</h1>
    <p>Rating: {provider.rating} ⭐</p>
    <p>Total Bookings: {provider.totalBookings}</p>
  </div>
);
```

### Admin Dashboard
```typescript
const { user, isAdmin } = useApi();
const { stats } = useAdminStats();

if (!isAdmin) return <Navigate to="/dashboard" />;

return (
  <div>
    <h1>Platform Statistics</h1>
    <p>Users: {stats.totalUsers}</p>
    <p>Revenue: ${stats.totalRevenue}</p>
  </div>
);
```

---

## 🔧 Direct API Usage (Without Hooks)

```typescript
import { api } from './utils/api';

// Set token manually
api.setAccessToken(accessToken);

// Make API calls
const bookings = await api.getUserBookings(userId);
const providers = await api.getAllProviders();
const payment = await api.processPayment({ ... });
```

---

## 📊 Status Values Reference

### Booking Status
- `pending` - Waiting for provider confirmation
- `confirmed` - Provider accepted, payment processed
- `cancelled` - Cancelled by user or provider
- `completed` - Service delivered

### Payment Status
- `pending` - Payment being processed
- `completed` - Payment successful
- `failed` - Payment failed

### User Status
- `active` - Active account
- `inactive` - Inactive account
- `suspended` - Suspended by admin

---

## 🎨 UI Integration Snippets

### Sign In Form
```typescript
<form onSubmit={async (e) => {
  e.preventDefault();
  const { signIn } = useApi();
  await signIn(email, password);
}}>
  <input type="email" />
  <input type="password" />
  <button type="submit">Sign In</button>
</form>
```

### Booking Card
```typescript
{bookings.map(booking => (
  <div key={booking.id}>
    <h3>{booking.serviceId}</h3>
    <p>{booking.date} at {booking.time}</p>
    <span className={`status-${booking.status}`}>
      {booking.status}
    </span>
    <button onClick={() => updateBooking(booking.id, { status: 'cancelled' })}>
      Cancel
    </button>
  </div>
))}
```

### Provider Card
```typescript
{providers.map(provider => (
  <div key={provider.userId}>
    <h3>{provider.name}</h3>
    <p>{provider.bio}</p>
    <div>⭐ {provider.rating} ({provider.reviewCount})</div>
    <Link to={`/provider/${provider.userId}`}>View Profile</Link>
  </div>
))}
```

### Chat Interface
```typescript
const { messages, sendMessage } = useMessages(recipientId);
const [input, setInput] = useState('');

return (
  <div>
    <div className="messages">
      {messages.map(msg => (
        <div key={msg.id} className={msg.senderId === userId ? 'sent' : 'received'}>
          {msg.content}
        </div>
      ))}
    </div>
    <input 
      value={input} 
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
    />
  </div>
);
```

---

## ⚡ Performance Tips

### Cache Provider List
```typescript
const { providers } = useProviders();
// Hook automatically caches - no need to refetch unnecessarily
```

### Optimize Booking Updates
```typescript
// ✅ Good: Update specific booking
await updateBooking(bookingId, { status: 'confirmed' });

// ❌ Avoid: Fetching all bookings after every update
// The hook automatically refreshes
```

### Batch Operations
```typescript
// Create multiple bookings
const bookingPromises = services.map(service => 
  api.createBooking({ serviceId: service.id, ... })
);
await Promise.all(bookingPromises);
```

---

## 🐛 Common Issues & Solutions

### Issue: "Unauthorized"
```typescript
// Solution: Refresh session
const { refreshSession } = useApi();
await refreshSession();
```

### Issue: Stale Data
```typescript
// Solution: Manual refresh
const { refresh } = useBookings(userId);
await refresh();
```

### Issue: CORS Error
```typescript
// Server is already configured - check browser console
// Ensure using correct base URL and headers
```

---

## 📱 Mobile Responsiveness

All hooks work seamlessly on mobile devices. Just ensure your UI components are responsive:

```typescript
// Mobile-optimized booking card
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {bookings.map(booking => (
    <BookingCard key={booking.id} {...booking} />
  ))}
</div>
```

---

## 🎉 That's It!

You now have everything you need to build a complete, full-stack application!

**Key Files to Remember:**
- Use Hooks: `/src/app/hooks/useApi.ts`
- API Client: `/src/app/utils/api.ts`
- Examples: `/src/app/examples/api-integration-examples.tsx`
- Full Docs: `/API_DOCUMENTATION.md`

**Quick Health Check:**
```typescript
const health = await api.healthCheck();
console.log(health); // { status: "ok" }
```

---

**Happy Coding! 🚀**
