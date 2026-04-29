/**
 * Terminal Interface
 */

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
/* ── Duration helpers ── */
function parsePeriod(period) {
    const MONTHS = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
    const parts = period.split('~').map(function(s) { return s.trim(); });
    function parseDate(s) {
        if (s.toLowerCase() === 'present') return new Date();
        const m = s.match(/^([A-Za-z]+)\s+(\d{4})$/);
        if (!m) return null;
        return new Date(parseInt(m[2], 10), MONTHS[m[1]] || 0, 1);
    }
    const start = parseDate(parts[0]);
    const end   = parseDate(parts[1] || '');
    if (!start || !end) return null;
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    return Math.max(1, months);
}

function formatDuration(months) {
    const y = Math.floor(months / 12);
    const m = months % 12;
    if (y === 0) return m + 'mo';
    if (m === 0) return y + 'yr';
    return y + 'yr ' + m + 'mo';
}

const WORK = [
    {
        id: 'braid',
        period: 'Sep 2025 ~ present',
        org: 'Braid Technologies',
        orgUrl: 'https://braid.tech',
        name: 'Researcher',
        role: 'Researcher',
        fields: ['Research', 'Software Dev'],
        meta: 'Tokyo, Japan',
        body: 'R&D on geometry processing and design automation for manufacturing applications. Design and implementation of algorithms for 3D mesh processing. Focus on building a robust infrastructure for scalable geometry generation pipeline and its automation.',
        tags: ['Geometry Generation', 'Computational Design', 'Design Optimization', 'Design Automation'],
    },
    {
        id: 'corpy',
        period: 'Jul 2019 ~ Jul 2025',
        org: 'Corpy&Co.',
        orgUrl: 'https://corpy.co.jp',
        name: 'Chief Scientist → CTO / Director',
        role: 'Chief Scientist → CTO / Director',
        fields: ['AI / ML', 'Management', 'Research', 'Software Dev'],
        meta: 'Tokyo, Japan',
        body: 'Technical R&D across 50+ client projects in manufacturing, automotive, and industrial AI. Deep learning for computer vision in depth estimation, pose estimation, object detection, optical flow, and others. Four funded AIST collaborations on AI Quality Management. Built an Explainable AI platform including model quantization for edge deployment. Scaled the engineering organization from 10 to 70 people; introduced OKRs and built internal research and hiring pipelines. Headed ISO standardization of processes and practices, and ISMS implementation in preparation for IPO.',
        tags: ['PyTorch', 'Computer Vision', 'MLOps', 'XAI', 'GANs', 'Team Scaling', 'ISMS'],
    },
    {
        id: 'gamestream',
        period: 'Jan 2019 ~ Jun 2019',
        org: 'Gamestream',
        orgUrl: 'https://gamestream.biz',
        name: 'R&D Engineer',
        role: 'R&D Engineer',
        fields: ['Research', 'Software Dev'],
        meta: 'Ludres, France',
        body: 'Developed game streaming client applications for Samsung TVs. Used proprietary SDK to enable full-HD gaming at 60fps. Experimented with frame upscaling using neural networks.',
        tags: ['Game Streaming', 'C++', 'Neural Networks'],
    },
    {
        id: 'phd',
        period: 'Jan 2016 ~ Dec 2018',
        org: 'University of Lorraine',
        orgUrl: 'http://gamble.loria.fr',
        name: 'Ph.D. Candidate',
        role: 'Ph.D. Candidate',
        fields: ['Research', 'Software Dev'],
        meta: 'Nancy, France',
        body: 'Applied research in Computational Geometry. Formulated and implemented an algorithm for constructing periodic triangulations of hyperbolic surfaces. This research is now part of the CGAL open-source library.',
        tags: ['C++', 'CGAL', 'Hyperbolic Geometry', 'Delaunay Triangulations'],
        links: [
            { label: '↗ thesis: Delaunay triangulations of hyperbolic surfaces', href: 'docs/PhD-thesis.pdf' },
            { label: '↗ CGAL announcement', href: 'https://www.cgal.org/2019/02/25/Hyperbolic_triangulations/' },
        ],
    },
    {
        id: 'forth',
        period: 'Dec 2014 ~ Oct 2015',
        org: 'IACM-FORTH',
        orgUrl: 'https://www.iacm.forth.gr',
        name: 'Graduate Research Assistant',
        role: 'Graduate Research Assistant',
        fields: ['Research', 'Software Dev'],
        meta: 'Heraklion, Greece',
        body: 'Applied geometric processing to medical research on Abdominal Aortic Aneurysms (AAA). My first peer-reviewed journal, and the one that\'s dearest to me.',
        tags: ['Geometry', 'Medical Imaging', 'C++'],
        links: [
            { label: '↗ doi: Medical & Biological Engineering & Computing, 2016', href: 'https://doi.org/10.1007/s11517-016-1508-9' },
        ],
    },
    {
        id: '01sistemi',
        period: 'May 2013 ~ Jun 2014',
        org: '01Sistemi',
        orgUrl: 'http://www.01s.it',
        name: 'Software Developer',
        role: 'Software Developer',
        fields: ['Software Dev'],
        meta: 'Sansepolcro, Italy',
        body: 'Developed business software solutions. Built tools for Italian cadastral PDF parsing, and reimplemented the tax calculation engine for the 730 tax declaration.',
        tags: ['Java', 'InstantDeveloper'],
    },
    {
        id: 'nanosoft',
        period: 'Dec 2009 ~ Mar 2012',
        org: 'Nanosoft',
        orgUrl: 'https://nanosoft.gr',
        name: 'Software Developer',
        role: 'Software Developer',
        fields: ['Software Dev'],
        meta: 'Chania, Greece',
        body: 'Developed order-taking applications for Windows and Windows CE devices. My first experience with VB.NET, WPF, and Android programming.',
        tags: ['VB.NET', 'WPF', 'Android'],
    },
    {
        id: 'erbamea',
        period: 'Jul 2007 ~ Nov 2009',
        org: 'Erbamea',
        orgUrl: 'https://www.erbamea.it/index.php/en',
        name: 'Warehouse Manager & QA',
        role: 'Warehouse Manager & Responsible for Quality Assurance',
        fields: ['Other'],
        meta: 'Italy',
        body: 'A detour from university for family reasons that turned out to be one of the more memorable experiences of my life. I worked with one of the experts in the field of officinal plants and he taught me more things than I could recount.',
        tags: ['Quality Assurance', 'Warehouse Management', 'Forklift Operator'],
    },
];

const PROJECTS = [
    {
        id: 'confide',
        period: '2019 ~ 2025',
        org: 'Corpy&Co.',
        orgUrl: 'https://factory.confide.tech',
        name: 'CONFIDE',
        role: 'AIOps Platform for Manufacturing',
        meta: 'MLOps · XAI · Manufacturing',
        body: 'An AIOps platform built to facilitate AI adoption in mission-critical applications for manufacturing. Covers data management, annotation, generation, model training, deployment, and explainability. Includes a companion app for model deployment and management on the edge.',
        tags: ['Explainable AI', 'QA4AI', 'Data Management', 'Model Management', 'Manufacturing'],
        links: [
            { label: '↗ factory.confide.tech', href: 'https://factory.confide.tech/' },
            { label: '↗ article: How to CONFIDE in a machine', href: 'https://medium.com/@corpy.ai.lab/explainable-artificial-intelligence-or-how-to-confide-in-a-machine-134097cc2a98' },
        ],
    },
    {
        id: 'qa-llm',
        period: '2023 ~ 2025',
        org: 'Corpy&Co.',
        name: 'QA for LLMs',
        role: 'Research: LLM Robustness',
        meta: 'AI Research',
        body: 'Fundamental research on quality assurance for black-box and white-box large language models. Investigation of the robustness of sentiment analysis to prompt transformations.',
        tags: ['LLMs', 'Quality Assurance', 'Robustness', 'AI Research'],
    },
    {
        id: 'qa-od',
        period: '2021 ~ 2023',
        org: 'Corpy&Co.',
        name: 'QA for Object Detection',
        role: 'Research: Autonomous Vehicles',
        meta: 'SOTIF · PEGASUS · ADAS',
        body: 'Quality assurance for object detection in autonomous vehicles. Comparative study under SOTIF and PEGASUS principles for ADAS suitability.',
        tags: ['Object Detection', 'SOTIF', 'PEGASUS', 'Autonomous Vehicles', 'ADAS'],
        links: [
            { label: '↗ SOTIF (ISO 21448)', href: 'https://www.iso.org/standard/77490.html' },
            { label: '↗ PEGASUS method', href: 'https://www.pegasusprojekt.de/en/pegasus-method' },
            { label: '↗ ADAS (Wikipedia)', href: 'https://en.wikipedia.org/wiki/Advanced_driver-assistance_system' },
        ],
    },
    {
        id: 'ood',
        period: '2020 ~ 2022',
        org: 'Corpy&Co.',
        name: 'Out-of-Distribution Detection',
        role: 'Research: Obstacle Detection',
        meta: 'AI Research · Safety',
        body: 'Custom method for detecting unknown objects with a one-step object detector. State-of-the-art performance for obstacle detection.',
        tags: ['OOD Detection', 'Object Detection', 'Safety', 'AI Research'],
    },
    {
        id: 'battery',
        period: '2020 ~ 2021',
        org: 'Corpy&Co.',
        name: 'Battery Manufacturing Optimization',
        role: 'Research: Industrial AI',
        meta: 'GANs · Genetic Algorithms',
        body: 'Algorithm combining GANs and Genetic Algorithms to optimize industrial battery manufacturing while maintaining feasibility constraints.',
        tags: ['GANs', 'Genetic Algorithms', 'Manufacturing', 'Optimization'],
    },
    {
        id: 'cgal',
        period: '2016 ~ 2018',
        org: 'Ph.D.',
        orgUrl: 'https://www.cgal.org/2019/02/25/Hyperbolic_triangulations/',
        name: 'CGAL: Periodic Hyperbolic Triangulations',
        role: 'Ph.D. Research — Open Source',
        meta: 'Computational Geometry · C++',
        body: 'Periodic Delaunay triangulations of the Bolza surface. Integrated in CGAL, the largest open-source library for computational geometry. The direct result of my Ph.D.',
        tags: ['C++', 'CGAL', 'Hyperbolic Geometry', 'Delaunay Triangulations', 'Open Source'],
        links: [
            { label: '↗ CGAL announcement', href: 'https://www.cgal.org/2019/02/25/Hyperbolic_triangulations/' },
        ],
    },
    {
        id: 'aneurysm',
        period: '2014 ~ 2015',
        org: 'IACM-FORTH',
        orgUrl: 'https://www.iacm.forth.gr',
        name: 'Aortic Aneurysm Analysis',
        role: 'Research — Medical Geometry',
        meta: 'Geometry · Medical Imaging',
        body: 'Geometry-based methods for morphological analysis of abdominal aortic aneurysms.',
        tags: ['Computational Geometry', 'Medical Imaging', 'C++', 'Peer-reviewed'],
        links: [
            { label: '↗ doi: Medical & Biological Engineering & Computing, 2016', href: 'https://doi.org/10.1007/s11517-016-1508-9' },
        ],
    },
];

/* ─────────────────────────────────────────────
   POINCARÉ DISK
───────────────────────────────────────────── */
(function () {
    const canvas = document.getElementById('diskCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, cx, cy, R, angle = 0;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        cx = W / 2; cy = H / 2;
        R  = Math.min(W, H) * 0.46;
    }

    function toCanvas(px, py) {
        const cos = Math.cos(angle), sin = Math.sin(angle);
        const rx  = px * cos - py * sin;
        const ry  = px * sin + py * cos;
        return [cx + rx * R, cy + ry * R];
    }

    function geodesic(p1x, p1y, p2x, p2y, alpha) {
        const [x1, y1] = toCanvas(p1x, p1y);
        const [x2, y2] = toCanvas(p2x, p2y);
        const cross = p1x * p2y - p1y * p2x;
        if (Math.abs(cross) < 0.01) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = 'rgba(46,201,176,' + alpha + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
            return;
        }
        const ax = p1x, ay = p1y, bx = p2x, by = p2y;
        const ma = ax * ax + ay * ay - 1;
        const mb = bx * bx + by * by - 1;
        const d  = 2 * (ax * by - ay * bx);
        if (Math.abs(d) < 1e-6) return;
        const ux = (ma * by - mb * ay) / d;
        const uy = (ax * mb - bx * ma) / d;
        const r  = Math.sqrt((ax - ux) * (ax - ux) + (ay - uy) * (ay - uy));
        const [ucx, ucy] = toCanvas(ux, uy);
        const cr = r * R;
        const startAngle = Math.atan2(y1 - ucy, x1 - ucx);
        const endAngle   = Math.atan2(y2 - ucy, x2 - ucx);
        let diff = endAngle - startAngle;
        while (diff >  Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(ucx, ucy, cr, startAngle, startAngle + diff, diff < 0);
        ctx.strokeStyle = 'rgba(46,201,176,' + alpha + ')';
        ctx.lineWidth = 0.6;
        ctx.stroke();
    }

    function diskPoints(n, r) {
        const pts = [];
        for (let i = 0; i < n; i++) {
            const a = (2 * Math.PI * i) / n;
            pts.push([r * Math.cos(a), r * Math.sin(a)]);
        }
        return pts;
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(46,201,176,0.07)';
        ctx.lineWidth = 1;
        ctx.stroke();

        const rings = [
            { r: 0.30, n: 5,  alpha: 0.20 },
            { r: 0.55, n: 8,  alpha: 0.14 },
            { r: 0.72, n: 12, alpha: 0.09 },
            { r: 0.86, n: 16, alpha: 0.06 },
            { r: 0.94, n: 22, alpha: 0.03 },
        ];

        rings.forEach(function(ring) {
            const pts = diskPoints(ring.n, ring.r);
            for (let i = 0; i < pts.length; i++) {
                const j = (i + 1) % pts.length;
                geodesic(pts[i][0], pts[i][1], pts[j][0], pts[j][1], ring.alpha);
            }
            for (let i = 0; i < pts.length; i++) {
                const j = (i + 2) % pts.length;
                geodesic(pts[i][0], pts[i][1], pts[j][0], pts[j][1], ring.alpha * 0.5);
            }
        });

        const radialN = 18;
        for (let i = 0; i < radialN; i++) {
            const a  = (2 * Math.PI * i) / radialN;
            const px = 0.95 * Math.cos(a), py = 0.95 * Math.sin(a);
            geodesic(0, 0, px, py, 0.05);
        }

        const [ocx, ocy] = toCanvas(0, 0);
        ctx.beginPath();
        ctx.arc(ocx, ocy, 2.5, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(232,160,32,0.7)';
        ctx.fill();

        rings.slice(0, 3).forEach(function(ring) {
            diskPoints(ring.n, ring.r).forEach(function(pt) {
                const [cx2, cy2] = toCanvas(pt[0], pt[1]);
                ctx.beginPath();
                ctx.arc(cx2, cy2, 1.2, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(46,201,176,' + (ring.alpha * 1.8) + ')';
                ctx.fill();
            });
        });
    }

    function loop() {
        angle += 0.0005;
        draw();
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    resize();
    loop();
})();

/* ─────────────────────────────────────────────
   TERMINAL ENGINE
───────────────────────────────────────────── */
(function () {
    const output    = document.getElementById('output');
    const promptText = document.getElementById('prompt-text');
    const realInput  = document.getElementById('realInput');
    const suggestions = document.querySelectorAll('.sug');
    const bootLines  = document.querySelectorAll('.boot-line');

    let history = [];
    let histIdx = -1;
    let busy    = false;

    /* ── Boot sequence ── */
    bootLines.forEach(function(line) {
        const delay = parseInt(line.dataset.delay || '0', 10);
        setTimeout(function() { line.classList.add('show'); }, delay);
    });

    /* ── DOM helpers — NO innerHTML ── */
    function el(tag, cls) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        return e;
    }

    function text(content) {
        return document.createTextNode(content);
    }

    function span(cls, textContent) {
        const s = el('span', cls);
        if (textContent !== undefined) s.textContent = textContent;
        return s;
    }

    function div(cls) {
        return el('div', cls);
    }

    function a(href, textContent, cls) {
        const link = el('a', cls);
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = textContent;
        return link;
    }

    /* ── Echo the command typed ── */
    function echoCmd(cmd) {
        const block = div('cmd-block');
        const echo  = div('cmd-echo');
        echo.appendChild(span('sigil', 'iordan@tokyo:~$'));
        echo.appendChild(span('typed', cmd));
        block.appendChild(echo);
        const result = div('result');
        block.appendChild(result);
        output.appendChild(block);
        return result;
    }

    /* ── Staggered reveal of child elements ── */
    function revealLines(container, children, baseDelay, step) {
        baseDelay = baseDelay || 80;
        step      = step      || 60;
        children.forEach(function(child, i) {
            child.style.opacity = '0';
            child.style.transform = 'translateY(6px)';
            child.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            container.appendChild(child);
            setTimeout(function() {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, baseDelay + i * step);
        });
        setTimeout(function() {
            output.scrollTop = output.scrollHeight;
        }, baseDelay + children.length * step);
    }

    /* ── Scroll to bottom ── */
    function scrollBottom() {
        setTimeout(function() { output.scrollTop = output.scrollHeight; }, 50);
    }

    /* ══════════════════════════════════════════
       COMMAND HANDLERS
    ══════════════════════════════════════════ */

    function cmdWhoami(result) {
        const wrap = div('r-whoami');
        const layout = div('r-whoami-layout');

        /* ── Left: portrait column ── */
        const portraitCol = div('r-portrait-col');

        const portrait = document.createElement('img');
        portrait.src = 'img/me.jpg';
        portrait.alt = 'Iordan Iordanov';
        portrait.className = 'r-portrait';
        portraitCol.appendChild(portrait);
        portraitCol.appendChild(div('r-portrait-glow'));

        layout.appendChild(portraitCol);

        /* ── Right: text column ── */
        const textCol = div('r-whoami-text-col');

        const name = div('r-name');
        name.appendChild(text('Iordan '));
        const em = document.createElement('em');
        em.textContent = 'Iordanov';
        name.appendChild(em);
        textCol.appendChild(name);

        const tagline = div('r-tagline');
        tagline.textContent = 'Making sense of things, one breakdown at a time.';
        textCol.appendChild(tagline);

        const bio = div('r-bio');
        bio.appendChild(text('I do whatever needs to be done: research, code, architecture, management, counseling, to name a few. Breaking and rebuilding is the best way for me to learn. I care about impact, not titles. These days I\'m at '));
        bio.appendChild(a('https://braid.tech', 'Braid Technologies', null));
        bio.appendChild(text(', working on geometry generation and processing for manufacturing. Before that, I was the CTO at '));
        bio.appendChild(a('https://corpy.co.jp', 'Corpy&Co.', null));
        bio.appendChild(text(', where I shipped 50+ projects to clients while building an MLOps platform. Before that, I did a Ph.D. in Computational Geometry, which is now part of '));
        bio.appendChild(a('https://www.cgal.org/2019/02/25/Hyperbolic_triangulations/', 'CGAL', null));
        bio.appendChild(text('.'));
        textCol.appendChild(bio);

        /* ── Sparse fact rows ── */
        const facts = div('r-facts');
        const factData = [
            ['based',      'Tokyo, Japan'],
            ['origin',     'Bulgaria'],
            ['languages', [ 'Native (but rusty) in Greek and Bulgarian',
                            'Fluent in English and Italian',
                            'Confident in French',
                            'Hopeless in Japanese',
                            'Bonus minority language available upon request',
                          ]
                    ],
            ['lived in',   'Bulgaria · Greece · Italy · France · Japan'],
        ];
        factData.forEach(function(f) {
            const fact = div('r-fact-row');
            fact.appendChild(span('r-fact-key', f[0]));
            if (Array.isArray(f[1])) {
                const list = el('ul', 'r-fact-list');
                f[1].forEach(function(item) {
                    const li = el('li');
                    li.textContent = item;
                    list.appendChild(li);
                });
                fact.appendChild(list);
            } else {
                fact.appendChild(span('r-fact-val', f[1]));
            }
            facts.appendChild(fact);
        });
        textCol.appendChild(facts);

        /* ── Education block ── */
        const edu = div('r-edu');
        const eduEntries = [
            { degree: 'Ph.D. Computer Science', school: 'Université de Lorraine', year: '2016 ~ 2018', thesis: 'Delaunay triangulations of hyperbolic surfaces', thesisHref: 'docs/PhD-thesis.pdf' },
            { degree: 'M.Sc. Applied Mathematics', school: 'University of Crete', year: '2014 ~ 2015', thesis: 'Shape-Preserving Interpolation on the Sphere', thesisHref: 'docs/MSc-thesis.pdf' },
            { degree: 'B.Sc. Applied Mathematics', school: 'University of Crete', year: '2005 ~ 2013', note: 'Studies interrupted 2007 ~ 2009 for work in Italy', thesis: 'The Euclidean InSphere Predicate', thesisHref: 'docs/BSc-thesis.pdf' },
        ];
        eduEntries.forEach(function(e) {
            const item = div('r-edu-item');
            const top = div('r-edu-top');
            top.appendChild(span('r-edu-degree', e.degree));
            top.appendChild(span('r-edu-year', e.year));
            item.appendChild(top);
            const school = div('r-edu-school');
            school.textContent = e.school;
            item.appendChild(school);
            if (e.note) {
                const note = div('r-edu-note');
                note.textContent = e.note;
                item.appendChild(note);
            }
            const thesis = a(e.thesisHref, '↗ ' + e.thesis, 'r-edu-thesis');
            thesis.target = '_blank';
            item.appendChild(thesis);
            edu.appendChild(item);
        });
        textCol.appendChild(edu);

        layout.appendChild(textCol);
        wrap.appendChild(layout);

        const hint = div('back-sug');
        hint.appendChild(text('→ '));
        const b1 = document.createElement('button');
        b1.textContent = 'ls work/';
        b1.addEventListener('click', function() { typeCommand('ls work/'); });
        hint.appendChild(b1);
        hint.appendChild(text('  '));
        const b2 = document.createElement('button');
        b2.textContent = 'ls projects/';
        b2.addEventListener('click', function() { typeCommand('ls projects/'); });
        hint.appendChild(b2);
        wrap.appendChild(hint);

        result.appendChild(wrap);
        scrollBottom();
    }

    function cmdLsWork(result) {
        const wrap = div('r-ls');
        const header = div('ls-header');
        header.textContent = 'PERIOD          ORG                NAME                  DURATION';
        wrap.appendChild(header);

        const rows = WORK.map(function(w) {
            const months = parsePeriod(w.period);
            const row = div('ls-entry');
            row.setAttribute('role', 'button');
            row.setAttribute('tabindex', '0');
            row.setAttribute('aria-label', w.org + ', ' + w.name + ', ' + w.period);
            row.appendChild(span('ls-period', w.period));
            row.appendChild(span('ls-org',    w.org));
            row.appendChild(span('ls-name',   w.name));
            const badges = div('ls-fields');
            (w.fields || []).forEach(function(f) {
                badges.appendChild(span('ls-field-badge', f));
            });
            row.appendChild(badges);
            row.appendChild(span('ls-duration', months ? formatDuration(months) : ''));
            function activate() { typeCommand('cat ' + w.id); }
            row.addEventListener('click', activate);
            row.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
            });
            return row;
        });

        /* ── Field totals ── */
        const fieldTotals = {};
        WORK.forEach(function(w) {
            const fs = w.fields && w.fields.length ? w.fields : ['Other'];
            const m = parsePeriod(w.period) || 0;
            fs.forEach(function(f) {
                fieldTotals[f] = (fieldTotals[f] || 0) + m;
            });
        });
        const fieldOrder = ['Software Dev', 'Research', 'AI / ML', 'Management', 'Other'];
        const totalsRow = div('ls-field-totals');
        fieldOrder.forEach(function(f) {
            if (!fieldTotals[f]) return;
            const item = span('ls-field-total-item', '');
            item.appendChild(span('ls-field-label', f));
            item.appendChild(span('ls-field-val', formatDuration(fieldTotals[f])));
            totalsRow.appendChild(item);
        });

        revealLines(wrap, rows, 60, 50);
        setTimeout(function() {
            wrap.appendChild(totalsRow);
            totalsRow.style.opacity = '0';
            totalsRow.style.transition = 'opacity 0.4s ease';
            setTimeout(function() { totalsRow.style.opacity = '1'; }, 60 + rows.length * 50 + 100);
        }, 0);
        result.appendChild(wrap);
        scrollBottom();
    }

    function cmdLsProjects(result) {
        const wrap = div('r-ls');
        const header = div('ls-header');
        header.textContent = 'PERIOD          ORG                NAME';
        wrap.appendChild(header);

        const rows = PROJECTS.map(function(p) {
            const row = div('ls-entry');
            row.setAttribute('role', 'button');
            row.setAttribute('tabindex', '0');
            row.setAttribute('aria-label', p.org + ', ' + p.name + ', ' + p.period);
            row.appendChild(span('ls-period', p.period));
            row.appendChild(span('ls-org',    p.org));
            row.appendChild(span('ls-name', p.name));
            function activate() { typeCommand('cat ' + p.id); }
            row.addEventListener('click', activate);
            row.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
            });
            return row;
        });

        revealLines(wrap, rows, 60, 50);
        result.appendChild(wrap);
        scrollBottom();
    }

    function cmdCat(id, result) {
        const entry = WORK.concat(PROJECTS).find(function(e) { return e.id === id; });
        if (!entry) {
            const err = div('r-error');
            err.textContent = 'cat: ' + id + ': no such file';
            result.appendChild(err);
            scrollBottom();
            return;
        }

        const wrap = div('r-cat');

        const header = div('r-cat-header');
        const role   = div('r-cat-role');
        role.textContent = entry.role;
        header.appendChild(role);

        const org = div('r-cat-org');
        if (entry.orgUrl) {
            org.appendChild(a(entry.orgUrl, entry.org, null));
        } else {
            org.textContent = entry.org;
        }
        header.appendChild(org);

        const meta = div('r-cat-meta');
        const isWork = WORK.some(function(w) { return w.id === id; });
        const months = isWork ? parsePeriod(entry.period) : null;
        const durationStr = months ? ' · ' + formatDuration(months) : '';
        meta.textContent = entry.meta + ' · ' + entry.period + durationStr;
        header.appendChild(meta);
        wrap.appendChild(header);

        const body = div('r-cat-body');
        body.textContent = entry.body;
        wrap.appendChild(body);

        const tags = div('r-cat-tags');
        entry.tags.forEach(function(t) {
            const tag = span('r-cat-tag', t);
            tags.appendChild(tag);
        });
        wrap.appendChild(tags);

        var links = null;
        if (entry.links && entry.links.length) {
            links = div('r-cat-links');
            entry.links.forEach(function(l) {
                const lnk = a(l.href, l.label, 'out-link');
                links.appendChild(lnk);
            });
        }
        if (links) wrap.appendChild(links);

        const isProject = PROJECTS.some(function(p) { return p.id === id; });
        const backCmd = isProject ? 'ls projects/' : 'ls work/';
        const hint = div('back-sug');
        hint.appendChild(text('← '));
        const btn = document.createElement('button');
        btn.textContent = backCmd;
        btn.addEventListener('click', function() { typeCommand(backCmd); });
        hint.appendChild(btn);
        wrap.appendChild(hint);

        const children = links
            ? [header, body, tags, links, hint]
            : [header, body, tags, hint];
        children.forEach(function(c) {
            c.style.opacity = '0';
            c.style.transform = 'translateY(6px)';
            c.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
        result.appendChild(wrap);

        children.forEach(function(c, i) {
            setTimeout(function() {
                c.style.opacity = '1';
                c.style.transform = 'translateY(0)';
            }, 80 + i * 70);
        });
        scrollBottom();
    }

    /* ── wget writing ── */
    function cmdWget(result) {
        const wrap = div('r-writing');

        const status = div('r-wget-status');
        const lines = [
            'Connecting to imiordanov.substack.com...',
            'HTTP request sent, awaiting response... 200 OK',
            'Length: unspecified [text/html]',
            'Saving to: oni-no-pantsu.html',
        ];
        lines.forEach(function(l) {
            const line = div('r-wget-line');
            line.textContent = l;
            status.appendChild(line);
        });
        wrap.appendChild(status);

        const titleLink = a('https://imiordanov.substack.com', '', null);
        titleLink.target = '_blank';
        titleLink.rel = 'noopener noreferrer';
        titleLink.style.textDecoration = 'none';
        const jp = div('r-jp');
        jp.textContent = '鬼のパンツ';
        titleLink.appendChild(jp);
        const romaji = div('r-romaji');
        romaji.textContent = 'oni no pantsu · the demon\'s pants';
        titleLink.appendChild(romaji);
        wrap.appendChild(titleLink);

        const quote = div('r-writing-quote');
        quote.textContent = 'The personal journal of a foreigner in Japan. Fatherhood, career, cultural shocks, mental health (and lack thereof) -- I\'ve got it all covered. Come along and laugh at my struggles.';
        wrap.appendChild(quote);

        const body = div('r-writing-body');
        body.textContent = 'I write on Substack about the things that don\'t fit anywhere else.';
        wrap.appendChild(body);

        const link = a('https://imiordanov.substack.com', '↗ imiordanov.substack.com', 'out-link amber');
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        wrap.appendChild(link);

        result.appendChild(wrap);
        scrollBottom();
    }

    /* ── grep <query> — publications ── */
    const PUBLICATIONS = [
        {
            ref: '[5]',
            file: 'icin2020.bib',
            authors: 'N. Ishikura, D. Kondo, I. Iordanov, V. Vassiliades, H. Tode',
            title: 'Cache-Property-Aware Features for DNS Tunneling Detection',
            venue: 'ICIN, Paris, 2020',
            note: 'Invited collaboration — contributed the AI/ML component.',
            href: 'https://doi.org/10.1109/ICIN48450.2020.9059314',
        },
        {
            ref: '[4]',
            file: 'curves2018b.bib',
            authors: 'M. Ebbens, I. Iordanov, M. Teillaud, G. Vegter',
            title: 'Systole of regular hyperbolic surfaces with an application to Delaunay triangulations',
            venue: 'Curves & Surfaces, Arcachon, 2018',
            href: 'https://hal.inria.fr/hal-01968285',
        },
        {
            ref: '[3]',
            file: 'curves2018a.bib',
            authors: 'M. Ebbens, I. Iordanov, M. Teillaud, G. Vegter',
            title: 'Delaunay triangulations of regular hyperbolic surfaces',
            venue: 'Curves & Surfaces, Arcachon, 2018',
            href: 'https://hal.inria.fr/hal-01968267',
        },
        {
            ref: '[2]',
            file: 'socg2017.bib',
            authors: 'I. Iordanov, M. Teillaud',
            title: 'Implementing Delaunay triangulations of the Bolza surface',
            venue: 'SoCG, pp. 44:1~44:15, 2017',
            href: 'https://doi.org/10.4230/LIPIcs.SoCG.2017.44',
        },
        {
            ref: '[1]',
            file: 'mbec2016.bib',
            authors: 'E. Metaxa, I. Iordanov, E. Maravelakis, Y. Papaharilaou',
            title: 'A novel approach for local abdominal aortic aneurysm growth quantification',
            venue: 'Medical & Biological Engineering & Computing, 2016',
            href: 'https://doi.org/10.1007/s11517-016-1508-9',
        },
    ];

    function cmdGrep(query, result) {
        const wrap = div('r-grep');

        const matches = query
            ? PUBLICATIONS.filter(function(p) {
                const hay = (p.title + ' ' + p.authors + ' ' + p.venue).toLowerCase();
                return hay.indexOf(query.toLowerCase()) !== -1;
              })
            : PUBLICATIONS;

        if (!matches.length) {
            const err = div('r-error');
            err.textContent = 'grep: no matches found for "' + query + '"';
            result.appendChild(err);
            scrollBottom();
            return;
        }

        const header = div('r-grep-header');
        header.textContent = query
            ? 'publications.bib:' + matches.length + ' match' + (matches.length > 1 ? 'es' : '') + ' for "' + query + '"'
            : 'publications.bib:' + matches.length + ' entries';
        wrap.appendChild(header);

        const rows = matches.map(function(p) {
            const row = div('r-grep-row');

            const meta = div('r-grep-meta');
            meta.appendChild(span('r-grep-ref', p.ref));
            row.appendChild(meta);

            const titleEl = a(p.href, p.title, 'r-grep-title');
            titleEl.target = '_blank';
            titleEl.rel = 'noopener noreferrer';
            row.appendChild(titleEl);

            const authors = div('r-grep-authors');
            authors.textContent = p.authors;
            row.appendChild(authors);

            const venue = div('r-grep-venue');
            venue.textContent = p.venue;
            row.appendChild(venue);

            if (p.note) {
                const note = div('r-grep-note');
                note.textContent = p.note;
                row.appendChild(note);
            }

            return row;
        });

        revealLines(wrap, rows, 60, 70);
        result.appendChild(wrap);
        scrollBottom();
    }

    /* ── man iordan ── */
    function cmdMan(result) {
        const wrap = div('r-man');

        const sections = [
            { key: 'NAME',        val: 'iordan — researcher, builder, chronic overthinker' },
            { key: 'SYNOPSIS',    val: 'iordan [--geometry] [--ai] [--software] [--research]' },
            { key: 'DESCRIPTION', val: 'Researcher at Braid Technologies, currently working on geometry generation and design automation for manufacturing. Former CTO at Corpy&Co., scaling a team from 10 to 70 engineers and delivering over 50 client-facing projects. Ph.D. in Computational Geometry from Université de Lorraine, France. Contributor to CGAL, the largest open-source library for computational geometry.' },
            { key: 'HISTORY',     val: 'Born in Bulgaria, of Linguri/Rudari heritage. Spent 13 years in Greece, then 3 years in Italy, then 3 in France, and moved to Japan in 2019. Became a husband in the times of COVID. Became a father of a very energetic boy in 2024.' },
            { key: 'LANGUAGES',   val: 'Bulgarian (native), Greek (native), English (fluent), Italian (fluent), French (advanced), Linguri (native), Japanese (currently faking it, not sure I\'ll ever make it)' },
            { key: 'BUGS',        val: 'Anxiety. Opinionated idealism. Dad jokes. No music taste.' },
            { key: 'SEE ALSO',    val: 'whoami(1), ping(8), grep(1), ls(1), wget(1)' },
        ];

        const els = sections.map(function(s) {
            const item = div('r-man-section');
            item.appendChild(span('r-man-key', s.key));
            const val = div('r-man-val');
            val.textContent = s.val;
            item.appendChild(val);
            return item;
        });

        revealLines(wrap, els, 60, 60);
        result.appendChild(wrap);
        scrollBottom();
    }

    /* ── ping iordan ── */
    function cmdPing(result) {
        const wrap = div('r-ping');

        const header = div('r-ping-header');
        header.textContent = 'PING iordan (imiordanov.github.io): current location & contact';
        wrap.appendChild(header);

        const rows = [
            { key: 'location',  val: 'Tokyo, Japan' },
            { key: 'role',      val: 'Researcher @ Braid Technologies' },
            { key: 'status',    val: 'open to interesting conversations' },
            { key: 'email',     val: 'i.m.iordanov@gmail.com',     href: 'mailto:i.m.iordanov@gmail.com' },
            { key: 'email alt', val: 'iordan@braid.tech',          href: 'mailto:iordan@braid.tech' },
            { key: 'linkedin',  val: 'linkedin.com/in/imiordanov', href: 'https://www.linkedin.com/in/imiordanov/' },
            { key: 'github',    val: 'github.com/imiordanov',      href: 'https://github.com/imiordanov' },
            { key: 'substack',  val: 'imiordanov.substack.com',    href: 'https://imiordanov.substack.com' },
        ];

        const rowEls = rows.map(function(r) {
            const row = div('r-ping-row');
            row.appendChild(span('r-ping-key', r.key));
            if (r.href) {
                const lnk = a(r.href, r.val, null);
                if (!r.href.startsWith('mailto:')) { lnk.target = '_blank'; lnk.rel = 'noopener noreferrer'; }
                row.appendChild(lnk);
            } else {
                row.appendChild(span('r-ping-val', r.val));
            }
            return row;
        });

        revealLines(wrap, rowEls, 60, 80);
        result.appendChild(wrap);
        scrollBottom();
    }

    /* ── ls extras/ ── */
    const EXTRAS = [
        { id: 'game-of-life', name: 'Game of Life',        desc: 'my own implementation',         href: 'game-of-life/index.html' },
        { id: 'trust',        name: 'Evolution of Trust',  desc: 'ncase.me — game theory',        href: 'http://ncase.me/trust/' },
        { id: 'moral',        name: 'Moral Machine',       desc: 'MIT — ethical dilemmas',        href: 'https://www.moralmachine.net/' },
        { id: 'euler',        name: 'Project Euler',       desc: 'mathematical programming puzzles', href: 'https://projecteuler.net/' },
    ];

    function cmdLsExtras(result) {
        const wrap = div('r-ls');
        const header = div('ls-header');
        header.textContent = 'NAME             DESCRIPTION';
        wrap.appendChild(header);

        const rows = EXTRAS.map(function(e) {
            const row = div('ls-entry');
            row.style.gridTemplateColumns = '160px 1fr';
            row.setAttribute('role', 'button');
            row.setAttribute('tabindex', '0');
            row.setAttribute('aria-label', e.name + ', ' + e.desc);
            row.appendChild(span('ls-name', e.name));
            row.appendChild(span('ls-org', e.desc));
            function activate() { typeCommand('open ' + e.id); }
            row.addEventListener('click', activate);
            row.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
            });
            return row;
        });

        revealLines(wrap, rows, 60, 50);
        result.appendChild(wrap);
        scrollBottom();
    }

    function cmdOpen(id, result) {
        const extra = EXTRAS.find(function(e) { return e.id === id; });
        if (!extra) {
            const err = div('r-error');
            err.textContent = 'open: ' + id + ': no such file — try ls extras/';
            result.appendChild(err);
            scrollBottom();
            return;
        }
        const wrap = div('r-contact');
        const row = div('r-contact-line');
        row.appendChild(span('ck', 'opening'));
        const lnk = a(extra.href, extra.name, null);
        lnk.target = '_blank';
        lnk.rel = 'noopener noreferrer';
        row.appendChild(lnk);
        wrap.appendChild(row);
        result.appendChild(wrap);
        setTimeout(function() {
            window.open(extra.href, '_blank');
        }, 600);
        scrollBottom();
    }

    /* ── ping (old contact) kept as alias ── */
    function cmdCv(result) {
        const wrap = div('r-contact');
        const row  = div('r-contact-line');
        row.appendChild(span('ck', 'cv'));
        const lnk = a('docs/cv-iordanov.pdf', 'cv-iordanov.pdf', null);
        lnk.target = '_blank';
        row.appendChild(lnk);
        wrap.appendChild(row);
        const note = div('back-sug');
        note.style.marginTop = '14px';
        note.textContent = 'or try: ls work/ for an interactive version';
        wrap.appendChild(note);
        result.appendChild(wrap);
        scrollBottom();
    }

    function cmdHelp(result) {
        const wrap = div('r-help');
        const cmds = [
            ['whoami',         'brief identity'],
            ['man iordan',     'full manual page'],
            ['ls work/',       'work history'],
            ['ls projects/',   'research & side projects'],
            ['ls extras/',     'other things worth your time'],
            ['cat <id>',       'read a work or project entry (click any row, or type the id)'],
            ['open <id>',      'open an extra — try: open game-of-life'],
            ['wget writing',   'fetch the Substack journal'],
            ['grep <query>',   'search publications (or grep alone for all)'],
            ['ping iordan',    'current location, role & contact'],
            ['cv',             'download curriculum vitae'],
            ['clear',          'clear the terminal'],
            ['help',           'show this message'],
        ];
        const rows = cmds.map(function(c) {
            const row = div('r-help-row');
            row.appendChild(span('r-help-cmd', c[0]));
            row.appendChild(span('r-help-desc', c[1]));
            return row;
        });
        revealLines(wrap, rows, 40, 40);
        result.appendChild(wrap);
        scrollBottom();
    }

    function cmdClear() {
        while (output.firstChild) { output.removeChild(output.firstChild); }
    }

    function cmdUnknown(cmd, result) {
        const err = div('r-error');
        err.textContent = 'command not found: ' + cmd + ' — type help for available commands';
        result.appendChild(err);
        scrollBottom();
    }

    /* ── Route ── */
    function route(raw) {
        const cmd   = raw.trim();
        const lower = cmd.toLowerCase();
        const result = echoCmd(cmd);

        if (lower === 'whoami')                                    return cmdWhoami(result);
        if (lower === 'man iordan' || lower === 'man')             return cmdMan(result);
        if (lower === 'ping iordan' || lower === 'ping')           return cmdPing(result);
        if (lower === 'ls work/' || lower === 'ls work')           return cmdLsWork(result);
        if (lower === 'ls projects/' || lower === 'ls projects')   return cmdLsProjects(result);
        if (lower === 'ls extras/' || lower === 'ls extras')       return cmdLsExtras(result);
        if (lower === 'ls')                                        return cmdLsWork(result);
        if (lower === 'wget writing' || lower === 'wget')          return cmdWget(result);
        if (lower === 'cv')                                        return cmdCv(result);
        if (lower === 'help')                                      return cmdHelp(result);
        if (lower === 'clear')                                     return cmdClear();
        if (lower.startsWith('grep')) {
            const query = cmd.slice(4).trim();
            if (!query) {
                const typedEl = result.previousElementSibling && result.previousElementSibling.querySelector('.typed');
                if (typedEl) typedEl.textContent = 'grep . publications.bib';
            }
            return cmdGrep(query, result);
        }
        if (lower.startsWith('open ')) {
            const id = lower.slice(5).trim();
            return cmdOpen(id, result);
        }
        if (lower.startsWith('cat ')) {
            const id = lower.slice(4).trim();
            return cmdCat(id, result);
        }
        cmdUnknown(cmd, result);
    }

    /* ── Type a command character by character ── */
    function typeCommand(cmd) {
        if (busy) return;
        busy = true;

        realInput.blur();
        promptText.textContent = '';

        let i = 0;
        function typeChar() {
            if (i < cmd.length) {
                promptText.textContent += cmd[i];
                i++;
                setTimeout(typeChar, 38 + Math.random() * 30);
            } else {
                setTimeout(function() {
                    promptText.textContent = '';
                    history.unshift(cmd);
                    histIdx = -1;
                    route(cmd);
                    busy = false;
                    realInput.focus();
                }, 180);
            }
        }
        typeChar();
    }

    /* ── Keyboard input ── */
    realInput.addEventListener('keydown', function(e) {
        if (busy) { e.preventDefault(); return; }

        if (e.key === 'Enter') {
            const val = realInput.value.trim();
            realInput.value = '';
            promptText.textContent = '';
            if (!val) return;
            history.unshift(val);
            histIdx = -1;
            route(val);
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (histIdx < history.length - 1) {
                histIdx++;
                realInput.value = history[histIdx];
                promptText.textContent = history[histIdx];
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (histIdx > 0) {
                histIdx--;
                realInput.value = history[histIdx];
                promptText.textContent = history[histIdx];
            } else {
                histIdx = -1;
                realInput.value = '';
                promptText.textContent = '';
            }
            return;
        }

        if (e.key === 'Tab') {
            e.preventDefault();
            // simple tab completion
            const val = realInput.value.toLowerCase();
            const allCmds = [
                'whoami', 'man iordan', 'ping iordan',
                'ls work/', 'ls projects/', 'ls extras/',
                'wget writing', 'grep', 'cv', 'help', 'clear',
            ].concat(
                WORK.concat(PROJECTS).map(function(e) { return 'cat ' + e.id; })
            ).concat(
                EXTRAS.map(function(e) { return 'open ' + e.id; })
            );
            const match = allCmds.find(function(c) { return c.startsWith(val) && c !== val; });
            if (match) {
                realInput.value = match;
                promptText.textContent = match;
            }
            return;
        }
    });

    realInput.addEventListener('input', function() {
        promptText.textContent = realInput.value;
    });

    /* ── Suggestion pills ── */
    suggestions.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const cmd = btn.dataset.cmd;
            if (cmd) typeCommand(cmd);
        });
    });

    /* ── Click anywhere to focus input ── */
    document.addEventListener('click', function(e) {
        if (!e.target.closest('a') && !e.target.closest('button') && !e.target.closest('.ls-entry')) {
            realInput.focus();
        }
    });

    /* ── Boot: auto-run whoami ── */
    setTimeout(function() {
        realInput.focus();
        typeCommand('whoami');
    }, 700);

})();
