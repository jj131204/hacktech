/**
 * Server Entry Point
 */

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n🔐 Authentication endpoints:`);
  console.log(`   - Login: http://localhost:${PORT}/auth/login`);
  console.log(`   - Callback: http://localhost:${PORT}/auth/callback`);
  console.log(`\n🎨 Canva API endpoints:`);
  console.log(`   - User Info: http://localhost:${PORT}/api/canva/user/me`);
  console.log(`   - Designs: http://localhost:${PORT}/api/canva/designs`);
  console.log(`   - Assets: http://localhost:${PORT}/api/canva/assets`);
});
