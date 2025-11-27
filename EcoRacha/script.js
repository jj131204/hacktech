document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    
    // URL simulada del backend. ¡DEBES CAMBIAR ESTA URL POR TU ENDPOINT REAL!
    const BACKEND_URL = '/api/register';
    
    // Elementos de las modales
    const successModal = document.getElementById('success-modal');
    const errorModal = document.getElementById('error-modal');
    const errorMessageElement = document.getElementById('error-message');
    const retryButton = document.getElementById('retry-button');

    // URL del chat de Telegram (ya definida en index.html, pero se incluye por si se necesita)
    const TELEGRAM_CHAT_URL = 'https://t.me/TU_BOT_AQUI';

    /**
     * Muestra la modal especificada.
     * @param {HTMLElement} modal - La modal a mostrar (successModal o errorModal).
     */
    const showModal = (modal) => {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
    };

    /**
     * Oculta la modal especificada.
     * @param {HTMLElement} modal - La modal a ocultar.
     */
    const hideModal = (modal) => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    };

    // 1. Manejar el envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Detener el envío tradicional del formulario
        
        // Deshabilitar el botón para evitar doble clic
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Recolectar datos del formulario
        const formData = new FormData(form);
        // Convertir FormData a un objeto JSON para enviar al backend
        const data = {};
        formData.forEach((value, key) => {
            // Se mapean los nombres de los campos a un formato estándar
            // Nota: Aquí se está usando el 'name' de los inputs como clave
            data[key] = value;
        });

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Asumimos que si la respuesta es 2xx, es éxito.
            if (response.ok) {
                // Registro OK
                showModal(successModal);
                
            } else {
                // Registro fallido (ej. 400 Bad Request)
                
                // Intentar obtener el mensaje de error del cuerpo de la respuesta
                let errorData;
                try {
                    errorData = await response.json();
                } catch (jsonError) {
                    // Si el cuerpo no es JSON, usar el estado de la respuesta
                    errorData = { message: `Error del servidor: Código ${response.status}.` };
                }

                // Mostrar el mensaje de error
                const errorMsg = errorData.message || 'Error desconocido. Inténtalo más tarde.';
                errorMessageElement.textContent = errorMsg;
                showModal(errorModal);
            }

        } catch (networkError) {
            // Error de red (el servidor no responde, conexión perdida, etc.)
            errorMessageElement.textContent = `Error de conexión: No se pudo contactar al servidor. Revisa tu conexión a internet.`;
            showModal(errorModal);
            
        } finally {
            // Restablecer el botón de envío
            submitButton.disabled = false;
            submitButton.textContent = 'Generar Usuario y Clave de Acceso';
        }
    });

    // 2. Manejar el cierre de las modales
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            hideModal(e.target.closest('.modal'));
        });
    });

    // 3. Manejar el botón "Intentar de nuevo" en la modal de error
    retryButton.addEventListener('click', () => {
        hideModal(errorModal);
        // Opcional: enfocar de nuevo el primer campo del formulario para facilitar el reintento
        form.querySelector('input, select').focus(); 
    });

    // 4. Cierre de modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            hideModal(successModal);
        }
        if (e.target === errorModal) {
            hideModal(errorModal);
        }
    });
});