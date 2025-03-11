document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const urlInput = document.getElementById('url-input');
    const generateBtn = document.getElementById('generate-btn');
    const updateQrBtn = document.getElementById('update-qr-btn');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    const downloadBtn = document.getElementById('download-btn');
    const downloadContainer = document.getElementById('download-container');
    const urlError = document.getElementById('url-error');
    const qrResultContainer = document.getElementById('qr-result-container');
    const customizationContainer = document.getElementById('customization-container');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const foregroundColorPicker = document.getElementById('foreground-color');
    const backgroundColorPicker = document.getElementById('background-color');
    const foregroundColorHex = document.getElementById('foreground-color-hex');
    const backgroundColorHex = document.getElementById('background-color-hex');
    const errorCorrectionSelect = document.getElementById('error-correction');
    const sizeBtns = document.querySelectorAll('.qr-size-btn');

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

    // Mobile Menu Toggle
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Validate URL function
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

    // Generate QR Code function
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

    backgroundColorPicker.addEventListener('input', function() {
        qrCodeOptions.color.light = this.value;
        backgroundColorHex.textContent = this.value.toUpperCase();
    });

    // Customization: Error correction
    errorCorrectionSelect.addEventListener('change', function() {
        qrCodeOptions.errorCorrectionLevel = this.value;
    });

    // Update QR code with new options
    updateQrBtn.addEventListener('click', function() {
        // Only update if there's already a QR code generated
        if (!qrResultContainer.classList.contains('hidden')) {
            generateQRCode();
            
            // Show pulse animation on button click
            this.classList.add('pulse-animation');
            setTimeout(() => {
                this.classList.remove('pulse-animation');
            }, 1000);
        }
    });

    // Add some entrance animations when the page loads
    window.addEventListener('load', function() {
        gsap.from('nav', {y: -50, opacity: 0, duration: 0.7, ease: 'power3.out'});
        gsap.from('main > div', {y: 20, opacity: 0, duration: 0.7, stagger: 0.15, delay: 0.3, ease: 'power3.out'});
    });
});