import { WORK, PROJECTS, PUBLICATIONS, EXTRAS, parsePeriod, formatDuration } from './data.js';

/* ── DOM helpers — no innerHTML ── */

function el(tag, cls) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
}
function text(s)               { return document.createTextNode(s); }
function span(cls, s)          { const e = el('span', cls); if (s !== undefined) e.textContent = s; return e; }
function div(cls)              { return el('div', cls); }
function a(href, s, cls) {
    const e = el('a', cls);
    e.href = href;
    e.target = '_blank';
    e.rel = 'noopener noreferrer';
    e.textContent = s;
    return e;
}

/* ── Terminal state ── */

const output     = document.getElementById('output');
const promptText = document.getElementById('prompt-text');
const realInput  = document.getElementById('realInput');

let cmdHistory = [];
let histIdx = -1;
let busy = false;

/* ── Boot sequence ── */

document.querySelectorAll('.boot-line').forEach(line => {
    const delay = parseInt(line.dataset.delay || '0', 10);
    setTimeout(() => line.classList.add('show'), delay);
});

/* ── Output helpers ── */

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

function revealLines(container, children, baseDelay = 80, step = 60) {
    children.forEach((child, i) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(6px)';
        child.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        container.appendChild(child);
        setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
        }, baseDelay + i * step);
    });
    setTimeout(() => { output.scrollTop = output.scrollHeight; }, baseDelay + children.length * step);
}

function scrollBottom() {
    setTimeout(() => { output.scrollTop = output.scrollHeight; }, 50);
}

/* ══════════════════════════════════════════
   COMMAND HANDLERS
══════════════════════════════════════════ */

function cmdWhoami(result) {
    const wrap   = div('r-whoami');
    const layout = div('r-whoami-layout');

    const portraitCol = div('r-portrait-col');
    const portrait = document.createElement('img');
    portrait.src = 'img/me.jpg';
    portrait.alt = 'Iordan Iordanov';
    portrait.className = 'r-portrait';
    portraitCol.appendChild(portrait);
    portraitCol.appendChild(div('r-portrait-glow'));
    layout.appendChild(portraitCol);

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

    const facts = div('r-facts');
    const factData = [
        ['based',     'Tokyo, Japan'],
        ['origin',    'Bulgaria'],
        ['languages', [
            'Native (but rusty) in Greek and Bulgarian',
            'Fluent in English and Italian',
            'Confident in French',
            'Hopeless in Japanese',
            'Bonus minority language available upon request',
        ]],
        ['lived in',  'Bulgaria · Greece · Italy · France · Japan'],
    ];
    factData.forEach(([key, val]) => {
        const row = div('r-fact-row');
        row.appendChild(span('r-fact-key', key));
        if (Array.isArray(val)) {
            const list = el('ul', 'r-fact-list');
            val.forEach(item => { const li = el('li'); li.textContent = item; list.appendChild(li); });
            row.appendChild(list);
        } else {
            row.appendChild(span('r-fact-val', val));
        }
        facts.appendChild(row);
    });
    textCol.appendChild(facts);

    const edu = div('r-edu');
    const eduEntries = [
        { degree: 'Ph.D. Computer Science',    school: 'Université de Lorraine', year: '2016 ~ 2018', thesis: 'Delaunay triangulations of hyperbolic surfaces',  thesisHref: 'docs/PhD-thesis.pdf' },
        { degree: 'M.Sc. Applied Mathematics', school: 'University of Crete',    year: '2014 ~ 2015', thesis: 'Shape-Preserving Interpolation on the Sphere',    thesisHref: 'docs/MSc-thesis.pdf' },
        { degree: 'B.Sc. Applied Mathematics', school: 'University of Crete',    year: '2005 ~ 2013', thesis: 'The Euclidean InSphere Predicate',                 thesisHref: 'docs/BSc-thesis.pdf',
          note: 'Studies interrupted 2007 ~ 2009 for work in Italy' },
    ];
    eduEntries.forEach(e => {
        const item = div('r-edu-item');
        const top = div('r-edu-top');
        top.appendChild(span('r-edu-degree', e.degree));
        top.appendChild(span('r-edu-year', e.year));
        item.appendChild(top);
        const school = div('r-edu-school');
        school.textContent = e.school;
        item.appendChild(school);
        if (e.note) { const note = div('r-edu-note'); note.textContent = e.note; item.appendChild(note); }
        item.appendChild(a(e.thesisHref, '↗ ' + e.thesis, 'r-edu-thesis'));
        edu.appendChild(item);
    });
    textCol.appendChild(edu);

    layout.appendChild(textCol);
    wrap.appendChild(layout);

    const hint = div('back-sug');
    hint.appendChild(text('→ '));
    [['ls work/', 'ls work/'], ['ls projects/', 'ls projects/']].forEach(([label, cmd]) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.addEventListener('click', () => typeCommand(cmd));
        hint.appendChild(btn);
        hint.appendChild(text('  '));
    });
    wrap.appendChild(hint);

    result.appendChild(wrap);
    scrollBottom();
}

function cmdLsWork(result) {
    const wrap = div('r-ls');
    const header = div('ls-header');
    header.textContent = 'PERIOD          ORG                NAME                  DURATION';
    wrap.appendChild(header);

    const rows = WORK.map(w => {
        const months = parsePeriod(w.period);
        const row = div('ls-entry');
        row.setAttribute('role', 'button');
        row.setAttribute('tabindex', '0');
        row.setAttribute('aria-label', `${w.org}, ${w.name}, ${w.period}`);
        row.appendChild(span('ls-period', w.period));
        row.appendChild(span('ls-org', w.org));
        row.appendChild(span('ls-name', w.name));
        const badges = div('ls-fields');
        (w.fields || []).forEach(f => badges.appendChild(span('ls-field-badge', f)));
        row.appendChild(badges);
        row.appendChild(span('ls-duration', months ? formatDuration(months) : ''));
        const activate = () => typeCommand('cat ' + w.id);
        row.addEventListener('click', activate);
        row.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
        return row;
    });

    const fieldTotals = {};
    WORK.forEach(w => {
        const fs = w.fields?.length ? w.fields : ['Other'];
        const m  = parsePeriod(w.period) || 0;
        fs.forEach(f => { fieldTotals[f] = (fieldTotals[f] || 0) + m; });
    });
    const fieldOrder = ['Software Dev', 'Research', 'AI / ML', 'Management', 'Other'];
    const totalsRow = div('ls-field-totals');
    fieldOrder.forEach(f => {
        if (!fieldTotals[f]) return;
        const item = span('ls-field-total-item', '');
        item.appendChild(span('ls-field-label', f));
        item.appendChild(span('ls-field-val', formatDuration(fieldTotals[f])));
        totalsRow.appendChild(item);
    });

    revealLines(wrap, rows, 60, 50);
    setTimeout(() => {
        wrap.appendChild(totalsRow);
        totalsRow.style.opacity = '0';
        totalsRow.style.transition = 'opacity 0.4s ease';
        setTimeout(() => { totalsRow.style.opacity = '1'; }, 60 + rows.length * 50 + 100);
    }, 0);
    result.appendChild(wrap);
    scrollBottom();
}

function cmdLsProjects(result) {
    const wrap = div('r-ls');
    const header = div('ls-header');
    header.textContent = 'PERIOD          ORG                NAME';
    wrap.appendChild(header);

    const rows = PROJECTS.map(p => {
        const row = div('ls-entry');
        row.setAttribute('role', 'button');
        row.setAttribute('tabindex', '0');
        row.setAttribute('aria-label', `${p.org}, ${p.name}, ${p.period}`);
        row.appendChild(span('ls-period', p.period));
        row.appendChild(span('ls-org', p.org));
        row.appendChild(span('ls-name', p.name));
        const activate = () => typeCommand('cat ' + p.id);
        row.addEventListener('click', activate);
        row.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
        return row;
    });

    revealLines(wrap, rows, 60, 50);
    result.appendChild(wrap);
    scrollBottom();
}

function cmdCat(id, result) {
    const entry = [...WORK, ...PROJECTS].find(e => e.id === id);
    if (!entry) {
        const err = div('r-error');
        err.textContent = 'cat: ' + id + ': no such file';
        result.appendChild(err);
        scrollBottom();
        return;
    }

    const wrap   = div('r-cat');
    const header = div('r-cat-header');
    const role   = div('r-cat-role');
    role.textContent = entry.role;
    header.appendChild(role);

    const org = div('r-cat-org');
    if (entry.orgUrl) org.appendChild(a(entry.orgUrl, entry.org, null));
    else org.textContent = entry.org;
    header.appendChild(org);

    const isWork = WORK.some(w => w.id === id);
    const months = isWork ? parsePeriod(entry.period) : null;
    const meta   = div('r-cat-meta');
    meta.textContent = entry.meta + ' · ' + entry.period + (months ? ' · ' + formatDuration(months) : '');
    header.appendChild(meta);
    wrap.appendChild(header);

    const body = div('r-cat-body');
    body.textContent = entry.body;
    wrap.appendChild(body);

    const tags = div('r-cat-tags');
    entry.tags.forEach(t => tags.appendChild(span('r-cat-tag', t)));
    wrap.appendChild(tags);

    let links = null;
    if (entry.links?.length) {
        links = div('r-cat-links');
        entry.links.forEach(l => links.appendChild(a(l.href, l.label, 'out-link')));
        wrap.appendChild(links);
    }

    const backCmd = PROJECTS.some(p => p.id === id) ? 'ls projects/' : 'ls work/';
    const hint = div('back-sug');
    hint.appendChild(text('← '));
    const btn = document.createElement('button');
    btn.textContent = backCmd;
    btn.addEventListener('click', () => typeCommand(backCmd));
    hint.appendChild(btn);
    wrap.appendChild(hint);

    const children = [header, body, tags, ...(links ? [links] : []), hint];
    children.forEach(c => {
        c.style.opacity = '0';
        c.style.transform = 'translateY(6px)';
        c.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    result.appendChild(wrap);
    children.forEach((c, i) => setTimeout(() => { c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, 80 + i * 70));
    scrollBottom();
}

function cmdWget(result) {
    const wrap   = div('r-writing');
    const status = div('r-wget-status');
    [
        'Connecting to imiordanov.substack.com...',
        'HTTP request sent, awaiting response... 200 OK',
        'Length: unspecified [text/html]',
        'Saving to: oni-no-pantsu.html',
    ].forEach(l => { const line = div('r-wget-line'); line.textContent = l; status.appendChild(line); });
    wrap.appendChild(status);

    const titleLink = a('https://imiordanov.substack.com', '', null);
    titleLink.style.textDecoration = 'none';
    const jp = div('r-jp'); jp.textContent = '鬼のパンツ'; titleLink.appendChild(jp);
    const romaji = div('r-romaji'); romaji.textContent = 'oni no pantsu · the demon\'s pants'; titleLink.appendChild(romaji);
    wrap.appendChild(titleLink);

    const quote = div('r-writing-quote');
    quote.textContent = 'The personal journal of a foreigner in Japan. Fatherhood, career, cultural shocks, mental health (and lack thereof) -- I\'ve got it all covered. Come along and laugh at my struggles.';
    wrap.appendChild(quote);

    const body = div('r-writing-body');
    body.textContent = 'I write on Substack about the things that don\'t fit anywhere else.';
    wrap.appendChild(body);

    wrap.appendChild(a('https://imiordanov.substack.com', '↗ imiordanov.substack.com', 'out-link amber'));
    result.appendChild(wrap);
    scrollBottom();
}

function cmdGrep(query, result) {
    const wrap = div('r-grep');
    const matches = query
        ? PUBLICATIONS.filter(p => (p.title + ' ' + p.authors + ' ' + p.venue).toLowerCase().includes(query.toLowerCase()))
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
        ? `publications.bib:${matches.length} match${matches.length > 1 ? 'es' : ''} for "${query}"`
        : `publications.bib:${matches.length} entries`;
    wrap.appendChild(header);

    const rows = matches.map(p => {
        const row  = div('r-grep-row');
        const meta = div('r-grep-meta');
        meta.appendChild(span('r-grep-ref', p.ref));
        row.appendChild(meta);
        const titleEl = a(p.href, p.title, 'r-grep-title');
        titleEl.target = '_blank'; titleEl.rel = 'noopener noreferrer';
        row.appendChild(titleEl);
        const authors = div('r-grep-authors'); authors.textContent = p.authors; row.appendChild(authors);
        const venue   = div('r-grep-venue');   venue.textContent   = p.venue;   row.appendChild(venue);
        if (p.note) { const note = div('r-grep-note'); note.textContent = p.note; row.appendChild(note); }
        return row;
    });

    revealLines(wrap, rows, 60, 70);
    result.appendChild(wrap);
    scrollBottom();
}

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
    const els = sections.map(s => {
        const item = div('r-man-section');
        item.appendChild(span('r-man-key', s.key));
        const val = div('r-man-val'); val.textContent = s.val; item.appendChild(val);
        return item;
    });
    revealLines(wrap, els, 60, 60);
    result.appendChild(wrap);
    scrollBottom();
}

function cmdPing(result) {
    const wrap   = div('r-ping');
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
    const rowEls = rows.map(r => {
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

function cmdLsExtras(result) {
    const wrap = div('r-ls');
    const header = div('ls-header');
    header.textContent = 'NAME             DESCRIPTION';
    wrap.appendChild(header);

    const rows = EXTRAS.map(e => {
        const row = div('ls-entry');
        row.style.gridTemplateColumns = '160px 1fr';
        row.setAttribute('role', 'button');
        row.setAttribute('tabindex', '0');
        row.setAttribute('aria-label', `${e.name}, ${e.desc}`);
        row.appendChild(span('ls-name', e.name));
        row.appendChild(span('ls-org', e.desc));
        const activate = () => typeCommand('open ' + e.id);
        row.addEventListener('click', activate);
        row.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); activate(); } });
        return row;
    });
    revealLines(wrap, rows, 60, 50);
    result.appendChild(wrap);
    scrollBottom();
}

function cmdOpen(id, result) {
    const extra = EXTRAS.find(e => e.id === id);
    if (!extra) {
        const err = div('r-error');
        err.textContent = 'open: ' + id + ': no such file — try ls extras/';
        result.appendChild(err);
        scrollBottom();
        return;
    }
    const wrap = div('r-contact');
    const row  = div('r-contact-line');
    row.appendChild(span('ck', 'opening'));
    const lnk = a(extra.href, extra.name, null);
    lnk.target = '_blank'; lnk.rel = 'noopener noreferrer';
    row.appendChild(lnk);
    wrap.appendChild(row);
    result.appendChild(wrap);
    setTimeout(() => window.open(extra.href, '_blank'), 600);
    scrollBottom();
}

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
        ['whoami',       'brief identity'],
        ['man iordan',   'full manual page'],
        ['ls work/',     'work history'],
        ['ls projects/', 'research & side projects'],
        ['ls extras/',   'other things worth your time'],
        ['cat <id>',     'read a work or project entry (click any row, or type the id)'],
        ['open <id>',    'open an extra — try: open game-of-life'],
        ['wget writing', 'fetch the Substack journal'],
        ['grep <query>', 'search publications (or grep alone for all)'],
        ['ping iordan',  'current location, role & contact'],
        ['cv',           'download curriculum vitae'],
        ['clear',        'clear the terminal'],
        ['help',         'show this message'],
    ];
    const rows = cmds.map(([cmd, desc]) => {
        const row = div('r-help-row');
        row.appendChild(span('r-help-cmd', cmd));
        row.appendChild(span('r-help-desc', desc));
        return row;
    });
    revealLines(wrap, rows, 40, 40);
    result.appendChild(wrap);
    scrollBottom();
}

function cmdClear() {
    while (output.firstChild) output.removeChild(output.firstChild);
}

function cmdUnknown(cmd, result) {
    const err = div('r-error');
    err.textContent = 'command not found: ' + cmd + ' — type help for available commands';
    result.appendChild(err);
    scrollBottom();
}

/* ── Router ── */

function route(raw) {
    const cmd   = raw.trim();
    const lower = cmd.toLowerCase();
    const result = echoCmd(cmd);

    if (lower === 'whoami')                                  return cmdWhoami(result);
    if (lower === 'man iordan' || lower === 'man')           return cmdMan(result);
    if (lower === 'ping iordan' || lower === 'ping')         return cmdPing(result);
    if (lower === 'ls work/' || lower === 'ls work')         return cmdLsWork(result);
    if (lower === 'ls projects/' || lower === 'ls projects') return cmdLsProjects(result);
    if (lower === 'ls extras/' || lower === 'ls extras')     return cmdLsExtras(result);
    if (lower === 'ls')                                      return cmdLsWork(result);
    if (lower === 'wget writing' || lower === 'wget')        return cmdWget(result);
    if (lower === 'cv')                                      return cmdCv(result);
    if (lower === 'help')                                    return cmdHelp(result);
    if (lower === 'clear')                                   return cmdClear();
    if (lower.startsWith('grep')) {
        const query = cmd.slice(4).trim();
        if (!query) {
            const typedEl = result.previousElementSibling?.querySelector('.typed');
            if (typedEl) typedEl.textContent = 'grep . publications.bib';
        }
        return cmdGrep(query, result);
    }
    if (lower.startsWith('open ')) return cmdOpen(lower.slice(5).trim(), result);
    if (lower.startsWith('cat '))  return cmdCat(lower.slice(4).trim(), result);
    cmdUnknown(cmd, result);
}

/* ── Typewriter effect ── */

function typeCommand(cmd) {
    if (busy) return;
    busy = true;
    realInput.blur();
    promptText.textContent = '';
    let i = 0;
    function typeChar() {
        if (i < cmd.length) {
            promptText.textContent += cmd[i++];
            setTimeout(typeChar, 38 + Math.random() * 30);
        } else {
            setTimeout(() => {
                promptText.textContent = '';
                cmdHistory.unshift(cmd);
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

realInput.addEventListener('keydown', e => {
    if (busy) { e.preventDefault(); return; }

    if (e.key === 'Enter') {
        const val = realInput.value.trim();
        realInput.value = '';
        promptText.textContent = '';
        if (!val) return;
        cmdHistory.unshift(val);
        histIdx = -1;
        route(val);
        return;
    }

    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (histIdx < cmdHistory.length - 1) {
            histIdx++;
            realInput.value = promptText.textContent = cmdHistory[histIdx];
        }
        return;
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx > 0) {
            histIdx--;
            realInput.value = promptText.textContent = cmdHistory[histIdx];
        } else {
            histIdx = -1;
            realInput.value = promptText.textContent = '';
        }
        return;
    }

    if (e.key === 'Tab') {
        e.preventDefault();
        const val = realInput.value.toLowerCase();
        const allCmds = [
            'whoami', 'man iordan', 'ping iordan',
            'ls work/', 'ls projects/', 'ls extras/',
            'wget writing', 'grep', 'cv', 'help', 'clear',
            ...[...WORK, ...PROJECTS].map(e => 'cat ' + e.id),
            ...EXTRAS.map(e => 'open ' + e.id),
        ];
        const match = allCmds.find(c => c.startsWith(val) && c !== val);
        if (match) realInput.value = promptText.textContent = match;
        return;
    }
});

realInput.addEventListener('input', () => { promptText.textContent = realInput.value; });

/* ── Suggestion pills ── */

document.querySelectorAll('.sug').forEach(btn => {
    btn.addEventListener('click', () => { if (btn.dataset.cmd) typeCommand(btn.dataset.cmd); });
});

/* ── Click anywhere to focus input ── */

document.addEventListener('click', e => {
    if (!e.target.closest('a') && !e.target.closest('button') && !e.target.closest('.ls-entry')) {
        realInput.focus();
    }
});

/* ── Boot: auto-run whoami ── */

setTimeout(() => { realInput.focus(); typeCommand('whoami'); }, 700);
