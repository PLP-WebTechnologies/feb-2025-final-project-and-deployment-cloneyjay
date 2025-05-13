# StudyStay - Student Hostel Finder

A web application to help students find suitable accommodation near their universities in Kenya.

visit https://studystay.vercel.app/ to see the final product

## Features

- Interactive map with hostel locations
- Detailed listing pages with image galleries
- Search and filter functionality
- Reviews and ratings system
- Responsive design for all devices

## Tech Stack

- HTML5
- CSS3 with modern features (Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Leaflet.js for maps
- GSAP for animations
- Feather Icons for UI elements

## Dependencies

- Leaflet.js (v1.9.4)
- Leaflet.markercluster (v1.4.1)
- GSAP (v3.12.2)
- Feather Icons

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/PLP-WebTechnologies/feb-2025-final-project-and-deployment-cloneyjay.git
cd into the folder
```

2. Open index.html in your browser
```bash
# If you have Python installed
python -m http.server 8000

# If you have Node.js installed
npx http-server
```

3. Visit `http://localhost:8000` in your browser

## Deployment

### Option 1: GitHub Pages

1. Push your code to GitHub
2. Go to Settings > Pages
3. Select your main branch
4. Click Save

Your site will be available at `https://yourusername.github.io/studystay/`

### Option 2: Netlify

1. Create a Netlify account
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: Leave empty (static site)
   - Publish directory: ./
4. Click Deploy

### Option 3: Manual Server Deployment

1. Upload files to your web server
```bash
# Using FTP
ftp your-server.com
> put -r *

# Using SCP
scp -r * username@your-server.com:/var/www/html/
```

2. Configure your web server (Apache example):
```apache
<VirtualHost *:80>
    ServerName studystay.yourdomain.com
    DocumentRoot /var/www/html/studystay
    
    <Directory /var/www/html/studystay>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## Development

### Project Structure
```
studystay/
├── index.html
├── listings.html
├── listing-detail.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── listings.css
│   │   ├── listing-detail.css
│   │   └── animations.css
│   ├── js/
│   │   ├── main.js
│   │   ├── listings.js
│   │   ├── listing-detail.js
│   │   ├── map.js
│   │   ├── animations.js
│   │   └── data.js
│   ├── icons/
│   │   └── marker.png
│   └── images/
```

### Code Style

- Use 2 spaces for indentation
- Follow BEM methodology for CSS classes
- Use ES6+ features
- Comment complex logic
- Keep functions small and focused

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning or as a base for your own work.

## Authors

- Your Name - cloneyjay

## Acknowledgments

- Images from Unsplash
- Icons from Feather Icons
- Map data from OpenStreetMap
