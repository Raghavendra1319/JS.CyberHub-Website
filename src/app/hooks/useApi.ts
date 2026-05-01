/**
 * Custom React Hook for API Integration
 * 
 * Provides easy access to API methods with automatic
 * session management and error handling
 */

import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'provider' | 'admin';
  phone: string;
  status: string;
  createdAt: string;
}

export function useApi() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize session on mount
  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (currentSession) {
        setSession(currentSession);
        api.setAccessToken(currentSession.access_token);
        
        // Load user profile
        try {
          const userProfile = await api.getUserProfile(currentSession.user.id);
          setUser(userProfile.user);
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      }
    } catch (error) {
      console.error('Session initialization error:', error);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  // Sign in with email/password
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data: { session: newSession }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (newSession) {
        setSession(newSession);
        api.setAccessToken(newSession.access_token);
        
        const userProfile = await api.getUserProfile(newSession.user.id);
        setUser(userProfile.user);
      }

      return { success: true, session: newSession };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Sign up new user
  const signUp = useCallback(async (data: {
    email: string;
    password: string;
    name: string;
    role: 'user' | 'provider' | 'admin';
    phone?: string;
  }) => {
    try {
      // Create user via API
      const result = await api.signup(data);

      // Sign in automatically
      const signInResult = await signIn(data.email, data.password);
      
      return { success: true, ...result, ...signInResult };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }
  }, [signIn]);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      api.setAccessToken(null);
      setSession(null);
      setUser(null);
      return { success: true };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Sign in with Google OAuth
  const signInWithGoogle = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Google sign in error:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Refresh session
  const refreshSession = useCallback(async () => {
    await initializeSession();
  }, []);

  return {
    // Auth state
    user,
    session,
    loading,
    initialized,
    isAuthenticated: !!session,
    isAdmin: user?.role === 'admin',
    isProvider: user?.role === 'provider',
    
    // Auth methods
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    refreshSession,
    
    // API client (for direct access to all methods)
    api,
    
    // Supabase client (for advanced use cases)
    supabase,
  };
}

// Hook for managing bookings
export function useBookings(userId?: string) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await api.getUserBookings(userId);
      setBookings(result.bookings);
    } catch (err: any) {
      console.error('Error loading bookings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const createBooking = useCallback(async (data: any) => {
    try {
      const result = await api.createBooking(data);
      await loadBookings(); // Refresh list
      return { success: true, booking: result.booking };
    } catch (err: any) {
      console.error('Error creating booking:', err);
      return { success: false, error: err.message };
    }
  }, [loadBookings]);

  const updateBooking = useCallback(async (bookingId: string, updates: any) => {
    try {
      const result = await api.updateBooking(bookingId, updates);
      await loadBookings(); // Refresh list
      return { success: true, booking: result.booking };
    } catch (err: any) {
      console.error('Error updating booking:', err);
      return { success: false, error: err.message };
    }
  }, [loadBookings]);

  return {
    bookings,
    loading,
    error,
    refresh: loadBookings,
    createBooking,
    updateBooking,
  };
}

// Hook for managing providers
export function useProviders() {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProviders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await api.getAllProviders();
      setProviders(result.providers);
    } catch (err: any) {
      console.error('Error loading providers:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProviders();
  }, [loadProviders]);

  return {
    providers,
    loading,
    error,
    refresh: loadProviders,
  };
}

// Hook for managing messages
export function useMessages(otherUserId?: string) {
  const { user } = useApi();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    if (!user?.id || !otherUserId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await api.getConversation(user.id, otherUserId);
      setMessages(result.messages);

      // Mark unread messages as read
      for (const msg of result.messages) {
        if (msg.recipientId === user.id && !msg.read) {
          await api.markMessageAsRead(msg.id);
        }
      }
    } catch (err: any) {
      console.error('Error loading messages:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id, otherUserId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const sendMessage = useCallback(async (content: string, bookingId?: string) => {
    if (!otherUserId) return { success: false, error: 'No recipient' };

    try {
      const result = await api.sendMessage({
        recipientId: otherUserId,
        content,
        bookingId
      });
      await loadMessages(); // Refresh messages
      return { success: true, message: result.message };
    } catch (err: any) {
      console.error('Error sending message:', err);
      return { success: false, error: err.message };
    }
  }, [otherUserId, loadMessages]);

  return {
    messages,
    loading,
    error,
    refresh: loadMessages,
    sendMessage,
  };
}

// Hook for admin stats
export function useAdminStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await api.getPlatformStats();
      setStats(result.stats);
    } catch (err: any) {
      console.error('Error loading stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    loading,
    error,
    refresh: loadStats,
  };
}

// Hook for provider reviews
export function useReviews(providerId?: string) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    if (!providerId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await api.getProviderReviews(providerId);
      setReviews(result.reviews);
    } catch (err: any) {
      console.error('Error loading reviews:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [providerId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const createReview = useCallback(async (data: {
    bookingId: string;
    rating: number;
    comment: string;
  }) => {
    if (!providerId) return { success: false, error: 'No provider ID' };

    try {
      const result = await api.createReview({
        ...data,
        providerId
      });
      await loadReviews(); // Refresh reviews
      return { success: true, review: result.review };
    } catch (err: any) {
      console.error('Error creating review:', err);
      return { success: false, error: err.message };
    }
  }, [providerId, loadReviews]);

  return {
    reviews,
    loading,
    error,
    refresh: loadReviews,
    createReview,
  };
}
