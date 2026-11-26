// Page renderers for the Meridia site. Each function returns the HTML for
// one hash route. Views read only from data.js and charts.js, so the numbers
// on a chart and in its table always come from the same series.

import { AGE_GROUPS, COUNTRY, ENERGY_MIX, INDICATORS, REGIONS, RELEASES, SECTORS, SERIES, TRADE, YEARS } from './data.js';
import { barChart, donutChart, lineChart, pyramidChart } from './charts.js';
import { changeLabel, esc, fmtCompact, fmtInt, fmtNum, sourceLine } from './format.js';

function kpiCard(series, display) {
  const lastYear = Math.max(...Object.keys(series.values).map(Number));
  const change = changeLabel(series);
  return `<article class="kpi">
    <p class="kpi-label">${esc(series.label)}</p>
    <p class="kpi-value">${esc(display(series.values[lastYear]))}</p>
    <p class="kpi-meta"><span class="${change.up ? 'up' : 'down'}">${esc(change.text)}</span> vs ${change.prevYear} · ${lastYear}</p>
    <p class="kpi-unit">${esc(series.unit)}</p>
  </article>`;
}

function figureNote(series) {
  return `<p class="source-note">${esc(sourceLine(series))}</p>`;
}

function yearTable(series, display) {
  const rows = YEARS.map((y) => `<tr><td>${y}</td><td class="num">${esc(display(series.values[y]))}</td></tr>`).join('');
  return `<table class="data-table"><thead><tr><th>Year</th><th class="num">${esc(series.label)} (${esc(series.unit)})</th></tr></thead><tbody>${rows}</tbody></table>`;
}

export function overviewView() {
  const pop = SERIES.population;
  const gdp = SERIES.gdp;
  const regionRows = [...REGIONS]
    .sort((a, b) => b.population - a.population)
    .map((r) => `<tr><td><a href="#/regions">${esc(r.name)}</a></td><td class="num">${fmtInt(r.population)}</td><td class="num">${fmtInt(r.gdpPerCapita)} MRN</td><td class="num">${fmtNum(r.unemployment, 1)}%</td></tr>`)
    .join('');
  return `
  <section class="hero">
    <p class="eyebrow">Official statistics · ${esc(COUNTRY.fullName)}</p>
    <h1>The numbers behind Meridia, in one place.</h1>
    <p class="lede">Population, prices, jobs and trade for 4.86 million residents — published by the ${esc(COUNTRY.office)}, free to use, with the source and year on every figure.</p>
    <div class="hero-actions">
      <a class="btn primary" href="#/explore">Browse all indicators</a>
      <a class="btn" href="#/economy">See the economy</a>
    </div>
  </section>

  <section aria-label="Key figures">
    <div class="kpi-grid">
      ${kpiCard(SERIES.population, (v) => fmtCompact(v))}
      ${kpiCard(SERIES.gdp, (v) => fmtNum(v, 1) + ' bn')}
      ${kpiCard(SERIES.inflation, (v) => fmtNum(v, 1) + '%')}
      ${kpiCard(SERIES.unemployment, (v) => fmtNum(v, 1) + '%')}
      ${kpiCard(SERIES.lifeExpectancy, (v) => fmtNum(v, 1) + ' yrs')}
      ${kpiCard(SERIES.medianWage, (v) => fmtInt(v) + ' MRN')}
    </div>
    <p class="source-note">Figures are for 2025 unless a card says otherwise. ${esc(sourceLine(SERIES.population))}</p>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>Population, 2015–2025</h2>
      <p class="card-sub">Resident population at 1 January each year</p>
      ${lineChart({ values: pop.values, format: (v) => fmtCompact(v) })}
      <p class="card-foot">Meridia added ${fmtInt(pop.values[2025] - pop.values[2015])} residents in ten years — growth of ${fmtNum(((pop.values[2025] / pop.values[2015]) - 1) * 100, 1)}%.</p>
      ${figureNote(pop)}
      <p><a href="#/population">Population in detail →</a></p>
    </article>
    <article class="card">
      <h2>Economy, 2015–2025</h2>
      <p class="card-sub">Gross domestic product, billion merin</p>
      ${barChart({ values: gdp.values, format: (v) => fmtNum(v, 1) })}
      <p class="card-foot">GDP fell 3.4% in 2020 and has grown every year since, reaching 61.2 billion merin in 2025.</p>
      ${figureNote(gdp)}
      <p><a href="#/economy">Economy in detail →</a></p>
    </article>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>Regions at a glance</h2>
      <p class="card-sub">Six regions, ranked by population</p>
      <table class="data-table">
        <thead><tr><th>Region</th><th class="num">People</th><th class="num">GDP per head</th><th class="num">Jobless</th></tr></thead>
        <tbody>${regionRows}</tbody>
      </table>
      <p><a href="#/regions">Explore the regions →</a></p>
    </article>
    <article class="card">
      <h2>Latest releases</h2>
      <p class="card-sub">New from the Statistics Office</p>
      <ul class="releases">
        ${RELEASES.map((r) => `<li><span class="rel-date">${esc(r.date)}</span><a href="${esc(r.href)}">${esc(r.title)}</a></li>`).join('')}
      </ul>
      <p class="card-foot">Releases appear here the morning they are published, at 08:00 Meridia time.</p>
    </article>
  </section>`;
}

export function populationView() {
  const pop = SERIES.population;
  const total2025 = AGE_GROUPS.reduce((s, g) => s + g.female + g.male, 0);
  const under15 = AGE_GROUPS[0].female + AGE_GROUPS[0].male;
  const over65 = AGE_GROUPS.slice(6).reduce((s, g) => s + g.female + g.male, 0);
  return `
  <section class="page-head">
    <p class="eyebrow">People</p>
    <h1>Population</h1>
    <p class="lede">${fmtInt(pop.values[2025])} people lived in Meridia on 1 January 2025 — ${fmtNum(((pop.values[2025] / pop.values[2024]) - 1) * 100, 1)}% more than a year earlier.</p>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>How the population is ageing</h2>
      <p class="card-sub">Thousands of people by age group and sex, 2025</p>
      ${pyramidChart({ groups: AGE_GROUPS })}
      <p class="card-foot">${fmtNum((under15 / total2025) * 100, 1)}% of residents are under 15 and ${fmtNum((over65 / total2025) * 100, 1)}% are 65 or older. The median age is 41.2 years.</p>
      <p class="source-note">Source: MNSO Population Register, 2025 census. Revised 2025.</p>
    </article>
    <article class="card">
      <h2>Population by year</h2>
      <p class="card-sub">Resident population at 1 January</p>
      ${lineChart({ values: pop.values, format: (v) => fmtCompact(v) })}
      ${figureNote(pop)}
    </article>
  </section>

  <section class="card">
    <h2>The figures behind the chart</h2>
    <p class="card-sub">Every value, so you can check the chart or reuse the numbers</p>
    ${yearTable(pop, (v) => fmtInt(v))}
    ${figureNote(pop)}
  </section>`;
}

export function economyChart(metric) {
  if (metric === 'percapita') {
    return {
      title: 'GDP per capita, 2015–2025',
      sub: 'Merin per person, current prices',
      html: lineChart({ values: SERIES.gdpPerCapita.values, format: (v) => fmtInt(v) + ' MRN', color: '#0e7c6b' }),
      note: sourceLine(SERIES.gdpPerCapita),
      foot: 'Output per person rose from 9,320 merin in 2015 to 12,590 in 2025 — up 35% in ten years.',
    };
  }
  if (metric === 'growth') {
    return {
      title: 'Real GDP growth, 2015–2025',
      sub: 'Percent change on the previous year',
      html: barChart({ values: SERIES.gdpGrowth.values, format: (v) => fmtNum(v, 1) + '%', color: '#0e7c6b' }),
      note: sourceLine(SERIES.gdpGrowth),
      foot: 'The 2020 fall of 3.4% was the only contraction in the series; 2021 rebounded 5.9%.',
    };
  }
  return {
    title: 'Gross domestic product, 2015–2025',
    sub: 'Billion merin, current prices',
    html: barChart({ values: SERIES.gdp.values, format: (v) => fmtNum(v, 1) }),
    note: sourceLine(SERIES.gdp),
    foot: 'GDP reached 61.2 billion merin in 2025, up 2.4% in real terms on 2024.',
  };
}

export function economyView() {
  const chart = economyChart('gdp');
  const tradeRows = TRADE.map((t) => `<tr><td>${esc(t.partner)}</td><td class="num">${fmtNum(t.exports, 1)}</td><td class="num">${fmtNum(t.imports, 1)}</td><td class="num">${fmtNum(t.exports - t.imports, 1)}</td></tr>`).join('');
  const energyRows = ENERGY_MIX.map((e) => `<tr><td>${esc(e.source)}</td><td class="num">${e.share}%</td></tr>`).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">Money</p>
    <h1>Economy</h1>
    <p class="lede">Meridia's economy is worth 61.2 billion merin a year. Trade and hospitality is the largest sector; wind now generates a third of its electricity.</p>
  </section>

  <section class="card">
    <h2 id="econ-title">${esc(chart.title)}</h2>
    <p class="card-sub" id="econ-sub">${esc(chart.sub)}</p>
    <div class="toggle-row" role="group" aria-label="Choose what the chart shows">
      <button class="toggle active" data-metric="gdp">Total GDP</button>
      <button class="toggle" data-metric="percapita">Per person</button>
      <button class="toggle" data-metric="growth">Growth rate</button>
    </div>
    <div id="econ-chart">${chart.html}</div>
    <p class="card-foot" id="econ-foot">${esc(chart.foot)}</p>
    <p class="source-note" id="econ-note">${esc(chart.note)}</p>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>What Meridia makes</h2>
      <p class="card-sub">Share of gross value added, 2025</p>
      ${donutChart({ items: SECTORS })}
      <p class="source-note">Source: MNSO National Accounts, 2025 release. Revised 2025.</p>
    </article>
    <article class="card">
      <h2>Trade with the five largest partners</h2>
      <p class="card-sub">Billion merin, 2025</p>
      <table class="data-table">
        <thead><tr><th>Partner</th><th class="num">Exports</th><th class="num">Imports</th><th class="num">Balance</th></tr></thead>
        <tbody>${tradeRows}</tbody>
      </table>
      <p class="card-foot">Meridia ran a goods-and-services surplus of 1.8 billion merin in 2025.</p>
      <h3>Electricity generation, 2025</h3>
      <table class="data-table">
        <thead><tr><th>Source</th><th class="num">Share</th></tr></thead>
        <tbody>${energyRows}</tbody>
      </table>
      <p class="source-note">Sources: MNSO Trade Statistics and Energy Statistics, 2025.</p>
    </article>
  </section>`;
}

export function pricesView() {
  const cpi = SERIES.inflation;
  const unemp = SERIES.unemployment;
  const wageRows = YEARS.map((y) => `<tr><td>${y}</td><td class="num">${fmtNum(cpi.values[y], 1)}%</td><td class="num">${fmtNum(unemp.values[y], 1)}%</td><td class="num">${fmtInt(SERIES.medianWage.values[y])} MRN</td></tr>`).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">Prices &amp; work</p>
    <h1>Prices and jobs</h1>
    <p class="lede">Inflation is 2.2% and unemployment 4.6% — both near their ten-year lows. The median wage is 768 merin a month.</p>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>Consumer price inflation</h2>
      <p class="card-sub">Percent change on a year earlier</p>
      ${lineChart({ values: cpi.values, format: (v) => fmtNum(v, 1) + '%', color: '#b97a14' })}
      <p class="card-foot">Prices rose fastest in 2022, at 6.8%, and have cooled every year since.</p>
      ${figureNote(cpi)}
    </article>
    <article class="card">
      <h2>Unemployment</h2>
      <p class="card-sub">Percent of the labour force</p>
      ${barChart({ values: unemp.values, format: (v) => fmtNum(v, 1) + '%', color: '#0e7c6b' })}
      <p class="card-foot">Joblessness peaked at 8.6% in 2020 and fell to 4.6% in 2025, the lowest in the series.</p>
      ${figureNote(unemp)}
    </article>
  </section>

  <section class="card">
    <h2>Prices, jobs and pay — the full table</h2>
    <p class="card-sub">One row per year, 2015–2025</p>
    <table class="data-table">
      <thead><tr><th>Year</th><th class="num">Inflation</th><th class="num">Unemployment</th><th class="num">Median monthly wage</th></tr></thead>
      <tbody>${wageRows}</tbody>
    </table>
    <p class="source-note">Sources: MNSO Consumer Price Index (October 2026 bulletin), Labour Force Survey (Q3 2026) and Earnings Survey (2025).</p>
  </section>`;
}

export function regionsView() {
  const polygons = REGIONS.map((r) => `<path d="${r.map}" data-region="${r.id}" tabindex="0" role="button" aria-label="${esc(r.name)} region"><title>${esc(r.name)} — ${fmtInt(r.population)} people</title></path>`).join('');
  const cards = REGIONS.map((r) => `<button class="region-card" data-region="${r.id}">
      <span class="region-name">${esc(r.name)}</span>
      <span class="region-stat">${fmtInt(r.population)} people</span>
      <span class="region-stat">${fmtInt(r.gdpPerCapita)} MRN per head</span>
      <span class="region-stat">${fmtNum(r.unemployment, 1)}% jobless</span>
    </button>`).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">Places</p>
    <h1>Regions</h1>
    <p class="lede">Six regions, 74 municipalities, one country. Pick a region on the map or in the list to see its figures.</p>
  </section>

  <section class="two-col regions-layout">
    <article class="card">
      <h2>Map of Meridia</h2>
      <p class="card-sub">Stylised sketch — tap a region to select it</p>
      <svg viewBox="0 0 100 64" class="region-map" role="group" aria-label="Map of Meridia's six regions">
        ${polygons}
      </svg>
      <p class="source-note">Map drawn for this site; boundaries are indicative, not a survey map.</p>
    </article>
    <article class="card" id="region-detail">
      <h2>Select a region</h2>
      <p class="card-sub">Choose on the map or below</p>
      <p>Aldgate is the largest region, with 1,284,000 people — just over a quarter of the country. Falwick has the highest unemployment, at 6.3%.</p>
      <p class="source-note">Source: MNSO Regional Statistics, 2025.</p>
    </article>
  </section>

  <section class="region-grid" aria-label="All regions">
    ${cards}
  </section>`;
}

export function regionDetail(region) {
  const share = (region.population / SERIES.population.values[2025]) * 100;
  const density = region.population / region.areaKm2;
  return `
    <h2>${esc(region.name)}</h2>
    <p class="card-sub">Capital: ${esc(region.capital)}</p>
    <dl class="stat-list">
      <div><dt>Population (2025)</dt><dd>${fmtInt(region.population)} — ${fmtNum(share, 1)}% of Meridia</dd></div>
      <div><dt>Land area</dt><dd>${fmtInt(region.areaKm2)} km²</dd></div>
      <div><dt>Density</dt><dd>${fmtNum(density, 1)} people per km²</dd></div>
      <div><dt>GDP per head</dt><dd>${fmtInt(region.gdpPerCapita)} MRN</dd></div>
      <div><dt>Unemployment</dt><dd>${fmtNum(region.unemployment, 1)}%</dd></div>
    </dl>
    <p>${esc(region.note)}</p>
    <p class="source-note">Source: MNSO Regional Statistics, 2025.</p>`;
}

export function exploreView() {
  const rows = INDICATORS.map((ind, i) => `<tr data-name="${esc(ind.name.toLowerCase())}">
      <td>${esc(ind.name)}</td><td class="num">${esc(ind.value)}</td><td>${esc(ind.unit)}</td><td class="num">${ind.year}</td><td>${esc(ind.source)}</td>
    </tr>`).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">Data</p>
    <h1>Data explorer</h1>
    <p class="lede">Every headline indicator in one table. Search it, sort it, or download it as a spreadsheet file.</p>
  </section>

  <section class="card">
    <div class="explore-tools">
      <label class="search-label">Search indicators
        <input id="explore-search" type="search" placeholder="Try “wage”, “trade” or “energy”…" autocomplete="off">
      </label>
      <button class="btn primary" id="download-csv">Download as CSV</button>
    </div>
    <p class="card-sub" id="explore-count">${INDICATORS.length} indicators · all for 2025 unless stated</p>
    <div class="table-scroll">
      <table class="data-table sortable" id="explore-table">
        <thead><tr>
          <th><button class="sort-btn" data-sort="0">Indicator</button></th>
          <th class="num"><button class="sort-btn" data-sort="1">Value</button></th>
          <th><button class="sort-btn" data-sort="2">Unit</button></th>
          <th class="num"><button class="sort-btn" data-sort="3">Year</button></th>
          <th><button class="sort-btn" data-sort="4">Source</button></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="card-foot">Figures are the latest published value for each indicator. See <a href="#/methodology">Methodology</a> for definitions and revision policy.</p>
  </section>`;
}

export function methodologyView() {
  const seriesList = Object.values(SERIES).map((s) => `<li><strong>${esc(s.label)}</strong> — ${esc(s.source)}. Revised ${s.revised}.</li>`).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">About the numbers</p>
    <h1>Methodology &amp; sources</h1>
    <p class="lede">How Meridia's figures are made, what they mean, and when they change.</p>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>Where each figure comes from</h2>
      <ul class="source-list">${seriesList}</ul>
      <p class="card-foot">Regional figures come from MNSO Regional Statistics 2025; trade from MNSO Trade Statistics 2025; energy from MNSO Energy Statistics 2025.</p>
    </article>
    <article class="card">
      <h2>Definitions</h2>
      <dl class="stat-list">
        <div><dt>Resident population</dt><dd>People registered as living in Meridia on 1 January, including children born abroad to resident parents.</dd></div>
        <div><dt>GDP</dt><dd>The value of all goods and services produced in Meridia, in current merin. Real growth removes price changes.</dd></div>
        <div><dt>Inflation</dt><dd>The change in the consumer price index, which tracks the prices of a basket of 620 everyday goods and services.</dd></div>
        <div><dt>Unemployment</dt><dd>People without work, available to start within two weeks and actively looking, as a share of the labour force.</dd></div>
        <div><dt>Median wage</dt><dd>The middle monthly pay of full-time employees — half earn more, half earn less.</dd></div>
      </dl>
    </article>
  </section>

  <section class="card">
    <h2>Revisions and corrections</h2>
    <p>Figures are revised when better data arrives: national accounts are revised each quarter for two years, then frozen. If we find an error we correct it the same day and note the change here — no figure on this site has been corrected since publication.</p>
    <h2>Using these figures</h2>
    <p>Everything on this site is free to reuse, including for commercial use, with a credit to the Meridia National Statistics Office. The Data explorer's CSV download carries the same figures as the pages. Questions about a figure: write to <strong>figures@statistics.meridia.example</strong> — the office answers within five working days.</p>
    <p class="source-note">Meridia is a fictional country and every figure on this site is invented for it. The site itself is an original design built for the make.fun national statistics bounty.</p>
  </section>`;
}

export const ROUTES = {
  '': overviewView,
  population: populationView,
  economy: economyView,
  prices: pricesView,
  regions: regionsView,
  explore: exploreView,
  methodology: methodologyView,
};
