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

    // Active nav link highlighting. Uses an observer rather than a scroll
    // handler so it costs no forced layout while scrolling.
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const setActive = (id) => {
        navLinks.forEach(link => {
            const match = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', match);
            if (match) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    if ('IntersectionObserver' in window && sections.length) {
        const visible = new Set();
        const order = [...sections].map(s => s.id);

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visible.add(entry.target.id);
                } else {
                    visible.delete(entry.target.id);
                }
            });
            const current = order.filter(id => visible.has(id))[0];
            setActive(current);
        }, { rootMargin: '-120px 0px -60% 0px' });

        sections.forEach(section => navObserver.observe(section));
    }

    // IntersectionObserver scroll reveal. If the observer is unavailable or
    // throws, reveal everything rather than leaving the page blank.
    const revealAll = () => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    };

    if (!('IntersectionObserver' in window)) {
        revealAll();
    } else {
        try {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        } catch (err) {
            revealAll();
        }
    }
});
