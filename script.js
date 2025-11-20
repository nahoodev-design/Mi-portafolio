
        document.addEventListener('DOMContentLoaded', function() {

// ==========================================
// NAVEGACIÓN STICKY Y SCROLL SUAVE
// ==========================================

// Obtener elementos del DOM
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav__link');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');

// Scroll suave para los enlaces de navegación
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// MENÚ HAMBURGUESA
// ==========================================

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    navOverlay.classList.toggle('visible');
    document.body.classList.toggle('no-scroll');
});

// Cerrar menú al tocar overlay
navOverlay.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('visible');
    document.body.classList.remove('no-scroll');
});

// Cerrar menú al hacer click en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        navOverlay.classList.remove('visible');
        document.body.classList.remove('no-scroll');
    });
});

// ==========================================
// NAVBAR COMPORTAMIENTO PERSONALIZADO
// ==========================================

let lastScrollY = window.scrollY;
let showTimeout;

function handleNavbar() {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    // Usamos hero.offsetHeight o un fallback de 500px
    const heroHeight = hero ? hero.offsetHeight : 500;

    // ------------------------------------------------
    // ZONA HERO (Inicio de la página)
    // ------------------------------------------------
    
    // Si estamos dentro del Hero (menos de su altura),
    // SIEMPRE mostramos el navbar y cancelamos cualquier temporizador pendiente.
    if (scrollY < heroHeight) {
        clearTimeout(showTimeout); // IMPORTANTE: Cancela el auto-ocultar

        // 1. Estado: Totalmente arriba (Transparente)
        if (scrollY < 50) {
            header.classList.add('transparent');
            header.classList.remove('scrolled', 'hide');
        } 
        // 2. Estado: Bajando un poco pero en Hero (Fondo oscuro/blur)
        else {
            header.classList.add('scrolled');
            header.classList.remove('transparent', 'hide');
        }

        lastScrollY = scrollY;
        return; // Salimos de la función aquí, no ejecutamos lógica de ocultar
    }

    // ------------------------------------------------
    // ZONA POST-HERO (Resto de la página)
    // ------------------------------------------------

    // 3. Si el menú hamburguesa está abierto → NO hacer nada/No ocultar
    if (navMenu.classList.contains('open')) {
        header.classList.remove('hide');
        lastScrollY = scrollY;
        return;
    }

    // 4. Lógica de Scroll (Subir/Bajar)
    
    // BAJANDO: Ocultar navbar
    if (scrollY > lastScrollY) {
        header.classList.add('hide');
        clearTimeout(showTimeout); // Limpiamos timeout para que no interfiera
    }
    // SUBIENDO: Mostrar navbar temporalmente
    else {
        const scrollUpAmount = lastScrollY - scrollY;

        // Solo mostrar si el usuario sube con intención (> 10px para ser más reactivo)
        if (scrollUpAmount > 10) { 
            header.classList.remove('hide');

            // Reiniciar el contador de 3 segundos
            clearTimeout(showTimeout);
            showTimeout = setTimeout(() => {
                // Doble chequeo: Solo ocultar si NO estamos en el Hero y el menú está cerrado
                if (window.scrollY >= heroHeight && !navMenu.classList.contains('open')) {
                    header.classList.add('hide');
                }
            }, 3000);
        }
    }

    lastScrollY = scrollY;
}

// Estado inicial
header.classList.add('transparent');
window.addEventListener('scroll', handleNavbar);



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

            
            // --- 3. Lógica del Texto Dinámico (Header) ---
    const dynamicTexts = [
        { 
            title: "¿Sabías que...?", 
            text: "Los girasoles necesitan más de 6 horas al día para crecer totalmente fuertes y sanos. Sí, no tiene nada que ver con programación, pero nunca viene mal saber de algo nuevo." 
        },
        { 
            title: "Dato de Rendimiento", 
            text: "Cuando una web carga rápido, los usuarios confían más y permanecen más tiempo. Por eso la velocidad es una de las claves principales en cualquier proyecto."
        },
        { 
            title: "Mobile First", 
            text: "La mayoría de las personas navegan desde el celular, por eso una web que se adapta bien a pantallas pequeñas ofrece una experiencia mucho más cómoda."
        },
        {
            title: "Seguridad Web",
            text: "Los sitios con certificado SSL generan mucha más confianza en los visitantes. Es un detalle pequeño, pero marca una gran diferencia."
        },
        {
            title: "Visibilidad Online",
            text: "Google suele favorecer las páginas bien estructuradas y rápidas. Un buen SEO técnico puede mejorar tu presencia sin publicidad."
        }
    ];

    const boxTitle = document.getElementById('dynamic-title');
    const boxText = document.getElementById('dynamic-text');
    let currentTextIndex = 0;

    // Función para cambiar el texto con efecto fade
    function changeDynamicText() {
        // 1. Desvanecer (Fade out)
        boxTitle.style.opacity = '0';
        boxText.style.opacity = '0';

        setTimeout(() => {
            // 2. Cambiar el contenido (mientras está invisible)
            currentTextIndex = (currentTextIndex + 1) % dynamicTexts.length;
            boxTitle.textContent = dynamicTexts[currentTextIndex].title;
            boxText.textContent = dynamicTexts[currentTextIndex].text;

            // 3. Reaparecer (Fade in)
            boxTitle.style.opacity = '1';
            boxText.style.opacity = '1';
        }, 500); // Espera 0.5s (lo que dura la transición CSS)
    }

    // Iniciar el ciclo cada 8 segundos
    setInterval(changeDynamicText, 8000);

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
