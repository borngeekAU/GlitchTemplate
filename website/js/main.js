/* ============================================
   RUKSPIN ARCHIVE V2.1 - MAIN JAVASCRIPT
   Core functionality and interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initTimestamp();
    initFrequency();
    initTerminalAnimation();
    initGridInteractions();
    initSmoothScroll();
    initLazyLoad();
});

/* ----------------------------------------
   Timestamp Display
   ---------------------------------------- */
function initTimestamp() {
    const timestampEl = document.getElementById('timestamp');
    if (!timestampEl) return;

    function updateTimestamp() {
        const now = new Date();
        const formatted = now.toISOString()
            .replace('T', ' ')
            .replace(/\.\d{3}Z$/, '');
        timestampEl.textContent = formatted;
    }

    updateTimestamp();
    setInterval(updateTimestamp, 1000);
}

/* ----------------------------------------
   Frequency Display (Random fluctuation)
   ---------------------------------------- */
function initFrequency() {
    const freqEl = document.getElementById('frequency');
    if (!freqEl) return;

    function updateFrequency() {
        const base = 108.7;
        const variance = (Math.random() - 0.5) * 0.4;
        const freq = (base + variance).toFixed(2);
        freqEl.textContent = freq;
    }

    updateFrequency();
    setInterval(updateFrequency, 2000);
}

/* ----------------------------------------
   Terminal Animation
   ---------------------------------------- */
function initTerminalAnimation() {
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;

    const lines = terminalOutput.querySelectorAll('p');
    
    // Hide all lines initially
    lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';
    });

    // Animate lines sequentially
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 500 + (index * 600));
    });
}

/* ----------------------------------------
   Grid Item Interactions
   ---------------------------------------- */
function initGridInteractions() {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add glitch effect on click
            this.classList.add('glitch-click');
            
            // Show "file access" message
            showNotification('ACCESSING FILE... PLEASE WAIT');
            
            setTimeout(() => {
                this.classList.remove('glitch-click');
                showNotification('FILE PREVIEW NOT AVAILABLE - UPLOAD CONTENT TO ENABLE');
            }, 1500);
        });

        // Add hover sound effect class
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });

        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    });
}

/* ----------------------------------------
   Notification System
   ---------------------------------------- */
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span class="notification-icon">[!]</span>
        <span class="notification-text">${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        border: 1px solid var(--color-accent-primary, #00ff88);
        padding: 15px 25px;
        font-family: 'Share Tech Mono', monospace;
        font-size: 0.9rem;
        color: var(--color-accent-primary, #00ff88);
        z-index: 10000;
        animation: notification-in 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'notification-out 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to document
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes notification-in {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes notification-out {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
    .glitch-click {
        animation: glitch-click-anim 0.3s ease !important;
    }
    @keyframes glitch-click-anim {
        0%, 100% { transform: translateY(0) skewX(0); }
        25% { transform: translateY(-2px) skewX(2deg); }
        50% { transform: translateY(2px) skewX(-2deg); }
        75% { transform: translateY(-1px) skewX(1deg); }
    }
`;
document.head.appendChild(notificationStyles);

/* ----------------------------------------
   Smooth Scroll
   ---------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ----------------------------------------
   Lazy Load Images
   ---------------------------------------- */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/* ----------------------------------------
   Utility Functions
   ---------------------------------------- */

// Random glitch trigger
function triggerRandomGlitch() {
    const elements = document.querySelectorAll('.glitch-text');
    const randomEl = elements[Math.floor(Math.random() * elements.length)];
    
    if (randomEl) {
        randomEl.classList.add('intense-glitch');
        setTimeout(() => randomEl.classList.remove('intense-glitch'), 200);
    }
}

// Trigger random glitches occasionally
setInterval(triggerRandomGlitch, 5000 + Math.random() * 10000);

// Console Easter Egg
console.log('%c GLITCH_STITCH ', 'background: #00ff88; color: #000; font-size: 20px; font-weight: bold;');
console.log('%c RECOVERED DATA ARCHIVE ', 'background: #111; color: #00ff88; font-size: 12px;');
console.log('%c Welcome to the archive. You found the console. ', 'color: #888;');
