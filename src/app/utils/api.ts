import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-98f33885`;

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  requireAuth?: boolean;
}

class ApiClient {
  private accessToken: string | null = null;

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private async request(endpoint: string, options: ApiOptions = {}) {
    const {
      method = 'GET',
      headers = {},
      body,
      requireAuth = true,
    } = options;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Add authorization header
    if (requireAuth && this.accessToken) {
      requestHeaders['Authorization'] = `Bearer ${this.accessToken}`;
    } else if (!requireAuth) {
      requestHeaders['Authorization'] = `Bearer ${publicAnonKey}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`API Error (${endpoint}):`, data);
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error(`API Request Failed (${endpoint}):`, error);
      throw error;
    }
  }

  // ==================== AUTHENTICATION ====================
  async signup(data: {
    email: string;
    password: string;
    name: string;
    role: 'user' | 'provider' | 'admin';
    phone?: string;
  }) {
    return this.request('/signup', {
      method: 'POST',
      body: data,
      requireAuth: false,
    });
  }

  // ==================== USER MANAGEMENT ====================
  async getUserProfile(userId: string) {
    return this.request(`/user/${userId}`, {
      method: 'GET',
    });
  }

  async updateUserProfile(userId: string, updates: any) {
    return this.request(`/user/${userId}`, {
      method: 'PUT',
      body: updates,
    });
  }

  // ==================== BOOKINGS ====================
  async createBooking(data: {
    serviceId: string;
    providerId: string;
    date: string;
    time: string;
    amount: number;
    notes?: string;
  }) {
    return this.request('/bookings', {
      method: 'POST',
      body: data,
    });
  }

  async getUserBookings(userId: string) {
    return this.request(`/bookings/user/${userId}`, {
      method: 'GET',
    });
  }

  async getProviderBookings(providerId: string) {
    return this.request(`/bookings/provider/${providerId}`, {
      method: 'GET',
    });
  }

  async updateBooking(bookingId: string, updates: any) {
    return this.request(`/bookings/${bookingId}`, {
      method: 'PUT',
      body: updates,
    });
  }

  // ==================== PROVIDERS ====================
  async getProviderProfile(providerId: string) {
    return this.request(`/provider/${providerId}`, {
      method: 'GET',
      requireAuth: false,
    });
  }

  async updateProviderProfile(providerId: string, updates: any) {
    return this.request(`/provider/${providerId}`, {
      method: 'PUT',
      body: updates,
    });
  }

  async getAllProviders() {
    return this.request('/providers', {
      method: 'GET',
      requireAuth: false,
    });
  }

  // ==================== MESSAGING ====================
  async sendMessage(data: {
    recipientId: string;
    content: string;
    bookingId?: string;
  }) {
    return this.request('/messages', {
      method: 'POST',
      body: data,
    });
  }

  async getConversation(userId: string, otherUserId: string) {
    return this.request(`/messages/${userId}/${otherUserId}`, {
      method: 'GET',
    });
  }

  async markMessageAsRead(messageId: string) {
    return this.request(`/messages/${messageId}/read`, {
      method: 'PUT',
    });
  }

  // ==================== REVIEWS ====================
  async createReview(data: {
    providerId: string;
    bookingId: string;
    rating: number;
    comment: string;
  }) {
    return this.request('/reviews', {
      method: 'POST',
      body: data,
    });
  }

  async getProviderReviews(providerId: string) {
    return this.request(`/reviews/provider/${providerId}`, {
      method: 'GET',
      requireAuth: false,
    });
  }

  // ==================== PAYMENTS ====================
  async processPayment(data: {
    bookingId: string;
    amount: number;
    method: string;
  }) {
    return this.request('/payments', {
      method: 'POST',
      body: data,
    });
  }

  async getPaymentDetails(paymentId: string) {
    return this.request(`/payments/${paymentId}`, {
      method: 'GET',
    });
  }

  // ==================== ADMIN ====================
  async getAllUsers() {
    return this.request('/admin/users', {
      method: 'GET',
    });
  }

  async getAllBookings() {
    return this.request('/admin/bookings', {
      method: 'GET',
    });
  }

  async getPlatformStats() {
    return this.request('/admin/stats', {
      method: 'GET',
    });
  }

  // ==================== VERIFICATION ====================
  async sendEmailVerification(email: string) {
    return this.request('/send-email-verification', {
      method: 'POST',
      body: { email },
      requireAuth: false,
    });
  }

  async sendSMSVerification(phone: string) {
    return this.request('/send-sms-verification', {
      method: 'POST',
      body: { phone },
      requireAuth: false,
    });
  }

  async verifyEmail(email: string, code: string) {
    return this.request('/verify-email', {
      method: 'POST',
      body: { email, code },
      requireAuth: false,
    });
  }

  async verifySMS(phone: string, code: string) {
    return this.request('/verify-sms', {
      method: 'POST',
      body: { phone, code },
      requireAuth: false,
    });
  }

  // ==================== HEALTH CHECK ====================
  async healthCheck() {
    return this.request('/health', {
      method: 'GET',
      requireAuth: false,
    });
  }
}

// Export singleton instance
export const api = new ApiClient();
