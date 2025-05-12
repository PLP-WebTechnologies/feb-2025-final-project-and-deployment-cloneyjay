// Initialize Feather Icons
feather.replace();

// Load featured listings
const loadFeaturedListings = () => {
    const carousel = document.querySelector('.listings__carousel');
    if (!carousel) return;

    // Take first 3 listings as featured
    const featuredListings = listings.slice(0, 3);
    
    featuredListings.forEach(listing => {
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.innerHTML = `
            <div class="listing-image">
                <img src="${listing.image}" alt="${listing.title}">
                <span class="listing-badge">${listing.bedrooms} Bedroom</span>
                <button class="watchlist-btn ${auth.isInWatchlist(listing.id) ? 'active' : ''}" data-listing-id="${listing.id}">
                    <i data-feather="heart"></i>
                </button>
            </div>
            <div class="listing-content">
                <div class="listing-price">
                    KSH ${listing.price.toLocaleString()} <span>/${listing.priceUnit}</span>
                </div>
                <h3>${listing.title}</h3>
                <div class="listing-location">
                    <i data-feather="map-pin"></i>
                    ${listing.location}
                </div>
                <div class="listing-amenities">
                    ${listing.amenities.slice(0, 3).map(amenity => `
                        <span class="amenity-item">
                            <i data-feather="${amenity.icon}"></i>
                            ${amenity.name}
                        </span>
                    `).join('')}
                </div>
            </div>
        `;

        // Add click event to view listing details
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.watchlist-btn')) {
                window.location.href = `listing-detail.html?id=${listing.id}`;
            }
        });

        // Add watchlist button functionality
        const watchlistBtn = card.querySelector('.watchlist-btn');
        watchlistBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            auth.toggleWatchlist(listing.id);
        });

        carousel.appendChild(card);
    });

    // Initialize Feather Icons for the new content
    feather.replace();
};

// Load reviews
const loadReviews = () => {
    const reviewsGrid = document.querySelector('.reviews__grid');
    if (!reviewsGrid) return;

    // Collect all reviews from listings
    const allReviews = listings.reduce((acc, listing) => {
        return acc.concat(listing.reviews.map(review => ({
            ...review,
            listing: {
                title: listing.title,
                id: listing.id
            }
        })));
    }, []);

    // Show first 3 reviews
    allReviews.slice(0, 3).forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <img src="${review.avatar}" alt="${review.name}" class="avatar">
                <div class="review-meta">
                    <h4>${review.name}</h4>
                    <div class="star-rating">
                        ${Array(5).fill().map((_, i) => 
                            `<i class="star" data-feather="star" 
                             ${i < review.rating ? 'fill="gold"' : ''}></i>`
                        ).join('')}
                    </div>
                </div>
            </div>
            <p class="review-text">${review.text}</p>
            <a href="listing-detail.html?id=${review.listing.id}" class="review-listing-link">
                <i data-feather="home"></i>
                ${review.listing.title}
            </a>
        `;
        reviewsGrid.appendChild(reviewCard);
    });

    // Handle load more button
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        if (allReviews.length <= 3) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.addEventListener('click', () => {
                // Load next 3 reviews
                const currentCount = reviewsGrid.children.length;
                allReviews.slice(currentCount, currentCount + 3).forEach(review => {
                    const reviewCard = document.createElement('div');
                    reviewCard.className = 'review-card';
                    reviewCard.innerHTML = `
                        <div class="review-header">
                            <img src="${review.avatar}" alt="${review.name}" class="avatar">
                            <div class="review-meta">
                                <h4>${review.name}</h4>
                                <div class="star-rating">
                                    ${Array(5).fill().map((_, i) => 
                                        `<i class="star" data-feather="star" 
                                         ${i < review.rating ? 'fill="gold"' : ''}></i>`
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                        <p class="review-text">${review.text}</p>
                        <a href="listing-detail.html?id=${review.listing.id}" class="review-listing-link">
                            <i data-feather="home"></i>
                            ${review.listing.title}
                        </a>
                    `;
                    reviewsGrid.appendChild(reviewCard);
                });

                // Hide button if no more reviews
                if (reviewsGrid.children.length >= allReviews.length) {
                    loadMoreBtn.style.display = 'none';
                }

                // Initialize Feather Icons for new content
                feather.replace();
            });
        }
    }

    // Initialize Feather Icons for the initial content
    feather.replace();
};

// Initialize stats section with animations
const initStatsSection = () => {
    const statsItems = document.querySelectorAll('.stat-number');
    if (!statsItems.length) return;

    // Animate numbers when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateNumber(target, finalValue);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statsItems.forEach(item => observer.observe(item));
};

// Animate numbers function
const animateNumber = (element, final) => {
    let current = 0;
    const duration = 2000; // 2 seconds
    const step = final / (duration / 16); // 60fps

    const animate = () => {
        current += step;
        if (current >= final) {
            element.textContent = final;
        } else {
            element.textContent = Math.floor(current);
            requestAnimationFrame(animate);
        }
    };
    animate();
};

// Back to top functionality
const initBackToTop = () => {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    // Show button when user scrolls down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Mobile menu toggle
const initMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (!menuToggle || !navList) return;

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        // Animate hamburger to X
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize map with listings data if we're on the homepage
    const mapElement = document.getElementById('map');
    if (mapElement && window.listings) {
        setTimeout(() => {
            const mapInstance = initMap(listings);
            // Force Leaflet to recalculate map size in case container was hidden or sized late
            if (mapInstance && mapInstance.invalidateSize) {
                mapInstance.invalidateSize();
                setTimeout(() => mapInstance.invalidateSize(), 300);
            }
        }, 100);
    }
    
    loadFeaturedListings();
    loadReviews();
    initBackToTop();
    initMobileMenu();
    initStatsSection();
    
    // Initialize Feather icons after dynamic content is loaded
    feather.replace();
});