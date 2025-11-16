

        document.addEventListener('DOMContentLoaded', function() {

            // --- 1. Lógica del Navbar ---
            const nav = document.querySelector('.navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });

            // --- 2. Animaciones de Iconos en el Header ---
            const icons = document.querySelectorAll('.features-list i');
            let index = 0;

            setInterval(() => {
            icons.forEach((icon, i) => {
                icon.style.transform = i === index ? 'scale(1.25)' : 'scale(1)';
                icon.style.transition = 'transform 0.4s ease';
            });
            index = (index + 1) % icons.length;
            }, 750);

            // --- 2. Lógica del Menú Hamburguesa ---
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            const navLinks = document.querySelectorAll('.nav-link');

            function toggleMenu() {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active'); // ← Cambia esto
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }

            hamburger.addEventListener('click', toggleMenu);

            // Cerrar menú al hacer clic en un enlace
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navMenu.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            });
            
            // --- 4. Lógica del Título Rotativo (Sección 2) ---

            // --- 5. Lógica del Carrusel (Sección 4) ---

            // --- 6. Lógica del Formulario de Contacto (Sección 5) (EmailJS) ---

            // Inicializar EmailJS con tu Public Key
            emailjs.init('nLGeVW3xQINVv-6Im');

            // Capturar el formulario
            const contactForm = document.getElementById('contact-form');

            if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault(); // Evita que la página recargue
                
                // Obtener el botón de enviar
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                
                // Cambiar texto del botón mientras envía
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                // Enviar el formulario usando EmailJS
                emailjs.sendForm(
                'service_huux7as',      // Tu Service ID
                'template_iiwqhbg',     // Tu Template ID
                this                    // El formulario (this)
                )
                .then(function(response) {
                // ✅ ÉXITO
                console.log('SUCCESS!', response.status, response.text);
                
                // Mostrar mensaje de éxito
                showFormStatusMessage('¡Mensaje enviado con éxito!', 'success');
                
                // Limpiar el formulario
                contactForm.reset();
                
                // Restaurar botón
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                }, function(error) {
                // ❌ ERROR
                console.log('FAILED...', error);
                
                // Mostrar mensaje de error
                showFormStatusMessage('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
                
                // Restaurar botón
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                });
            });
            }

            // Función para mostrar mensajes de estado
            function showFormStatusMessage(message, type) {
            let statusMessage = document.querySelector('.form-status-message');
            if (!statusMessage) {
                statusMessage = document.createElement('div');
                statusMessage.className = 'form-status-message';
                document.body.appendChild(statusMessage);
            }
            
            statusMessage.textContent = message;
            statusMessage.style.backgroundColor = (type === 'success') ? '#25D366' : '#E74C3C';
            
            // Mostrar y ocultar
            setTimeout(() => statusMessage.classList.add('show'), 10);
            setTimeout(() => {
                statusMessage.classList.remove('show');
            }, 4000);
            }

            // --- 7. Lógica del Footer (Año Actual) ---
            document.getElementById('current-year').textContent = new Date().getFullYear();

        });