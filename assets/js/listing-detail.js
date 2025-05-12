// Initialize Feather Icons
feather.replace();

// Get listing ID from URL
const getListingId = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

// Load listing details
const loadListingDetails = () => {
    const id = getListingId();
    if (!id) {
        window.location.href = '404.html';
        return;
    }

    const listing = listings.find(l => l.id === id);
    if (!listing) {
        window.location.href = '404.html';
        return;
    }

    // Update page title
    document.title = `${listing.title} | StudyStay`;

    // Update listing header
    document.getElementById('listing-title').textContent = listing.title;
    document.getElementById('listing-location').textContent = listing.location;
    document.getElementById('listing-price').innerHTML = 
        `KSH ${listing.price.toLocaleString()} <span>/${listing.priceUnit}</span>`;

    // Add watchlist button to header
    const listingHeader = document.querySelector('.listing-header');
    const watchlistBtn = document.createElement('button');
    watchlistBtn.className = `watchlist-btn ${auth.isInWatchlist(listing.id) ? 'active' : ''}`;
    watchlistBtn.dataset.listingId = listing.id;
    watchlistBtn.innerHTML = `<i data-feather="heart"></i> Save to Watchlist`;
    listingHeader.appendChild(watchlistBtn);

    // Add watchlist functionality
    watchlistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        auth.toggleWatchlist(listing.id);
    });

    // Update description
    document.getElementById('listing-description').textContent = listing.description;

    // Load gallery images
    const mainImage = document.querySelector('.main-image');
    const thumbnailGrid = document.querySelector('.thumbnail-grid');
    
    if (mainImage && thumbnailGrid) {
        mainImage.innerHTML = `<img src="${listing.image}" alt="${listing.title}">`;
        
        listing.gallery.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `<img src="${image}" alt="${listing.title} image ${index + 1}">`;
            thumbnail.addEventListener('click', () => {
                mainImage.querySelector('img').src = image;
            });
            thumbnailGrid.appendChild(thumbnail);
        });
    }

    // Load amenities
    const amenitiesList = document.getElementById('amenities-list');
    if (amenitiesList) {
        listing.amenities.forEach(amenity => {
            const amenityItem = document.createElement('div');
            amenityItem.className = 'amenity-item';
            amenityItem.innerHTML = `
                <i data-feather="${amenity.icon}"></i>
                <span>${amenity.name}</span>
            `;
            amenitiesList.appendChild(amenityItem);
        });
    }

    // Load reviews
    loadReviews(listing);

    // Initialize map
    initMap([listing]);

    // Initialize Feather Icons for new content
    feather.replace();
};

// Load reviews section
const loadReviews = (listing) => {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    if (!listing.reviews.length) {
        container.innerHTML = `
            <div class="no-reviews">
                <p>No reviews yet. Be the first to review this property!</p>
            </div>
        `;
        return;
    }

    listing.reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-card';
        reviewElement.innerHTML = `
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
                <span class="review-date">${review.date}</span>
            </div>
            <p class="review-text">${review.text}</p>
        `;
        container.appendChild(reviewElement);
    });

    // Initialize Feather Icons for the reviews
    feather.replace();
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadListingDetails);