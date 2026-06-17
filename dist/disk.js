const TILINGS = [
    [3,7],[3,8],[3,9],[3,12],
    [4,5],[4,6],[4,7],[4,8],
    [5,4],[5,5],[5,6],[5,8],
    [6,4],[6,5],[6,6],
    [7,3],[7,4],[7,7],
    [8,3],[8,4],[8,8],
];

const [P, Q] = TILINGS[Math.floor(Math.random() * TILINGS.length)];

/* r0^2 = cos(pi/P + pi/Q) / cos(pi/P - pi/Q) */
const r0 = Math.sqrt(
    Math.cos(Math.PI/P + Math.PI/Q) / Math.cos(Math.PI/P - Math.PI/Q)
);

/* ── Geometry primitives ── */

function cross2(ax, ay, bx, by) { return ax*by - ay*bx; }

function invertInCircle(px, py, icx, icy, ir) {
    const dx = px - icx, dy = py - icy;
    const d2 = dx*dx + dy*dy;
    if (d2 < 1e-15) return [px, py];
    const s = (ir * ir) / d2;
    return [icx + dx*s, icy + dy*s];
}

function invertInUnitCircle(px, py) {
    const d2 = px*px + py*py;
    if (d2 < 1e-15) return [px, py];
    return [px/d2, py/d2];
}

function circumcenter(ax, ay, bx, by, cx, cy) {
    const D = 2*(ax*(by-cy) + bx*(cy-ay) + cx*(ay-by));
    if (Math.abs(D) < 1e-12) return null;
    const ux = ((ax*ax+ay*ay)*(by-cy) + (bx*bx+by*by)*(cy-ay) + (cx*cx+cy*cy)*(ay-by)) / D;
    const uy = ((ax*ax+ay*ay)*(cx-bx) + (bx*bx+by*by)*(ax-cx) + (cx*cx+cy*cy)*(bx-ax)) / D;
    return [ux, uy];
}

function geodesicCircle(p1x, p1y, p2x, p2y) {
    const [ix, iy] = (p1x*p1x + p1y*p1y < 1e-14)
        ? invertInUnitCircle(p2x, p2y)
        : invertInUnitCircle(p1x, p1y);
    const cc = circumcenter(p1x, p1y, p2x, p2y, ix, iy);
    if (!cc) return null;
    const r = Math.sqrt((p1x-cc[0])*(p1x-cc[0]) + (p1y-cc[1])*(p1y-cc[1]));
    return { cx: cc[0], cy: cc[1], r };
}

function polygonVertices(a0) {
    const v = [];
    for (let k = 0; k < P; k++) {
        const a = a0 + (2*Math.PI*k)/P;
        v.push([r0*Math.cos(a), r0*Math.sin(a)]);
    }
    return v;
}

/* ── BFS tile generation ── */

function buildTiles(maxDepth) {
    function centroidKey(vs) {
        let sx = 0, sy = 0;
        for (let i = 0; i < P; i++) { sx += vs[i][0]; sy += vs[i][1]; }
        return (Math.round(sx/P * 600)|0) + ',' + (Math.round(sy/P * 600)|0);
    }

    const seed  = polygonVertices(Math.PI/P);
    const tiles = [];
    const seen  = new Set([centroidKey(seed)]);
    const queue = [{ vs: seed, depth: 0, parity: 0 }];

    while (queue.length > 0) {
        const { vs, depth, parity } = queue.shift();
        tiles.push({ vs, parity });
        if (depth >= maxDepth) continue;

        for (let side = 0; side < P; side++) {
            const v1 = vs[side], v2 = vs[(side+1)%P];
            const gc = geodesicCircle(v1[0], v1[1], v2[0], v2[1]);
            if (!gc) continue;

            const nv = vs.map(v => invertInCircle(v[0], v[1], gc.cx, gc.cy, gc.r));

            let sx = 0, sy = 0;
            for (let i = 0; i < P; i++) { sx += nv[i][0]; sy += nv[i][1]; }
            if ((sx/P)*(sx/P) + (sy/P)*(sy/P) > 0.9995) continue;

            const k = centroidKey(nv);
            if (seen.has(k)) continue;
            seen.add(k);
            queue.push({ vs: nv, depth: depth+1, parity: 1-parity });
        }
    }
    return tiles;
}

/* ── Canvas rendering ── */

export function initDisk() {
    const canvas = document.getElementById('diskCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, cx, cy, R, angle = 0, tiles = null;

    const STROKE = 'rgba(46,201,176,0.35)';
    const FILL   = 'rgba(46,201,176,0.06)';
    const EDGE   = 'rgba(46,201,176,0.14)';

    function arcSegment(p1x, p1y, p2x, p2y) {
        const circ = geodesicCircle(p1x, p1y, p2x, p2y);
        if (!circ) { ctx.lineTo(cx + p2x*R, cy + p2y*R); return; }

        const ucx = cx + circ.cx*R, ucy = cy + circ.cy*R, cr = circ.r*R;
        const [x1, y1] = [cx + p1x*R, cy + p1y*R];
        const [x2, y2] = [cx + p2x*R, cy + p2y*R];
        const sa = Math.atan2(y1-ucy, x1-ucx);
        const ea = Math.atan2(y2-ucy, x2-ucx);
        const ccw = cross2(p2x-p1x, p2y-p1y, circ.cx-p1x, circ.cy-p1y) > 0;
        ctx.arc(ucx, ucy, cr, sa, ea, !ccw);
    }

    function drawTile(vs, fill, stroke) {
        const cos = Math.cos(angle), sin = Math.sin(angle);
        const rv = vs.map(([x, y]) => [x*cos - y*sin, x*sin + y*cos]);
        ctx.beginPath();
        ctx.moveTo(cx + rv[0][0]*R, cy + rv[0][1]*R);
        for (let i = 0; i < P; i++) {
            arcSegment(rv[i][0], rv[i][1], rv[(i+1)%P][0], rv[(i+1)%P][1]);
        }
        ctx.closePath();
        if (fill)   { ctx.fillStyle   = fill;   ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 0.6; ctx.stroke(); }
    }

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        cx = W/2; cy = H/2;
        R  = Math.min(W, H) * 0.46;
        tiles = null;
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, 2*Math.PI);
        ctx.strokeStyle = EDGE;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, 2*Math.PI);
        ctx.clip();

        if (!tiles) {
            const base  = W < 700 ? 4 : 5;
            const depth = P <= 3 ? base + 3 : P <= 4 ? base + 1 : base;
            tiles = buildTiles(depth);
        }

        for (const t of tiles) {
            drawTile(t.vs, t.parity === 1 ? FILL : null, STROKE);
        }

        ctx.restore();
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function loop() {
        angle += 0.00015;
        draw();
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    resize();
    if (reduceMotion) draw();   // render a single static frame, no animation
    else loop();
}
