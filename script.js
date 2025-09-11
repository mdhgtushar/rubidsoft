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

// Enhanced Services Grid with Category Filtering
class EnhancedServicesGrid {
    constructor() {
        this.grid = document.querySelector('.services-grid');
        this.cards = document.querySelectorAll('.service-card');
        this.categoryItems = document.querySelectorAll('.category-item');
        this.currentCategory = 'web-development';
        
        this.init();
    }
    
    init() {
        if (!this.grid) return;
        
        this.bindEvents();
        
        // Initialize card indices for animations
        this.cards.forEach((card, index) => {
            card.style.setProperty('--card-index', index);
        });
        
        // Show web development services by default
        this.filterByCategory('web-development');
    }
    
    bindEvents() {
        // Category filtering
        this.categoryItems.forEach(item => {
            item.addEventListener('click', () => this.handleCategoryFilter(item));
        });
        
        // Service card interactions
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleServiceClick(card, e);
            });
        });
    }
    
    handleCategoryFilter(selectedItem) {
        // Update active category
        this.categoryItems.forEach(item => item.classList.remove('active'));
        selectedItem.classList.add('active');

        const category = selectedItem.getAttribute('data-category');
        this.filterByCategory(category);
    }
    
    filterByCategory(category) {
        this.cards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    handleServiceClick(card, event) {
        // Add click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);

        // You can add more interaction logic here
        console.log('Service card clicked:', card.querySelector('h3').textContent);
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

// About Section Enhancer with animated counters
class AboutSectionEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupCounterAnimations();
        this.setupScrollAnimations();
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-item, .team-member, .ceo-card');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    animationObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(element);
        });
    }
}

// Services Sidebar Sticky Enhancement
class ServicesSidebarSticky {
    constructor() {
        this.sidebar = document.querySelector('.services-sidebar');
        this.init();
    }

    init() {
        if (!this.sidebar) return;
        
        this.setupStickyBehavior();
        this.setupSmoothScrolling();
        this.setupScrollIndicator();
    }

    setupStickyBehavior() {
        // Add smooth scroll behavior to the page
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Add scroll event listener for enhanced sticky behavior
        let ticking = false;
        
        const updateStickyState = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                this.sidebar.classList.add('sticky-active');
            } else {
                this.sidebar.classList.remove('sticky-active');
            }
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateStickyState);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    setupSmoothScrolling() {
        // Add smooth scrolling to category items
        const categoryItems = document.querySelectorAll('.category-item');
        
        categoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add active class with smooth transition
                categoryItems.forEach(cat => cat.classList.remove('active'));
                item.classList.add('active');
                
                // Smooth scroll to services section if not already visible
                const servicesSection = document.querySelector('.services-main');
                if (servicesSection) {
                    const rect = servicesSection.getBoundingClientRect();
                    if (rect.top > window.innerHeight || rect.bottom < 0) {
                        servicesSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    setupScrollIndicator() {
        // Add scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'sidebar-scroll-progress';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        
        // Add styles for progress bar
        const style = document.createElement('style');
        style.textContent = `
            .sidebar-scroll-progress {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(0,0,0,0.1);
                border-radius: 4px 4px 0 0;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(135deg, var(--blue-accent), #667eea);
                width: 0%;
                transition: width 0.3s ease;
            }
        `;
        document.head.appendChild(style);
        
        this.sidebar.appendChild(progressBar);
        
        // Update progress on scroll
        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            const progressFill = progressBar.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${Math.min(scrollPercent, 100)}%`;
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize carousel
        new Carousel();
        
        // Initialize enhanced services grid
        new EnhancedServicesGrid();
        
        // Initialize about section enhancer
        new AboutSectionEnhancer();
        
        // Initialize services sidebar sticky behavior
        new ServicesSidebarSticky();
        
        // Initialize other functionality
        initSmoothScrolling();
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
