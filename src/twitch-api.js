import axios from "axios";

const TWITCH_API_BASE = "https://api.twitch.tv/helix";
const TWITCH_OAUTH_BASE = "https://id.twitch.tv/oauth2";

class TwitchAPI {
  constructor(clientId, accessToken) {
    this.clientId = clientId;
    this.accessToken = accessToken;
    this.tokenExpiry = null;
    this.cachedUserIds = new Map(); // Cache user ID lookups
  }

  /**
   * Get request headers for Twitch API
   */
  getHeaders() {
    return {
      "Client-ID": this.clientId,
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * Get user information by username
   * @param {string} username - Twitch username
   * @returns {Promise<Object|null>} User data or null if not found
   */
  async getUser(username) {
    try {
      // Check cache first
      if (this.cachedUserIds.has(username.toLowerCase())) {
        return this.cachedUserIds.get(username.toLowerCase());
      }

      const response = await axios.get(`${TWITCH_API_BASE}/users`, {
        headers: this.getHeaders(),
        params: {
          login: username.toLowerCase(),
        },
      });

      if (response.data.data.length === 0) {
        return null;
      }

      const user = response.data.data[0];
      // Cache for 24 hours
      this.cachedUserIds.set(username.toLowerCase(), user);
      return user;
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || error.message || String(error);
      console.error(`❌ Error fetching Twitch user ${username}: ${errorMsg}`);
      return null;
    }
  }

  /**
   * Check if a user is currently live
   * @param {string} username - Twitch username
   * @returns {Promise<Object|null>} Stream data if live, null if offline or error
   */
  async getStreamInfo(username) {
    try {
      const user = await this.getUser(username);
      if (!user) {
        return null;
      }

      const response = await axios.get(`${TWITCH_API_BASE}/streams`, {
        headers: this.getHeaders(),
        params: {
          user_id: user.id,
        },
      });

      if (response.data.data.length === 0) {
        return null; // Offline
      }

      return {
        ...response.data.data[0],
        user_login: user.login,
        user_name: user.display_name,
      };
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || error.message || String(error);
      console.error(
        `❌ Error fetching stream info for ${username}: ${errorMsg}`
      );
      return null;
    }
  }

  /**
   * Validate if credentials are valid
   * @returns {Promise<boolean>}
   */
  async validateCredentials() {
    try {
      const response = await axios.get(`${TWITCH_API_BASE}/users`, {
        headers: this.getHeaders(),
        params: { login: "twitch" },
      });
      return response.status === 200;
    } catch (error) {
      console.error("❌ Invalid Twitch credentials:", error.message);
      return false;
    }
  }
}

export default TwitchAPI;
