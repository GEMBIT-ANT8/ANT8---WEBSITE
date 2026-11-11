/* ANT8 isometric warehouse scenes: code-generated, animated (canvas, no dependencies).
   ISO.mount(canvas, "hero" | "gtp" | "conveyor" | "drone" | "dock", {fit:"contain"|"cover", align:[x,y]})  */
const ISO = (() => {
  const C30 = Math.cos(Math.PI / 6), S30 = 0.5;
  const COL = {
    floor: "#023F43", grid: "rgba(255,251,245,.055)", line: "rgba(227,255,26,.35)",
    box: ["#FFFBF5", "#D3DEDC", "#AFC2C0"], boxB: ["#E6EBEA", "#C2D0CE", "#9DB2B0"],
    rack: ["#4E7775", "#34605F", "#284F4E"], neon: ["#E3FF1A", "#C3DB12", "#A3B80C"],
    dark: ["#0B4C50", "#02363A", "#012A2D"], tote: ["#99AEAF", "#7E9697", "#677F80"],
    person: ["#34605F", "#284F4E", "#1F4140"], skin: "#E9D3BC", vest: "#E3FF1A",
    truck: ["#F2F0EA", "#CED8D6", "#AEBFBD"], glass: ["#7FA6A6", "#5C8586", "#4A7071"]
  };
  // seeded random so stills look identical every render
  const rnd = s => () => ((s = Math.imul(s ^ (s >>> 15), 2246822519) ^ Math.imul(s ^ (s >>> 13), 3266489917)) >>> 0) / 4294967296;

  function poly(c, pts, fill) { c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.closePath(); c.fillStyle = fill; c.fill(); }
  function mkView(v) { return (x, y, z) => [v.ox + (x - y) * C30 * v.s, v.oy + (x + y) * S30 * v.s - z * v.s]; }
  function box(c, P, x, y, z, w, d, h, col) {
    poly(c, [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)], col[1]);
    poly(c, [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)], col[2]);
    poly(c, [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)], col[0]);
  }
  function along(path, dist) { // position on closed polyline
    let L = 0; const seg = [];
    for (let i = 0; i < path.length; i++) { const a = path[i], b = path[(i + 1) % path.length]; const l = Math.hypot(b[0] - a[0], b[1] - a[1]); seg.push([a, b, l]); L += l; }
    let t = ((dist % L) + L) % L;
    for (const [a, b, l] of seg) { if (t <= l) { const f = t / l; return { x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, dx: b[0] - a[0], dy: b[1] - a[1] }; } t -= l; }
    return { x: path[0][0], y: path[0][1], dx: 1, dy: 0 };
  }

  // ---------- scene builders: each returns {W,H,stat:[drawables], dyn:(t)=>[drawables], floor:(c,P,t)=>{}} ----------
  function racks(list, r, rows, x0, x1, levels = 3, fill = .78) {
    rows.forEach(y0 => { for (let x = x0; x < x1; x++) {
      const occ = []; for (let l = 0; l < levels; l++) occ.push(r() < fill ? (r() < .5 ? COL.box : COL.boxB) : null);
      list.push({ k: x + y0 + 0.5, d: (c, P) => {
        box(c, P, x, y0, 0, .07, .07, levels * .9 + .1, COL.rack); box(c, P, x, y0 + .93, 0, .07, .07, levels * .9 + .1, COL.rack);
        for (let l = 0; l < levels; l++) {
          box(c, P, x, y0, l * .9 + .02, 1, 1, .06, COL.rack);
          if (occ[l]) box(c, P, x + .12, y0 + .12, l * .9 + .08, .76, .76, .62, occ[l]);
        }
        if (x === x1 - 1) { box(c, P, x + .93, y0, 0, .07, .07, levels * .9 + .1, COL.rack); box(c, P, x + .93, y0 + .93, 0, .07, .07, levels * .9 + .1, COL.rack); }
      } });
    } });
  }
  function amr(P, c, p, load) {
    const along = Math.abs(p.dx) >= Math.abs(p.dy); const w = along ? 1 : .72, d = along ? .72 : 1;
    const x = p.x - w / 2, y = p.y - d / 2;
    c.fillStyle = "rgba(0,0,0,.18)"; const s = P(p.x + .15, p.y + .15, 0); c.beginPath(); c.ellipse(s[0], s[1], 26 * P.s / 40, 13 * P.s / 40, 0, 0, 7); c.fill();
    box(c, P, x, y, .04, w, d, .26, COL.neon);
    if (load === "tote") box(c, P, x + .15, y + .12, .3, w - .3, d - .24, .32, COL.tote);
    if (load === "shelf") { box(c, P, x + .05, y + .05, .3, w - .1, d - .1, .05, COL.rack); box(c, P, x + .1, y + .1, .36, w - .2, d - .2, .4, COL.box); box(c, P, x + .05, y + .05, .8, w - .1, d - .1, .05, COL.rack); box(c, P, x + .1, y + .1, .86, w - .2, d - .2, .36, COL.boxB); }
    if (load === "pallet") { box(c, P, x + .02, y + .02, .3, w - .04, d - .04, .1, COL.rack); box(c, P, x + .08, y + .08, .4, w - .16, d - .16, .55, COL.box); }
  }
  function person(c, P, x, y, sway = 0) {
    c.fillStyle = "rgba(0,0,0,.18)"; const s = P(x + .1, y + .1, 0); c.beginPath(); c.ellipse(s[0], s[1], 10 * P.s / 40, 5 * P.s / 40, 0, 0, 7); c.fill();
    box(c, P, x - .14, y - .1, 0, .28, .2, .55, COL.dark);
    box(c, P, x - .18, y - .14, .55, .36, .28, .55, COL.person);
    box(c, P, x - .185, y - .145, .78, .37, .29, .08, [COL.vest, COL.vest, "#BFD613"]);
    const h = P(x, y, 1.28 + sway); c.beginPath(); c.arc(h[0], h[1], .15 * P.s, 0, 7); c.fillStyle = COL.skin; c.fill();
    c.beginPath(); c.arc(h[0], h[1] - .06 * P.s, .155 * P.s, Math.PI, 0); c.fillStyle = COL.vest; c.fill();
  }
  function conveyor(list, x0, x1, y, items, speed, t0) {
    for (let x = x0; x < x1; x++) list.push({ k: x + y + .4, d: (c, P) => { box(c, P, x + .1, y + .15, 0, .1, .1, .5, COL.rack); box(c, P, x, y, .5, 1, .8, .12, COL.dark); } });
    return t => { const out = []; const L = x1 - x0; for (let i = 0; i < items; i++) { const xx = x0 + ((i * L / items + t * speed) % L); out.push({ k: xx + y + .45, d: (c, P) => box(c, P, xx, y + .12, .62, .6, .56, .42, i % 3 ? COL.tote : COL.box) }); } return out; };
  }
  function floorGrid(c, P, W, H) {
    poly(c, [P(0, 0, 0), P(W, 0, 0), P(W, H, 0), P(0, H, 0)], COL.floor);
    c.strokeStyle = COL.grid; c.lineWidth = 1;
    for (let x = 0; x <= W; x++) { const a = P(x, 0, 0), b = P(x, H, 0); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
    for (let y = 0; y <= H; y++) { const a = P(0, y, 0), b = P(W, y, 0); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
  }
  function route(c, P, path, t, pulse = true) {
    c.save(); c.setLineDash([3, 6]); c.strokeStyle = COL.line; c.lineWidth = 1.6; c.beginPath();
    path.forEach((p, i) => { const q = P(p[0], p[1], 0); i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1]); }); c.closePath(); c.stroke(); c.restore();
    if (pulse) for (let k = 0; k < 3; k++) { const p = along(path, t * 2.2 + k * 9); const q = P(p.x, p.y, 0); c.beginPath(); c.arc(q[0], q[1], 2.6, 0, 7); c.fillStyle = "#E3FF1A"; c.fill(); }
  }

  const SCENES = {
    hero() {
      const r = rnd(8), W = 22, H = 15, stat = []; racks(stat, r, [1, 4, 7], 2, 14);
      const conv = conveyor(stat, 1, 19, 12.2, 9, .9);
      stat.push({ k: 17.6 + 8.6, d: (c, P) => { box(c, P, 17, 8, 0, 1.4, .9, .75, COL.dark); box(c, P, 17.1, 8.1, .75, 1.2, .7, .05, COL.box); } });
      const loopA = [[1, 3], [15.5, 3], [15.5, 6], [1, 6]], loopB = [[1, 9.6], [16.2, 9.6], [16.2, 3], [15.5, 3], [15.5, 9.6]], loopC = [[0.6, .4], [15, .4], [15, 10.8], [0.6, 10.8]];
      return { W, H, stat, floor: (c, P, t) => { route(c, P, loopA, t); route(c, P, loopC, t); },
        dyn: t => {
          const out = conv(t);
          [[loopA, 0, "tote"], [loopA, 18, null], [loopC, 5, "pallet"], [loopC, 30, "tote"], [loopC, 44, null]].forEach(([pth, off, ld]) => { const p = along(pth, t * 1.6 + off); out.push({ k: p.x + p.y + .5, d: (c, P) => amr(P, c, p, ld) }); });
          out.push({ k: 17.5 + 9.4, d: (c, P) => person(c, P, 17.6, 9.3, Math.sin(t * 2) * .02) });
          out.push({ k: 19.5 + 11.5, d: (c, P) => person(c, P, 19.6, 11.6, Math.sin(t * 2 + 1) * .02) });
          // drone scanning rack row 1
          const dx = 3 + (Math.sin(t * .45) * .5 + .5) * 10, dz = 1.2 + (Math.sin(t * 1.3) * .5 + .5) * 1.4;
          out.push({ k: dx + 2.6 + 20, d: (c, P) => drone(c, P, dx, 2.55, dz, 2.0, t) });
          return out; } };
    },
    gtp() {
      const r = rnd(21), W = 14, H = 12, stat = [];
      for (let y = 1; y <= 7; y += 3) for (let x = 1; x <= 7; x += 3) for (const [ix, iy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
        const xx = x + ix, yy = y + iy, c1 = r() < .5 ? COL.box : COL.boxB;
        stat.push({ k: xx + yy + .5, d: (c, P) => { box(c, P, xx + .05, yy + .05, .3, .9, .9, .05, COL.rack); box(c, P, xx + .1, yy + .1, .36, .8, .8, .4, c1); box(c, P, xx + .05, yy + .05, .8, .9, .9, .05, COL.rack); box(c, P, xx + .1, yy + .1, .86, .8, .8, .36, COL.box); } });
      }
      stat.push({ k: 11.7 + 6.4, d: (c, P) => { box(c, P, 11, 5.6, 0, 1.6, 1.2, .8, COL.dark); box(c, P, 11.1, 5.7, .8, 1.4, 1, .04, COL.neon); } });
      const lanes = [[[10, 1], [10, 9.6], [0.4, 9.6], [0.4, 3.5], [10, 3.5]], [[10.2, 10.6], [0.2, 10.6], [0.2, .3], [10.2, .3]]];
      return { W, H, stat, floor: (c, P, t) => lanes.forEach(l => route(c, P, l, t)),
        dyn: t => { const out = [];
          [[0, 0, "shelf"], [0, 13, "shelf"], [1, 4, "shelf"], [1, 20, null], [1, 33, "shelf"]].forEach(([li, off, ld]) => { const p = along(lanes[li], t * 1.5 + off); out.push({ k: p.x + p.y + .5, d: (c, P) => amr(P, c, p, ld) }); });
          out.push({ k: 12.4 + 7.4, d: (c, P) => person(c, P, 12.3, 7.3, Math.sin(t * 2.4) * .03) }); return out; } };
    },
    conveyor() {
      const W = 16, H = 11, stat = [];
      const c1 = conveyor(stat, 0, 15, 3, 8, 1.1), c2 = conveyor(stat, 0, 15, 6.2, 7, .8);
      stat.push({ k: 6 + 9.6, d: (c, P) => { box(c, P, 5.4, 8.8, 0, 1.4, .9, .75, COL.dark); box(c, P, 5.5, 8.9, .75, 1.2, .7, .05, COL.box); } });
      stat.push({ k: 10 + 9.6, d: (c, P) => { box(c, P, 9.4, 8.8, 0, 1.4, .9, .75, COL.dark); box(c, P, 9.5, 8.9, .75, 1.2, .7, .05, COL.box); } });
      const lane = [[.5, 1.3], [15, 1.3], [15, 8], [.5, 8]];
      return { W, H, stat, floor: (c, P, t) => route(c, P, lane, t),
        dyn: t => { const out = [...c1(t), ...c2(t)];
          [[0, "pallet"], [16, "tote"]].forEach(([off, ld]) => { const p = along(lane, t * 1.4 + off); out.push({ k: p.x + p.y + .5, d: (c, P) => amr(P, c, p, ld) }); });
          out.push({ k: 6.1 + 10.2, d: (c, P) => person(c, P, 6.1, 10.1, Math.sin(t * 2) * .02) });
          out.push({ k: 10.1 + 10.2, d: (c, P) => person(c, P, 10.1, 10.1, Math.sin(t * 2 + 2) * .02) }); return out; } };
    },
    drone() {
      const r = rnd(5), W = 15, H = 9, stat = []; racks(stat, r, [1.2, 5.2], 1, 14, 4, .85);
      return { W, H, stat, floor: () => {},
        dyn: t => { const out = [];
          const dx = 1.5 + (Math.sin(t * .35) * .5 + .5) * 11.5, dz = .9 + (Math.sin(t * 1.1) * .5 + .5) * 2.4;
          out.push({ k: dx + 2.9 + 20, d: (c, P) => drone(c, P, dx, 2.8, dz, 2.2, t) });
          const ex = 1.5 + (Math.cos(t * .3) * .5 + .5) * 11.5, ez = 1 + (Math.cos(t * .9) * .5 + .5) * 2.3;
          out.push({ k: ex + 6.9 + 20, d: (c, P) => drone(c, P, ex, 6.8, ez, 6.2, t + 1) });
          const p = along([[.4, 3.6], [14.4, 3.6], [14.4, 4.6], [.4, 4.6]], t * 1.2); out.push({ k: p.x + p.y + .5, d: (c, P) => amr(P, c, p, "tote") });
          return out; } };
    },
    dock() {
      const W = 16, H = 12, stat = [];
      for (let i = 0; i < 4; i++) { const x = 2 + i * 3.2;
        stat.push({ k: x + 1 + 1.4, d: (c, P) => { box(c, P, x, 0, 0, 2.4, .5, 2.2, COL.dark); box(c, P, x + .3, .5, .02, 1.8, .2, 1.6, COL.rack); } }); }
      return { W, H, stat, floor: (c, P, t) => { for (let i = 0; i < 4; i++) { const x = 2 + i * 3.2; c.save(); c.setLineDash([4, 6]); c.strokeStyle = COL.line; const a = P(x + .2, 1, 0), b = P(x + .2, 9, 0), d1 = P(x + 2.2, 1, 0), e = P(x + 2.2, 9, 0); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.moveTo(d1[0], d1[1]); c.lineTo(e[0], e[1]); c.stroke(); c.restore(); } },
        dyn: t => { const out = [];
          for (let i = 0; i < 4; i++) { const x = 2.3 + i * 3.2, ph = (t * .12 + i * .27) % 1, y = ph < .4 ? 9 - ph / .4 * 7.4 : ph < .7 ? 1.6 : 1.6 + (ph - .7) / .3 * 7.4;
            out.push({ k: x + y + 5, d: (c, P) => { box(c, P, x, y, .2, 1.8, 5.5, 1.9, COL.truck); box(c, P, x + .1, y + 5.5, .2, 1.6, 1.4, 1.5, COL.glass); box(c, P, x + .1, y + 5.5, 1.1, 1.6, .2, .5, COL.neon); } }); }
          const p = along([[2, .9], [14.5, .9], [14.5, 1.2], [2, 1.2]], t * 1.6); out.push({ k: p.x + p.y + .2, d: (c, P) => amr(P, c, p, "pallet") });
          return out; } };
    }
  };
  function drone(c, P, x, y, z, faceY, t) {
    const s = P(x, y, 0); c.fillStyle = "rgba(0,0,0,.16)"; c.beginPath(); c.ellipse(s[0], s[1], .3 * P.s, .15 * P.s, 0, 0, 7); c.fill();
    const a = P(x, y, z), b1 = P(x - .5, faceY, z + .45), b2 = P(x + .5, faceY, z - .45);
    c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b1[0], b1[1]); c.lineTo(b2[0], b2[1]); c.closePath(); c.fillStyle = "rgba(227,255,26,.16)"; c.fill();
    box(c, P, x - .2, y - .2, z - .06, .4, .4, .12, COL.dark);
    for (const [ox, oy] of [[-.32, -.32], [.32, -.32], [-.32, .32], [.32, .32]]) { const q = P(x + ox, y + oy, z + .08); c.beginPath(); c.ellipse(q[0], q[1], .16 * P.s, .08 * P.s, 0, 0, 7); c.strokeStyle = "rgba(227,255,26,.8)"; c.lineWidth = 1.3; c.stroke(); }
    const l = P(x, y, z + .1); c.beginPath(); c.arc(l[0], l[1], 2.4 + Math.sin(t * 6) * .8, 0, 7); c.fillStyle = "#E3FF1A"; c.fill();
  }

  const REG = []; let PAUSED = false;
  function setPaused(p) { PAUSED = p; REG.forEach(r => r.start()); }
  function mount(canvas, name, opt = {}) {
    const sc = SCENES[name](), c = canvas.getContext("2d");
    const reduce = opt.static || matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = true, t0 = performance.now(), V = null, frozen = null;
    function layout() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2), w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return false;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); c.setTransform(dpr, 0, 0, dpr, 0, 0);
      const sw = (sc.W + sc.H) * C30, sh = (sc.W + sc.H) * S30 + 4;   // world bounds in units
      const fit = opt.fit || "contain", k = (fit === "cover" ? Math.max : Math.min)(w / sw, h / sh) * (opt.zoom || 1);
      const al = opt.align || [.5, .5];
      V = { s: k, ox: (w - sw * k) * al[0] + sc.H * C30 * k, oy: (h - sh * k) * al[1] + 3.2 * k, w, h };
      return true;
    }
    function frame(now) {
      raf = 0; if (!V && !layout()) return;
      if (PAUSED || reduce) { if (frozen === null) frozen = (now - t0) / 1000; } else if (frozen !== null) { t0 = now - frozen * 1000; frozen = null; }
      const t = frozen !== null ? frozen : (now - t0) / 1000, drift = opt.drift ? Math.sin(t * .08) * 10 : 0;
      const v = { s: V.s, ox: V.ox + drift, oy: V.oy + (opt.drift ? Math.cos(t * .06) * 5 : 0) }, P = mkView(v); P.s = v.s;
      c.clearRect(0, 0, V.w, V.h);
      floorGrid(c, P, sc.W, sc.H); sc.floor(c, P, t);
      const items = sc.stat.concat(sc.dyn(t)).sort((a, b) => a.k - b.k);
      for (const it of items) it.d(c, P);
      if (!reduce && !PAUSED && visible && !document.hidden) raf = requestAnimationFrame(frame);
    }
    const start = () => { if (!raf) raf = requestAnimationFrame(frame); };
    if ("IntersectionObserver" in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) start(); }, { rootMargin: "100px" }).observe(canvas);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) start(); });
    window.addEventListener("resize", () => { V = null; start(); });
    REG.push({ start }); start();
    return { redraw: start };
  }
  return { mount, setPaused, get paused() { return PAUSED; }, scenes: Object.keys(SCENES) };
})();
window.ISO = ISO;
