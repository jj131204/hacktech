/**
 * Authentication Controller
 * Maneja las rutas de autenticación OAuth
 */

const canvaAuthService = require('../services/canvaAuth.service');

class AuthController {
  /**
   * Inicia el flujo de autenticación OAuth
   */
  async login(req, res) {
    try {
      // Genera un estado aleatorio para CSRF protection
      const state = Math.random().toString(36).substring(7);
      
      // Guarda el estado en la sesión (opcional)
      req.session = req.session || {};
      req.session.oauthState = state;
      
      const authUrl = canvaAuthService.getAuthorizationUrl(state);
      
      res.redirect(authUrl);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to initiate login' });
    }
  }

  /**
   * Callback de OAuth - recibe el código de autorización
   */
  async callback(req, res) {
    try {
      const { code, state } = req.query;

      if (!code) {
        return res.status(400).json({ error: 'Authorization code not provided' });
      }

      // Valida el estado (CSRF protection)
      if (req.session?.oauthState && req.session.oauthState !== state) {
        return res.status(400).json({ error: 'Invalid state parameter' });
      }

      // Intercambia el código por tokens
      const tokens = await canvaAuthService.exchangeCodeForToken(code);
      
      // Guarda los tokens (aquí puedes guardarlos en base de datos o sesión)
      req.session.tokens = tokens;

      res.json({
        success: true,
        message: 'Authentication successful',
        tokens: {
          accessToken: tokens.accessToken,
          expiresIn: tokens.expiresIn,
        },
      });
    } catch (error) {
      console.error('Callback error:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }

  /**
   * Refresca el token de acceso
   */
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token not provided' });
      }

      const tokens = await canvaAuthService.refreshAccessToken(refreshToken);
      
      // Actualiza los tokens en la sesión
      req.session.tokens = tokens;

      res.json({
        success: true,
        tokens: {
          accessToken: tokens.accessToken,
          expiresIn: tokens.expiresIn,
        },
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({ error: 'Failed to refresh token' });
    }
  }

  /**
   * Cierra la sesión
   */
  logout(req, res) {
    req.session = null;
    res.json({ success: true, message: 'Logged out successfully' });
  }
}

module.exports = new AuthController();
