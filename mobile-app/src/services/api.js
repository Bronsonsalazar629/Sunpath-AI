// API service to connect to existing backend
import { API_ENDPOINTS } from '../shared/constants/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../shared/constants/app';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_ENDPOINTS.BASE_URL}${endpoint}`;
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          // Token might be expired, could try to refresh
          throw new Error('Unauthorized: Please log in again');
        }
        throw new Error(data.detail || data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async firebaseLogin(firebaseToken, deviceInfo = {}) {
    return this.request('/api/auth/firebase-login', {
      method: 'POST',
      body: JSON.stringify({
        firebase_token: firebaseToken,
        device_info: deviceInfo
      }),
    });
  }

  async refreshToken(refreshToken) {
    return this.request('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  }

  async logout(allDevices = false) {
    return this.request('/api/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ all_devices: allDevices }),
    });
  }

  async getCurrentUser() {
    return this.request('/api/auth/me');
  }

  async verifyToken() {
    return this.request('/api/auth/verify');
  }

  async updateConsent(consentData) {
    return this.request('/api/auth/consent', {
      method: 'POST',
      body: JSON.stringify(consentData),
    });
  }

  // User endpoints
  async getUserProfile() {
    return this.request('/api/users/profile');
  }

  async updateUserProfile(profileData) {
    return this.request('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getUserPreferences() {
    return this.request('/api/users/preferences');
  }

  async updateUserPreferences(preferencesData) {
    return this.request('/api/users/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferencesData),
    });
  }

  async getSocialDeterminants() {
    return this.request('/api/users/social-determinants');
  }

  async updateSocialDeterminants(sdohData) {
    return this.request('/api/users/social-determinants', {
      method: 'PUT',
      body: JSON.stringify(sdohData),
    });
  }

  // Mood tracking endpoints
  async createMoodEntry(moodData) {
    return this.request('/api/mood/entries', {
      method: 'POST',
      body: JSON.stringify(moodData),
    });
  }

  async getMoodEntries(params = {}) {
    const { limit = 30, offset = 0, start_date, end_date } = params;

    // Build query string manually (URLSearchParams not available in React Native)
    const queryParams = [];
    queryParams.push(`limit=${limit}`);
    queryParams.push(`offset=${offset}`);
    if (start_date) queryParams.push(`start_date=${start_date}`);
    if (end_date) queryParams.push(`end_date=${end_date}`);
    const queryString = queryParams.join('&');

    return this.request(`/api/mood/entries?${queryString}`);
  }

  async getMoodEntry(entryId) {
    return this.request(`/api/mood/entries/${entryId}`);
  }

  async updateMoodEntry(entryId, moodUpdateData) {
    return this.request(`/api/mood/entries/${entryId}`, {
      method: 'PUT',
      body: JSON.stringify(moodUpdateData),
    });
  }

  async deleteMoodEntry(entryId) {
    return this.request(`/api/mood/entries/${entryId}`, {
      method: 'DELETE',
    });
  }

  async getMoodTrends(period = '30d') {
    return this.request(`/api/mood/trends?period=${period}`);
  }

  // Analytics endpoints
  async getAnalyticsData(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/analytics?${queryString}`);
  }

  // Research endpoints
  async getResearchBiasAnalysis() {
    return this.request('/api/research/bias-analysis');
  }

  async getResearchGeographicAnalysis() {
    return this.request('/api/research/geographic-analysis');
  }

  async submitResearchBiasReport(reportData) {
    return this.request('/api/research/bias-report', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }

  // Wellness metrics endpoint
  async getWellnessMetrics(period = '30d') {
    return this.request(`/api/v1/analytics/wellness-metrics?period=${period}`);
  }

  async getUserStats() {
    return this.request('/api/v1/analytics/user-stats');
  }

  // Chat endpoints
  async sendChatMessage(message, conversationHistory = [], includeMoodContext = true) {
    return this.request('/chat/message', {
      method: 'POST',
      body: JSON.stringify({
        message,
        conversation_history: conversationHistory,
        include_mood_context: includeMoodContext
      }),
    });
  }

  async getChatStatus() {
    return this.request('/chat/status');
  }
}

export default new ApiService();