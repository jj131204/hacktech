# Canva Integration - Node.js

Proyecto de integración con la API de Canva usando Node.js y Express.

## 📋 Características

- ✅ Autenticación OAuth 2.0 con Canva
- ✅ Gestión de tokens (access & refresh)
- ✅ Operaciones con diseños (listar, crear, exportar)
- ✅ Gestión de assets (subir, listar)
- ✅ Arquitectura modular y escalable
- ✅ Manejo de errores centralizado

## 🏗️ Estructura del Proyecto

```
hacktech/
├── src/
│   ├── config/              # Configuración
│   │   └── canva.config.js  # Configuración de Canva API
│   ├── controllers/         # Controladores
│   │   ├── auth.controller.js
│   │   └── canva.controller.js
│   ├── services/            # Servicios
│   │   ├── canvaAuth.service.js
│   │   └── canvaApi.service.js
│   ├── routes/              # Rutas
│   │   ├── auth.routes.js
│   │   └── canva.routes.js
│   ├── middleware/          # Middleware
│   │   └── errorHandler.js
│   ├── app.js              # Configuración de Express
│   └── server.js           # Punto de entrada
├── examples/               # Ejemplos de uso
│   └── usage.example.js
├── .env.example           # Variables de entorno de ejemplo
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Instalación

1. **Clona el repositorio** (o ya lo tienes):
```bash
cd c:\Users\CIE PC 02\Documents\hacteck\hacktech
```

2. **Instala las dependencias**:
```bash
npm install
```

3. **Configura las variables de entorno**:
```bash
# Copia el archivo .env.example a .env
cp .env.example .env
```

4. **Edita el archivo `.env`** con tus credenciales de Canva:
```env
CANVA_CLIENT_ID=tu_client_id
CANVA_CLIENT_SECRET=tu_client_secret
CANVA_REDIRECT_URI=http://localhost:3000/auth/callback
PORT=3000
NODE_ENV=development
```

## 📦 Dependencias Necesarias

Las siguientes dependencias serán instaladas:

- `express` - Framework web
- `axios` - Cliente HTTP
- `express-session` - Manejo de sesiones
- `cors` - CORS middleware
- `dotenv` - Variables de entorno

## 🔑 Obtener Credenciales de Canva

1. Ve a [Canva Developers](https://www.canva.com/developers/)
2. Crea una nueva aplicación
3. Configura el Redirect URI: `http://localhost:3000/auth/callback`
4. Copia el Client ID y Client Secret
5. Configura los scopes necesarios

## 💻 Uso

### Iniciar el servidor:
```bash
npm start
```

### Desarrollo (con nodemon):
```bash
npm run dev
```

## 🔐 Flujo de Autenticación

1. **Iniciar login**: Visita `http://localhost:3000/auth/login`
2. **Autorizar**: Serás redirigido a Canva para autorizar
3. **Callback**: Canva te redirige a `/auth/callback` con los tokens
4. **Usar tokens**: Los tokens se guardan en la sesión

## 📡 Endpoints Disponibles

### Autenticación
- `GET /auth/login` - Inicia el flujo OAuth
- `GET /auth/callback` - Callback de OAuth
- `POST /auth/refresh` - Refresca el token
- `POST /auth/logout` - Cierra sesión

### Usuario
- `GET /api/canva/user/me` - Información del usuario actual

### Diseños
- `GET /api/canva/designs` - Lista diseños
- `GET /api/canva/designs/:designId` - Obtiene un diseño
- `POST /api/canva/designs` - Crea un diseño
- `POST /api/canva/designs/:designId/export` - Exporta un diseño

### Assets
- `GET /api/canva/assets` - Lista assets
- `POST /api/canva/assets` - Sube un asset

## 📝 Ejemplos de Uso

Consulta el archivo `examples/usage.example.js` para ver ejemplos completos de cómo usar la API.

### Ejemplo rápido:
```javascript
// Obtener información del usuario
const response = await axios.get('http://localhost:3000/api/canva/user/me', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

## 🛠️ Desarrollo

### Scripts disponibles:
```json
{
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## 📚 Recursos

- [Documentación oficial de Canva API](https://www.canva.com/developers/docs/)
- [OAuth 2.0 Flow](https://www.canva.com/developers/docs/authentication/)

## ⚠️ Notas Importantes

- Los tokens de acceso expiran después de un tiempo
- Usa el refresh token para obtener nuevos access tokens
- Nunca expongas tus credenciales (client secret)
- En producción, usa HTTPS

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, crea un pull request.

## 📄 Licencia

ISC
