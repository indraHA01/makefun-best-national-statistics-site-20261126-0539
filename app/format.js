// Number and change formatting for the Meridia site. One job: turn raw
// figures into the strings a visitor reads, with consistent rounding.

export function fmtInt(n) {
  return Math.round(n).toLocaleString('en-US');
}

export function fmtNum(n, decimals = 1) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtCompact(n) {
  if (n >= 1_000_000) return fmtNum(n / 1_000_000, 2) + ' m';
  if (n >= 1_000) return fmtNum(n / 1_000, 1) + ' k';
  return fmtInt(n);
}

// Change between the last two values of a series, as "+x.x%" or "-x.x%".
export function changeLabel(series) {
  const years = Object.keys(series.values).map(Number).sort((a, b) => a - b);
  const last = years[years.length - 1];
  const prev = years[years.length - 2];
  const a = series.values[last];
  const b = series.values[prev];
  const pct = ((a - b) / Math.abs(b)) * 100;
  const sign = pct >= 0 ? '+' : '';
  return { text: `${sign}${fmtNum(pct, 1)}%`, up: pct >= 0, year: last, prevYear: prev };
}

// A short "Source: … (revised YYYY)" line for a figure's footnote.
export function sourceLine(series) {
  return `Source: ${series.source}. Revised ${series.revised}.`;
}

// Escape text that is interpolated into HTML.
export function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
