/**
 * Canva Controller
 * Maneja las operaciones con la API de Canva
 */

const canvaApiService = require('../services/canvaApi.service');

class CanvaController {
  /**
   * Obtiene el token de acceso de la sesión
   */
  getAccessToken(req) {
    return req.session?.tokens?.accessToken || req.headers.authorization?.replace('Bearer ', '');
  }

  /**
   * Obtiene información del usuario actual
   */
  async getCurrentUser(req, res) {
    try {
      const accessToken = this.getAccessToken(req);
      
      if (!accessToken) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const user = await canvaApiService.getCurrentUser(accessToken);
      res.json({ success: true, user });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ error: 'Failed to get user information' });
    }
  }

  /**
   * Lista todos los diseños
   */
  async listDesigns(req, res) {
    try {
      const accessToken = this.getAccessToken(req);
      
      if (!accessToken) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const designs = await canvaApiService.listDesigns(accessToken, req.query);
      res.json({ success: true, designs });
    } catch (error) {
      console.error('List designs error:', error);
      res.status(500).json({ error: 'Failed to list designs' });
    }
  }

  /**
   * Obtiene un diseño específico
   */
  async getDesign(req, res) {
    try {
      const accessToken = this.getAccessToken(req);
      const { designId } = req.params;
      
      if (!accessToken) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const design = await canvaApiService.getDesign(accessToken, designId);
      res.json({ success: true, design });
    } catch (error) {
      console.error('Get design error:', error);
      res.status(500).json({ error: 'Failed to get design' });
    }
  }

  /**
   * Crea un nuevo diseño
   */
  async createDesign(req, res) {
    try {
      const accessToken = this.getAccessToken(req);
      
      if (!accessToken) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const design = await canvaApiService.createDesign(accessToken, req.body);
      res.json({ success: true, design });
    } catch (error) {
      console.error('Create design error:', error);
      res.status(500).json({ error: 'Failed to create design' });
    }
  }

  /**
   * Exporta un diseño
   */
  async exportDesign(req, res) {
    try {
      const accessToken = this.getAccessToken(req);
      const { designId } = req.params;
      
      if (!accessToken) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const exportData = await canvaApiService.exportDesign(accessToken, designId, req.body);
      res.json({ success: true, export: exportData });
    } catch (error) {
      console.error('Export design error:', error);
      res.status(500).json({ error: 'Failed to export design' });
    }
  }

  /**
   * Lista los assets
   */
  async listAssets(req, res) {
    try {
      const accessToken = this.getAccessToken(req);
      
      if (!accessToken) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const assets = await canvaApiService.listAssets(accessToken, req.query);
      res.json({ success: true, assets });
    } catch (error) {
      console.error('List assets error:', error);
      res.status(500).json({ error: 'Failed to list assets' });
    }
  }

  /**
   * Sube un asset
   */
  async uploadAsset(req, res) {
    try {
      const accessToken = this.getAccessToken(req);
      
      if (!accessToken) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const asset = await canvaApiService.uploadAsset(accessToken, req.body);
      res.json({ success: true, asset });
    } catch (error) {
      console.error('Upload asset error:', error);
      res.status(500).json({ error: 'Failed to upload asset' });
    }
  }
}

module.exports = new CanvaController();
