// Chart helpers ported from the Claude Design prototype's DCLogic component.
// Kept as pure functions so the visual math (spark line, donut arcs, bar
// widths, heatmap color ramp) matches the approved design exactly.

export function spark(vals, w, h) {
  const mn = Math.min(...vals);
  const mx = Math.max(...vals);
  const r = mx - mn || 1;
  return vals
    .map((v, i) =>
      ((i * (w / (vals.length - 1))).toFixed(1) +
        ',' +
        (h - ((v - mn) / r) * (h - 4) - 2).toFixed(1))
    )
    .join(' ');
}

export function arc(a0, a1, rOut, rIn) {
  const p = (a, r) => [
    (r * Math.cos(((a - 90) * Math.PI) / 180)).toFixed(2),
    (r * Math.sin(((a - 90) * Math.PI) / 180)).toFixed(2),
  ];
  const big = a1 - a0 > 180 ? 1 : 0;
  const [x1, y1] = p(a0, rOut);
  const [x2, y2] = p(a1, rOut);
  const [x3, y3] = p(a1, rIn);
  const [x4, y4] = p(a0, rIn);
  return `M${x1} ${y1}A${rOut} ${rOut} 0 ${big} 1 ${x2} ${y2}L${x3} ${y3}A${rIn} ${rIn} 0 ${big} 0 ${x4} ${y4}Z`;
}

export function donut(items, { G, GOLD }) {
  const total = items.reduce((s, i) => s + i.v, 0);
  let a = 0;
  return items.map((it, idx) => {
    const sweep = (it.v / total) * 360;
    const mid = a + sweep / 2;
    const d = arc(a + 1, a + sweep - 1, 78, 55);
    a += sweep;
    const rad = ((mid - 90) * Math.PI) / 180;
    const lx = 92 * Math.cos(rad);
    const ly = 92 * Math.sin(rad);
    return {
      d,
      name: it.n,
      pct: Math.round((it.v / total) * 100) + '%',
      color: it.hi ? GOLD : idx % 2 ? '#7FA394' : G,
      lx: +lx.toFixed(1),
      ly: +(ly - 1).toFixed(1),
      ly2: +(ly + 11).toFixed(1),
      anchor: lx > 6 ? 'start' : lx < -6 ? 'end' : 'middle',
    };
  });
}

export function bars(items, unit, hiIdx, { G, GOLD }) {
  const mx = Math.max(...items.map((i) => i.v));
  return items.map((it, i) => ({
    name: it.n,
    w: (it.v / mx * 100).toFixed(1),
    label: it.v + (unit || ''),
    color: i === hiIdx ? GOLD : it.mute ? '#C3D0C9' : G,
  }));
}

const HEAT_STOPS = [
  [244, 246, 245],
  [219, 235, 227],
  [168, 207, 189],
  [232, 205, 150],
  [232, 163, 61],
  [201, 110, 58],
  [192, 57, 43],
];

export function heatColor(t) {
  const x = Math.max(0, Math.min(0.999, t)) * (HEAT_STOPS.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = HEAT_STOPS[i];
  const b = HEAT_STOPS[i + 1] || HEAT_STOPS[i];
  return `rgb(${a.map((c, k) => Math.round(c + (b[k] - c) * f)).join(',')})`;
}
