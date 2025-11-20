// ==========================================
// NAVEGACIÓN STICKY Y SCROLL SUAVE
// ==========================================

// Obtener elementos del DOM
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav__link');
const navMenu = document.getElementById('navMenu');

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
// CARRUSEL DEL HERO
// ==========================================

const slides = document.querySelectorAll('.hero__slide');
let currentSlide = 0;

// Función para cambiar de slide
function changeSlide() {
    slides[currentSlide].classList.remove('hero__slide--active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('hero__slide--active');
}

// Iniciar el carrusel automático cada 5 segundos
setInterval(changeSlide, 5000);


// ==========================================
// ANIMACIÓN DE ENTRADA PARA ELEMENTOS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animación en tarjetas del about
const aboutCards = document.querySelectorAll('.about__card');
aboutCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Animación en items del portafolio
const portfolioItems = document.querySelectorAll('.portfolio__item');
portfolioItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});


// ==========================================
// EFECTO DE PARALLAX EN EL HERO
// ==========================================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSlides = document.querySelectorAll('.hero__slide');
    
    heroSlides.forEach(slide => {
        slide.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// ==========================================
// MENÚ HAMBURGUESA
// ==========================================

const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');

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


// ...existing code...

// ==========================================
// FILTRO DE PORTAFOLIO (mejorado, accesible y animado)
// ==========================================
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const portfolioItemsAll = Array.from(document.querySelectorAll('.portfolio__item'));
const portfolioContainer = document.querySelector('.portfolio__container');

// Duración de la animación en ms (coincidir con CSS)
const ANIM_DURATION = 280;

// Crear mensaje "no resultados"
let noResultsEl = document.querySelector('.portfolio__no-results');
if (!noResultsEl) {
    noResultsEl = document.createElement('div');
    noResultsEl.className = 'portfolio__no-results';
    noResultsEl.textContent = 'No se encontraron resultados para este filtro.';
    portfolioContainer.appendChild(noResultsEl);
}

function setActiveButton(btn) {
    filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
}

function showItem(item) {
    // mostrar con animación
    item.removeAttribute('aria-hidden');
    // forzar reflow para asegurar transición al quitar la clase
    void item.offsetWidth;
    item.classList.remove('hidden');
}

function hideItem(item) {
    // iniciar animación de salida
    if (item.classList.contains('hidden')) return;
    item.classList.add('hidden');
    // luego de la transición quitar del flujo
    setTimeout(() => {
        item.setAttribute('aria-hidden', 'true');
    }, ANIM_DURATION);
}

// ...existing code...

function applyFilter(filter) {
    const normalized = (filter || 'all').toString().trim().toLowerCase();

    const toShow = [];
    const toHide = [];

    portfolioItemsAll.forEach(item => {
        const raw = item.dataset.category || '';
        const categories = raw.split(/\s*,\s*|\s+/).map(c => c.trim().toLowerCase()).filter(Boolean);
        const matches = normalized === 'all' || categories.includes(normalized);

        if (matches) toShow.push(item);
        else toHide.push(item);
    });

    // 1) Iniciar ocultado de no-coincidentes
    toHide.forEach(hideItem);

    // 2) ESPERAR a que terminen las animaciones de salida, LUEGO mostrar los nuevos
    // Así evitamos que se vean superpuestos por un micro-segundo
    setTimeout(() => {
        toShow.forEach(showItem);

        // mostrar/ocultar mensaje de "no resultados"
        if (toShow.length === 0) {
            noResultsEl.classList.add('visible');
        } else {
            noResultsEl.classList.remove('visible');
        }
    }, ANIM_DURATION); // Esperar exactamente lo que dura la animación CSS
}

// ...existing code...

// Eventos para los botones (click + teclado)
filterButtons.forEach(btn => {
    // accesibilidad inicial
    if (!btn.hasAttribute('aria-pressed')) btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');

    btn.addEventListener('click', () => {
        setActiveButton(btn);
        const filter = btn.getAttribute('data-filter') || 'all';
        applyFilter(filter);

        // actualizar URL (sin recargar) para permitir compartir
        const url = new URL(location.href);
        url.searchParams.set('filter', filter);
        history.replaceState({}, '', url.toString());
    });

    // soporte teclado (Enter / Space)
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});

// Aplicar filtro inicial desde query string o hash
(function initFilterFromURL() {
    const params = new URLSearchParams(location.search);
    let initial = params.get('filter') || location.hash.replace('#', '') || null;

    if (initial) {
        // buscar botón correspondiente (coincidencia por data-filter)
        const targetBtn = filterButtons.find(b => (b.getAttribute('data-filter') || '').toLowerCase() === initial.toLowerCase());
        if (targetBtn) {
            setActiveButton(targetBtn);
            applyFilter(initial);
            return;
        }
    }

    // si no hay prefiltro válido, mostrar todo
    const activeBtn = filterButtons.find(b => b.classList.contains('active')) || filterButtons[0];
    if (activeBtn) {
        setActiveButton(activeBtn);
        applyFilter(activeBtn.getAttribute('data-filter') || 'all');
    } else {
        applyFilter('all');
    }
})();

// ...existing code...




// Estado inicial
header.classList.add('transparent');
window.addEventListener('scroll', handleNavbar);
