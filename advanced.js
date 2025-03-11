document.addEventListener('DOMContentLoaded', function () {
    const urlInput = document.getElementById('url-input');
    const generateBtn = document.getElementById('generate-btn');
    const qrPreviewContainer = document.getElementById('qr-preview-container');
    const downloadBtn = document.getElementById('download-btn');
    const logoUpload = document.getElementById('logo-upload');
    const foregroundColorPicker = document.getElementById('foreground-color');
    const backgroundColorPicker = document.getElementById('background-color');
    const gradientCheckbox = document.getElementById('gradient-checkbox');
    const gradientStart = document.getElementById('gradient-start');
    const gradientEnd = document.getElementById('gradient-end');
    const qrSizeButtons = document.querySelectorAll('.qr-size-btn');
    const formatButtons = document.querySelectorAll('.format-btn');
    let qrCodeOptions = {
        width: 256,
        height: 256,
        errorCorrectionLevel: 'H',
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    };

    function generateQRCode() {
        const url = urlInput.value.trim();
        if (!url) {
            alert('Please enter a valid URL');
            return;
        }

        qrPreviewContainer.innerHTML = '';
        const qrCode = new QRCode(qrPreviewContainer, {
            text: url,
            width: qrCodeOptions.width,
            height: qrCodeOptions.height,
            colorDark: qrCodeOptions.color.dark,
            colorLight: qrCodeOptions.color.light,
            correctLevel: QRCode.CorrectLevel[qrCodeOptions.errorCorrectionLevel]
        });
    }

    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', function () {
        const qrCanvas = qrPreviewContainer.querySelector('canvas');
        if (!qrCanvas) return;

        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrCanvas.toDataURL('image/png');
        link.click();
    });

    foregroundColorPicker.addEventListener('input', function () {
        qrCodeOptions.color.dark = foregroundColorPicker.value;
        generateQRCode();
    });

    backgroundColorPicker.addEventListener('input', function () {
        qrCodeOptions.color.light = backgroundColorPicker.value;
        generateQRCode();
    });

    gradientCheckbox.addEventListener('change', function () {
        if (gradientCheckbox.checked) {
            qrCodeOptions.color.dark = `linear-gradient(${gradientStart.value}, ${gradientEnd.value})`;
        } else {
            qrCodeOptions.color.dark = foregroundColorPicker.value;
        }
        generateQRCode();
    });

    qrSizeButtons.forEach(button => {
        button.addEventListener('click', function () {
            qrSizeButtons.forEach(b => b.classList.remove('bg-indigo-100'));
            this.classList.add('bg-indigo-100');
            qrCodeOptions.width = parseInt(this.dataset.size);
            qrCodeOptions.height = parseInt(this.dataset.size);
            generateQRCode();
        });
    });

    formatButtons.forEach(button => {
        button.addEventListener('click', function () {
            formatButtons.forEach(b => b.classList.remove('bg-indigo-100'));
            this.classList.add('bg-indigo-100');
        });
    });

    logoUpload.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    generateQRCodeWithLogo(img);
                };
            };
            reader.readAsDataURL(file);
        }
    });

    function generateQRCodeWithLogo(logo) {
        const url = urlInput.value.trim();
        qrPreviewContainer.innerHTML = '';
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = qrCodeOptions.width;
        canvas.height = qrCodeOptions.height;
        
        const qrCode = new QRCode(canvas, {
            text: url,
            width: qrCodeOptions.width,
            height: qrCodeOptions.height,
            colorDark: qrCodeOptions.color.dark,
            colorLight: qrCodeOptions.color.light,
            correctLevel: QRCode.CorrectLevel[qrCodeOptions.errorCorrectionLevel]
        });

        qrCode.make();
        ctx.drawImage(qrCode._oDrawing._elCanvas, 0, 0);
        const logoSize = qrCodeOptions.width * 0.2;
        ctx.drawImage(logo, (qrCodeOptions.width - logoSize) / 2, (qrCodeOptions.height - logoSize) / 2, logoSize, logoSize);
        qrPreviewContainer.appendChild(canvas);
    }
});
