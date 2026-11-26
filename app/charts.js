// Hand-rolled SVG charts for the Meridia site. No chart library is
// vendored: these builders are small, dependency-free and render from the
// same data the tables show, so a chart and its table can never disagree.
//
// Every builder returns an SVG string. Colours come from the site palette:
// ink #12324a, teal #0e7c6b, amber #e8a33d, pale #e9f1ee, grid #d8dee2.

import { esc } from './format.js';

const INK = '#12324a';
const TEAL = '#0e7c6b';
const AMBER = '#e8a33d';
const GRID = '#d8dee2';
const MUTED = '#5d6d78';

function niceTicks(min, max, count = 4) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const rounded = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = rounded * mag;
  const start = Math.ceil(min / size) * size;
  const ticks = [];
  for (let v = start; v <= max + size * 0.001; v += size) ticks.push(v);
  return ticks;
}

function axisLabels(ticks, format, y, x0, x1) {
  return ticks
    .map((t) => {
      const yy = y(t);
      return `<line x1="${x0}" y1="${yy}" x2="${x1}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>` +
        `<text x="${x0 - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(format(t))}</text>`;
    })
    .join('');
}

// Line chart over yearly values: values is {year: number}.
export function lineChart({ values, format = (v) => String(v), height = 260, color = TEAL, area = true }) {
  const years = Object.keys(values).map(Number).sort((a, b) => a - b);
  const nums = years.map((y) => values[y]);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const pad = (max - min) * 0.15 || 1;
  const lo = Math.max(0, min - pad);
  const hi = max + pad;
  const W = 640;
  const H = height;
  const ml = 56;
  const mr = 14;
  const mt = 12;
  const mb = 30;
  const x = (i) => ml + (i * (W - ml - mr)) / (years.length - 1);
  const y = (v) => mt + ((hi - v) * (H - mt - mb)) / (hi - lo);
  const ticks = niceTicks(lo, hi);
  const points = years.map((yr, i) => `${x(i).toFixed(1)},${y(values[yr]).toFixed(1)}`).join(' ');
  const path = `M${points.split(' ').join(' L')}`;
  const areaPath = `${path} L${x(years.length - 1).toFixed(1)},${y(lo)} L${x(0).toFixed(1)},${y(lo)} Z`;
  const last = years[years.length - 1];
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart, ${years[0]} to ${last}" class="chart">
    ${axisLabels(ticks, format, y, ml, W - mr)}
    ${area ? `<path d="${areaPath}" fill="${color}" opacity="0.12"/>` : ''}
    <path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${years.map((yr, i) => `<circle cx="${x(i)}" cy="${y(values[yr])}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"><title>${yr}: ${esc(format(values[yr]))}</title></circle>`).join('')}
    ${years.map((yr, i) => (i % 2 === 0 || i === years.length - 1)
    ? `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${yr}</text>` : '').join('')}
    <text x="${x(years.length - 1)}" y="${y(values[last]) - 12}" text-anchor="end" font-size="13" font-weight="700" fill="${INK}">${esc(format(values[last]))}</text>
  </svg>`;
}

// Vertical bar chart over yearly values.
export function barChart({ values, format = (v) => String(v), height = 260, color = TEAL, highlightLast = true }) {
  const years = Object.keys(values).map(Number).sort((a, b) => a - b);
  const nums = years.map((y) => values[y]);
  const max = Math.max(...nums);
  const min = Math.min(0, Math.min(...nums));
  const W = 640;
  const H = height;
  const ml = 56;
  const mr = 14;
  const mt = 12;
  const mb = 30;
  const slot = (W - ml - mr) / years.length;
  const barW = Math.min(38, slot * 0.62);
  const y = (v) => mt + ((max - v) * (H - mt - mb)) / (max - min || 1);
  const ticks = niceTicks(min, max);
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart, ${years[0]} to ${years[years.length - 1]}" class="chart">
    ${axisLabels(ticks, format, y, ml, W - mr)}
    ${years.map((yr, i) => {
    const v = values[yr];
    const cx = ml + i * slot + slot / 2;
    const last = i === years.length - 1;
    return `<rect x="${(cx - barW / 2).toFixed(1)}" y="${y(Math.max(v, 0)).toFixed(1)}" width="${barW}" height="${Math.abs(y(v) - y(0)).toFixed(1)}" rx="3" fill="${last && highlightLast ? AMBER : color}"><title>${yr}: ${esc(format(v))}</title></rect>` +
      `<text x="${cx}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${yr}</text>`;
  }).join('')}
  </svg>`;
}

// Donut chart for shares that add to 100.
export function donutChart({ items, height = 240 }) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 78;
  const circ = 2 * Math.PI * r;
  const palette = [TEAL, '#2a9d8f', AMBER, '#7fb069', '#4361ee', '#f4845f', '#6c757d', '#b08968', '#90be6d'];
  let offset = 0;
  const arcs = items.map((item, i) => {
    const frac = item.share / 100;
    const dash = frac * circ;
    const el = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${palette[i % palette.length]}" stroke-width="34" stroke-dasharray="${dash.toFixed(1)} ${(circ - dash).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}"><title>${esc(item.name)}: ${item.share}%</title></circle>`;
    offset += dash;
    return el;
  }).join('');
  const legend = items.map((item, i) =>
    `<li><span class="swatch" style="background:${palette[i % palette.length]}"></span>${esc(item.name)} <strong>${item.share}%</strong></li>`).join('');
  return `<div class="donut-wrap">
    <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Shares adding to 100 percent" class="donut">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#eef1f3" stroke-width="34"/>
      ${arcs}
      <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="26" font-weight="700" fill="${INK}">100%</text>
      <text x="${cx}" y="${cy + 20}" text-anchor="middle" font-size="12" fill="${MUTED}">of value added</text>
    </svg>
    <ul class="legend">${legend}</ul>
  </div>`;
}

// Age pyramid: female bars left, male bars right, in thousands.
export function pyramidChart({ groups, height = 300 }) {
  const W = 640;
  const H = height;
  const max = Math.max(...groups.flatMap((g) => [g.female, g.male]));
  const rowH = (H - 24) / groups.length;
  const mid = W / 2;
  const scale = (W / 2 - 70) / max;
  const rows = groups.map((g, i) => {
    const y = 8 + i * rowH;
    const fh = g.female * scale;
    const mh = g.male * scale;
    return `<text x="${mid}" y="${y + rowH / 2 + 4}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(g.group)}</text>` +
      `<rect x="${(mid - 34 - fh).toFixed(1)}" y="${y + 3}" width="${fh.toFixed(1)}" height="${rowH - 6}" rx="2" fill="${TEAL}"><title>Women ${g.group}: ${g.female} thousand</title></rect>` +
      `<rect x="${(mid + 34).toFixed(1)}" y="${y + 3}" width="${mh.toFixed(1)}" height="${rowH - 6}" rx="2" fill="${AMBER}"><title>Men ${g.group}: ${g.male} thousand</title></rect>` +
      `<text x="${(mid - 40 - fh).toFixed(1)}" y="${y + rowH / 2 + 4}" text-anchor="end" font-size="11" fill="${INK}">${g.female}</text>` +
      `<text x="${(mid + 40 + mh).toFixed(1)}" y="${y + rowH / 2 + 4}" font-size="11" fill="${INK}">${g.male}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Population by age group and sex, 2025" class="chart">
    <text x="${mid - 120}" y="14" text-anchor="middle" font-size="12" font-weight="700" fill="${TEAL}">Women</text>
    <text x="${mid + 120}" y="14" text-anchor="middle" font-size="12" font-weight="700" fill="#b97a14">Men</text>
    ${rows}
  </svg>`;
}
