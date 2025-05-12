// Initialize Feather Icons
feather.replace();

// Create listing card
const createListingCard = (listing) => {
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

    return card;
};

// Calculate average rating for a listing
const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
};

// Filter listings
const filterListings = (searchTerm = '', filters = {}) => {
    return listings.filter(listing => {
        const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            listing.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = !filters.propertyType || filters.propertyType === 'all' || 
                           listing.type === filters.propertyType;

        const matchesBedrooms = !filters.bedrooms || filters.bedrooms === 'all' || 
                               listing.bedrooms.toString() === filters.bedrooms;

        return matchesSearch && matchesType && matchesBedrooms;
    });
};

// Load all listings with filtering
const loadListings = (filters = {}) => {
    const grid = document.querySelector('.listings-grid');
    if (!grid) return;

    // Filter listings based on current filters
    let filteredListings = [...listings];
    
    if (filters.propertyType && filters.propertyType !== 'all') {
        filteredListings = filteredListings.filter(l => l.type === filters.propertyType);
    }
    
    if (filters.bedrooms && filters.bedrooms !== 'all') {
        filteredListings = filteredListings.filter(l => l.bedrooms === parseInt(filters.bedrooms));
    }

    // Update listings count
    const countElement = document.querySelector('.listings-count');
    if (countElement) {
        countElement.textContent = `${filteredListings.length} Houses Available`;
    }

    // Clear existing listings
    grid.innerHTML = '';

    // Add filtered listings
    filteredListings.forEach(listing => {
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

        grid.appendChild(card);
    });

    // Initialize Feather Icons for new content
    feather.replace();
};

// Initialize filters
const initFilters = () => {
    const propertyType = document.querySelector('.property-type');
    const bedrooms = document.querySelector('.bedrooms');
    const filterBtn = document.querySelector('.filter-btn');

    const applyFilters = () => {
        loadListings({
            propertyType: propertyType.value,
            bedrooms: bedrooms.value
        });
    };

    if (propertyType) propertyType.addEventListener('change', applyFilters);
    if (bedrooms) bedrooms.addEventListener('change', applyFilters);
    if (filterBtn) filterBtn.addEventListener('click', applyFilters);
};

// Initialize page
const init = () => {
    const listingsGrid = document.querySelector('.listings-grid');
    const searchInput = document.querySelector('.search-box input');
    const propertyTypeSelect = document.querySelector('.property-type');
    const bedroomsSelect = document.querySelector('.bedrooms');
    const filterBtn = document.querySelector('.filter-btn');

    // Update listings count
    const updateListingsCount = (count) => {
        document.querySelector('.listings-count').textContent = 
            `${count} House${count === 1 ? '' : 's'} Available`;
    };

    // Initial load of listings
    const currentListings = listings;
    updateListingsCount(currentListings.length);
    currentListings.forEach(listing => {
        listingsGrid.appendChild(createListingCard(listing));
    });

    // Initialize Feather Icons for the new content
    feather.replace();

    // Search and filter functionality
    const updateListings = () => {
        const searchTerm = searchInput.value;
        const filters = {
            propertyType: propertyTypeSelect.value,
            bedrooms: bedroomsSelect.value
        };

        const filteredListings = filterListings(searchTerm, filters);
        updateListingsCount(filteredListings.length);
        
        // Clear and repopulate listings grid
        listingsGrid.innerHTML = '';
        filteredListings.forEach(listing => {
            listingsGrid.appendChild(createListingCard(listing));
        });

        // Reinitialize Feather Icons
        feather.replace();
    };

    // Add event listeners
    searchInput.addEventListener('input', updateListings);
    propertyTypeSelect.addEventListener('change', updateListings);
    bedroomsSelect.addEventListener('change', updateListings);

    // Save search functionality
    const saveSearchBtn = document.querySelector('.save-search-btn');
    if (saveSearchBtn) {
        saveSearchBtn.addEventListener('click', () => {
            const currentSearch = {
                searchTerm: searchInput.value,
                propertyType: propertyTypeSelect.value,
                bedrooms: bedroomsSelect.value
            };
            
            // In a real app, this would be saved to a backend
            localStorage.setItem('savedSearch', JSON.stringify(currentSearch));
            
            // Show feedback
            saveSearchBtn.textContent = '✓ Search Saved';
            saveSearchBtn.classList.add('saved');
            setTimeout(() => {
                saveSearchBtn.textContent = 'Save Search';
                saveSearchBtn.classList.remove('saved');
            }, 2000);
        });
    }

    // Initialize mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadListings();
    initFilters();
});