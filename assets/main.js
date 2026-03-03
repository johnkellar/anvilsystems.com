document.addEventListener('DOMContentLoaded', () => {
    // Auto-update copyright year
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile hamburger menu toggle
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('nav-links');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const expanded = nav.classList.toggle('active');
            toggle.setAttribute('aria-expanded', expanded);
        });
    }

    // Close menu on nav link click (mobile)
    if (nav) {
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Active nav link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // IntersectionObserver scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
