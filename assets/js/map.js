// Initialize map object and settings
let map;
let markers = L.markerClusterGroup();
let currentBounds;

// Custom marker icon with fallback
const getCustomIcon = () => {
    try {
        return L.icon({
            iconUrl: 'assets/icons/marker.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
    } catch {
        // Fallback to default if custom icon fails to load
        return new L.Icon.Default();
    }
};

// Initialize the map
const initMap = (listings = [], center = [-1.2921, 36.7821], zoom = 12) => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Create map if it doesn't exist
    if (!map) {
        map = L.map('map', {
            zoomControl: true,
            scrollWheelZoom: true // Enable scroll zoom by default
        }).setView(center, zoom);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add zoom control to top-right
        L.control.zoom({
            position: 'topright'
        }).addTo(map);

        // Trigger a resize event after map initialization
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }

    // Clear existing markers
    markers.clearLayers();

    // Add markers for each listing
    listings.forEach(listing => {
        if (listing.coordinates) {
            const marker = L.marker(listing.coordinates, { icon: getCustomIcon() });
            
            // Create popup content
            const popupContent = `
                <div class="map-popup">
                    <img src="${listing.image}" alt="${listing.title}">
                    <div class="popup-content">
                        <h3>${listing.title}</h3>
                        <p>${listing.location}</p>
                        <div class="popup-price">KSH ${listing.price.toLocaleString()}/${listing.priceUnit}</div>
                        <a href="listing-detail.html?id=${listing.id}" class="popup-link">View Details</a>
                    </div>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            markers.addLayer(marker);
        }
    });

    // Add marker cluster group to map
    map.addLayer(markers);

    // Fit map to markers if there are any
    if (listings.length > 0) {
        currentBounds = markers.getBounds();
        map.fitBounds(currentBounds);
    }

    return map;
};

// Update map markers without reinitializing
const updateMapMarkers = (listings = []) => {
    if (!map) return;
    
    markers.clearLayers();
    
    listings.forEach(listing => {
        if (listing.coordinates) {
            const marker = L.marker(listing.coordinates, { icon: getCustomIcon() });
            const popupContent = `
                <div class="map-popup">
                    <img src="${listing.image}" alt="${listing.title}">
                    <div class="popup-content">
                        <h3>${listing.title}</h3>
                        <p>${listing.location}</p>
                        <div class="popup-price">KSH ${listing.price.toLocaleString()}/${listing.priceUnit}</div>
                        <a href="listing-detail.html?id=${listing.id}" class="popup-link">View Details</a>
                    </div>
                </div>
            `;
            marker.bindPopup(popupContent);
            markers.addLayer(marker);
        }
    });

    // Update bounds if we have markers
    if (listings.length > 0) {
        currentBounds = markers.getBounds();
        map.fitBounds(currentBounds);
    }
};

// Center map on a specific listing
const centerMapOnListing = (listing) => {
    if (!map || !listing?.coordinates) return;
    
    map.setView(listing.coordinates, 15);
    
    // Find and open the marker popup
    markers.eachLayer((layer) => {
        if (layer.getLatLng().equals(L.latLng(listing.coordinates))) {
            layer.openPopup();
        }
    });
};

// Export functions
window.initMap = initMap;
window.updateMapMarkers = updateMapMarkers;
window.centerMapOnListing = centerMapOnListing;