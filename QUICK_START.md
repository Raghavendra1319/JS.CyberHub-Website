# 🚀 Quick Start Guide - JS.CyberHub Backend Integration

## ✅ What's Already Set Up

Your **JS.CyberHub** platform now has a **fully functional backend** with:

- ✅ **Hono Web Server** running on Supabase Edge Functions
- ✅ **27+ API Endpoints** for all platform features
- ✅ **Supabase Authentication** with JWT tokens
- ✅ **Email/SMS Verification** via SendGrid & Vonage
- ✅ **KV Database** for data storage
- ✅ **Frontend API Client** (`/src/app/utils/api.ts`)
- ✅ **React Hooks** for easy integration (`/src/app/hooks/useApi.ts`)

---

## 🎯 5-Minute Integration

### Step 1: Use the Auth Hook

Replace your existing auth logic with the pre-built hook:

```tsx
import { useApi } from './hooks/useApi';

function MyComponent() {
  const { user, isAuthenticated, signIn, signOut } = useApi();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Role: {user?.role}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Step 2: Load User Bookings

```tsx
import { useApi, useBookings } from './hooks/useApi';

function UserDashboard() {
  const { user } = useApi();
  const { bookings, loading, createBooking } = useBookings(user?.id);

  const handleBookService = async () => {
    const result = await createBooking({
      serviceId: 'malware-security',
      providerId: 'provider-123',
      date: '2026-04-25',
      time: '14:00',
      amount: 499
    });

    if (result.success) {
      alert('Booking created!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Bookings ({bookings.length})</h2>
      {bookings.map(booking => (
        <div key={booking.id}>
          <p>Service: {booking.serviceId}</p>
          <p>Status: {booking.status}</p>
        </div>
      ))}
      <button onClick={handleBookService}>Book New Service</button>
    </div>
  );
}
```

### Step 3: Display Provider List

```tsx
import { useProviders } from './hooks/useApi';

function ProvidersList() {
  const { providers, loading } = useProviders();

  if (loading) return <div>Loading providers...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {providers.map(provider => (
        <div key={provider.userId} className="p-4 border rounded">
          <h3>{provider.name}</h3>
          <p>{provider.bio}</p>
          <div>⭐ {provider.rating} ({provider.reviewCount} reviews)</div>
        </div>
      ))}
    </div>
  );
}
```

---

## 🔐 Authentication Examples

### Sign In Form

```tsx
import { useState } from 'react';
import { useApi } from './hooks/useApi';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn(email, password);
    
    if (result.success) {
      window.location.href = '/dashboard';
    } else {
      alert(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

### Sign Up Form

```tsx
import { useState } from 'react';
import { useApi } from './hooks/useApi';

function SignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user' as 'user' | 'provider' | 'admin'
  });
  const { signUp } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signUp(formData);
    
    if (result.success) {
      window.location.href = '/dashboard';
    } else {
      alert(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Full Name"
      />
      <input 
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input 
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      <select 
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
      >
        <option value="user">User</option>
        <option value="provider">Service Provider</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### Google OAuth

```tsx
import { useApi } from './hooks/useApi';

function SocialLogin() {
  const { signInWithGoogle } = useApi();

  return (
    <button onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}
```

---

## 💬 Real-Time Chat

```tsx
import { useState } from 'react';
import { useMessages } from './hooks/useApi';

function ChatWindow({ recipientId }: { recipientId: string }) {
  const { messages, sendMessage, loading } = useMessages(recipientId);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    
    const result = await sendMessage(newMessage);
    if (result.success) {
      setNewMessage('');
    }
  };

  if (loading) return <div>Loading chat...</div>;

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={msg.read ? 'read' : 'unread'}>
            <p>{msg.content}</p>
            <span>{new Date(msg.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="input">
        <input 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
```

---

## ⭐ Review System

```tsx
import { useState } from 'react';
import { useReviews } from './hooks/useApi';

function ReviewSection({ providerId }: { providerId: string }) {
  const { reviews, createReview, loading } = useReviews(providerId);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    const result = await createReview({
      bookingId: 'your-booking-id',
      rating,
      comment
    });

    if (result.success) {
      setShowForm(false);
      setComment('');
      alert('Review submitted!');
    }
  };

  return (
    <div>
      <h3>Reviews ({reviews.length})</h3>
      
      {reviews.map(review => (
        <div key={review.id} className="review">
          <div>⭐ {review.rating}/5</div>
          <p>{review.comment}</p>
          <small>by {review.user?.name}</small>
        </div>
      ))}

      {showForm ? (
        <div className="review-form">
          <h4>Leave a Review</h4>
          <div className="stars">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} onClick={() => setRating(star)}>
                {star <= rating ? '⭐' : '☆'}
              </button>
            ))}
          </div>
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
          />
          <button onClick={handleSubmit}>Submit Review</button>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)}>Write a Review</button>
      )}
    </div>
  );
}
```

---

## 💳 Payment Processing

```tsx
import { api } from './utils/api';

async function processBookingPayment(bookingId: string, amount: number) {
  try {
    const payment = await api.processPayment({
      bookingId,
      amount,
      method: 'credit_card'
    });

    console.log('Payment successful:', payment);
    
    // Booking status automatically updated to "confirmed"
    return { success: true, payment };
  } catch (error) {
    console.error('Payment failed:', error);
    return { success: false, error };
  }
}

// Usage
const handleCheckout = async () => {
  const result = await processBookingPayment('booking-123', 499);
  
  if (result.success) {
    alert('Payment successful! Booking confirmed.');
    router.navigate('/bookings');
  } else {
    alert('Payment failed. Please try again.');
  }
};
```

---

## 🛡️ Admin Dashboard

```tsx
import { useAdminStats } from './hooks/useApi';

function AdminDashboard() {
  const { stats, loading } = useAdminStats();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Platform Statistics</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalProviders}</h3>
          <p>Total Providers</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalBookings}</h3>
          <p>Total Bookings</p>
        </div>
        <div className="stat-card">
          <h3>${stats.totalRevenue.toFixed(2)}</h3>
          <p>Total Revenue</p>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔄 Protected Routes

```tsx
import { useApi } from './hooks/useApi';
import { Navigate } from 'react-router';

function ProtectedRoute({ children, requireAdmin = false }: any) {
  const { isAuthenticated, isAdmin, loading } = useApi();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

// Usage in routes
<Route 
  path="/admin" 
  element={
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
```

---

## 📱 Email/SMS Verification

```tsx
import { useState } from 'react';
import { api } from './utils/api';

function EmailVerification() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'input' | 'verify'>('input');

  const sendCode = async () => {
    await api.sendEmailVerification(email);
    setStep('verify');
    alert('Check your email for the code!');
  };

  const verifyCode = async () => {
    const result = await api.verifyEmail(email, code);
    if (result.success) {
      alert('Email verified!');
      // Proceed with signup
    }
  };

  return (
    <div>
      {step === 'input' ? (
        <>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <button onClick={sendCode}>Send Code</button>
        </>
      ) : (
        <>
          <input 
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
          />
          <button onClick={verifyCode}>Verify</button>
        </>
      )}
    </div>
  );
}
```

---

## 🎨 Full Component Example

Here's a complete booking component with all features:

```tsx
import { useState } from 'react';
import { useApi, useProviders } from './hooks/useApi';
import { api } from './utils/api';
import { services } from './data/services';

function BookingPage() {
  const { user, isAuthenticated } = useApi();
  const { providers, loading: providersLoading } = useProviders();
  const [selectedService, setSelectedService] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBook = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to book a service');
      return;
    }

    const service = services.find(s => s.id === selectedService);
    if (!service) return;

    try {
      // 1. Create booking
      const booking = await api.createBooking({
        serviceId: selectedService,
        providerId: selectedProvider,
        date,
        time,
        amount: service.price
      });

      // 2. Process payment
      const payment = await api.processPayment({
        bookingId: booking.booking.id,
        amount: service.price,
        method: 'credit_card'
      });

      // 3. Send confirmation message to provider
      await api.sendMessage({
        recipientId: selectedProvider,
        content: `New booking confirmed for ${service.name} on ${date} at ${time}`,
        bookingId: booking.booking.id
      });

      alert('Booking successful! Check your email for details.');
      window.location.href = '/my-bookings';
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="booking-page">
      <h1>Book a Service</h1>
      
      <div className="form">
        <select 
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name} - ${service.price}
            </option>
          ))}
        </select>

        <select 
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          disabled={providersLoading}
        >
          <option value="">Select Provider</option>
          {providers.map(provider => (
            <option key={provider.userId} value={provider.userId}>
              {provider.name} - ⭐ {provider.rating}
            </option>
          ))}
        </select>

        <input 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />

        <input 
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button 
          onClick={handleBook}
          disabled={!selectedService || !selectedProvider || !date || !time}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
```

---

## 🎉 You're All Set!

Your backend is **fully operational** and ready to use. Here's what to do next:

### ✅ Immediate Actions

1. **Update your existing pages** to use the API hooks
2. **Replace hardcoded data** with API calls
3. **Test the authentication flow** with real users
4. **Verify email/SMS** verification is working

### 📚 Documentation

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[SERVER_README.md](./SERVER_README.md)** - Detailed server guide
- **[/src/app/examples/](./src/app/examples/)** - Code examples

### 🚀 Production Checklist

- [ ] Integrate Stripe/PayPal for real payments
- [ ] Set up monitoring and error tracking
- [ ] Add rate limiting for API protection
- [ ] Configure custom email templates
- [ ] Set up automated backups
- [ ] Add analytics tracking
- [ ] Implement caching strategy

---

**Need Help?** Check the documentation files or review the examples in `/src/app/examples/`!

🎯 **Happy Coding!** Your JS.CyberHub platform is now a full-stack application! 🚀
