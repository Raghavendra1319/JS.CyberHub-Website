/**
 * JS.CyberHub API Integration Examples
 * 
 * This file contains practical examples of how to integrate
 * the backend API with your React components.
 */

import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// Initialize Supabase client
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// ==================== EXAMPLE 1: Authentication ====================

export function SignUpExample() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user' as 'user' | 'provider' | 'admin',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Sign up via API
      const result = await api.signup(formData);
      console.log('Signup successful:', result);

      // Sign in automatically
      const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (signInError) throw signInError;

      // Set access token for API calls
      if (session?.access_token) {
        api.setAccessToken(session.access_token);
        localStorage.setItem('access_token', session.access_token);
      }

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
      >
        <option value="user">User</option>
        <option value="provider">Provider</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}

// ==================== EXAMPLE 2: Booking System ====================

export function CreateBookingExample() {
  const [bookingData, setBookingData] = useState({
    serviceId: 'malware-security',
    providerId: '',
    date: '',
    time: '',
    amount: 499,
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleCreateBooking = async () => {
    setLoading(true);
    try {
      const result = await api.createBooking(bookingData);
      console.log('Booking created:', result);

      // Process payment immediately
      const payment = await api.processPayment({
        bookingId: result.booking.id,
        amount: bookingData.amount,
        method: 'credit_card'
      });
      console.log('Payment processed:', payment);

      alert('Booking confirmed! Check your email for details.');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="date"
        value={bookingData.date}
        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
      />
      <input
        type="time"
        value={bookingData.time}
        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
      />
      <textarea
        placeholder="Additional notes..."
        value={bookingData.notes}
        onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
      />
      <button onClick={handleCreateBooking} disabled={loading}>
        {loading ? 'Booking...' : 'Book Now'}
      </button>
    </div>
  );
}

// ==================== EXAMPLE 3: User Dashboard ====================

export function UserDashboardExample() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/login';
        return;
      }

      // Set token
      api.setAccessToken(session.access_token);

      // Load user's bookings
      const result = await api.getUserBookings(session.user.id);
      setBookings(result.bookings);

      // Calculate stats
      const total = result.bookings.length;
      const pending = result.bookings.filter((b: any) => b.status === 'pending').length;
      const completed = result.bookings.filter((b: any) => b.status === 'completed').length;
      setStats({ total, pending, completed });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Bookings</h2>
      <div className="stats">
        <p>Total: {stats.total}</p>
        <p>Pending: {stats.pending}</p>
        <p>Completed: {stats.completed}</p>
      </div>
      <div className="bookings-list">
        {bookings.map((booking: any) => (
          <div key={booking.id}>
            <p>Service: {booking.serviceId}</p>
            <p>Date: {booking.date} at {booking.time}</p>
            <p>Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== EXAMPLE 4: Provider Dashboard ====================

export function ProviderDashboardExample() {
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadProviderData();
  }, []);

  const loadProviderData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      api.setAccessToken(session.access_token);

      // Load provider profile
      const profileResult = await api.getProviderProfile(session.user.id);
      setProfile(profileResult.provider);

      // Load provider's bookings
      const bookingsResult = await api.getProviderBookings(session.user.id);
      setBookings(bookingsResult.bookings);
    } catch (error) {
      console.error('Error loading provider dashboard:', error);
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      await api.updateBooking(bookingId, { status: 'confirmed' });
      loadProviderData(); // Refresh data
      alert('Booking accepted!');
    } catch (error) {
      console.error('Error accepting booking:', error);
    }
  };

  return (
    <div>
      {profile && (
        <div className="provider-stats">
          <h2>{profile.name}</h2>
          <p>Rating: {profile.rating} ⭐ ({profile.reviewCount} reviews)</p>
          <p>Total Bookings: {profile.totalBookings}</p>
        </div>
      )}

      <h3>Incoming Bookings</h3>
      {bookings.map((booking: any) => (
        <div key={booking.id}>
          <p>Service: {booking.serviceId}</p>
          <p>Date: {booking.date} at {booking.time}</p>
          <p>Amount: ${booking.amount}</p>
          {booking.status === 'pending' && (
            <button onClick={() => handleAcceptBooking(booking.id)}>
              Accept Booking
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// ==================== EXAMPLE 5: Messaging System ====================

export function MessagingExample() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    initChat();
  }, [recipientId]);

  const initChat = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !recipientId) return;

      api.setAccessToken(session.access_token);
      setCurrentUserId(session.user.id);

      // Load conversation
      const result = await api.getConversation(session.user.id, recipientId);
      setMessages(result.messages);

      // Mark unread messages as read
      for (const msg of result.messages) {
        if (msg.recipientId === session.user.id && !msg.read) {
          await api.markMessageAsRead(msg.id);
        }
      }
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await api.sendMessage({
        recipientId,
        content: newMessage
      });
      setNewMessage('');
      initChat(); // Refresh messages
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg: any) => (
          <div 
            key={msg.id} 
            className={msg.senderId === currentUserId ? 'sent' : 'received'}
          >
            <p>{msg.content}</p>
            <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

// ==================== EXAMPLE 6: Review System ====================

export function ReviewFormExample({ providerId, bookingId }: { providerId: string, bookingId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    setSubmitting(true);
    try {
      await api.createReview({
        providerId,
        bookingId,
        rating,
        comment
      });
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Rate this service</h3>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={star <= rating ? 'active' : ''}
          >
            ⭐
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
      />
      <button onClick={handleSubmitReview} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </div>
  );
}

// ==================== EXAMPLE 7: Admin Dashboard ====================

export function AdminDashboardExample() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      api.setAccessToken(session.access_token);

      // Load platform statistics
      const statsResult = await api.getPlatformStats();
      setStats(statsResult.stats);

      // Load all users
      const usersResult = await api.getAllUsers();
      setUsers(usersResult.users);

      // Load all bookings
      const bookingsResult = await api.getAllBookings();
      setBookings(bookingsResult.bookings);
    } catch (error) {
      console.error('Error loading admin data:', error);
      alert('Admin access required');
    }
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h2>Platform Statistics</h2>
      <div className="stats-grid">
        <div>Total Users: {stats.totalUsers}</div>
        <div>Total Providers: {stats.totalProviders}</div>
        <div>Total Bookings: {stats.totalBookings}</div>
        <div>Total Revenue: ${stats.totalRevenue.toFixed(2)}</div>
      </div>

      <h3>Recent Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 10).map((user: any) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ==================== EXAMPLE 8: Email/SMS Verification ====================

export function VerificationExample() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [loading, setLoading] = useState(false);

  const sendVerificationCode = async () => {
    setLoading(true);
    try {
      await api.sendEmailVerification(email);
      setStep('verify');
      alert('Verification code sent to your email!');
    } catch (error) {
      console.error('Error sending code:', error);
      alert('Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    try {
      await api.verifyEmail(email, code);
      alert('Email verified successfully!');
      // Proceed with registration
    } catch (error) {
      console.error('Verification error:', error);
      alert('Invalid or expired code');
    } finally {
      setLoading(false);
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
            placeholder="Enter your email"
          />
          <button onClick={sendVerificationCode} disabled={loading}>
            {loading ? 'Sending...' : 'Send Code'}
          </button>
        </>
      ) : (
        <>
          <p>Check your email for the verification code</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
          />
          <button onClick={verifyCode} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </>
      )}
    </div>
  );
}

// ==================== EXAMPLE 9: Session Management ====================

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        api.setAccessToken(session.access_token);
        const userProfile = await api.getUserProfile(session.user.id);
        setUser(userProfile.user);
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    api.setAccessToken(null);
    setUser(null);
    window.location.href = '/';
  };

  return { user, loading, signOut, checkSession };
}

// ==================== EXAMPLE 10: Provider List ====================

export function ProvidersListExample() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const result = await api.getAllProviders();
      setProviders(result.providers);
    } catch (error) {
      console.error('Error loading providers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading providers...</div>;

  return (
    <div className="providers-grid">
      {providers.map((provider: any) => (
        <div key={provider.userId} className="provider-card">
          <h3>{provider.name}</h3>
          <p>{provider.bio}</p>
          <div className="rating">
            {provider.rating} ⭐ ({provider.reviewCount} reviews)
          </div>
          <p>Services: {provider.services.join(', ')}</p>
          {provider.verified && <span className="verified">✓ Verified</span>}
          <button onClick={() => window.location.href = `/provider/${provider.userId}`}>
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
}
