// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Hero section animations
const initHeroAnimations = () => {
    const heroContent = document.querySelector('.hero__content');
    if (!heroContent) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.from('.hero__title', {
        y: 50,
        opacity: 0,
        duration: 1
    })
    .from('.hero__subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, '-=0.5')
    .from('.cta-button', {
        y: 20,
        opacity: 0,
        duration: 0.6
    }, '-=0.3');
};

// Listing card animations
const initListingAnimations = () => {
    const cards = gsap.utils.toArray('.listing-card');
    cards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1
        });
    });
};

// Review card animations
const initReviewAnimations = () => {
    const reviews = gsap.utils.toArray('.review-card');
    reviews.forEach((review, i) => {
        gsap.from(review, {
            scrollTrigger: {
                trigger: review,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2
        });
    });
};

// Header scroll animation
const initHeaderAnimation = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    ScrollTrigger.create({
        start: 'top top',
        onUpdate: (self) => {
            if (self.direction === -1) {
                header.classList.remove('header-hidden');
            } else if (self.direction === 1 && self.progress > 0) {
                header.classList.add('header-hidden');
            }
        }
    });
};

// Gallery animations for listing detail page
const initGalleryAnimations = () => {
    const gallery = document.querySelector('.listing-gallery');
    if (!gallery) return;

    gsap.from('.main-image', {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    gsap.from('.thumbnail', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });
};

// Stats section animations
const initStatsAnimations = () => {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    // Animate section title and subtitle
    gsap.from('.stats-section .section-title', {
        scrollTrigger: {
            trigger: '.stats-section',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8
    });

    gsap.from('.stats-section .section-subtitle', {
        scrollTrigger: {
            trigger: '.stats-section',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
    });

    // Animate stat items
    const statItems = gsap.utils.toArray('.stat-item');
    statItems.forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: 0.2 + (i * 0.2)
        });
    });

    // Animate CTA button
    gsap.from('.stats-section .cta-button', {
        scrollTrigger: {
            trigger: '.stats-section',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.8
    });
};

// Utility function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Handle staggered list animations
function initializeListAnimations() {
    const listItems = document.querySelectorAll('.list-item');
    let delay = 0;

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, delay);
                delay += 100; // Stagger each item by 100ms
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1
    });

    listItems.forEach(item => observer.observe(item));
}

// Handle page transition animations
function pageTransition() {
    document.body.classList.add('page-transition');
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

// Handle skeleton loading states
function showSkeletonLoading(container) {
    const elements = container.querySelectorAll('[data-skeleton]');
    elements.forEach(element => {
        element.classList.add('skeleton-loading');
    });
}

function hideSkeletonLoading(container) {
    const elements = container.querySelectorAll('[data-skeleton]');
    elements.forEach(element => {
        element.classList.remove('skeleton-loading');
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initListingAnimations();
    initReviewAnimations();
    initHeaderAnimation();
    initGalleryAnimations();
    initializeListAnimations();
    initStatsAnimations(); // Add stats animations initialization
    pageTransition();

    // Add intersection observer for elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    fadeObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        fadeObserver.observe(element);
    });
});

// Reinitialize animations when new content is loaded
window.addEventListener('contentLoaded', () => {
    ScrollTrigger.refresh();
});

// Export functions for use in other modules
export {
    isInViewport,
    initializeListAnimations,
    pageTransition,
    showSkeletonLoading,
    hideSkeletonLoading
};