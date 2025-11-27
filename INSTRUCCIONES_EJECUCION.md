# 🚀 Guía de Ejecución - Integración Canva

## ⚠️ PROBLEMA: Políticas de Ejecución de PowerShell

PowerShell está bloqueando la ejecución de npm. Aquí están las soluciones:

---

## ✅ SOLUCIÓN 1: Usar Command Prompt (CMD) - MÁS FÁCIL

1. **Abre Command Prompt (CMD)** como Administrador:
   - Presiona `Win + R`
   - Escribe `cmd`
   - Presiona `Ctrl + Shift + Enter` (para abrir como Admin)

2. **Navega a tu proyecto**:
   ```cmd
   cd "C:\Users\CIE PC 02\Documents\hacteck\hacktech"
   ```

3. **Instala las dependencias**:
   ```cmd
   npm install
   ```

4. **Inicia el servidor**:
   ```cmd
   npm start
   ```

---

## ✅ SOLUCIÓN 2: Cambiar política de PowerShell (requiere Admin)

1. **Abre PowerShell como Administrador**:
   - Click derecho en el menú Inicio
   - Selecciona "Windows PowerShell (Administrador)"

2. **Cambia la política de ejecución**:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   - Presiona `S` para aceptar

3. **Ahora puedes usar npm normalmente**:
   ```powershell
   cd "C:\Users\CIE PC 02\Documents\hacteck\hacktech"
   npm install
   npm start
   ```

---

## 📋 Pasos para Probar la Integración con Canva

### 1️⃣ Obtener Credenciales de Canva

1. **Ve a**: https://www.canva.com/developers/
2. **Inicia sesión** con tu cuenta de Canva
3. **Crea una nueva aplicación**:
   - Click en "Create an app"
   - Nombre: "Mi Integración Hacktech"
   - Descripción: "Proyecto de integración con Canva API"

4. **Configura el Redirect URI**:
   ```
   http://localhost:3000/auth/callback
   ```

5. **Selecciona los scopes** (permisos):
   - ✅ design:content:read
   - ✅ design:content:write
   - ✅ design:meta:read
   - ✅ asset:read
   - ✅ asset:write

6. **Copia tus credenciales**:
   - `Client ID`
   - `Client Secret`

### 2️⃣ Configurar el archivo .env

Abre el archivo `.env` y actualiza con tus credenciales reales:

```env
# Canva API Configuration
CANVA_CLIENT_ID=TU_CLIENT_ID_AQUI
CANVA_CLIENT_SECRET=TU_CLIENT_SECRET_AQUI
CANVA_REDIRECT_URI=http://localhost:3000/auth/callback

# Server Configuration
PORT=3000
NODE_ENV=development

# Session Secret (ya configurado)
SESSION_SECRET=d4ea51f8d87a8250afab523487bf923570a8b9c977ecc525aa50da86e1c8a264b
```

### 3️⃣ Instalar Dependencias

```bash
npm install
```

Esto instalará:
- express
- axios
- express-session
- cors
- dotenv
- nodemon (para desarrollo)

### 4️⃣ Iniciar el Servidor

**Modo Producción:**
```bash
npm start
```

**Modo Desarrollo (con auto-reload):**
```bash
npm run dev
```

Deberías ver:
```
🚀 Server running on http://localhost:3000
📝 Environment: development

🔐 Authentication endpoints:
   - Login: http://localhost:3000/auth/login
   - Callback: http://localhost:3000/auth/callback

🎨 Canva API endpoints:
   - User Info: http://localhost:3000/api/canva/user/me
   - Designs: http://localhost:3000/api/canva/designs
   - Assets: http://localhost:3000/api/canva/assets
```

---

## 🧪 Probar la Integración

### PASO 1: Autenticación

1. **Abre tu navegador** y ve a:
   ```
   http://localhost:3000/auth/login
   ```

2. **Serás redirigido a Canva** para autorizar la aplicación

3. **Autoriza la aplicación** - Click en "Autorizar"

4. **Serás redirigido de vuelta** a:
   ```
   http://localhost:3000/auth/callback
   ```

5. **Recibirás una respuesta JSON** con tus tokens:
   ```json
   {
     "success": true,
     "message": "Authentication successful",
     "tokens": {
       "accessToken": "tu_access_token_aqui...",
       "expiresIn": 3600
     }
   }
   ```

6. **COPIA el accessToken** - Lo necesitarás para las siguientes pruebas

### PASO 2: Probar Endpoints con el Navegador o Postman

#### Opción A: Usando el Navegador (para GET requests)

Las peticiones GET las puedes probar directamente en el navegador, pero necesitas estar autenticado en la sesión.

#### Opción B: Usando Postman/Thunder Client (RECOMENDADO)

1. **Instala Postman** (https://www.postman.com/) o usa Thunder Client en VSCode

2. **Obtener información del usuario**:
   - Método: `GET`
   - URL: `http://localhost:3000/api/canva/user/me`
   - Headers:
     ```
     Authorization: Bearer TU_ACCESS_TOKEN_AQUI
     ```

3. **Listar diseños**:
   - Método: `GET`
   - URL: `http://localhost:3000/api/canva/designs`
   - Headers:
     ```
     Authorization: Bearer TU_ACCESS_TOKEN_AQUI
     ```

4. **Crear un diseño**:
   - Método: `POST`
   - URL: `http://localhost:3000/api/canva/designs`
   - Headers:
     ```
     Authorization: Bearer TU_ACCESS_TOKEN_AQUI
     Content-Type: application/json
     ```
   - Body (JSON):
     ```json
     {
       "asset_type": "design",
       "title": "Mi Primer Diseño desde API",
       "width": 1920,
       "height": 1080
     }
     ```

5. **Listar assets**:
   - Método: `GET`
   - URL: `http://localhost:3000/api/canva/assets`
   - Headers:
     ```
     Authorization: Bearer TU_ACCESS_TOKEN_AQUI
     ```

### PASO 3: Usar los Ejemplos Programáticos

1. **Edita el archivo** `examples/usage.example.js`

2. **Reemplaza** `TU_ACCESS_TOKEN_AQUI` con tu token real (línea 143)

3. **Ejecuta los ejemplos**:
   ```bash
   node examples/usage.example.js
   ```

---

## 📝 Endpoints Disponibles

### Autenticación
- `GET /auth/login` - Inicia OAuth
- `GET /auth/callback` - Recibe tokens
- `POST /auth/refresh` - Refresca token
- `POST /auth/logout` - Cierra sesión

### Usuario
- `GET /api/canva/user/me` - Info del usuario

### Diseños
- `GET /api/canva/designs` - Lista diseños
- `GET /api/canva/designs/:designId` - Obtiene diseño
- `POST /api/canva/designs` - Crea diseño
- `POST /api/canva/designs/:designId/export` - Exporta diseño

### Assets
- `GET /api/canva/assets` - Lista assets
- `POST /api/canva/assets` - Sube asset

---

## 🐛 Solución de Problemas

### Error: "Not authenticated"
- Asegúrate de incluir el header `Authorization: Bearer TOKEN`
- Verifica que el token no haya expirado

### Error: "Failed to obtain access token"
- Verifica tus credenciales en `.env`
- Asegúrate de que el Redirect URI coincida exactamente

### Error: Puerto en uso
- Cambia el puerto en `.env`: `PORT=3001`

### El servidor no inicia
- Verifica que todas las dependencias estén instaladas: `npm install`
- Revisa el archivo `.env` - debe existir y tener las credenciales

---

## 🎉 ¡Listo!

Una vez que sigas estos pasos, tendrás tu integración con Canva funcionando.

**¿Necesitas ayuda?** Revisa:
- Documentación de Canva: https://www.canva.com/developers/docs/
- README.md del proyecto
- Ejemplos en `examples/usage.example.js`
