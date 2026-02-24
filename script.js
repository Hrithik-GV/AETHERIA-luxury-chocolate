document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // --- Intersection Observer for Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Keep observing if we want it to reset on scroll back up? 
                // The prompt says "rise up into view as the user scrolls", usually implies one-way or repeated. 
                // Let's keep it repeated for more "weightless" feel.
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Floating Particle System ---
    const createParticles = (containerId, count) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random properties
            const size = Math.random() * 20 + 5;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 10;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.setProperty('--delay', `${delay}s`);

            // Randomly make some particles look like cocoa beans (ellipses) or sprinkles
            if (Math.random() > 0.5) {
                particle.style.borderRadius = '50% 20% 50% 20%';
                particle.style.background = 'var(--deep-brown)';
                particle.style.boxShadow = '0 0 10px var(--gold-glow)';
            }

            container.appendChild(particle);
        }
    };

    createParticles('particle-container', 30);
    createParticles('footer-particles', 15);

    // --- Parallax Scrolling Effect ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Background particles move upward faster
        const particles = document.querySelectorAll('.particle');
        particles.forEach(p => {
            const speed = 0.2;
            p.style.transform = `translateY(-${scrolled * speed}px)`;
        });

        // Hero content subtle parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(-${scrolled * 0.3}px)`;
        }
    });

    // --- Cursor Trail ---
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;

        // Random slight offset for a "floating away" look
        const offsetX = (Math.random() - 0.5) * 20;
        dot.style.marginLeft = `${offsetX}px`;

        document.body.appendChild(dot);

        // Remove dot after animation finishes
        setTimeout(() => {
            dot.remove();
        }, 1500);
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.getElementById('navbar');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navbar.classList.toggle('active');
    });

    // --- Smooth Scroll for Nav Links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            menuBtn.classList.remove('open');
            navbar.classList.remove('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
});
