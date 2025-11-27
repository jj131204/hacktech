/**
 * Canva Authentication Service
 * Maneja la autenticación OAuth 2.0 con Canva
 */

const axios = require('axios');
const canvaConfig = require('../config/canva.config');

class CanvaAuthService {
  /**
   * Genera la URL de autorización para iniciar el flujo OAuth
   * @param {string} state - Estado opcional para CSRF protection
   * @returns {string} URL de autorización
   */
  getAuthorizationUrl(state = '') {
    const params = new URLSearchParams({
      client_id: canvaConfig.clientId,
      redirect_uri: canvaConfig.redirectUri,
      response_type: 'code',
      scope: canvaConfig.scopes.join(' '),
      state: state,
    });

    return `${canvaConfig.apiEndpoints.auth}?${params.toString()}`;
  }

  /**
   * Intercambia el código de autorización por tokens de acceso
   * @param {string} code - Código de autorización recibido de Canva
   * @returns {Promise<Object>} Objeto con access_token y refresh_token
   */
  async exchangeCodeForToken(code) {
    try {
      const response = await axios.post(
        canvaConfig.apiEndpoints.token,
        {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: canvaConfig.redirectUri,
          client_id: canvaConfig.clientId,
          client_secret: canvaConfig.clientSecret,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
        tokenType: response.data.token_type,
      };
    } catch (error) {
      console.error('Error exchanging code for token:', error.response?.data || error.message);
      throw new Error('Failed to obtain access token');
    }
  }

  /**
   * Refresca el token de acceso usando el refresh token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} Nuevo access token
   */
  async refreshAccessToken(refreshToken) {
    try {
      const response = await axios.post(
        canvaConfig.apiEndpoints.token,
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: canvaConfig.clientId,
          client_secret: canvaConfig.clientSecret,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
      };
    } catch (error) {
      console.error('Error refreshing token:', error.response?.data || error.message);
      throw new Error('Failed to refresh access token');
    }
  }
}

module.exports = new CanvaAuthService();
