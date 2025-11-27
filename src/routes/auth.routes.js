/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Inicia el flujo OAuth
router.get('/login', authController.login.bind(authController));

// Callback de OAuth
router.get('/callback', authController.callback.bind(authController));

// Refresca el token
router.post('/refresh', authController.refreshToken.bind(authController));

// Cierra sesión
router.post('/logout', authController.logout.bind(authController));

module.exports = router;
