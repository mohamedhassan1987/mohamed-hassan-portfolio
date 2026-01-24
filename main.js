// Intersection Observer for Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Copy Email Functionality
    const copyBtn = document.getElementById('copy-email');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = 'hassan.egy1987@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                const originalHtml = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span>✅</span> Copied!';
                copyBtn.style.borderColor = 'var(--accent-color)';

                setTimeout(() => {
                    copyBtn.innerHTML = originalHtml;
                    copyBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // Background Music Logic
    const audio = document.getElementById('bg-music');
    const muteToggle = document.getElementById('mute-toggle');
    const volumeSlider = document.getElementById('volume-slider');

    if (audio) {
        audio.volume = 0.05; // Default volume (5%)

        // Attempt Autoplay
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented. Waiting for user interaction.");
                // Add one-time click listener to start audio
                document.addEventListener('click', () => {
                    audio.play();
                }, { once: true });
            });
        }

        // Mute Toggle
        muteToggle.addEventListener('click', () => {
            if (audio.muted) {
                audio.muted = false;
                muteToggle.textContent = '🔊';
            } else {
                audio.muted = true;
                muteToggle.textContent = '🔇';
            }
        });

        // Volume Slider
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
            if (audio.volume === 0) {
                muteToggle.textContent = '🔇';
                audio.muted = true;
            } else {
                muteToggle.textContent = '🔊';
                audio.muted = false;
            }
        });
    }
});
