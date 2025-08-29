// Carousel Functionality
class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.bindEvents();
        this.startAutoPlay();
        this.updateIndicators();
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause autoplay on hover
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    goToSlide(index) {
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.remove('active');
        }
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.remove('active');
        }
        
        this.currentSlide = index;
        
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.add('active');
        }
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.add('active');
        }
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    updateIndicators() {
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.add('active');
        }
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.add('active');
        }
    }
}

// Technology Carousel Infinite Scroll
function initTechCarousel() {
    const track = document.querySelector('.tech-carousel-track');
    if (!track) return;
    
    // Clone cards for infinite effect
    const cards = track.querySelectorAll('.tech-card');
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Reset animation when it completes
    track.addEventListener('animationend', () => {
        track.style.animation = 'none';
        track.offsetHeight; // Trigger reflow
        track.style.animation = 'slideTech 30s linear infinite';
    });
}

// Services Carousel Navigation
function initServicesCarousel() {
    const prevBtn = document.querySelector('.prev-service');
    const nextBtn = document.querySelector('.next-service');
    const carousel = document.querySelector('.services-carousel');
    
    if (prevBtn && nextBtn && carousel) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -350,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: 350,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('.header');
    
    if (!header) return;
    
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
                
                // Update active navigation
                updateActiveNavigation(targetId);
            }
        });
    });
}

// Update Active Navigation
function updateActiveNavigation(activeId) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
}

// Scroll Spy for Navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('.header');
    
    if (!header || sections.length === 0) return;
    
    const headerHeight = header.offsetHeight;
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + headerHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNavigation(`#${sectionId}`);
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const sidebarOverlay = document.querySelector('.mobile-sidebar-overlay');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    if (mobileToggle && mobileSidebar) {
        // Open sidebar
        mobileToggle.addEventListener('click', () => {
            mobileSidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent body scroll
        });
        
        // Close sidebar with close button
        if (sidebarClose) {
            sidebarClose.addEventListener('click', closeSidebar);
        }
        
        // Close sidebar with overlay click
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeSidebar);
        }
        
        // Close sidebar when clicking on links
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(closeSidebar, 300); // Small delay for smooth transition
            });
        });
        
        // Close sidebar with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
    }
    
    function closeSidebar() {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scroll
    }
}

// Form Handling
function initForms() {
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your server
    console.log('Contact form submitted:', data);
    
    // Show success message
    showNotification('Thank you! Your message has been sent successfully.', 'success');
    e.target.reset();
}

function handleNewsletterForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    // Here you would typically send the email to your server
    console.log('Newsletter subscription:', email);
    
    // Show success message
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    e.target.reset();
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#28A745';
            break;
        case 'error':
            notification.style.backgroundColor = '#DC3545';
            break;
        default:
            notification.style.backgroundColor = '#007BFF';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .tech-item, .contact-item');
    animateElements.forEach(el => observer.observe(el));
}

// Add CSS for animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .tech-item, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .service-card.animate-in, .tech-item.animate-in, .contact-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .mobile-menu-toggle.active i {
            transform: rotate(90deg);
        }
        
        .mobile-menu-toggle i {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Back to Top Button Functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show button after scrolling down 300px
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', toggleBackToTop);
    
    // Initial check
    toggleBackToTop();
}

// Performance optimization: Lazy load images if any are added later
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add interactive hover effects
function initInteractiveEffects() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize carousel
        new Carousel();
        
        // Initialize other functionality
        initSmoothScrolling();
        initServicesCarousel();
        initTechCarousel();
        initScrollSpy();
        initMobileMenu();
        initForms();
        initAnimations();
        addAnimationStyles();
        initBackToTop();
        lazyLoadImages();
        initInteractiveEffects();
        
        // Add fade-in animation to elements
        document.querySelectorAll('.service-card, .tech-item, .contact-item').forEach(el => {
            el.classList.add('fade-in');
        });
        
        console.log('Website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    .fade-in {
        opacity: 0;
        animation: fadeIn 0.6s ease forwards;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(loadingStyle);
