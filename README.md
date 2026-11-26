[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/indraHA01/makefun-best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/indraHA01/makefun-best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# Meridia National Statistics Office

**Meridia** is an original national statistics site built for the [make.fun](https://make.fun/bounty/best-national-statistics-site-20261126-0539) **best-national-statistics-site-20261126-0539** bounty ("Make the best national statistics site"). It runs offline in desktop Chrome and on a phone from static files — no build step, no network request, no library.

Meridia is a fictional island republic (4.86 million people, capital Aldgate City), and every figure on the site is invented for it — but every figure is internally consistent, carries its source and year, and is shown in more than one place so the charts and the tables can never disagree.

## What it is

- **Overview** — hero, six key-figure cards (population, GDP, inflation, unemployment, life expectancy, median wage), population and GDP charts, regions at a glance, latest releases.
- **Population** — an age pyramid by sex, the 2015–2025 trend, and the full year-by-year table.
- **Economy** — a working metric toggle (total GDP / per person / growth rate) that re-draws the chart, a sector donut, trade with the five largest partners, and the electricity mix.
- **Prices & jobs** — inflation and unemployment charts plus a combined 2015–2025 table of inflation, unemployment and median wage.
- **Regions** — a stylised SVG map of the six regions; click a region on the map or in the list and its detail panel (population, area, density, GDP per head, unemployment) appears.
- **Data explorer** — all 24 headline indicators in one table with live search, click-to-sort columns, and a working CSV download.
- **Methodology & sources** — where every figure comes from, definitions, revision policy, and reuse terms.

## How it is built

- `app/index.html` — the shell: header, navigation, footer.
- `app/main.js` — the hash router and the page controls (economy toggle, region picker, explorer search/sort/CSV).
- `app/views.js` — one renderer per page, plus the economy chart switcher and region detail.
- `app/charts.js` — hand-rolled SVG charts (line, bar, donut, age pyramid). No chart library is vendored, which keeps the first load small.
- `app/data.js` — the whole Meridia dataset: annual series 2015–2025, age structure, sectors, trade, regions, energy mix, releases, indicators.
- `app/format.js` — number formatting and change labels.
- `app/style.css` — the whole design: paper background, ink navy, teal and amber, Georgia display type, mobile-first layout.
- `main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`.

## Run it

```sh
node serve.ts          # serves app/ at http://localhost:8080
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # build the dossier
```

## Screenshots

`shots.json` says which views the four screenshots in `screenshots/` were taken of: the overview (cover), the economy page, the data explorer, and the overview at phone size (390 × 844).
