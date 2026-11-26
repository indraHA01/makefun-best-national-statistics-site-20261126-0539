// Meridia — the national dataset.
//
// Every figure is invented for the fictional Republic of Meridia and is
// internally consistent across the site. Each series carries its source and
// the year it was last revised, so every page can cite what it shows.
// Currency: the merin (MRN). Population in persons, money in billions of
// merin unless a series says otherwise.

export const COUNTRY = {
  name: 'Meridia',
  fullName: 'Republic of Meridia',
  office: 'Meridia National Statistics Office',
  officeShort: 'MNSO',
  capital: 'Aldgate City',
  currency: 'merin',
  currencyCode: 'MRN',
  landAreaKm2: 48210,
  coastlineKm: 1240,
  regions: 6,
  municipalities: 74,
  lastUpdated: '26 November 2026',
  releaseCycle: 'Quarterly, on the first Tuesday of the quarter',
};

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

// Annual national series. `unit` is shown beside the figure on every page.
export const SERIES = {
  population: {
    label: 'Resident population',
    unit: 'persons',
    source: 'MNSO Population Register, annual census update',
    revised: 2025,
    values: {
      2015: 4120400, 2016: 4198200, 2017: 4281300, 2018: 4365900, 2019: 4449700,
      2020: 4502100, 2021: 4578300, 2022: 4669400, 2023: 4748200, 2024: 4811300, 2025: 4860200,
    },
  },
  gdp: {
    label: 'Gross domestic product',
    unit: 'billion MRN',
    source: 'MNSO National Accounts, 2025 release',
    revised: 2025,
    values: {
      2015: 38.4, 2016: 40.1, 2017: 42.6, 2018: 45.3, 2019: 47.9,
      2020: 45.8, 2021: 49.6, 2022: 54.2, 2023: 57.1, 2024: 59.4, 2025: 61.2,
    },
  },
  gdpPerCapita: {
    label: 'GDP per capita',
    unit: 'MRN',
    source: 'MNSO National Accounts, 2025 release',
    revised: 2025,
    values: {
      2015: 9320, 2016: 9550, 2017: 9950, 2018: 10380, 2019: 10760,
      2020: 10170, 2021: 10830, 2022: 11610, 2023: 12030, 2024: 12350, 2025: 12590,
    },
  },
  gdpGrowth: {
    label: 'Real GDP growth',
    unit: '% per year',
    source: 'MNSO National Accounts, 2025 release',
    revised: 2025,
    values: {
      2015: 2.8, 2016: 3.1, 2017: 4.0, 2018: 3.6, 2019: 3.2,
      2020: -3.4, 2021: 5.9, 2022: 4.8, 2023: 3.1, 2024: 2.7, 2025: 2.4,
    },
  },
  inflation: {
    label: 'Consumer price inflation',
    unit: '% per year',
    source: 'MNSO Consumer Price Index, October 2026 bulletin',
    revised: 2026,
    values: {
      2015: 1.4, 2016: 1.8, 2017: 2.1, 2018: 2.4, 2019: 1.9,
      2020: 0.7, 2021: 2.6, 2022: 6.8, 2023: 4.2, 2024: 2.9, 2025: 2.2,
    },
  },
  unemployment: {
    label: 'Unemployment rate',
    unit: '% of labour force',
    source: 'MNSO Labour Force Survey, Q3 2026',
    revised: 2026,
    values: {
      2015: 7.9, 2016: 7.4, 2017: 6.8, 2018: 6.1, 2019: 5.7,
      2020: 8.6, 2021: 7.2, 2022: 5.9, 2023: 5.1, 2024: 4.8, 2025: 4.6,
    },
  },
  medianWage: {
    label: 'Median monthly wage',
    unit: 'MRN',
    source: 'MNSO Earnings Survey, 2025',
    revised: 2025,
    values: {
      2015: 512, 2016: 528, 2017: 551, 2018: 579, 2019: 602,
      2020: 598, 2021: 631, 2022: 674, 2023: 708, 2024: 739, 2025: 768,
    },
  },
  lifeExpectancy: {
    label: 'Life expectancy at birth',
    unit: 'years',
    source: 'MNSO Vital Statistics, 2025',
    revised: 2025,
    values: {
      2015: 78.4, 2016: 78.6, 2017: 78.9, 2018: 79.1, 2019: 79.4,
      2020: 79.0, 2021: 79.3, 2022: 80.1, 2023: 80.6, 2024: 80.9, 2025: 81.2,
    },
  },
};

// Age structure, 2025 census (thousands of persons).
export const AGE_GROUPS = [
  { group: '0–14', female: 402, male: 418 },
  { group: '15–24', female: 289, male: 301 },
  { group: '25–34', female: 331, male: 338 },
  { group: '35–44', female: 352, male: 349 },
  { group: '45–54', female: 336, male: 328 },
  { group: '55–64', female: 298, male: 284 },
  { group: '65–74', female: 211, male: 189 },
  { group: '75+', female: 148, male: 106 },
];

// GDP by sector, 2025 (% of gross value added).
export const SECTORS = [
  { name: 'Trade & hospitality', share: 21.4 },
  { name: 'Manufacturing', share: 16.8 },
  { name: 'Public services', share: 14.2 },
  { name: 'Finance & insurance', share: 11.6 },
  { name: 'Transport & storage', share: 9.3 },
  { name: 'Agriculture & fishing', share: 8.7 },
  { name: 'Construction', share: 7.9 },
  { name: 'Energy & water', share: 5.4 },
  { name: 'Other services', share: 4.7 },
];

// Trade with the five largest partners, 2025 (billion MRN).
export const TRADE = [
  { partner: 'Aldermark', exports: 6.4, imports: 5.1 },
  { partner: 'Vostria', exports: 4.8, imports: 5.9 },
  { partner: 'Kessaly', exports: 3.9, imports: 2.7 },
  { partner: 'Norhaven', exports: 3.1, imports: 3.6 },
  { partner: 'Telmara', exports: 2.6, imports: 2.2 },
];

// The six regions. The `map` field is a rough polygon in a 100x62 viewBox
// drawn for this site only — a stylised sketch of Meridia, not a survey map.
export const REGIONS = [
  {
    id: 'aldgate', name: 'Aldgate', capital: 'Aldgate City', population: 1284000,
    gdpPerCapita: 16840, unemployment: 3.9, areaKm2: 5210,
    note: 'Capital region; finance, government and the main port.',
    map: 'M8,10 L38,6 L46,20 L40,34 L22,38 L8,26 Z',
  },
  {
    id: 'brennor', name: 'Brennor', capital: 'Brennor', population: 942000,
    gdpPerCapita: 12480, unemployment: 4.4, areaKm2: 8930,
    note: 'Manufacturing belt along the river Brenna.',
    map: 'M46,20 L40,34 L44,48 L62,52 L70,36 L62,22 Z',
  },
  {
    id: 'callow', name: 'Callow', capital: 'Port Callow', population: 718000,
    gdpPerCapita: 11230, unemployment: 5.2, areaKm2: 7640,
    note: 'Fishing harbours and the northern ferry routes.',
    map: 'M38,6 L66,2 L78,14 L62,22 L46,20 Z',
  },
  {
    id: 'dunmere', name: 'Dunmere', capital: 'Dunmere', population: 654000,
    gdpPerCapita: 9870, unemployment: 5.8, areaKm2: 11240,
    note: 'Hill country; sheep farming and wind power.',
    map: 'M22,38 L40,34 L44,48 L38,60 L18,56 L12,44 Z',
  },
  {
    id: 'estmere', name: 'Estmere', capital: 'Estmere', population: 589000,
    gdpPerCapita: 10960, unemployment: 4.9, areaKm2: 6810,
    note: 'Orchards, vineyards and the summer coast.',
    map: 'M62,22 L70,36 L62,52 L80,56 L92,40 L78,14 Z',
  },
  {
    id: 'falwick', name: 'Falwick', capital: 'Falwick', population: 673000,
    gdpPerCapita: 9210, unemployment: 6.3, areaKm2: 8380,
    note: 'Former mining towns, now logistics and timber.',
    map: 'M44,48 L62,52 L80,56 L76,62 L38,60 Z',
  },
];

// Electricity generation mix, 2025 (% of generation).
export const ENERGY_MIX = [
  { source: 'Wind', share: 34 },
  { source: 'Hydro', share: 26 },
  { source: 'Solar', share: 12 },
  { source: 'Gas', share: 18 },
  { source: 'Biomass', share: 6 },
  { source: 'Other', share: 4 },
];

// Latest releases shown on the home page.
export const RELEASES = [
  { date: '4 Nov 2026', title: 'Consumer prices, October 2026 — inflation 2.1%', href: '#/prices' },
  { date: '21 Oct 2026', title: 'Labour force survey, Q3 2026 — unemployment 4.6%', href: '#/prices' },
  { date: '7 Oct 2026', title: 'National accounts, Q2 2026 — GDP up 2.4% on the year', href: '#/economy' },
  { date: '23 Sep 2026', title: 'Population estimate, mid-2026 — 4.88 million residents', href: '#/population' },
  { date: '9 Sep 2026', title: 'Regional statistics 2025 — all six regions published', href: '#/regions' },
  { date: '26 Aug 2026', title: 'Energy and environment 2025 — wind passes one third of generation', href: '#/economy' },
];

// Every indicator the Data Explorer table can show, with its 2025 value.
export const INDICATORS = [
  { name: 'Resident population', value: '4,860,200', unit: 'persons', year: 2025, source: 'Population Register' },
  { name: 'Population density', value: '100.8', unit: 'per km²', year: 2025, source: 'Population Register' },
  { name: 'Median age', value: '41.2', unit: 'years', year: 2025, source: 'Population Register' },
  { name: 'Births', value: '48,120', unit: 'live births', year: 2025, source: 'Vital Statistics' },
  { name: 'Deaths', value: '39,840', unit: 'deaths', year: 2025, source: 'Vital Statistics' },
  { name: 'Net migration', value: '+21,400', unit: 'persons', year: 2025, source: 'Population Register' },
  { name: 'GDP', value: '61.2', unit: 'billion MRN', year: 2025, source: 'National Accounts' },
  { name: 'GDP per capita', value: '12,590', unit: 'MRN', year: 2025, source: 'National Accounts' },
  { name: 'Real GDP growth', value: '2.4', unit: '%', year: 2025, source: 'National Accounts' },
  { name: 'Government debt', value: '38.7', unit: '% of GDP', year: 2025, source: 'National Accounts' },
  { name: 'Exports of goods and services', value: '24.9', unit: 'billion MRN', year: 2025, source: 'Trade Statistics' },
  { name: 'Imports of goods and services', value: '23.1', unit: 'billion MRN', year: 2025, source: 'Trade Statistics' },
  { name: 'Consumer price inflation', value: '2.2', unit: '%', year: 2025, source: 'Consumer Price Index' },
  { name: 'Unemployment rate', value: '4.6', unit: '%', year: 2025, source: 'Labour Force Survey' },
  { name: 'Employment rate (15–64)', value: '74.8', unit: '%', year: 2025, source: 'Labour Force Survey' },
  { name: 'Median monthly wage', value: '768', unit: 'MRN', year: 2025, source: 'Earnings Survey' },
  { name: 'Life expectancy at birth', value: '81.2', unit: 'years', year: 2025, source: 'Vital Statistics' },
  { name: 'Infant mortality', value: '3.1', unit: 'per 1,000 births', year: 2025, source: 'Vital Statistics' },
  { name: 'Literacy rate (15+)', value: '98.9', unit: '%', year: 2025, source: 'Education Statistics' },
  { name: 'Upper secondary completion', value: '91.4', unit: '%', year: 2025, source: 'Education Statistics' },
  { name: 'Renewable share of electricity', value: '72', unit: '%', year: 2025, source: 'Energy Statistics' },
  { name: 'CO₂ emissions per capita', value: '4.9', unit: 'tonnes', year: 2025, source: 'Environment Statistics' },
  { name: 'Households with broadband', value: '94.6', unit: '%', year: 2025, source: 'ICT Survey' },
  { name: 'Homes owned outright or mortgaged', value: '68.2', unit: '%', year: 2025, source: 'Housing Survey' },
];
