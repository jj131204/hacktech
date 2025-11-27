/**
 * Ejemplos de uso de la integración con Canva
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000';

// Ejemplo 1: Flujo de autenticación
async function authenticationExample() {
  console.log('=== Ejemplo de Autenticación ===\n');
  
  // Paso 1: El usuario visita la URL de login
  console.log('1. Abre en tu navegador: http://localhost:3000/auth/login');
  console.log('2. Autoriza la aplicación en Canva');
  console.log('3. Serás redirigido al callback con los tokens\n');
}

// Ejemplo 2: Obtener información del usuario
async function getUserExample(accessToken) {
  console.log('=== Ejemplo: Obtener Usuario Actual ===\n');
  
  try {
    const response = await axios.get(`${API_BASE_URL}/api/canva/user/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    console.log('Usuario:', response.data.user);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Ejemplo 3: Listar diseños
async function listDesignsExample(accessToken) {
  console.log('=== Ejemplo: Listar Diseños ===\n');
  
  try {
    const response = await axios.get(`${API_BASE_URL}/api/canva/designs`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        limit: 10,
        offset: 0
      }
    });
    
    console.log('Diseños:', response.data.designs);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Ejemplo 4: Crear un diseño
async function createDesignExample(accessToken) {
  console.log('=== Ejemplo: Crear Diseño ===\n');
  
  try {
    const designData = {
      asset_type: 'design',
      title: 'Mi Diseño desde API',
      width: 1920,
      height: 1080
    };
    
    const response = await axios.post(
      `${API_BASE_URL}/api/canva/designs`,
      designData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Diseño creado:', response.data.design);
    return response.data.design.id;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Ejemplo 5: Exportar un diseño
async function exportDesignExample(accessToken, designId) {
  console.log('=== Ejemplo: Exportar Diseño ===\n');
  
  try {
    const exportOptions = {
      format: 'png',
      quality: 'high'
    };
    
    const response = await axios.post(
      `${API_BASE_URL}/api/canva/designs/${designId}/export`,
      exportOptions,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Exportación:', response.data.export);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Ejemplo 6: Subir un asset
async function uploadAssetExample(accessToken) {
  console.log('=== Ejemplo: Subir Asset ===\n');
  
  try {
    const assetData = {
      type: 'image',
      name: 'Mi Imagen',
      url: 'https://example.com/image.png'
    };
    
    const response = await axios.post(
      `${API_BASE_URL}/api/canva/assets`,
      assetData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Asset subido:', response.data.asset);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Función principal para ejecutar ejemplos
async function runExamples() {
  // Primero debes autenticarte y obtener el accessToken
  const accessToken = 'TU_ACCESS_TOKEN_AQUI';
  
  if (accessToken === 'TU_ACCESS_TOKEN_AQUI') {
    console.log('⚠️  Primero debes autenticarte y obtener un access token');
    authenticationExample();
    return;
  }
  
  // Ejecuta los ejemplos
  await getUserExample(accessToken);
  await listDesignsExample(accessToken);
  
  const designId = await createDesignExample(accessToken);
  if (designId) {
    await exportDesignExample(accessToken, designId);
  }
  
  await uploadAssetExample(accessToken);
}

// Descomenta para ejecutar los ejemplos
// runExamples();

module.exports = {
  getUserExample,
  listDesignsExample,
  createDesignExample,
  exportDesignExample,
  uploadAssetExample,
};
