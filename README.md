# QRify - Modern QR Code Generator

![Screenshot 2025-03-12 002301](https://github.com/user-attachments/assets/3fc5a52e-8c8d-4a01-b674-cbcb7834ae79)


QRify is a powerful, modern, and easy-to-use QR code generator web application built with vanilla JavaScript, Tailwind CSS, and GSAP animations. Create customized QR codes for your business, marketing campaigns, or personal use in seconds.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/officiallyutso/QRify?style=social)](https://github.com/officiallyutso/QRify)
[![GitHub Forks](https://img.shields.io/github/forks/officiallyutso/QRify?style=social)](https://github.com/officiallyutso/QRify)

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Code Breakdown](#code-breakdown)
  - [HTML Structure](#html-structure)
  - [JavaScript Functionality](#javascript-functionality)
  - [CSS Styling](#css-styling)
- [QR Code Customization](#qr-code-customization)
- [Dark Mode Implementation](#dark-mode-implementation)
- [Animation System](#animation-system)
- [UI Components](#ui-components)
- [User Flow](#user-flow)
- [Mobile Responsiveness](#mobile-responsiveness)
- [Performance Optimizations](#performance-optimizations)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

QRify comes packed with a comprehensive set of features:

✅ **Instant QR Code Generation** - Create QR codes in seconds with real-time preview  
✅ **Fully Customizable** - Modify colors, size, and error correction levels  
✅ **Modern UI/UX** - Clean interface with smooth animations  
✅ **Dark/Light Mode** - Seamless theme switching with persistent preferences  
✅ **Mobile Responsive** - Works flawlessly on all devices  
✅ **One-Click Download** - Save your QR codes as high-quality PNG files  
✅ **URL Validation** - Built-in validation ensures proper QR code functionality  
✅ **Multiple Size Options** - Choose from small, medium, or large QR codes  
✅ **Error Correction Levels** - Select from 4 different levels for optimal scanning  
✅ **No Backend Required** - Entirely client-side, works offline  
✅ **Fast Performance** - Optimized for speed with minimal dependencies  
✅ **Smooth Animations** - Professional transitions powered by GSAP  

## Live Demo

[View Live Demo](https://qrify.vercel.app) (Placeholder URL)

## Technology Stack

QRify is built with the following technologies:

- **HTML5** - Modern, semantic markup structure
- **CSS3/Tailwind CSS** - Utility-first CSS framework for styling
- **Vanilla JavaScript** - Core application logic
- **QRCode.js** - QR code generation library
- **GSAP (GreenSock Animation Platform)** - Professional animations
- **Font Awesome** - Scalable vector icons
- **LocalStorage API** - Theme preference persistence

## Project Structure

```
QRify/
├── index.html            # Main application HTML file
├── contact.html          # Contact page (referenced but not included)
├── app.js                # Core JavaScript functionality
├── styles.css            # Custom CSS overrides and animations
├── assets/               # Project assets
│   ├── images/           # Image assets (not included in source)
│   └── favicons/         # Favicon files (not included in source)
├── README.md             # Project documentation
└── LICENSE               # MIT License file
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/officiallyutso/QRify.git
   cd QRify
   ```

2. **Open with a local server**
   
   You can use any local development server like Live Server for VS Code, or:
   ```bash
   # Using Python's built-in HTTP server
   python -m http.server
   ```
   
3. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Code Breakdown

### HTML Structure

The application's HTML is structured into multiple sections:

#### Navigation Bar
```html
<nav class="bg-white dark:bg-gray-800 shadow-md px-6 py-4 transition-colors duration-300">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
        <!-- Logo and Brand -->
        <div class="flex items-center space-x-2">
            <i class="fas fa-qrcode text-indigo-600 dark:text-indigo-400 text-2xl"></i>
            <span class="text-xl font-bold text-gray-800 dark:text-white">QRify</span>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-6">
            <!-- Navigation Links -->
        </div>
        
        <!-- Theme Toggle and Sign Up Button -->
        <div class="hidden md:flex items-center space-x-4">
            <!-- Theme Toggle Button -->
        </div>
        
        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center space-x-3">
            <!-- Mobile Menu and Theme Toggle -->
        </div>
    </div>
</nav>
```

This navigation bar implements responsive design with different layouts for mobile and desktop viewports. It includes a brand logo, navigation links, theme toggle button, and a sign-up button.

#### QR Code Generator Section
```html
<div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-4xl mx-auto mb-16 transition-colors duration-300">
    <!-- Input Section -->
    <div class="mb-8">
        <label for="url-input" class="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-300">Enter your URL</label>
        <div class="flex">
            <input type="text" id="url-input" placeholder="https://google.com" 
                   class="flex-grow p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300">
            <button id="generate-btn" 
                    class="bg-indigo-600 text-white px-6 py-3 rounded-r-md hover:bg-indigo-700 transition flex items-center">
                <span>Generate</span>
                <i class="fas fa-arrow-right ml-2"></i>
            </button>
        </div>
        <p id="url-error" class="text-red-500 mt-2 hidden">Please enter a valid URL</p>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
        <!-- QR Code Preview -->
        <div id="qr-result-container" class="hidden">
            <!-- QR Code Container -->
        </div>

        <!-- Customization Options -->
        <div id="customization-container" class="hidden">
            <!-- Customization Controls -->
        </div>
    </div>
</div>
```

This section contains the main QR code generator interface, including the URL input field, generation button, QR code preview area, and customization options panel.

### JavaScript Functionality

The `app.js` file contains all the JavaScript functionality, structured into key components:

#### DOM Elements Selection
```javascript
// DOM Elements
const urlInput = document.getElementById('url-input');
const generateBtn = document.getElementById('generate-btn');
const updateQrBtn = document.getElementById('update-qr-btn');
const qrCodeContainer = document.getElementById('qr-code-container');
// ... additional element selections
```

#### QR Code Options Configuration
```javascript
// QR Code Options
let qrCodeOptions = {
    width: 256,
    height: 256,
    margin: 1,
    errorCorrectionLevel: 'H',
    color: {
        dark: '#000000',
        light: '#FFFFFF'
    }
};
```

#### Theme Management
```javascript
function initTheme() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        enableDarkMode(false); // No animation on initial load
    } else {
        enableLightMode(false); // No animation on initial load
    }
}

function enableDarkMode(animate = true) {
    html.classList.add('dark');
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
    localStorage.setItem('theme', 'dark');
    
    // Animate transition only if requested
    if (animate) {
        gsap.to('body', {
            backgroundColor: '#111827',
            duration: 0.3,
            ease: 'power2.out'
        });
    }
}

function enableLightMode(animate = true) {
    html.classList.remove('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
    localStorage.setItem('theme', 'light');
    
    // Animate transition only if requested
    if (animate) {
        gsap.to('body', {
            backgroundColor: '#f3f4ff',
            duration: 0.3,
            ease: 'power2.out'
        });
    }
}
```

The theme management system implements:
- Persistent theme preferences using localStorage
- System preference detection
- Smooth transitions between themes
- Both desktop and mobile theme toggles

#### URL Validation
```javascript
function isValidURL(url) {
    // Basic URL validation
    if (!url) return false;
    
    // Add http:// if no protocol is specified
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
        url = 'http://' + url;
        urlInput.value = url;
    }

    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}
```

This function handles URL validation and automatically adds the http:// protocol if missing.

#### QR Code Generation
```javascript
function generateQRCode() {
    const url = urlInput.value.trim();
    
    if (!isValidURL(url)) {
        urlError.classList.remove('hidden');
        gsap.fromTo(urlError, {opacity: 0, y: -10}, {opacity: 1, y: 0, duration: 0.3});
        return;
    }
    
    urlError.classList.add('hidden');
    
    // Show loading spinner
    loadingSpinner.classList.remove('hidden');
    qrCodeContainer.innerHTML = '';
    
    // Show containers
    qrResultContainer.classList.remove('hidden');
    customizationContainer.classList.remove('hidden');
    
    // Use GSAP to animate the appearance
    gsap.fromTo([qrResultContainer, customizationContainer], 
        {opacity: 0, y: 20}, 
        {opacity: 1, y: 0, duration: 0.5, stagger: 0.1}
    );
    
    // Generate QR Code with current options
    setTimeout(() => {
        QRCode.toDataURL(url, qrCodeOptions, function(error, url) {
            loadingSpinner.classList.add('hidden');
            
            if (error) {
                console.error(error);
                qrCodeContainer.innerHTML = `
                    <div class="text-red-500">
                        <i class="fas fa-exclamation-circle text-4xl"></i>
                        <p class="mt-3">Error generating QR code. Please try again.</p>
                    </div>
                `;
                return;
            }
            
            // Create image element with the generated QR code
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'QR Code';
            img.classList.add('rounded-lg');
            
            // Clear container and append the new QR code
            qrCodeContainer.innerHTML = '';
            qrCodeContainer.appendChild(img);
            
            // Show download button
            downloadContainer.classList.remove('hidden');
            
            // Set download link
            downloadBtn.onclick = function() {
                const link = document.createElement('a');
                link.download = 'qrcode.png';
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
            
            // Animate the QR code appearance
            gsap.fromTo(img, 
                {opacity: 0, scale: 0.8}, 
                {opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)"}
            );
        });
    }, 600); // Small delay for better UX
}
```

The QR code generation function:
- Validates the input URL
- Handles loading states
- Generates the QR code using the QRCode.js library
- Sets up the download functionality
- Provides error handling
- Animates the appearance of the QR code

#### Event Listeners
```javascript
// Event listener for the generate button
generateBtn.addEventListener('click', generateQRCode);

// Trigger generation on Enter key in the input field
urlInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        generateQRCode();
    }
});

// Customization: Size buttons
sizeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        sizeBtns.forEach(b => b.classList.remove('bg-indigo-100', 'border-indigo-300'));
        
        // Add active class to clicked button
        this.classList.add('bg-indigo-100', 'border-indigo-300');
        
        // Update QR code size
        qrCodeOptions.width = parseInt(this.dataset.size);
        qrCodeOptions.height = parseInt(this.dataset.size);
    });
});

// Customization: Color pickers
foregroundColorPicker.addEventListener('input', function() {
    qrCodeOptions.color.dark = this.value;
    foregroundColorHex.textContent = this.value.toUpperCase();
});

// ... additional event listeners
```

Various event listeners handle user interactions, including:
- QR code generation trigger
- Size selection
- Color customization
- Error correction level selection
- Theme toggle
- Mobile menu toggle

### CSS Styling

The `styles.css` file contains custom styling that extends Tailwind CSS:

#### Animations
```css
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

.pulse-animation {
    animation: pulse 2s infinite ease-in-out;
}
```

#### Dark Mode Overrides
```css
/* Essential dark mode overrides - these will take precedence over Tailwind classes */
.dark {
    color-scheme: dark;
}

/* Body background for dark mode */
.dark body {
    background-color: #111827;
    background-image: linear-gradient(to bottom right, #111827, #1f2937);
    color: #f3f4ff;
}

/* Dark mode backgrounds */
.dark .bg-white {
    background-color: #1f2937 !important;
}

.dark .bg-gray-50 {
    background-color: #374151 !important;
}

/* ... additional dark mode styles */
```

#### Color Picker Styling
```css
/* Color picker styling */
input[type="color"] {
    -webkit-appearance: none;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
}

input[type="color"]::-webkit-color-swatch {
    border: none;
}
```

#### Transition Effects
```css
/* Transitions for smooth theme switching */
body, 
.bg-white, 
.bg-gray-50, 
.bg-indigo-100, 
.text-gray-800, 
.text-gray-700, 
.text-gray-600, 
input, 
select, 
textarea, 
.border, 
.border-gray-300, 
.shadow-md, 
.shadow-xl {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
```

## QR Code Customization

QRify offers extensive customization options for generated QR codes:

### Size Options

| Size | Dimensions | Best For |
|------|------------|----------|
| Small | 128×128px | Digital sharing, email signatures |
| Medium | 256×256px | Default size, general use |
| Large | 384×384px | Printing, larger displays |

### Error Correction Levels

| Level | Recovery Capacity | Use Case |
|-------|-------------------|----------|
| L (Low) | ~7% damaged data | Larger QR codes, controlled environments |
| M (Medium) | ~15% damaged data | Standard use cases |
| Q (Quartile) | ~25% damaged data | Industrial or outdoor use |
| H (High) | ~30% damaged data | Maximum reliability (default) |

### Color Customization

Users can fully customize both foreground and background colors with the built-in color pickers:

```javascript
foregroundColorPicker.addEventListener('input', function() {
    qrCodeOptions.color.dark = this.value;
    foregroundColorHex.textContent = this.value.toUpperCase();
});

backgroundColorPicker.addEventListener('input', function() {
    qrCodeOptions.color.light = this.value;
    backgroundColorHex.textContent = this.value.toUpperCase();
});
```

## Dark Mode Implementation

QRify implements a full dark mode system with the following features:

1. **User Preference Detection**:
   ```javascript
   const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
   ```

2. **Preference Persistence**:
   ```javascript
   localStorage.setItem('theme', 'dark');
   // or
   localStorage.setItem('theme', 'light');
   ```

3. **Theme Toggling**:
   ```javascript
   themeToggle.addEventListener('click', function() {
       if (html.classList.contains('dark')) {
           // Transition to light mode
           // ...
       } else {
           // Transition to dark mode
           // ...
       }
   });
   ```

4. **CSS Implementation**:
   ```css
   .dark {
       color-scheme: dark;
   }

   .dark body {
       background-color: #111827;
       background-image: linear-gradient(to bottom right, #111827, #1f2937);
       color: #f3f4ff;
   }
   ```

5. **Icon Swapping**:
   ```javascript
   moonIcon.classList.add('hidden');
   sunIcon.classList.remove('hidden');
   // or
   sunIcon.classList.add('hidden');
   moonIcon.classList.remove('hidden');
   ```

## Animation System

QRify uses GSAP (GreenSock Animation Platform) for smooth, professional animations:

### Page Load Animations
```javascript
window.addEventListener('load', function() {
    gsap.from('nav', {y: -50, opacity: 0, duration: 0.7, ease: 'power3.out'});
    gsap.from('main > div', {y: 20, opacity: 0, duration: 0.7, stagger: 0.15, delay: 0.3, ease: 'power3.out'});
    
    // Initialize theme
    initTheme();
});
```

### QR Code Generation Animation
```javascript
gsap.fromTo(img, 
    {opacity: 0, scale: 0.8}, 
    {opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)"}
);
```

### Error Message Animation
```javascript
gsap.fromTo(urlError, 
    {opacity: 0, y: -10}, 
    {opacity: 1, y: 0, duration: 0.3}
);
```

### Theme Toggle Animation
```javascript
gsap.to(themeToggle, {
    scale: 0.9,
    duration: 0.1,
    onComplete: function() {
        enableDarkMode();
        gsap.to(themeToggle, {
            scale: 1,
            duration: 0.2
        });
    }
});
```

## UI Components

QRify includes several custom UI components:

### Theme Toggle Button

The theme toggle button changes appearance based on the current theme:

```html
<button id="theme-toggle" class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition focus:outline-none">
    <i id="moon-icon" class="fas fa-moon text-gray-600"></i>
    <i id="sun-icon" class="fas fa-sun text-yellow-400 hidden"></i>
</button>
```

```css
#moon-icon, #sun-icon, #moon-icon-mobile, #sun-icon-mobile {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease, visibility 0.3s ease;
}
```

### Color Picker

A custom-styled color picker with hex code display:

```html
<div class="flex items-center space-x-3">
    <input type="color" id="foreground-color" value="#000000" class="w-10 h-10 rounded cursor-pointer">
    <span id="foreground-color-hex" class="text-gray-600 dark:text-gray-300 transition-colors duration-300">#000000</span>
</div>
```

```css
input[type="color"] {
    -webkit-appearance: none;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
}

input[type="color"]::-webkit-color-swatch {
    border: none;
}
```

### Size Selector Buttons

Toggle buttons for QR code size selection:

```html
<div class="flex space-x-3">
    <button data-size="128" class="qr-size-btn px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition">S</button>
    <button data-size="256" class="qr-size-btn px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-700">M</button>
    <button data-size="384" class="qr-size-btn px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition">L</button>
</div>
```

```javascript
sizeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        sizeBtns.forEach(b => b.classList.remove('bg-indigo-100', 'border-indigo-300'));
        
        // Add active class to clicked button
        this.classList.add('bg-indigo-100', 'border-indigo-300');
        
        // Update QR code size
        qrCodeOptions.width = parseInt(this.dataset.size);
        qrCodeOptions.height = parseInt(this.dataset.size);
    });
});
```

### Loading Spinner

A custom loading spinner during QR code generation:

```html
<div id="loading-spinner" class="py-16 hidden">
    <i class="fas fa-circle-notch fa-spin text-indigo-500 text-4xl"></i>
    <p class="text-gray-600 dark:text-gray-300 mt-3 transition-colors duration-300">Generating your QR code...</p>
</div>
```

## User Flow

The QRify application follows a clear user flow:

1. **Input URL** - User enters a URL in the input field
2. **Validation** - System validates the URL and shows an error if invalid
3. **Generation** - QR code is generated and displayed with a loading state
4. **Customization** - User can customize the QR code with various options
5. **Update** - Changes are applied to the QR code in real-time
6. **Download** - User can download the generated QR code as a PNG file

## Mobile Responsiveness

QRify is fully responsive with different layouts for various screen sizes:

### Mobile Menu
```html
<div class="md:hidden flex items-center space-x-3">
    <button id="theme-toggle-mobile" class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition focus:outline-none">
        <i id="moon-icon-mobile" class="fas fa-moon text-gray-600"></i>
        <i id="sun-icon-mobile" class="fas fa-sun text-yellow-400 hidden"></i>
    </button>
    <button id="mobile-menu-button" class="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
        <i class="fas fa-bars text-xl"></i>
    </button>
</div>

<div id="mobile-menu" class="hidden bg-white dark:bg-gray-800 shadow-md py-4 px-6 md:hidden transition-colors duration-300">
    <!-- Mobile menu content -->
</div>
```

```javascript
// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});
```

### Responsive Grid Layout
```html
<div class="grid md:grid-cols-2 gap-8">
    <!-- Two-column layout on medium screens and larger -->
</div>
```

### Media Queries
```css
@media (max-width: 640px) {
    #qr-code-container {
        min-height: 200px;
    }
    
    .custom-grid {
        display: flex;
        flex-direction: column;
    }
    
    #theme-toggle-mobile {
        width: 36px;
        height: 36px;
    }
}
```

## Performance Optimizations

QRify includes several performance optimizations:

1. **Deferred Loading**:
   - The main JavaScript is loaded at the end of the document
   - GSAP animations are initialized only after page load

2. **Transition Management**:
   ```javascript
   // Animate transition only if requested
   if (animate) {
       gsap.to('body', {
           backgroundColor: '#111827',
           duration: 0.3,
           ease: 'power2.out'
       });
   }
   ```

3. **Minimal Dependencies**:
   - Only three external libraries: QRCode.js, GSAP, and Font Awesome
   - Tailwind CSS is loaded from CDN without custom builds

4. **Optimized DOM Updates**:
   ```javascript
   // Clear container and append the new QR code
   qrCodeContainer.innerHTML = '';
   qrCodeContainer.appendChild(img);
   ```

5. **Throttled UI Updates**:
   ```javascript
   // Small delay for better UX
   setTimeout(() => {
       // QR code generation
   }, 600);
   ```

## Browser Compatibility

QRify is designed to work on all modern browsers, with specific compatibility features:

1. **Color Input Compatibility**:
   ```css
   input[type="color"]::-webkit-color-swatch-wrapper {
       padding: 0;
   }

   input[type="color"]::-webkit-color-swatch {
       border: none;
   }
   ```

2. **Feature Detection**:
   ```javascript
   const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
   ```

3. **CSS Fallbacks**:
   ```css
   .dark body {
       background-color: #111827;
       background-image: linear-gradient(to bottom right, #111827, #1f2937);
   }
   ```

## Visual Elements

| Element | Preview |
|---------|---------|
| QR Code Generator UI | ![QR Code Generator](/api/placeholder/600/400) |
| Dark Mode Interface | ![Dark Mode](/api/placeholder/600/400) |
| Mobile Interface | ![Mobile View](/api/placeholder/300/600) |
| Color Customization | ![Color Options](/api/placeholder/400/300) |
| Size Selection | ![Size Options](/api/placeholder/400/200) |
| Error Correction Levels | ![Error Correction](/api/placeholder/400/200) |
| Download Feature | ![Download Function](/api/placeholder/400/200) |
| Theme Toggle | ![Theme Toggle](/api/placeholder/200/200) |

## Future Enhancements

Planned future enhancements for QRify include:

- **Logo Embedding** - Add custom logos to QR codes
- **Design Templates** - Predefined style templates for quick customization
- **Batch Generation** - Generate multiple QR codes at once
- **Analytics Integration** - Track QR code scans and usage
- **Export Formats** - Additional export formats like SVG and PDF
- **Social Sharing** - Direct sharing to social media platforms
- **QR Code Scanner** - Built-in scanner to read QR codes
- **API Integration** - Connect with URL shortening services

## Contributing

Contributions to QRify are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

QRify is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- **Developer**: [Utso Sarkar](https://github.com/officiallyutso)
- **Twitter**: [@utsosarkar](https://x.com/utsosarkar)
- **GitHub**: [github.com/officiallyutso](https://github.com/officiallyutso)
- **Instagram**: [the_arjo](https://www.instagram.com/the_arjo/)

---

<p align="center">
  Made with passion by <a href="https://github.com/officiallyutso">Utso Sarkar</a>
</p>
