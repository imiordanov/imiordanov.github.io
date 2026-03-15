/**
 * Iordan Iordanov — Personal Site JS
 * No jQuery, no Semantic UI. Vanilla only.
 */

/* ── Copyright year ── */
document.getElementById('currentYear').textContent = new Date().getFullYear();

/* ── Hero canvas: animated Delaunay-inspired mesh ── */
(function () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, pts, edges;
    const POINT_COUNT = 60;
    const MAX_DIST = 200;
    const SPEED = 0.18;

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    function randomPt() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * SPEED,
            vy: (Math.random() - 0.5) * SPEED,
        };
    }

    function init() {
        resize();
        pts = Array.from({ length: POINT_COUNT }, randomPt);
    }

    function update() {
        pts.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Draw edges
        for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
                const dx = pts[i].x - pts[j].x;
                const dy = pts[i].y - pts[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < MAX_DIST) {
                    const alpha = 1 - d / MAX_DIST;
                    ctx.beginPath();
                    ctx.moveTo(pts[i].x, pts[i].y);
                    ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = `rgba(94, 231, 208, ${alpha * 0.25})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Draw points
        pts.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(94, 231, 208, 0.5)';
            ctx.fill();
        });
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', () => {
        resize();
    });

    init();
    loop();
})();

/* ── Typing effect ── */
(function () {
    const el = document.getElementById('typedTextA');
    if (!el) return;

    const phrases = [
        'Computational Geometry & AI',
        'From hyperbolic surfaces to design automation',
        'Making sense of shape',
        'Ph.D. · Former CTO · Perpetual foreigner',
    ];

    let pi = 0, ci = 0, deleting = false;

    function tick() {
        const phrase = phrases[pi];
        if (!deleting) {
            el.textContent = phrase.slice(0, ci + 1);
            ci++;
            if (ci === phrase.length) {
                deleting = true;
                setTimeout(tick, 2200);
                return;
            }
            setTimeout(tick, 55);
        } else {
            el.textContent = phrase.slice(0, ci - 1);
            ci--;
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
                setTimeout(tick, 400);
                return;
            }
            setTimeout(tick, 28);
        }
    }
    setTimeout(tick, 800);
})();

/* ── Navigation: scroll class + active section + mobile ── */
(function () {
    const nav = document.getElementById('nav');
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('navMobile');

    // Scroll state
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);

        // Active nav link
        let current = '';
        sections.forEach(s => {
            const top = s.offsetTop - 80;
            if (window.scrollY >= top) current = s.id;
        });
        links.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });

    // Hamburger
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
})();

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ── Reveal on scroll ── */
(function () {
    const els = document.querySelectorAll('.section, .timeline-entry, .project-card, .fact-card, .interactive-card, .edu-item, .insight-block, .featured-project, .substack-block');
    els.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
})();

/* ── Earlier positions toggle ── */
(function () {
    const btn = document.getElementById('showMoreBtn');
    const panel = document.getElementById('earlierWork');
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
        const open = panel.classList.toggle('visible');
        btn.classList.toggle('open', open);
        btn.querySelector('button').firstChild.textContent = open
            ? 'Hide earlier positions '
            : 'Show earlier positions ';
    });
})();
