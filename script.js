// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const typingText = document.getElementById('typing-text');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');
const skillItems = document.querySelectorAll('.skill-item');
const statNumbers = document.querySelectorAll('.stat-number');
const langToggle = document.getElementById('lang-toggle');

// ===== LANGUAGE STATE =====
let currentLang = 'es';

// ===== TYPING EFFECT - BILINGUAL =====
const titlesES = [
    'Ingeniero Quimico',
    'Lider de Planificacion',
    'Especialista en Control de Proyectos',
    'Experto en Power BI & SAP'
];

const titlesEN = [
    'Chemical Engineer',
    'Planning Lead',
    'Project Control Specialist',
    'Power BI & SAP Expert'
];

let titles = titlesES;
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// ===== LANGUAGE TOGGLE =====
function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';

    // Update toggle button
    const langFlag = langToggle.querySelector('.lang-flag');
    const langText = langToggle.querySelector('.lang-text');

    if (currentLang === 'en') {
        langFlag.textContent = '🇺🇸';
        langText.textContent = 'EN';
        titles = titlesEN;
    } else {
        langFlag.textContent = '🇪🇸';
        langText.textContent = 'ES';
        titles = titlesES;
    }

    // Update all translatable elements
    updatePageLanguage();

    // Reset typing effect to show new language
    titleIndex = 0;
    charIndex = 0;
    isDeleting = false;

    // Save preference
    localStorage.setItem('preferredLang', currentLang);
}

function updatePageLanguage() {
    // Update all elements with data-es and data-en attributes
    const translatableElements = document.querySelectorAll('[data-es][data-en]');

    translatableElements.forEach(element => {
        const text = element.getAttribute(`data-${currentLang}`);
        if (text) {
            element.textContent = text;
        }
    });

    // Update placeholders for form inputs
    const inputsWithPlaceholders = document.querySelectorAll('[data-placeholder-es][data-placeholder-en]');

    inputsWithPlaceholders.forEach(input => {
        const placeholder = input.getAttribute(`data-placeholder-${currentLang}`);
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

function loadSavedLanguage() {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && savedLang !== currentLang) {
        toggleLanguage();
    }
}

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== MOBILE MENU TOGGLE =====
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// ===== CLOSE MOBILE MENU ON LINK CLICK =====
function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

// ===== BACK TO TOP BUTTON =====
function handleBackToTop() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== PROJECT FILTER =====
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
    skillItems.forEach(item => {
        const skillLevel = item.getAttribute('data-skill');
        const progressBar = item.querySelector('.skill-progress');

        if (progressBar && isElementInViewport(item)) {
            progressBar.style.width = `${skillLevel}%`;
        }
    });
}

// ===== STAT COUNTER ANIMATION =====
function animateStatNumbers() {
    statNumbers.forEach(stat => {
        if (isElementInViewport(stat) && !stat.classList.contains('animated')) {
            stat.classList.add('animated');
            const target = parseInt(stat.getAttribute('data-target'));
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + suffix;
                }
            };

            updateCounter();
        }
    });
}

// ===== FADE IN ON SCROLL =====
function handleFadeInElements() {
    const fadeElements = document.querySelectorAll('.timeline-item, .project-card, .skill-item, .education-item, .certification-item');

    fadeElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// ===== UTILITY: CHECK IF ELEMENT IS IN VIEWPORT =====
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                closeMobileMenu();
            }
        });
    });
}

// ===== CONTACT FORM HANDLING =====
function handleContactForm(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;

    const sendingText = currentLang === 'es' ? 'Enviando...' : 'Sending...';
    const sentText = currentLang === 'es' ? 'Mensaje Enviado!' : 'Message Sent!';

    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${sendingText}`;
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = `<i class="fas fa-check"></i> ${sentText}`;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        contactForm.reset();

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);

    console.log('Form data:', data);
}

// ===== PARTICLES BACKGROUND =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== THEME TOGGLE (BONUS) =====
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.closest('.habilidades')) {
                    animateSkillBars();
                }

                if (entry.target.closest('.sobre-mi')) {
                    animateStatNumbers();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .project-card, .skills-category, .education-item, .certification-item, .sobre-mi-stats').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ===== INITIALIZE =====
function init() {
    // Load saved language preference
    loadSavedLanguage();

    // Start typing effect
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }

    // Create particles
    createParticles();

    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize intersection observer
    initIntersectionObserver();

    // Initialize theme
    initThemeToggle();

    // Initialize keyboard navigation
    initKeyboardNavigation();

    // Event Listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleBackToTop();
        updateActiveNavLink();
    });

    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }

    // Language toggle
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(btn.getAttribute('data-filter'));
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Initial calls
    handleNavbarScroll();
    handleBackToTop();
    updateActiveNavLink();
}

// ===== RUN ON DOM READY =====
document.addEventListener('DOMContentLoaded', init);

// ===== PRELOADER (OPTIONAL) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    setTimeout(() => {
        animateSkillBars();
        animateStatNumbers();
    }, 500);
});
