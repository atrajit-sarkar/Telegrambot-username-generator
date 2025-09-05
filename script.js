document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const lengthSlider = document.getElementById('lengthSlider');
    const lengthValue = document.getElementById('lengthValue');
    const generateBtn = document.getElementById('generateBtn');
    const usernameOutput = document.getElementById('generatedUsername');
    const copyBtn = document.getElementById('copyBtn');
    const copyFeedback = document.getElementById('copyFeedback');

    // Constants
    const ALPHANUMERIC_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Update length display when slider changes
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
        updateSliderGradient();
    });

    // Update slider gradient based on value
    function updateSliderGradient() {
        const value = lengthSlider.value;
        const max = lengthSlider.max;
        const percentage = (value / max) * 100;
        lengthSlider.style.background = `linear-gradient(to right, #00d4ff 0%, #4ecdc4 ${percentage}%, #0f3460 ${percentage}%, #0f3460 100%)`;
    }

    // Initialize slider gradient
    updateSliderGradient();

    // Generate random alphanumeric string
    function generateRandomString(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * ALPHANUMERIC_CHARS.length);
            result += ALPHANUMERIC_CHARS[randomIndex];
        }
        return result;
    }

    // Generate username with format: [alphanumeric]bot
    function generateUsername() {
        const length = parseInt(lengthSlider.value);
        const randomPart = generateRandomString(length);
        return `${randomPart}bot`;
    }

    // Add loading animation to button
    function setButtonLoading(isLoading) {
        if (isLoading) {
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            generateBtn.disabled = true;
        } else {
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Username';
            generateBtn.disabled = false;
        }
    }

    // Generate button click handler
    generateBtn.addEventListener('click', function() {
        setButtonLoading(true);
        
        // Add a small delay for better UX
        setTimeout(() => {
            const username = generateUsername();
            displayUsername(username);
            setButtonLoading(false);
        }, 500);
    });

    // Display generated username with animation
    function displayUsername(username) {
        usernameOutput.textContent = username;
        usernameOutput.classList.add('generated');
        copyBtn.disabled = false;
        
        // Add typing animation effect
        animateTyping(username);
    }

    // Typing animation effect
    function animateTyping(text) {
        usernameOutput.textContent = '';
        usernameOutput.classList.remove('generated');
        
        let index = 0;
        const typeSpeed = 50;
        
        function type() {
            if (index < text.length) {
                usernameOutput.textContent += text.charAt(index);
                index++;
                setTimeout(type, typeSpeed);
            } else {
                usernameOutput.classList.add('generated');
            }
        }
        
        type();
    }

    // Copy to clipboard functionality
    copyBtn.addEventListener('click', async function() {
        const username = usernameOutput.textContent;
        
        if (!username || username === 'Click generate to create username') {
            showCopyFeedback('No username to copy!', 'error');
            return;
        }

        try {
            // Modern clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(username);
                showCopyFeedback('Copied to clipboard!', 'success');
                animateCopyButton();
            } else {
                // Fallback for older browsers
                fallbackCopyToClipboard(username);
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
            showCopyFeedback('Failed to copy', 'error');
        }
    });

    // Fallback copy method for older browsers
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback('Copied to clipboard!', 'success');
            animateCopyButton();
        } catch (err) {
            showCopyFeedback('Failed to copy', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    // Show copy feedback message
    function showCopyFeedback(message, type) {
        copyFeedback.textContent = message;
        copyFeedback.className = `copy-feedback show ${type}`;
        
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
    }

    // Animate copy button on successful copy
    function animateCopyButton() {
        const originalContent = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #00ff88)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalContent;
            copyBtn.style.background = '';
        }, 1500);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Enter or Space to generate
        if ((e.code === 'Enter' || e.code === 'Space') && !generateBtn.disabled) {
            e.preventDefault();
            generateBtn.click();
        }
        
        // Ctrl+C to copy (when username is generated)
        if (e.ctrlKey && e.code === 'KeyC' && !copyBtn.disabled) {
            e.preventDefault();
            copyBtn.click();
        }
    });

    // Auto-generate on page load for demo
    setTimeout(() => {
        generateBtn.click();
    }, 1000);

    // Add some interactive particles effect
    createParticles();

    function createParticles() {
        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.backgroundColor = '#00d4ff';
            particle.style.pointerEvents = 'none';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.borderRadius = '50%';
            particle.style.zIndex = '-1';
            
            // Random starting position
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            
            document.body.appendChild(particle);
            
            // Animate particle
            animateParticle(particle);
        }

        function animateParticle(particle) {
            let x = parseFloat(particle.style.left);
            let y = parseFloat(particle.style.top);
            let vx = (Math.random() - 0.5) * 0.5;
            let vy = (Math.random() - 0.5) * 0.5;
            
            function update() {
                x += vx;
                y += vy;
                
                // Wrap around screen
                if (x < 0) x = window.innerWidth;
                if (x > window.innerWidth) x = 0;
                if (y < 0) y = window.innerHeight;
                if (y > window.innerHeight) y = 0;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                
                requestAnimationFrame(update);
            }
            
            update();
        }
    }

    // Add glow effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const glow = document.createElement('div');
        glow.style.position = 'fixed';
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.width = '10px';
        glow.style.height = '10px';
        glow.style.background = 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)';
        glow.style.borderRadius = '50%';
        glow.style.pointerEvents = 'none';
        glow.style.zIndex = '-1';
        glow.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(glow);
        
        setTimeout(() => {
            glow.style.opacity = '0';
            glow.style.transform = 'translate(-50%, -50%) scale(2)';
            glow.style.transition = 'all 0.5s ease-out';
        }, 10);
        
        setTimeout(() => {
            if (glow.parentNode) {
                glow.parentNode.removeChild(glow);
            }
        }, 500);
    });
});
