export function parsePeriod(period) {
    const MONTHS = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
    const parts = period.split('~').map(s => s.trim());
    function parseDate(s) {
        if (s.toLowerCase() === 'present') return new Date();
        const m = s.match(/^([A-Za-z]+)\s+(\d{4})$/);
        if (!m) return null;
        return new Date(parseInt(m[2], 10), MONTHS[m[1]] || 0, 1);
    }
    const start = parseDate(parts[0]);
    const end   = parseDate(parts[1] || '');
    if (!start || !end) return null;
    return Math.max(1, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1);
}

export function formatDuration(months) {
    const y = Math.floor(months / 12);
    const m = months % 12;
    if (y === 0) return m + 'mo';
    if (m === 0) return y + 'yr';
    return y + 'yr ' + m + 'mo';
}

export const WORK = [
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
        body: 'Technical R&D across 50+ client projects in manufacturing, automotive, and industrial AI. Deep learning for computer vision in depth estimation, pose estimation, object detection, optical flow, and others. Four funded AIST collaborations on AI Quality Management. Built an Explainable AI platform including model quantization for edge deployment. Scaled the engineering organization from 10 to 70 people; introduced OKRs and built internal research and hiring pipelines. Drove ISO process standardization and board-approved ISMS adoption in preparation for IPO.',
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
            { label: '↗ code in CGAL', href: 'https://github.com/CGAL/cgal/tree/main/Periodic_4_hyperbolic_triangulation_2' },
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
            { label: '↗ doi: Medical & Biological Engineering & Computing, 2016', href: 'https://doi.org/10.1007/s11517-016-1592-8' },
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

export const PROJECTS = [
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
            { label: '↗ code in CGAL', href: 'https://github.com/CGAL/cgal/tree/main/Periodic_4_hyperbolic_triangulation_2' },
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
            { label: '↗ doi: Medical & Biological Engineering & Computing, 2016', href: 'https://doi.org/10.1007/s11517-016-1592-8' },
        ],
    },
];

export const PUBLICATIONS = [
    {
        ref: '[5]',
        authors: 'N. Ishikura, D. Kondo, I. Iordanov, V. Vassiliades, H. Tode',
        title: 'Cache-Property-Aware Features for DNS Tunneling Detection',
        venue: 'ICIN, Paris, 2020',
        note: 'Invited collaboration; consulted on the AI/ML component.',
        href: 'https://doi.org/10.1109/ICIN48450.2020.9059472',
    },
    {
        ref: '[4]',
        authors: 'M. Ebbens, I. Iordanov, M. Teillaud, G. Vegter',
        title: 'Systole of regular hyperbolic surfaces with an application to Delaunay triangulations',
        venue: 'Curves & Surfaces, Arcachon, 2018',
        href: 'https://inria.hal.science/hal-01803443v1',
    },
    {
        ref: '[3]',
        authors: 'M. Ebbens, I. Iordanov, M. Teillaud, G. Vegter',
        title: 'Delaunay triangulations of regular hyperbolic surfaces',
        venue: 'Curves & Surfaces, Arcachon, 2018',
        href: 'https://inria.hal.science/hal-01801136',
    },
    {
        ref: '[2]',
        authors: 'I. Iordanov, M. Teillaud',
        title: 'Implementing Delaunay triangulations of the Bolza surface',
        venue: 'SoCG, pp. 44:1~44:15, 2017',
        href: 'https://doi.org/10.4230/LIPIcs.SoCG.2017.44',
    },
    {
        ref: '[1]',
        authors: 'E. Metaxa, I. Iordanov, E. Maravelakis, Y. Papaharilaou',
        title: 'A novel approach for local abdominal aortic aneurysm growth quantification',
        venue: 'Medical & Biological Engineering & Computing, 2016',
        href: 'https://doi.org/10.1007/s11517-016-1592-8',
    },
];

export const EXTRAS = [
    { id: 'game-of-life', name: 'Game of Life',       desc: 'my own implementation',            href: 'game-of-life/index.html' },
    { id: 'trust',        name: 'Evolution of Trust', desc: 'ncase.me — game theory',           href: 'http://ncase.me/trust/' },
    { id: 'moral',        name: 'Moral Machine',      desc: 'MIT — ethical dilemmas',           href: 'https://www.moralmachine.net/' },
    { id: 'euler',        name: 'Project Euler',      desc: 'mathematical programming puzzles', href: 'https://projecteuler.net/' },
];
