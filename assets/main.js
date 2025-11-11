document.addEventListener('DOMContentLoaded', () => {
    // Auto-update copyright year
    document.getElementById('copyright-year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('nav-links');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const expanded = nav.classList.toggle('active');
            toggle.setAttribute('aria-expanded', expanded);
        });
    }

    // Active nav link highlighting
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Optional: Highlight current section on scroll (smooth bonus)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
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
});