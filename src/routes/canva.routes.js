/**
 * Canva API Routes
 */

const express = require('express');
const router = express.Router();
const canvaController = require('../controllers/canva.controller');

// User routes
router.get('/user/me', canvaController.getCurrentUser.bind(canvaController));

// Design routes
router.get('/designs', canvaController.listDesigns.bind(canvaController));
router.get('/designs/:designId', canvaController.getDesign.bind(canvaController));
router.post('/designs', canvaController.createDesign.bind(canvaController));
router.post('/designs/:designId/export', canvaController.exportDesign.bind(canvaController));

// Asset routes
router.get('/assets', canvaController.listAssets.bind(canvaController));
router.post('/assets', canvaController.uploadAsset.bind(canvaController));

module.exports = router;
