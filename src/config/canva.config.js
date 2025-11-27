/**
 * Canva API Configuration
 */

module.exports = {
  clientId: process.env.CANVA_CLIENT_ID,
  clientSecret: process.env.CANVA_CLIENT_SECRET,
  redirectUri: process.env.CANVA_REDIRECT_URI,
  
  // Canva API endpoints
  apiEndpoints: {
    base: 'https://api.canva.com/rest/v1',
    auth: 'https://www.canva.com/api/oauth/authorize',
    token: 'https://api.canva.com/rest/v1/oauth/token',
  },
  
  // Scopes necesarios para tu aplicación
  scopes: [
    'design:content:read',
    'design:content:write',
    'design:meta:read',
    'asset:read',
    'asset:write',
  ],
};
