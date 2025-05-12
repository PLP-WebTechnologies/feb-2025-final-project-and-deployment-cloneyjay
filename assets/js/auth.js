// User authentication management
class Auth {
    constructor() {
        this.isLoggedIn = false;
        this.user = null;
        this.watchlist = [];
        this.init();
    }

    init() {
        // Check for existing session
        const userData = localStorage.getItem('user');
        const watchlistData = localStorage.getItem('watchlist');
        
        if (userData) {
            this.user = JSON.parse(userData);
            this.isLoggedIn = true;
        }
        
        if (watchlistData) {
            this.watchlist = JSON.parse(watchlistData);
        }
        
        this.updateUI();
    }

    login(email, password) {
        // For demo purposes, accept any valid email/password
        if (email && password) {
            this.user = {
                email: email,
                name: email.split('@')[0]
            };
            this.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.updateUI();
            return true;
        }
        return false;
    }

    logout() {
        this.user = null;
        this.isLoggedIn = false;
        localStorage.removeItem('user');
        this.updateUI();
    }

    toggleWatchlist(listingId) {
        if (!this.isLoggedIn) {
            this.showLoginModal();
            return false;
        }

        const index = this.watchlist.indexOf(listingId);
        if (index === -1) {
            this.watchlist.push(listingId);
        } else {
            this.watchlist.splice(index, 1);
        }
        
        localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
        this.updateWatchlistUI();
        return true;
    }

    isInWatchlist(listingId) {
        return this.watchlist.includes(listingId);
    }

    updateUI() {
        const navList = document.querySelector('.nav-list');
        if (!navList) return;

        const authLinks = navList.querySelector('.auth-links');
        if (authLinks) {
            authLinks.remove();
        }

        const newAuthLinks = document.createElement('div');
        newAuthLinks.className = 'auth-links';
        
        if (this.isLoggedIn) {
            newAuthLinks.innerHTML = `
                <li><a href="watchlist.html"><i data-feather="heart"></i> Watchlist (${this.watchlist.length})</a></li>
                <li><a href="#" class="user-menu">
                    <i data-feather="user"></i> ${this.user.name}
                </a></li>
                <li><a href="#" class="logout-btn">Logout</a></li>
            `;
        } else {
            newAuthLinks.innerHTML = `
                <li><a href="#" class="login-btn">Login</a></li>
                <li><a href="#" class="signup-btn">Sign Up</a></li>
            `;
        }

        navList.appendChild(newAuthLinks);
        if (window.feather) {
            feather.replace();
        }

        this.attachAuthListeners();
    }

    updateWatchlistUI() {
        const watchlistButtons = document.querySelectorAll('.watchlist-btn');
        watchlistButtons.forEach(btn => {
            const listingId = btn.dataset.listingId;
            if (this.isInWatchlist(listingId)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update watchlist count in nav if it exists
        const watchlistCount = document.querySelector('.watchlist-count');
        if (watchlistCount) {
            watchlistCount.textContent = this.watchlist.length;
        }
    }

    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Login</h2>
                <form id="login-form">
                    <input type="email" placeholder="Email" required>
                    <input type="password" placeholder="Password" required>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <a href="#" class="signup-link">Sign up</a></p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const form = modal.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            const password = form.querySelector('input[type="password"]').value;
            
            if (this.login(email, password)) {
                modal.remove();
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    attachAuthListeners() {
        const loginBtn = document.querySelector('.login-btn');
        const logoutBtn = document.querySelector('.logout-btn');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginModal();
            });
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    }
}

// Initialize authentication
const auth = new Auth();