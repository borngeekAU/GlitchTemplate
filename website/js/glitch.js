/* ============================================
   RUKSPIN ARCHIVE V2.1 - GLITCH EFFECTS JS
   Advanced visual glitch effects
   ============================================ */

(function() {
    'use strict';

    /* ----------------------------------------
       Canvas Noise Generator
       ---------------------------------------- */
    class NoiseGenerator {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.isRunning = false;
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        generateNoise() {
            const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;     // R
                data[i + 1] = value; // G
                data[i + 2] = value; // B
                data[i + 3] = 8;     // A (very transparent)
            }
            
            this.ctx.putImageData(imageData, 0, 0);
        }

        start() {
            this.isRunning = true;
            this.animate();
        }

        stop() {
            this.isRunning = false;
        }

        animate() {
            if (!this.isRunning) return;
            this.generateNoise();
            requestAnimationFrame(() => this.animate());
        }
    }

    /* ----------------------------------------
       Glitch Effect Controller
       ---------------------------------------- */
    class GlitchController {
        constructor() {
            this.intensity = 1;
            this.isActive = true;
            this.glitchElements = [];
        }

        init() {
            this.glitchElements = document.querySelectorAll('.glitch-text');
            this.bindEvents();
            this.startRandomGlitches();
        }

        bindEvents() {
            // Increase glitch on scroll
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                this.intensity = 2;
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    this.intensity = 1;
                }, 500);
            });

            // Glitch on visibility change
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    this.triggerIntenseGlitch();
                }
            });
        }

        startRandomGlitches() {
            setInterval(() => {
                if (Math.random() < 0.1 * this.intensity) {
                    this.triggerGlitch();
                }
            }, 3000);
        }

        triggerGlitch() {
            const element = this.glitchElements[
                Math.floor(Math.random() * this.glitchElements.length)
            ];
            
            if (element) {
                element.style.animation = 'none';
                element.offsetHeight; // Trigger reflow
                element.style.animation = '';
            }
        }

        triggerIntenseGlitch() {
            document.body.classList.add('intense-glitch-mode');
            setTimeout(() => {
                document.body.classList.remove('intense-glitch-mode');
            }, 500);
        }
    }

    /* ----------------------------------------
       VHS Effect Controller
       ---------------------------------------- */
    class VHSEffect {
        constructor() {
            this.trackingOffset = 0;
            this.isTracking = false;
        }

        init() {
            this.createTrackingLine();
            this.startTracking();
        }

        createTrackingLine() {
            const line = document.createElement('div');
            line.className = 'vhs-line';
            line.style.cssText = `
                position: fixed;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(255, 255, 255, 0.1) 20%,
                    rgba(255, 255, 255, 0.3) 50%,
                    rgba(255, 255, 255, 0.1) 80%,
                    transparent 100%
                );
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
            `;
            document.body.appendChild(line);
            this.line = line;
        }

        startTracking() {
            setInterval(() => {
                if (Math.random() < 0.05) {
                    this.showTrackingLine();
                }
            }, 2000);
        }

        showTrackingLine() {
            const startY = Math.random() * window.innerHeight;
            this.line.style.top = startY + 'px';
            this.line.style.opacity = '1';
            
            let currentY = startY;
            const animate = () => {
                currentY += 5;
                this.line.style.top = currentY + 'px';
                
                if (currentY < window.innerHeight) {
                    requestAnimationFrame(animate);
                } else {
                    this.line.style.opacity = '0';
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    /* ----------------------------------------
       Color Separation Effect
       ---------------------------------------- */
    class ColorSeparation {
        constructor() {
            this.offset = 2;
        }

        apply(element) {
            const text = element.textContent;
            element.setAttribute('data-text', text);
        }

        pulse() {
            const root = document.documentElement;
            let offset = 0;
            
            const animate = () => {
                offset += 0.1;
                const value = Math.sin(offset) * 2;
                root.style.setProperty('--glitch-offset', value + 'px');
                requestAnimationFrame(animate);
            };
            
            animate();
        }
    }

    /* ----------------------------------------
       Screen Tear Effect
       ---------------------------------------- */
    class ScreenTear {
        constructor() {
            this.tearCount = 0;
            this.maxTears = 3;
        }

        init() {
            this.container = document.createElement('div');
            this.container.className = 'screen-tear-container';
            this.container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9998;
                overflow: hidden;
            `;
            document.body.appendChild(this.container);
            
            this.startRandomTears();
        }

        startRandomTears() {
            setInterval(() => {
                if (Math.random() < 0.03 && this.tearCount < this.maxTears) {
                    this.createTear();
                }
            }, 1000);
        }

        createTear() {
            this.tearCount++;
            
            const tear = document.createElement('div');
            const y = Math.random() * window.innerHeight;
            const height = 5 + Math.random() * 20;
            const offset = (Math.random() - 0.5) * 20;
            
            tear.style.cssText = `
                position: absolute;
                top: ${y}px;
                left: 0;
                width: 100%;
                height: ${height}px;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(0, 255, 136, 0.1),
                    rgba(255, 0, 102, 0.1),
                    transparent
                );
                transform: translateX(${offset}px) skewX(${offset/2}deg);
                animation: tear-fade 0.5s ease forwards;
            `;
            
            this.container.appendChild(tear);
            
            setTimeout(() => {
                tear.remove();
                this.tearCount--;
            }, 500);
        }
    }

    /* ----------------------------------------
       Initialize All Effects
       ---------------------------------------- */
    function initGlitchEffects() {
        // Add required styles
        const styles = document.createElement('style');
        styles.textContent = `
            .intense-glitch-mode {
                animation: intense-glitch 0.5s ease;
            }
            
            @keyframes intense-glitch {
                0%, 100% { filter: none; }
                10% { filter: hue-rotate(90deg) saturate(2); }
                20% { filter: hue-rotate(-90deg) saturate(0.5); }
                30% { filter: hue-rotate(180deg); }
                40% { filter: invert(0.1); }
                50% { filter: hue-rotate(-180deg) saturate(1.5); }
            }
            
            @keyframes tear-fade {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }
            
            .intense-glitch .glitch-text::before,
            .intense-glitch .glitch-text::after {
                animation-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(styles);

        // Initialize controllers
        const glitchController = new GlitchController();
        glitchController.init();

        const vhsEffect = new VHSEffect();
        vhsEffect.init();

        const screenTear = new ScreenTear();
        screenTear.init();

        const colorSep = new ColorSeparation();
        colorSep.pulse();

        // Expose to window for debugging
        window.glitchEffects = {
            glitch: glitchController,
            vhs: vhsEffect,
            tear: screenTear,
            color: colorSep
        };
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlitchEffects);
    } else {
        initGlitchEffects();
    }

})();
