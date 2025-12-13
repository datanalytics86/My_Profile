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

// ===== PROFESSIONAL TITLES - BILINGUAL =====
const titlesES = [
    'Ingeniero Químico',
    'Líder de Planificación',
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

// ===== SIMPLE TITLE ROTATION (No typing effect - more executive) =====
function rotateTitles() {
    if (!typingText) return;

    // Fade out
    typingText.style.opacity = '0';

    setTimeout(() => {
        titleIndex = (titleIndex + 1) % titles.length;
        typingText.textContent = titles[titleIndex];
        // Fade in
        typingText.style.opacity = '1';
    }, 400);
}

function initTitleRotation() {
    if (!typingText) return;

    // Set initial title
    typingText.textContent = titles[0];
    typingText.style.transition = 'opacity 0.4s ease';

    // Rotate every 4 seconds
    setInterval(rotateTitles, 4000);
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

    // Update current title immediately
    if (typingText) {
        typingText.textContent = titles[titleIndex];
    }

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

// ===== STAT COUNTER - SIMPLE (No animation for executive look) =====
function displayStatNumbers() {
    statNumbers.forEach(stat => {
        if (!stat.classList.contains('displayed')) {
            stat.classList.add('displayed');
            const target = parseInt(stat.getAttribute('data-target'));
            const suffix = stat.getAttribute('data-suffix') || '';
            stat.textContent = target + suffix;
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
    const sentText = currentLang === 'es' ? 'Mensaje Enviado' : 'Message Sent';

    submitBtn.innerHTML = sendingText;
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = sentText;
        submitBtn.style.background = '#10b981';

        contactForm.reset();

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);

    console.log('Form data:', data);
}

// ===== INTERSECTION OBSERVER FOR SUBTLE FADE-IN =====
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars when skills section is visible
                if (entry.target.closest('.habilidades')) {
                    animateSkillBars();
                }

                // Display stat numbers when about section is visible
                if (entry.target.closest('.sobre-mi')) {
                    displayStatNumbers();
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

    // Start title rotation (replaces typing effect)
    initTitleRotation();

    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize intersection observer for fade-in effects
    initIntersectionObserver();

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

// ===== ON LOAD =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Initialize skill bars and stats after short delay
    setTimeout(() => {
        animateSkillBars();
        displayStatNumbers();
    }, 300);
});
