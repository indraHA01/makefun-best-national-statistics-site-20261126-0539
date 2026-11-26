// Router and page interactivity for the Meridia site.
//
// Hash routes: #/ (overview), #/population, #/economy, #/prices,
// #/regions, #/explore, #/methodology. Each route renders its view into
// #app, then wires up that page's controls: the economy metric toggle, the
// region map and cards, and the explorer's search, sorting and CSV download.

import { INDICATORS, REGIONS } from './data.js';
import { ROUTES, economyChart, regionDetail } from './views.js';
import { esc } from './format.js';

const app = document.getElementById('app');

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return ROUTES[hash] ? hash : '';
}

function render() {
  const route = currentRoute();
  const view = ROUTES[route];
  app.innerHTML = view();
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.dataset.route === route);
  });
  window.scrollTo(0, 0);
  if (route === 'economy') wireEconomy();
  if (route === 'regions') wireRegions();
  if (route === 'explore') wireExplore();
}

function wireEconomy() {
  const chartBox = document.getElementById('econ-chart');
  document.querySelectorAll('[data-metric]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-metric]').forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      const chart = economyChart(button.dataset.metric);
      document.getElementById('econ-title').textContent = chart.title;
      document.getElementById('econ-sub').textContent = chart.sub;
      chartBox.innerHTML = chart.html;
      document.getElementById('econ-foot').textContent = chart.foot;
      document.getElementById('econ-note').textContent = chart.note;
    });
  });
}

function wireRegions() {
  const detail = document.getElementById('region-detail');
  const select = (id) => {
    const region = REGIONS.find((r) => r.id === id);
    if (!region) return;
    detail.innerHTML = regionDetail(region);
    document.querySelectorAll('.region-map path').forEach((p) => {
      p.classList.toggle('selected', p.dataset.region === id);
    });
    document.querySelectorAll('.region-card').forEach((c) => {
      c.classList.toggle('selected', c.dataset.region === id);
    });
  };
  document.querySelectorAll('[data-region]').forEach((el) => {
    el.addEventListener('click', () => select(el.dataset.region));
    el.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select(el.dataset.region);
      }
    });
  });
}

function wireExplore() {
  const input = document.getElementById('explore-search');
  const table = document.getElementById('explore-table');
  const tbody = table.querySelector('tbody');
  const count = document.getElementById('explore-count');
  const total = INDICATORS.length;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    let shown = 0;
    tbody.querySelectorAll('tr').forEach((row) => {
      const match = !query || row.dataset.name.includes(query);
      row.style.display = match ? '' : 'none';
      if (match) shown += 1;
    });
    count.textContent = query
      ? `${shown} of ${total} indicators match “${input.value.trim()}”`
      : `${total} indicators · all for 2025 unless stated`;
  });

  let sortCol = -1;
  let sortAsc = true;
  table.querySelectorAll('.sort-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const col = Number(button.dataset.sort);
      sortAsc = col === sortCol ? !sortAsc : true;
      sortCol = col;
      const rows = [...tbody.querySelectorAll('tr')];
      rows.sort((a, b) => {
        const ta = a.cells[col].textContent.trim();
        const tb = b.cells[col].textContent.trim();
        const na = Number(ta.replace(/[^0-9.+-]/g, ''));
        const nb = Number(tb.replace(/[^0-9.+-]/g, ''));
        const cmp = Number.isFinite(na) && Number.isFinite(nb) && ta !== tb
          ? na - nb
          : ta.localeCompare(tb);
        return sortAsc ? cmp : -cmp;
      });
      rows.forEach((row) => tbody.appendChild(row));
      table.querySelectorAll('.sort-btn').forEach((b) => b.classList.remove('sorted'));
      button.classList.add('sorted');
      button.textContent = `${button.textContent.replace(/ [▲▼]$/, '')} ${sortAsc ? '▲' : '▼'}`;
    });
  });

  document.getElementById('download-csv').addEventListener('click', () => {
    const header = 'Indicator,Value,Unit,Year,Source\n';
    const lines = INDICATORS.map((ind) =>
      [ind.name, ind.value, ind.unit, ind.year, ind.source]
        .map((field) => `"${String(field).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([header + lines + '\n'], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meridia-indicators-2025.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });
}

window.addEventListener('hashchange', render);
render();
