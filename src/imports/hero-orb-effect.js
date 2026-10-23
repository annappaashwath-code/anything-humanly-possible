<div id="heroWrap" style="position:relative; width:100%; overflow:visible;">
  <img
    id="heroImg"
    src="YOUR_IMAGE_URL_HERE"
    style="width:100%; height:auto; display:block;"
    alt=""
  />

  <canvas id="orbCanvas"
    style="
      position:absolute;
      pointer-events:none;
      overflow:visible;
      mix-blend-mode: screen;
      will-change: transform;
    "></canvas>
</div>

<script>
(() => {
  const img = document.getElementById("heroImg");
  const canvas = document.getElementById("orbCanvas");
  if (!img || !canvas) return;

  // ORIGINAL IMAGE SIZE (your hero image actual pixels)
  const IMG_W = 2048;
  const IMG_H = 785;

  // ORB LOCATION IN ORIGINAL IMAGE PIXELS (locked to your orb)
  const ORB_CX = 1126;
  const ORB_CY = 400;
  const ORB_R  = 416;

  // Bigger canvas => glow never clips. Increase for wider aura.
  const CANVAS_SCALE = 3.3;

  // Retina crispness
  const DPR_CAP = 2;

  // Particles inside
  const particles = Array.from({ length: 30 }).map(() => ({
    a: Math.random() * Math.PI * 2,
    r: 0.15 + Math.random() * 0.85,
    s: 0.25 + Math.random() * 0.9,
    p: 0.8 + Math.random() * 2.0,
    tw: Math.random() * Math.PI * 2
  }));

  // Outer micro sparks (just a few)
  const sparks = Array.from({ length: 10 }).map(() => ({
    a: Math.random() * Math.PI * 2,
    s: 0.35 + Math.random() * 0.6,
    p: 1.0 + Math.random() * 2.8
  }));

  let ctx, raf;
  let start = performance.now();

  function resizeAndPosition() {
    const rect = img.getBoundingClientRect();
    const sx = rect.width / IMG_W;
    const sy = rect.height / IMG_H;
    const s = (sx + sy) / 2;

    const cx = ORB_CX * sx;
    const cy = ORB_CY * sy;
    const r  = ORB_R * s;

    const size = Math.max(10, Math.round(r * CANVAS_SCALE * 2));
    const left = cx - size / 2;
    const top  = cy - size / 2;

    canvas.style.left = `${left}px`;
    canvas.style.top = `${top}px`;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    canvas.width = Math.floor(size * dpr);
    canvas.height = Math.floor(size * dpr);

    ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    canvas._W = size;
    canvas._H = size;
    canvas._R = size / (CANVAS_SCALE * 2);
  }

  function softCircleGradient(cx, cy, r, stops) {
    const g = ctx.createRadialGradient(cx, cy, r*0.08, cx, cy, r);
    stops.forEach(s => g.addColorStop(s[0], s[1]));
    return g;
  }

  function draw(t) {
    if (!ctx) return;

    const W = canvas._W, H = canvas._H;
    const cx = W / 2, cy = H / 2;
    const R = canvas._R;

    const time = (t - start) / 1000;

    // premium calm pulse
    const pulse = 1 + 0.028 * Math.sin(time * 1.9);
    const breathe = 1 + 0.016 * Math.sin(time * 0.9);

    ctx.clearRect(0, 0, W, H);

    // BIG AURA (fades to 0 well before edge, no clipping)
    const auraR = R * 3.3 * pulse;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = softCircleGradient(cx, cy, auraR, [
      [0.00, "rgba(255,250,220,0.18)"],
      [0.18, "rgba(255,215,120,0.16)"],
      [0.42, "rgba(255,170,60,0.10)"],
      [0.70, "rgba(255,140,40,0.04)"],
      [1.00, "rgba(255,140,40,0.00)"]
    ]);
    ctx.beginPath();
    ctx.arc(cx, cy, auraR, 0, Math.PI * 2);
    ctx.fill();

    // CORE SPHERE (more realistic depth)
    const coreR = R * breathe;
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = softCircleGradient(cx - coreR*0.18, cy - coreR*0.22, coreR, [
      [0.00, "rgba(255,255,245,0.92)"],
      [0.28, "rgba(255,245,190,0.78)"],
      [0.55, "rgba(255,220,120,0.62)"],
      [1.00, "rgba(255,180,60,0.48)"]
    ]);
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();

    // INNER HOTSPOT (sun core)
    ctx.fillStyle = softCircleGradient(cx + coreR*0.06, cy + coreR*0.08, coreR*0.62, [
      [0.00, "rgba(255,255,255,0.50)"],
      [0.45, "rgba(255,255,235,0.22)"],
      [1.00, "rgba(255,255,235,0.00)"]
    ]);
    ctx.beginPath();
    ctx.arc(cx, cy, coreR*0.62, 0, Math.PI * 2);
    ctx.fill();

    // SUBTLE INTERNAL VORTEX LINES (molecule feel, not noisy)
    ctx.globalCompositeOperation = "screen";
    ctx.lineWidth = Math.max(1, R * 0.012);
    ctx.strokeStyle = "rgba(255,255,240,0.14)";
    for (let k = 0; k < 6; k++) {
      const rot = time * 0.55 + k * 1.1;
      ctx.beginPath();
      for (let i = 0; i < 160; i++) {
        const p = i / 160;
        const ang = p * Math.PI * 2 + rot;
        const rr = (R * 0.14) + p * (R * 0.86);
        const wob = Math.sin(p * 9 + rot * 1.6) * (R * 0.045);
        const x = cx + (rr + wob) * Math.cos(ang);
        const y = cy + (rr + wob) * Math.sin(ang);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // PARTICLES INSIDE (clean, calm)
    ctx.fillStyle = "rgba(255,255,245,0.55)";
    particles.forEach(pt => {
      const ang = pt.a + time * pt.s;
      const rr = R * (0.18 + pt.r * 0.78) + Math.sin(time * 1.1 + pt.tw) * (R * 0.03);
      const x = cx + rr * Math.cos(ang);
      const y = cy + rr * Math.sin(ang);
      ctx.beginPath();
      ctx.arc(x, y, pt.p, 0, Math.PI * 2);
      ctx.fill();
    });

    // OUTER MICRO SPARKS (few, premium, not fireworks)
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    sparks.forEach(sp => {
      const ang = sp.a + time * sp.s;
      const rr = R * (1.05 + 0.05*Math.sin(time*1.5 + sp.a));
      const x = cx + rr * Math.cos(ang);
      const y = cy + rr * Math.sin(ang);
      ctx.beginPath();
      ctx.arc(x, y, sp.p, 0, Math.PI * 2);
      ctx.fill();
    });

    // SPECULAR GLINT (real orb feel)
    ctx.fillStyle = "rgba(255,255,255,0.10)";
    ctx.beginPath();
    ctx.arc(cx - R * 0.34, cy - R * 0.44, R * 0.42, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = "source-over";
    raf = requestAnimationFrame(draw);
  }

  function startAll() {
    resizeAndPosition();

    const ro = new ResizeObserver(() => resizeAndPosition());
    ro.observe(img);

    window.addEventListener("resize", resizeAndPosition, { passive: true });

    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(draw);
  }

  if (img.complete) startAll();
  else img.addEventListener("load", startAll);
})();
</script>