/**
 * Canva API Service
 * Servicios para interactuar con la API de Canva
 */

const axios = require('axios');
const canvaConfig = require('../config/canva.config');

class CanvaApiService {
  constructor() {
    this.baseUrl = canvaConfig.apiEndpoints.base;
  }

  /**
   * Crea una instancia de axios con el token de autenticación
   * @param {string} accessToken - Token de acceso
   * @returns {Object} Instancia de axios
   */
  createApiClient(accessToken) {
    return axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Obtiene información del usuario actual
   * @param {string} accessToken - Token de acceso
   * @returns {Promise<Object>} Información del usuario
   */
  async getCurrentUser(accessToken) {
    try {
      const client = this.createApiClient(accessToken);
      const response = await client.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Lista los diseños del usuario
   * @param {string} accessToken - Token de acceso
   * @param {Object} params - Parámetros de filtrado (opcional)
   * @returns {Promise<Object>} Lista de diseños
   */
  async listDesigns(accessToken, params = {}) {
    try {
      const client = this.createApiClient(accessToken);
      const response = await client.get('/designs', { params });
      return response.data;
    } catch (error) {
      console.error('Error listing designs:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Obtiene información de un diseño específico
   * @param {string} accessToken - Token de acceso
   * @param {string} designId - ID del diseño
   * @returns {Promise<Object>} Información del diseño
   */
  async getDesign(accessToken, designId) {
    try {
      const client = this.createApiClient(accessToken);
      const response = await client.get(`/designs/${designId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting design:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Crea un nuevo diseño
   * @param {string} accessToken - Token de acceso
   * @param {Object} designData - Datos del diseño a crear
   * @returns {Promise<Object>} Diseño creado
   */
  async createDesign(accessToken, designData) {
    try {
      const client = this.createApiClient(accessToken);
      const response = await client.post('/designs', designData);
      return response.data;
    } catch (error) {
      console.error('Error creating design:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Exporta un diseño
   * @param {string} accessToken - Token de acceso
   * @param {string} designId - ID del diseño
   * @param {Object} exportOptions - Opciones de exportación (formato, calidad, etc.)
   * @returns {Promise<Object>} Información de la exportación
   */
  async exportDesign(accessToken, designId, exportOptions = {}) {
    try {
      const client = this.createApiClient(accessToken);
      const response = await client.post(`/designs/${designId}/export`, exportOptions);
      return response.data;
    } catch (error) {
      console.error('Error exporting design:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Sube un asset a Canva
   * @param {string} accessToken - Token de acceso
   * @param {Object} assetData - Datos del asset
   * @returns {Promise<Object>} Asset subido
   */
  async uploadAsset(accessToken, assetData) {
    try {
      const client = this.createApiClient(accessToken);
      const response = await client.post('/assets', assetData);
      return response.data;
    } catch (error) {
      console.error('Error uploading asset:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Lista los assets del usuario
   * @param {string} accessToken - Token de acceso
   * @param {Object} params - Parámetros de filtrado
   * @returns {Promise<Object>} Lista de assets
   */
  async listAssets(accessToken, params = {}) {
    try {
      const client = this.createApiClient(accessToken);
      const response = await client.get('/assets', { params });
      return response.data;
    } catch (error) {
      console.error('Error listing assets:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new CanvaApiService();
