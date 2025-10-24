// Script pour les interactions du site de l'Hôtel L'Alpinia

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation fluide vers les sections
    const navLinks = document.querySelectorAll('.nav-link'); 
    console.log(navLinks);
    console.log('navLinks');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Effet de parallaxe pour la section héro
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animation des cartes au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.feature-card, .room-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Effet de survol pour les boutons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Menu mobile (si nécessaire)
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        // Créer le bouton hamburger
        const hamburger = document.createElement('button');
        hamburger.innerHTML = '☰';
        hamburger.className = 'hamburger';
        hamburger.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        `;
        
        navbar.appendChild(hamburger);
        
        // Toggle du menu mobile
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Masquer le menu au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    };

    // Appliquer le menu mobile sur petits écrans
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            const hamburger = document.querySelector('.hamburger');
            if (!hamburger) {
                createMobileMenu();
            }
        }
    });

    // Effet de typing pour le titre principal
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.innerHTML = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    };

    // Appliquer l'effet de typing au titre (optionnel)
    const heroTitle = document.querySelector('.hero-text h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Désactiver l'effet de typing pour l'instant
        // typeWriter(heroTitle, originalText, 150);
    }

    // Ajouter des effets de particules en arrière-plan (optionnel)
    const createParticles = () => {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 215, 0, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            heroSection.appendChild(particle);
        }
    };

    // Ajouter l'animation CSS pour les particules
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #2c5530, #4a7c59);
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
            
            .hamburger {
                display: block !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Démarrer les particules
    createParticles();

    // Message de bienvenue dans la console
    console.log('🏨 Bienvenue sur le site de l\'Hôtel L\'Alpinia - Martinique');
    console.log('✨ Site développé avec amour pour votre établissement de luxe');
});

// Fonction utilitaire pour le débogage
function debug(message) {
    if (console && console.log) {
        console.log('🔍 Debug:', message);
    }
}

// Gestion des erreurs JavaScript
window.addEventListener('error', function(e) {
    console.error('❌ Erreur JavaScript:', e.error);
});

// Performance monitoring (basique)
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Site chargé en ${Math.round(loadTime)}ms`);
});




