const ECON_DATA = {
  lastUpdated: "2025-Q4",

  // Aggregate OIC stats
  aggregate: {
    totalCountries: 57,
    combinedGDP: 7.7,  // trillion USD
    population: 1.8,   // billion
    landArea: 25       // % of world
  },

  countries: {
    "saudi-arabia": {
      name: "Saudi Arabia",
      code: "SAU",
      flag: "🇸🇦",
      region: "GCC",
      incomeGroup: "High Income",
      currency: "SAR",
      capital: "Riyadh",

      // Latest headline indicators
      headline: {
        gdp: 1069,           // billion USD nominal
        gdpGrowth: 3.2,      // % real
        inflation: 2.1,       // % CPI
        population: 36.9,     // million
        debtToGdp: 26.2,     // %
        unemployment: 4.9,    // %
        currentAccount: 3.2,  // % of GDP
        fiscalBalance: -2.1,  // % of GDP
        policyRate: 5.5,      // %
        fdi: 2.8,             // % of GDP
        reserves: 450,        // billion USD
        exchangeRate: 3.75    // per USD
      },

      // Time series (2019-2025)
      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [0.3, -4.1, 3.9, 8.7, -0.8, 1.3, 3.2],
        inflation: [-2.1, 3.4, 3.1, 2.5, 2.3, 1.7, 2.1],
        unemployment: [5.7, 7.4, 6.6, 5.6, 4.8, 4.7, 4.9],
        debtToGdp: [22.8, 32.4, 30.0, 23.8, 26.2, 27.5, 26.2],
        currentAccount: [4.8, -2.8, 5.3, 13.6, 3.5, 2.8, 3.2],
        oilPrice: [64.3, 41.8, 70.9, 99.0, 82.6, 78.0, 75.0] // Brent
      },

      // Economic structure
      structure: {
        gdpBysector: { agriculture: 2.6, industry: 44.2, services: 53.2 },
        tradeOpenness: 57.3,  // (exports+imports)/GDP %
        topExports: ["Crude Oil", "Refined Petroleum", "Polymers", "Chemicals"],
        topPartners: ["China", "India", "Japan", "South Korea", "USA"],
        islamicFinanceShare: 78.9  // % of banking assets
      },

      // Outlook summary
      outlook: {
        rating: "Stable",
        gdpForecast2026: 3.8,
        gdpForecast2027: 3.5,
        inflationForecast2026: 2.3,
        keyRisks: ["Oil price volatility", "Vision 2030 execution risk", "Regional geopolitical tensions"],
        keyDrivers: ["Non-oil sector diversification", "Tourism growth (Hajj/entertainment)", "Infrastructure investment (NEOM, Giga-projects)"],
        summary: "Saudi Arabia's economy is transitioning under Vision 2030, with non-oil growth accelerating through mega-projects and tourism expansion. Oil price volatility remains a key downside risk, but fiscal buffers and structural reforms support medium-term stability. Growth is expected to moderate to 3.5-3.8% through 2027 as mega-projects reach completion."
      },

      // DSGE model status
      dsge: {
        status: "available",
        modelType: "Open-economy NK with oil sector",
        keyFeatures: ["Oil-dependent fiscal rule", "Profit-rate monetary policy", "Labor market segmentation (national/expat)", "Zakat fiscal channel"],
        calibrationDate: "2025-Q3",
        shocks: ["Oil price shock", "TFP shock", "Monetary policy shock", "Fiscal spending shock"],
        linkPath: "theory/dsge_saudi_arabia.html"
      }
    },

    "turkey": {
      name: "Turkey",
      code: "TUR",
      flag: "🇹🇷",
      region: "Middle East/Europe",
      incomeGroup: "Upper-Middle Income",
      currency: "TRY",
      capital: "Ankara",

      headline: {
        gdp: 1087,           // billion USD nominal
        gdpGrowth: 5.1,      // % real
        inflation: 41.5,      // % CPI (moderating from peak)
        population: 87.9,     // million
        debtToGdp: 34.8,     // %
        unemployment: 8.7,    // %
        currentAccount: -5.8,  // % of GDP
        fiscalBalance: -2.3,  // % of GDP
        policyRate: 32.0,      // %
        fdi: 1.2,             // % of GDP
        reserves: 95,        // billion USD
        exchangeRate: 34.2    // per USD
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [0.9, 1.9, 11.5, 5.5, 4.5, 3.7, 5.1],
        inflation: [15.2, 14.6, 19.6, 64.8, 61.5, 52.1, 41.5],
        unemployment: [13.7, 13.3, 11.9, 10.6, 8.8, 8.7, 8.7],
        debtToGdp: [32.5, 35.5, 33.8, 33.2, 35.2, 35.8, 34.8],
        currentAccount: [-6.3, -5.5, -5.9, -6.5, -4.9, -5.2, -5.8],
        cpiIncrease: [15.2, 14.6, 19.6, 64.8, 61.5, 52.1, 41.5]
      },

      structure: {
        gdpBysector: { agriculture: 6.9, industry: 27.5, services: 65.6 },
        tradeOpenness: 48.9,
        topExports: ["Vehicles", "Textiles", "Steel", "Chemicals", "Machinery"],
        topPartners: ["Germany", "Italy", "Russia", "USA", "China"],
        islamicFinanceShare: 12.4  // % of banking assets
      },

      outlook: {
        rating: "Cautious",
        gdpForecast2026: 4.2,
        gdpForecast2027: 3.9,
        inflationForecast2026: 28.0,
        keyRisks: ["Inflation re-acceleration", "Currency depreciation pressures", "Geopolitical risks (Syria, Greece)", "Twin deficits"],
        keyDrivers: ["Manufacturing competitiveness", "Tourism recovery", "Disinflation from monetary tightening", "EU trade dynamics"],
        summary: "Turkey's economy is recovering with solid growth of 5.1% in 2025, though elevated inflation around 41.5% and persistent twin deficits pose significant risks. The central bank's hawkish policy stance is gradually bringing inflation down, but real interest rates remain a drag on investment. Near-term stability depends on sustained disinflation and external financing stability."
      },

      dsge: {
        status: "available",
        modelType: "Open-economy NK with currency regime change",
        keyFeatures: ["Exchange rate pass-through", "Inflation expectations dynamics", "Fiscal-monetary interaction", "Dollarization effects"],
        calibrationDate: "2025-Q4",
        shocks: ["Oil price shock", "Exchange rate shock", "Monetary policy shock", "Commodity price shock"],
        linkPath: "theory/dsge_turkey.html"
      }
    },

    "indonesia": {
      name: "Indonesia",
      code: "IDN",
      flag: "🇮🇩",
      region: "Southeast Asia",
      incomeGroup: "Lower-Middle Income",
      currency: "IDR",
      capital: "Jakarta",

      headline: {
        gdp: 1319,           // billion USD nominal
        gdpGrowth: 5.0,      // % real
        inflation: 2.7,       // % CPI
        population: 277.5,     // million
        debtToGdp: 35.2,     // %
        unemployment: 4.0,    // %
        currentAccount: -1.5,  // % of GDP
        fiscalBalance: -2.4,  // % of GDP
        policyRate: 6.25,      // %
        fdi: 1.9,             // % of GDP
        reserves: 142,        // billion USD
        exchangeRate: 16200    // per USD
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [5.0, -2.1, 3.7, 5.3, 5.1, 5.2, 5.0],
        inflation: [3.0, 2.0, 1.6, 4.7, 4.9, 2.8, 2.7],
        unemployment: [3.7, 4.2, 3.8, 3.9, 3.8, 4.0, 4.0],
        debtToGdp: [29.6, 32.6, 34.5, 35.4, 35.8, 36.2, 35.2],
        currentAccount: [-2.7, -0.9, -0.3, -2.8, -2.4, -2.0, -1.5],
        oilPrice: [64.3, 41.8, 70.9, 99.0, 82.6, 78.0, 75.0]
      },

      structure: {
        gdpBysector: { agriculture: 12.8, industry: 32.4, services: 54.8 },
        tradeOpenness: 39.2,
        topExports: ["Petroleum", "Palm Oil", "Coal", "Natural Gas", "Minerals"],
        topPartners: ["China", "Japan", "USA", "Singapore", "India"],
        islamicFinanceShare: 8.9  // % of banking assets
      },

      outlook: {
        rating: "Stable",
        gdpForecast2026: 5.2,
        gdpForecast2027: 5.4,
        inflationForecast2026: 2.8,
        keyRisks: ["Commodity price volatility", "Current account pressures", "Infrastructure financing gaps", "Regulatory uncertainty"],
        keyDrivers: ["Domestic consumption", "Infrastructure investment (IKN capital relocation)", "Manufacturing growth", "Commodity export stability"],
        summary: "Indonesia, as the largest Muslim-majority economy, maintains solid 5% growth supported by robust domestic consumption and infrastructure expansion. The transition of the capital to Nusantara (IKN) is a major structural initiative, though execution risks remain. Current account deficits are narrowing as commodity exports strengthen, supporting medium-term growth of 5.2-5.4%."
      },

      dsge: {
        status: "available",
        modelType: "Open-economy NK with commodity sector",
        keyFeatures: ["Commodity export dependence", "Domestic demand dynamics", "Capital flows and reserves", "Infrastructure fiscal channel"],
        calibrationDate: "2025-Q4",
        shocks: ["Commodity price shock", "TFP shock", "Monetary policy shock", "External demand shock"],
        linkPath: "theory/dsge_indonesia.html"
      }
    },

    "malaysia": {
      name: "Malaysia",
      code: "MYS",
      flag: "🇲🇾",
      region: "Southeast Asia",
      incomeGroup: "High Income Threshold",
      currency: "MYR",
      capital: "Kuala Lumpur",

      headline: {
        gdp: 550,            // billion USD nominal
        gdpGrowth: 3.9,      // % real
        inflation: 1.9,       // % CPI
        population: 34.8,     // million
        debtToGdp: 59.3,     // %
        unemployment: 3.1,    // %
        currentAccount: 2.1,  // % of GDP
        fiscalBalance: -3.2,  // % of GDP
        policyRate: 3.0,      // %
        fdi: 3.2,             // % of GDP
        reserves: 118,        // billion USD
        exchangeRate: 4.47    // per USD
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [4.3, -5.6, 3.3, 8.7, 3.9, 2.6, 3.9],
        inflation: [0.7, -1.1, 2.5, 3.3, 2.5, 2.0, 1.9],
        unemployment: [3.3, 3.9, 3.6, 3.5, 3.3, 3.1, 3.1],
        debtToGdp: [55.9, 60.3, 62.1, 57.8, 58.9, 59.8, 59.3],
        currentAccount: [3.6, 2.7, 1.1, 1.9, 1.8, 2.3, 2.1],
        islamicFinanceAssets: [539, 592, 682, 738, 802, 891, 945] // billion USD
      },

      structure: {
        gdpBysector: { agriculture: 8.0, industry: 34.2, services: 57.8 },
        tradeOpenness: 130.4,
        topExports: ["Electrical/Electronic", "Petroleum", "Palm Oil", "Chemicals", "Machinery"],
        topPartners: ["China", "Singapore", "USA", "Japan", "Thailand"],
        islamicFinanceShare: 26.1  // % of banking assets - highest in non-GCC
      },

      outlook: {
        rating: "Stable",
        gdpForecast2026: 4.1,
        gdpForecast2027: 4.3,
        inflationForecast2026: 2.1,
        keyRisks: ["Debt sustainability concerns", "Semiconductor supply chain volatility", "Geopolitical tensions (South China Sea)", "Fiscal consolidation pressures"],
        keyDrivers: ["Islamic finance hub expansion", "High-value electronics manufacturing", "Tourism recovery", "Digital economy transition"],
        summary: "Malaysia is approaching high-income status with 3.9% growth and operates as the leading Islamic finance hub globally, with nearly 26% of banking assets in Shariah-compliant instruments. However, elevated public debt at 59.3% constrains fiscal flexibility and requires sustained revenue improvements. Growth is expected to accelerate to 4.1-4.3% as electronics exports remain resilient."
      },

      dsge: {
        status: "available",
        modelType: "Open-economy NK with financial sector",
        keyFeatures: ["Islamic finance transmission", "Export-oriented growth model", "Debt sustainability constraints", "Regional trade dynamics"],
        calibrationDate: "2025-Q4",
        shocks: ["Oil price shock", "Monetary policy shock", "Technology sector shock", "Regional demand shock"],
        linkPath: "theory/dsge_malaysia.html"
      }
    },

    "pakistan": {
      name: "Pakistan",
      code: "PAK",
      flag: "🇵🇰",
      region: "South Asia",
      incomeGroup: "Lower-Middle Income",
      currency: "PKR",
      capital: "Islamabad",

      headline: {
        gdp: 447,            // billion USD nominal
        gdpGrowth: 2.4,      // % real
        inflation: 3.6,       // % CPI
        population: 230.4,     // million
        debtToGdp: 71.5,     // %
        unemployment: 5.3,    // %
        currentAccount: -0.5,  // % of GDP
        fiscalBalance: -6.5,  // % of GDP
        policyRate: 13.25,      // %
        fdi: 0.5,             // % of GDP
        reserves: 14.2,        // billion USD
        exchangeRate: 278.0    // per USD
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [2.2, 3.9, 6.0, 6.2, 2.4, 2.5, 2.4],
        inflation: [6.9, 9.1, 10.9, 27.3, 29.2, 14.2, 3.6],
        unemployment: [4.1, 5.5, 5.1, 5.0, 5.5, 5.2, 5.3],
        debtToGdp: [76.9, 74.8, 72.1, 73.5, 79.2, 72.8, 71.5],
        currentAccount: [-3.0, 0.8, -1.1, -4.5, -0.7, -0.8, -0.5],
        reserves: [16.2, 20.0, 13.9, 8.6, 8.3, 9.8, 14.2]
      },

      structure: {
        gdpBysector: { agriculture: 21.2, industry: 20.6, services: 58.2 },
        tradeOpenness: 28.5,
        topExports: ["Textiles", "Rice", "Knitwear", "Leather", "Cotton fabrics"],
        topPartners: ["USA", "China", "Germany", "UK", "UAE"],
        islamicFinanceShare: 18.7  // % of banking assets
      },

      outlook: {
        rating: "Cautious",
        gdpForecast2026: 2.8,
        gdpForecast2027: 3.5,
        inflationForecast2026: 5.2,
        keyRisks: ["High external debt burden", "Inflation persistence", "Political instability", "Climate vulnerabilities (floods, drought)"],
        keyDrivers: ["IMF program conditionality compliance", "Energy sector reforms", "Textile export growth", "Agricultural productivity"],
        summary: "Pakistan's economy is stabilizing following two years of severe crisis, with inflation moderating and external reserves recovering under the IMF Extended Fund Facility. However, elevated debt at 71.5% and large fiscal deficits limit policy space, requiring sustained structural reforms. Growth is projected to gradually improve to 3.5% by 2027 as macro-stabilization gains traction."
      },

      dsge: {
        status: "available",
        modelType: "Open-economy NK with development constraints",
        keyFeatures: ["IMF program interaction", "Fiscal dominance in monetary policy", "External borrowing constraints", "Agricultural sector dynamics"],
        calibrationDate: "2025-Q4",
        shocks: ["External financing shock", "Agricultural shock", "Political shock", "Monetary policy shock"],
        linkPath: "theory/dsge_pakistan.html"
      }
    },

    "nigeria": {
      name: "Nigeria",
      code: "NGA",
      flag: "🇳🇬",
      region: "Sub-Saharan Africa",
      incomeGroup: "Lower-Middle Income",
      currency: "NGN",
      capital: "Abuja",

      headline: {
        gdp: 476,            // billion USD nominal
        gdpGrowth: 2.8,      // % real
        inflation: 34.6,      // % CPI
        population: 223.8,     // million
        debtToGdp: 37.2,     // %
        unemployment: 3.9,    // %
        currentAccount: 2.8,  // % of GDP
        fiscalBalance: -3.8,  // % of GDP
        policyRate: 27.25,      // %
        fdi: 0.6,             // % of GDP
        reserves: 34.1,        // billion USD
        exchangeRate: 1547.0   // per USD
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [2.3, -1.6, 3.6, 3.5, 2.9, 3.2, 2.8],
        inflation: [11.4, 13.9, 17.0, 21.8, 28.8, 32.2, 34.6],
        unemployment: [8.8, 27.1, 13.9, 5.0, 4.1, 3.8, 3.9],
        debtToGdp: [27.3, 34.8, 38.1, 39.5, 37.8, 37.5, 37.2],
        currentAccount: [3.6, 3.9, 2.1, 4.2, 2.5, 2.9, 2.8],
        oilPrice: [64.3, 41.8, 70.9, 99.0, 82.6, 78.0, 75.0]
      },

      structure: {
        gdpBysector: { agriculture: 21.1, industry: 27.6, services: 51.3 },
        tradeOpenness: 23.6,
        topExports: ["Crude Oil", "Natural Gas", "Refined Petroleum", "Cocoa", "Cashews"],
        topPartners: ["India", "USA", "Spain", "France", "Netherlands"],
        islamicFinanceShare: 3.2  // % of banking assets
      },

      outlook: {
        rating: "Cautious",
        gdpForecast2026: 3.2,
        gdpForecast2027: 3.5,
        inflationForecast2026: 22.0,
        keyRisks: ["Inflation persistence from naira devaluation", "Oil production volatility (security concerns)", "Fiscal pressures from subsidy removal", "Climate impacts on agriculture"],
        keyDrivers: ["Oil sector recovery", "Agricultural expansion", "Monetary policy normalization", "Non-oil revenue mobilization"],
        summary: "Nigeria, Africa's largest economy, is managing high inflation above 34% following significant naira depreciation, though commodity export strength supports current account surpluses. The Central Bank's aggressive rate hikes are gradually reducing price pressures, but the combination of high rates and inflation creates significant real sector headwinds. Growth is expected to accelerate modestly to 3.2-3.5% as disinflation progresses and oil production stabilizes."
      },

      dsge: {
        status: "available",
        modelType: "Open-economy NK with oil and commodity dependence",
        keyFeatures: ["Oil revenue fiscal rule", "Exchange rate pass-through", "Commodity price shocks", "Food price dynamics"],
        calibrationDate: "2025-Q4",
        shocks: ["Oil price shock", "Exchange rate shock", "Monetary policy shock", "Agricultural shock"],
        linkPath: "theory/dsge_nigeria.html"
      }
    },

    "uae": {
      name: "United Arab Emirates",
      code: "ARE",
      flag: "🇦🇪",
      region: "GCC",
      incomeGroup: "High Income",
      currency: "AED",
      capital: "Abu Dhabi",

      headline: {
        gdp: 614,            // billion USD nominal
        gdpGrowth: 3.8,      // % real
        inflation: 1.5,       // % CPI
        population: 10.2,     // million
        debtToGdp: 29.1,     // %
        unemployment: 1.7,    // %
        currentAccount: 8.9,  // % of GDP
        fiscalBalance: 5.2,   // % of GDP
        policyRate: 5.5,      // %
        fdi: 4.1,             // % of GDP
        reserves: 188,        // billion USD
        exchangeRate: 3.67    // per USD
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [1.6, -4.0, 4.2, 7.1, 3.6, 2.8, 3.8],
        inflation: [1.9, -2.1, 0.9, 4.7, 3.1, 2.2, 1.5],
        unemployment: [2.0, 2.2, 2.1, 1.9, 1.8, 1.7, 1.7],
        debtToGdp: [28.4, 34.2, 31.6, 28.9, 29.5, 29.8, 29.1],
        currentAccount: [9.8, 1.2, 5.9, 16.4, 10.2, 9.5, 8.9],
        oilPrice: [64.3, 41.8, 70.9, 99.0, 82.6, 78.0, 75.0]
      },

      structure: {
        gdpBysector: { agriculture: 0.8, industry: 40.5, services: 58.7 },
        tradeOpenness: 138.2,
        topExports: ["Crude Oil", "Refined Petroleum", "Re-exports", "Chemicals", "Metals"],
        topPartners: ["India", "China", "Japan", "USA", "Saudi Arabia"],
        islamicFinanceShare: 25.1  // % of banking assets
      },

      outlook: {
        rating: "Stable",
        gdpForecast2026: 3.5,
        gdpForecast2027: 3.2,
        inflationForecast2026: 2.0,
        keyRisks: ["Oil price volatility", "Regional geopolitical tensions", "Global trade slowdown", "Real estate sector risks"],
        keyDrivers: ["Diversified non-oil sector (tourism, logistics, finance)", "Expo 2025 and tourism boost", "Islamic finance hub expansion", "AI and tech sector growth"],
        summary: "The UAE's diversified, trade-oriented economy delivered 3.8% growth in 2025, supported by robust non-oil sectors including tourism, logistics, and Islamic finance. The country maintains exceptional fiscal and external positions with current account surpluses and manageable debt, providing policy flexibility. Growth is expected to moderate slightly to 3.2-3.5% as mega-event effects normalize, with inflation remaining well-anchored."
      },

      dsge: {
        status: "available",
        modelType: "Open-economy NK with diversified economy",
        keyFeatures: ["Non-oil sector dominance", "Re-export hub dynamics", "Islamic finance channel", "Peg arrangement constraints"],
        calibrationDate: "2025-Q4",
        shocks: ["Oil price shock", "Regional demand shock", "Monetary policy shock", "TFP shock"],
        linkPath: "theory/dsge_uae.html"
      }
    },

    "egypt": {
      name: "Egypt",
      code: "EGY",
      flag: "🇪🇬",
      region: "MENA",
      incomeGroup: "Lower-Middle Income",
      currency: "EGP",
      capital: "Cairo",

      headline: {
        gdp: 535,            // billion USD nominal
        gdpGrowth: 2.9,      // % real
        inflation: 26.7,      // % CPI
        population: 110.2,     // million
        debtToGdp: 89.4,     // %
        unemployment: 7.1,    // %
        currentAccount: -3.1,  // % of GDP
        fiscalBalance: -6.9,  // % of GDP
        policyRate: 27.25,      // %
        fdi: 2.3,             // % of GDP
        reserves: 33.4,        // billion USD
        exchangeRate: 47.8    // per USD
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [5.5, 3.3, 3.3, 4.3, 4.1, 2.3, 2.9],
        inflation: [9.4, 5.7, 4.5, 8.8, 35.4, 28.5, 26.7],
        unemployment: [7.8, 8.0, 7.6, 7.5, 7.2, 7.1, 7.1],
        debtToGdp: [84.7, 88.2, 86.7, 83.5, 92.5, 91.2, 89.4],
        currentAccount: [-2.1, -0.6, -2.4, -3.9, -4.2, -3.5, -3.1],
        suezCanalRevenue: [5.7, 5.6, 7.0, 6.7, 6.6, 7.2, 7.1] // billion USD
      },

      structure: {
        gdpBysector: { agriculture: 11.3, industry: 32.8, services: 55.9 },
        tradeOpenness: 38.9,
        topExports: ["Petroleum", "Natural Gas", "Textiles", "Chemicals", "Oranges"],
        topPartners: ["India", "Saudi Arabia", "UAE", "USA", "Italy"],
        islamicFinanceShare: 13.2  // % of banking assets
      },

      outlook: {
        rating: "Cautious",
        gdpForecast2026: 3.6,
        gdpForecast2027: 4.2,
        inflationForecast2026: 15.0,
        keyRisks: ["Inflation persistence from EGP devaluation", "External debt sustainability", "Youth unemployment and brain drain", "Water scarcity and climate stress"],
        keyDrivers: ["New Administrative Capital completion", "Suez Canal toll revenues", "Natural gas production expansion", "Tourism recovery (Red Sea resorts)"],
        summary: "Egypt is managing high inflation above 26% following major currency devaluation in 2024, while structural reforms under an IMF program aim to strengthen external sustainability. The new Administrative Capital project and Suez Canal revenues provide important structural revenue sources, though high debt at 89.4% and fiscal pressures remain concerning. Inflation is expected to decline gradually to 15% by 2026 as monetary policy tightening takes hold, supporting growth acceleration."
      },

      dsge: {
        status: "available",
        modelType: "Open-economy NK with development and exchange rate dynamics",
        keyFeatures: ["Currency regime transition", "Fiscal dominance", "Suez Canal revenue channel", "Large population labor dynamics"],
        calibrationDate: "2025-Q4",
        shocks: ["External financing shock", "Currency shock", "Monetary policy shock", "Commodity price shock"],
        linkPath: "theory/dsge_egypt.html"
      }
    },

    "qatar": {
      name: "Qatar",
      code: "QAT",
      flag: "🇶🇦",
      region: "GCC",
      incomeGroup: "High Income",
      currency: "QAR",
      capital: "Doha",

      headline: {
        gdp: 246,
        gdpGrowth: 2.4,
        inflation: 2.8,
        population: 2.7,
        debtToGdp: 42.5,
        unemployment: 0.1,
        currentAccount: 16.2,
        fiscalBalance: 4.8,
        policyRate: 5.75,
        fdi: 1.1,
        reserves: 47.2,
        exchangeRate: 3.64
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [0.8, -3.6, 1.6, 4.9, 2.4, 2.1, 2.4],
        inflation: [-0.7, -2.7, 2.3, 5.0, 3.1, 2.5, 2.8],
        unemployment: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
        debtToGdp: [57.1, 72.6, 58.4, 42.3, 41.8, 42.1, 42.5],
        currentAccount: [2.4, -2.5, 14.6, 26.7, 16.5, 15.8, 16.2],
        lngExports: [77.8, 51.2, 85.6, 124.5, 95.3, 88.0, 90.0]
      },

      structure: {
        gdpBysector: { agriculture: 0.2, industry: 52.8, services: 47.0 },
        tradeOpenness: 82.5,
        topExports: ["LNG", "Crude Oil", "Refined Petroleum", "Fertilizers", "Petrochemicals"],
        topPartners: ["Japan", "South Korea", "India", "China", "Singapore"],
        islamicFinanceShare: 25.8
      },

      outlook: {
        rating: "Stable",
        gdpForecast2026: 2.8,
        gdpForecast2027: 3.2,
        inflationForecast2026: 2.5,
        keyRisks: ["LNG price volatility", "Regional diplomatic tensions", "Demographic imbalance (90% expat)", "Carbon transition risk"],
        keyDrivers: ["North Field expansion (LNG capacity doubling)", "FIFA 2022 infrastructure legacy", "Financial center growth (QFC)", "Education & research hubs"],
        summary: "Qatar maintains one of the world's highest GDP per capita levels, driven by massive LNG exports and prudent fiscal management. The ongoing North Field expansion will nearly double LNG capacity by 2027, strengthening Qatar's position as the world's top LNG exporter. Post-FIFA infrastructure supports diversification into tourism, sports, and financial services."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with LNG sector",
        keyFeatures: ["LNG export dominance", "Sovereign wealth fund dynamics", "Fixed exchange rate regime", "Expat labor market"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "kuwait": {
      name: "Kuwait",
      code: "KWT",
      flag: "🇰🇼",
      region: "GCC",
      incomeGroup: "High Income",
      currency: "KWD",
      capital: "Kuwait City",

      headline: {
        gdp: 164,
        gdpGrowth: 2.6,
        inflation: 3.4,
        population: 4.9,
        debtToGdp: 11.8,
        unemployment: 2.1,
        currentAccount: 22.4,
        fiscalBalance: 8.1,
        policyRate: 4.25,
        fdi: 0.3,
        reserves: 48.5,
        exchangeRate: 0.31
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [-0.6, -8.7, 1.3, 8.2, -0.6, 2.3, 2.6],
        inflation: [1.1, 2.1, 3.4, 4.0, 3.6, 3.2, 3.4],
        unemployment: [2.2, 2.3, 2.2, 2.1, 2.1, 2.0, 2.1],
        debtToGdp: [14.8, 29.2, 20.5, 8.4, 10.2, 11.0, 11.8],
        currentAccount: [14.5, -2.8, 21.3, 33.5, 25.1, 23.0, 22.4],
        oilProduction: [2.65, 2.43, 2.42, 2.70, 2.55, 2.58, 2.62]
      },

      structure: {
        gdpBysector: { agriculture: 0.4, industry: 58.6, services: 41.0 },
        tradeOpenness: 78.2,
        topExports: ["Crude Oil", "Refined Petroleum", "Petrochemicals", "Fertilizers"],
        topPartners: ["China", "India", "South Korea", "Japan", "USA"],
        islamicFinanceShare: 40.2
      },

      outlook: {
        rating: "Stable",
        gdpForecast2026: 2.9,
        gdpForecast2027: 2.5,
        inflationForecast2026: 2.8,
        keyRisks: ["Oil price dependency (90%+ revenue)", "Political gridlock (parliament-government tensions)", "Slow diversification", "Subsidy and fiscal reform delays"],
        keyDrivers: ["Kuwait Investment Authority returns", "OPEC+ production recovery", "Vision 2035 diversification plan", "Financial sector growth"],
        summary: "Kuwait holds one of the world's largest sovereign wealth funds ($900B+) and the lowest debt-to-GDP in the GCC at 11.8%, providing exceptional fiscal buffers. However, the economy remains heavily oil-dependent with limited diversification progress due to recurring political gridlock. Growth is expected at 2.5-2.9% driven by OPEC+ quota adjustments and nascent non-oil initiatives."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with oil-dominated fiscal",
        keyFeatures: ["Oil-dominated fiscal revenue", "Currency basket peg", "Sovereign wealth fund stabilizer", "National-expat labor duality"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "bahrain": {
      name: "Bahrain",
      code: "BHR",
      flag: "🇧🇭",
      region: "GCC",
      incomeGroup: "High Income",
      currency: "BHD",
      capital: "Manama",

      headline: {
        gdp: 46,
        gdpGrowth: 3.1,
        inflation: 1.2,
        population: 1.6,
        debtToGdp: 118.2,
        unemployment: 3.9,
        currentAccount: 5.2,
        fiscalBalance: -5.1,
        policyRate: 6.0,
        fdi: 2.8,
        reserves: 5.8,
        exchangeRate: 0.376
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [2.2, -4.9, 2.6, 4.9, 2.7, 3.0, 3.1],
        inflation: [1.0, -2.3, -0.6, 3.6, 1.0, 1.1, 1.2],
        unemployment: [3.8, 4.5, 4.2, 4.0, 3.9, 3.8, 3.9],
        debtToGdp: [102.0, 128.5, 128.9, 117.5, 120.1, 119.0, 118.2],
        currentAccount: [-2.1, -9.5, 6.5, 12.2, 6.1, 5.5, 5.2],
        financialSectorGDP: [16.8, 17.2, 17.5, 17.1, 17.6, 17.9, 18.2]
      },

      structure: {
        gdpBysector: { agriculture: 0.3, industry: 35.9, services: 63.8 },
        tradeOpenness: 115.8,
        topExports: ["Refined Petroleum", "Aluminum", "Iron Ore", "Crude Oil"],
        topPartners: ["Saudi Arabia", "UAE", "USA", "Japan", "India"],
        islamicFinanceShare: 33.5
      },

      outlook: {
        rating: "Cautious",
        gdpForecast2026: 3.3,
        gdpForecast2027: 3.0,
        inflationForecast2026: 1.5,
        keyRisks: ["Very high public debt (118%)", "Oil price sensitivity", "GCC support dependency", "Regional security tensions"],
        keyDrivers: ["Financial services hub deepening", "Islamic finance growth", "Tourism and entertainment expansion", "Fintech and startup ecosystem"],
        summary: "Bahrain serves as the GCC's financial services hub with Islamic finance comprising 33.5% of banking assets, but carries the region's highest debt-to-GDP ratio at 118.2%. Growth of 3.1% is supported by financial sector expansion and tourism, though fiscal consolidation remains critical. GCC financial support and the Fiscal Balance Programme underpin medium-term stability."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with financial hub",
        keyFeatures: ["Financial sector dominance", "USD peg constraint", "High debt dynamics", "GCC support mechanisms"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "oman": {
      name: "Oman",
      code: "OMN",
      flag: "🇴🇲",
      region: "GCC",
      incomeGroup: "High Income",
      currency: "OMR",
      capital: "Muscat",

      headline: {
        gdp: 115,
        gdpGrowth: 1.8,
        inflation: 1.6,
        population: 5.2,
        debtToGdp: 36.8,
        unemployment: 2.4,
        currentAccount: 2.5,
        fiscalBalance: 0.8,
        policyRate: 5.5,
        fdi: 3.4,
        reserves: 17.9,
        exchangeRate: 0.385
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [-0.8, -3.4, 3.1, 4.3, 1.3, 1.5, 1.8],
        inflation: [0.1, -0.9, 1.5, 2.8, 1.0, 1.3, 1.6],
        unemployment: [2.5, 3.0, 2.8, 2.6, 2.5, 2.4, 2.4],
        debtToGdp: [60.0, 81.1, 63.3, 40.8, 37.2, 36.5, 36.8],
        currentAccount: [-5.1, -16.2, -4.0, 5.5, 3.2, 2.8, 2.5],
        oilProduction: [0.97, 0.95, 0.96, 1.05, 1.01, 0.99, 1.00]
      },

      structure: {
        gdpBysector: { agriculture: 2.3, industry: 50.8, services: 46.9 },
        tradeOpenness: 85.6,
        topExports: ["Crude Oil", "Refined Petroleum", "Natural Gas", "Metals", "Chemicals"],
        topPartners: ["China", "India", "South Korea", "Japan", "UAE"],
        islamicFinanceShare: 14.5
      },

      outlook: {
        rating: "Stable",
        gdpForecast2026: 2.5,
        gdpForecast2027: 3.0,
        inflationForecast2026: 1.8,
        keyRisks: ["Oil price dependence", "Fiscal sustainability during transition", "Water scarcity", "Youth employment pressures"],
        keyDrivers: ["Vision 2040 diversification", "Green hydrogen investments", "Tourism expansion (Ras Al Hadd, Musandam)", "Port and logistics hub (Duqm)"],
        summary: "Oman has made significant fiscal progress, reducing debt-to-GDP from 81% in 2020 to 36.8% through disciplined spending and favorable oil prices. Vision 2040 focuses on diversifying into logistics (Duqm port), tourism, and green hydrogen. Growth of 2.5-3.0% is expected as non-oil sectors gain momentum, though oil dependency remains the primary structural challenge."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with resource transition",
        keyFeatures: ["Oil-to-diversification transition", "USD peg regime", "Green energy investment channel", "Labor nationalization dynamics"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "morocco": {
      name: "Morocco",
      code: "MAR",
      flag: "🇲🇦",
      region: "North Africa",
      incomeGroup: "Lower-Middle Income",
      currency: "MAD",
      capital: "Rabat",

      headline: {
        gdp: 152,
        gdpGrowth: 3.4,
        inflation: 2.5,
        population: 37.8,
        debtToGdp: 69.5,
        unemployment: 11.8,
        currentAccount: -2.8,
        fiscalBalance: -4.5,
        policyRate: 2.75,
        fdi: 1.8,
        reserves: 36.2,
        exchangeRate: 9.8
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [2.6, -7.2, 8.0, 1.3, 3.0, 3.2, 3.4],
        inflation: [0.2, 0.7, 1.4, 6.6, 6.1, 2.8, 2.5],
        unemployment: [9.2, 11.9, 12.3, 11.8, 13.0, 12.3, 11.8],
        debtToGdp: [65.2, 76.4, 68.9, 71.5, 70.2, 69.8, 69.5],
        currentAccount: [-3.7, -1.5, -2.3, -3.5, -1.1, -2.5, -2.8],
        phosphateExports: [5.2, 5.0, 11.0, 11.5, 7.8, 7.2, 7.5]
      },

      structure: {
        gdpBysector: { agriculture: 11.5, industry: 25.4, services: 63.1 },
        tradeOpenness: 73.8,
        topExports: ["Phosphates", "Automobiles", "Textiles", "Electronics", "Agriculture"],
        topPartners: ["France", "Spain", "Brazil", "India", "Italy"],
        islamicFinanceShare: 3.8
      },

      outlook: {
        rating: "Stable",
        gdpForecast2026: 3.8,
        gdpForecast2027: 4.0,
        inflationForecast2026: 2.3,
        keyRisks: ["Drought vulnerability", "High youth unemployment (30%+)", "EU economic slowdown impact", "Fiscal consolidation pressures"],
        keyDrivers: ["2030 FIFA World Cup preparation", "Automotive manufacturing hub growth", "Renewable energy expansion", "Port infrastructure (Tanger-Med)"],
        summary: "Morocco is positioning itself as a manufacturing and logistics gateway between Europe and Africa, with Tanger-Med becoming the Mediterranean's largest port. The 2030 FIFA World Cup co-hosting will drive significant infrastructure investment. Persistent drought remains a key vulnerability, though industrial diversification into automotive and aerospace is reducing agricultural exposure."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with agricultural vulnerability",
        keyFeatures: ["Agricultural supply shocks", "EU trade integration", "Managed float exchange rate", "Infrastructure investment channel"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "jordan": {
      name: "Jordan",
      code: "JOR",
      flag: "🇯🇴",
      region: "MENA",
      incomeGroup: "Upper-Middle Income",
      currency: "JOD",
      capital: "Amman",

      headline: {
        gdp: 51,
        gdpGrowth: 2.4,
        inflation: 1.8,
        population: 11.6,
        debtToGdp: 88.7,
        unemployment: 21.4,
        currentAccount: -5.8,
        fiscalBalance: -3.2,
        policyRate: 7.0,
        fdi: 1.5,
        reserves: 17.8,
        exchangeRate: 0.709
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [2.0, -1.6, 2.2, 2.5, 2.6, 2.3, 2.4],
        inflation: [0.8, 0.3, 1.3, 4.2, 2.1, 1.9, 1.8],
        unemployment: [19.1, 24.7, 23.2, 22.8, 21.4, 21.7, 21.4],
        debtToGdp: [77.6, 88.4, 91.8, 91.5, 90.0, 89.2, 88.7],
        currentAccount: [-2.8, -7.2, -8.8, -7.8, -5.2, -5.5, -5.8],
        remittances: [3.8, 3.5, 4.0, 4.3, 4.1, 4.2, 4.3]
      },

      structure: {
        gdpBysector: { agriculture: 4.5, industry: 22.8, services: 72.7 },
        tradeOpenness: 68.5,
        topExports: ["Potash", "Phosphates", "Pharmaceuticals", "Textiles", "Fertilizers"],
        topPartners: ["USA", "Saudi Arabia", "India", "Iraq", "UAE"],
        islamicFinanceShare: 16.2
      },

      outlook: {
        rating: "Cautious",
        gdpForecast2026: 2.6,
        gdpForecast2027: 2.8,
        inflationForecast2026: 2.0,
        keyRisks: ["Very high unemployment (21%+)", "Refugee burden (Syrian/Iraqi)", "High public debt", "Regional instability spillovers"],
        keyDrivers: ["IT and services exports growth", "Remittance inflows stability", "Tourism recovery (Petra, Dead Sea)", "Pharmaceutical industry expansion"],
        summary: "Jordan faces persistent structural challenges with unemployment above 21% and public debt near 89% of GDP, compounded by hosting over 1.3 million Syrian refugees. Growth remains modest at 2.4-2.8% but steady, supported by IT services exports and tourism recovery."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with aid-dependent small economy",
        keyFeatures: ["Remittance and aid flows", "USD peg constraint", "High unemployment equilibrium", "Refugee economic impact"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "iraq": {
      name: "Iraq",
      code: "IRQ",
      flag: "🇮🇶",
      region: "MENA",
      incomeGroup: "Upper-Middle Income",
      currency: "IQD",
      capital: "Baghdad",

      headline: {
        gdp: 264,
        gdpGrowth: -0.5,
        inflation: 4.0,
        population: 44.5,
        debtToGdp: 44.2,
        unemployment: 15.5,
        currentAccount: -2.3,
        fiscalBalance: -1.8,
        policyRate: 7.5,
        fdi: 1.2,
        reserves: 112.0,
        exchangeRate: 1310
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [4.5, -15.7, 1.6, 7.0, -2.9, 0.2, -0.5],
        inflation: [-0.2, 0.6, 6.0, 5.0, 3.7, 3.8, 4.0],
        unemployment: [12.8, 16.5, 16.2, 15.0, 14.7, 15.2, 15.5],
        debtToGdp: [48.5, 84.2, 59.8, 42.5, 44.0, 43.8, 44.2],
        currentAccount: [1.5, -12.5, 7.2, 12.8, -2.1, -2.0, -2.3],
        oilProduction: [4.60, 3.99, 4.10, 4.55, 4.30, 4.20, 4.15]
      },

      structure: {
        gdpBysector: { agriculture: 5.0, industry: 55.8, services: 39.2 },
        tradeOpenness: 58.0,
        topExports: ["Crude Oil", "Refined Petroleum", "Gold", "Dates"],
        topPartners: ["China", "India", "South Korea", "USA", "Greece"],
        islamicFinanceShare: 22.5
      },

      outlook: {
        rating: "Negative",
        gdpForecast2026: 2.8,
        gdpForecast2027: 3.2,
        inflationForecast2026: 3.5,
        keyRisks: ["Oil price volatility (95%+ of revenue)", "OPEC+ production cuts", "Security and governance challenges", "Infrastructure deficit"],
        keyDrivers: ["OPEC+ quota relaxation potential", "Reconstruction and investment spending", "Private sector development", "Gas capture and electricity generation"],
        summary: "Iraq holds OPEC's second-largest proven reserves but faces GDP contraction of -0.5% in 2025 due to OPEC+ production cuts. The economy is almost entirely oil-dependent with 95%+ of government revenue from hydrocarbons. Growth should recover to 2.8-3.2% as OPEC+ restrictions ease."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with post-conflict reconstruction",
        keyFeatures: ["Extreme oil dependence", "OPEC+ quota dynamics", "Reconstruction investment channel", "Institutional capacity constraints"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "algeria": {
      name: "Algeria",
      code: "DZA",
      flag: "🇩🇿",
      region: "North Africa",
      incomeGroup: "Lower-Middle Income",
      currency: "DZD",
      capital: "Algiers",

      headline: {
        gdp: 240,
        gdpGrowth: 3.8,
        inflation: 7.2,
        population: 46.8,
        debtToGdp: 48.5,
        unemployment: 11.8,
        currentAccount: -2.1,
        fiscalBalance: -7.2,
        policyRate: 3.0,
        fdi: 0.5,
        reserves: 68.0,
        exchangeRate: 135.2
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [0.8, -5.1, 3.4, 3.6, 4.2, 3.9, 3.8],
        inflation: [2.0, 2.4, 7.2, 9.3, 7.4, 6.8, 7.2],
        unemployment: [11.4, 12.8, 12.7, 11.6, 11.5, 11.7, 11.8],
        debtToGdp: [45.8, 51.5, 63.0, 52.8, 48.0, 47.5, 48.5],
        currentAccount: [-10.0, -12.8, -2.8, 7.7, -0.5, -1.8, -2.1],
        hydrocarbonRevenue: [33.2, 20.1, 34.5, 48.2, 36.5, 34.0, 33.5]
      },

      structure: {
        gdpBysector: { agriculture: 13.3, industry: 37.5, services: 49.2 },
        tradeOpenness: 42.5,
        topExports: ["Crude Oil", "Natural Gas", "Refined Petroleum", "Ammonia", "Phosphates"],
        topPartners: ["Italy", "France", "Spain", "Turkey", "China"],
        islamicFinanceShare: 2.1
      },

      outlook: {
        rating: "Cautious",
        gdpForecast2026: 3.5,
        gdpForecast2027: 3.2,
        inflationForecast2026: 6.5,
        keyRisks: ["Hydrocarbon dependency (60% of revenue)", "Subsidy burden and fiscal pressures", "Youth unemployment and social tensions", "Declining oil reserves long-term"],
        keyDrivers: ["Natural gas exports to Europe", "Agricultural modernization", "Renewable energy potential (solar)", "Construction and housing programs"],
        summary: "Algeria is Africa's largest country by area and a major European energy supplier, with natural gas gaining strategic importance as Europe diversifies from Russian supply. Growth of 3.5-3.8% is supported by hydrocarbon revenues, though heavy subsidies strain fiscal accounts. Diversification away from hydrocarbons remains the critical long-term challenge."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with hydrocarbon transition",
        keyFeatures: ["Gas-to-Europe supply dynamics", "Subsidy-heavy fiscal structure", "Import-dependent economy", "Public sector dominance"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "tunisia": {
      name: "Tunisia",
      code: "TUN",
      flag: "🇹🇳",
      region: "North Africa",
      incomeGroup: "Lower-Middle Income",
      currency: "TND",
      capital: "Tunis",

      headline: {
        gdp: 49,
        gdpGrowth: 1.6,
        inflation: 7.0,
        population: 12.4,
        debtToGdp: 83.2,
        unemployment: 15.8,
        currentAccount: -6.5,
        fiscalBalance: -5.8,
        policyRate: 8.0,
        fdi: 1.2,
        reserves: 8.5,
        exchangeRate: 3.12
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [1.0, -8.8, 4.4, 2.4, 0.4, 1.2, 1.6],
        inflation: [6.7, 5.6, 5.7, 8.3, 9.3, 7.5, 7.0],
        unemployment: [14.9, 17.4, 16.2, 15.3, 15.8, 15.9, 15.8],
        debtToGdp: [68.0, 79.5, 79.8, 80.2, 82.5, 83.0, 83.2],
        currentAccount: [-8.5, -6.0, -6.2, -8.5, -3.0, -5.8, -6.5],
        tourismRevenue: [2.0, 0.5, 0.8, 1.5, 2.2, 2.5, 2.6]
      },

      structure: {
        gdpBysector: { agriculture: 10.1, industry: 25.2, services: 64.7 },
        tradeOpenness: 85.2,
        topExports: ["Textiles", "Olive Oil", "Electrical Equipment", "Phosphates", "Petroleum"],
        topPartners: ["France", "Italy", "Germany", "Spain", "Libya"],
        islamicFinanceShare: 6.8
      },

      outlook: {
        rating: "Negative",
        gdpForecast2026: 2.0,
        gdpForecast2027: 2.3,
        inflationForecast2026: 6.5,
        keyRisks: ["External financing constraints", "Political uncertainty", "Brain drain (skilled emigration)", "Water scarcity and climate stress"],
        keyDrivers: ["EU nearshoring opportunities", "Tourism recovery", "Olive oil and agricultural exports", "IT outsourcing growth"],
        summary: "Tunisia faces persistent economic headwinds with sluggish growth of 1.6%, high debt at 83.2%, and limited access to international financing. Nearshoring opportunities from EU proximity and tourism offer potential, but structural reforms remain essential for sustainable growth."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with dual-track economy",
        keyFeatures: ["EU trade dependency", "Tourism revenue volatility", "External financing constraints", "Labor market rigidities"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "bangladesh": {
      name: "Bangladesh",
      code: "BGD",
      flag: "🇧🇩",
      region: "South Asia",
      incomeGroup: "Lower-Middle Income",
      currency: "BDT",
      capital: "Dhaka",

      headline: {
        gdp: 460,
        gdpGrowth: 5.8,
        inflation: 9.5,
        population: 173.6,
        debtToGdp: 38.5,
        unemployment: 3.5,
        currentAccount: -1.2,
        fiscalBalance: -4.8,
        policyRate: 8.5,
        fdi: 0.4,
        reserves: 24.8,
        exchangeRate: 117.5
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [7.9, 3.5, 6.9, 7.1, 5.8, 5.5, 5.8],
        inflation: [5.5, 5.7, 5.6, 7.7, 9.5, 9.8, 9.5],
        unemployment: [4.2, 5.3, 4.0, 3.6, 3.5, 3.4, 3.5],
        debtToGdp: [34.5, 37.5, 36.8, 37.2, 38.0, 38.8, 38.5],
        currentAccount: [-1.7, -1.5, -1.1, -4.1, -0.7, -1.0, -1.2],
        garmentExports: [34.1, 27.9, 35.8, 42.6, 38.5, 40.2, 42.0]
      },

      structure: {
        gdpBysector: { agriculture: 11.2, industry: 34.2, services: 54.6 },
        tradeOpenness: 32.8,
        topExports: ["Garments (RMG)", "Textiles", "Jute", "Leather", "Shrimp"],
        topPartners: ["USA", "Germany", "UK", "France", "Spain"],
        islamicFinanceShare: 25.2
      },

      outlook: {
        rating: "Stable",
        gdpForecast2026: 6.2,
        gdpForecast2027: 6.5,
        inflationForecast2026: 7.5,
        keyRisks: ["Inflation persistence", "Reserve adequacy pressures", "Climate vulnerability (flooding, cyclones)", "Garment sector competition"],
        keyDrivers: ["Ready-made garment export growth", "Remittance inflows ($22B+)", "Infrastructure development (metro, bridges)", "IT services and digital economy expansion"],
        summary: "Bangladesh has been one of the world's fastest-growing economies, driven by its $42B garment export industry — the world's second largest. Growth of 5.8-6.5% is supported by strong domestic consumption, remittances, and manufacturing competitiveness. Key challenges include persistent inflation above 9%, climate vulnerability, and the need to diversify beyond garments."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with export-led development",
        keyFeatures: ["Garment export dominance", "Remittance channel", "Climate shock vulnerability", "Development financing dynamics"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "iran": {
      name: "Iran",
      code: "IRN",
      flag: "🇮🇷",
      region: "Middle East",
      incomeGroup: "Lower-Middle Income",
      currency: "IRR",
      capital: "Tehran",

      headline: {
        gdp: 388,
        gdpGrowth: 3.3,
        inflation: 35.0,
        population: 89.2,
        debtToGdp: 32.5,
        unemployment: 9.2,
        currentAccount: 2.5,
        fiscalBalance: -3.5,
        policyRate: 23.0,
        fdi: 0.3,
        reserves: 32.0,
        exchangeRate: 42000
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [-3.1, 1.9, 4.7, 3.8, 5.4, 3.5, 3.3],
        inflation: [39.9, 36.4, 40.2, 45.8, 40.0, 37.5, 35.0],
        unemployment: [10.8, 10.4, 9.2, 9.5, 9.0, 9.1, 9.2],
        debtToGdp: [43.0, 48.5, 40.2, 35.0, 33.0, 32.8, 32.5],
        currentAccount: [-0.1, -0.5, 2.5, 3.8, 3.0, 2.8, 2.5],
        oilProduction: [2.36, 1.99, 2.39, 2.55, 3.10, 3.25, 3.20]
      },

      structure: {
        gdpBysector: { agriculture: 12.0, industry: 38.5, services: 49.5 },
        tradeOpenness: 30.5,
        topExports: ["Crude Oil", "Petrochemicals", "Steel", "Minerals", "Agriculture"],
        topPartners: ["China", "Iraq", "Turkey", "UAE", "India"],
        islamicFinanceShare: 100.0
      },

      outlook: {
        rating: "Negative",
        gdpForecast2026: 2.8,
        gdpForecast2027: 2.5,
        inflationForecast2026: 32.0,
        keyRisks: ["International sanctions impact", "Chronic high inflation", "Capital flight and brain drain", "Regional security tensions"],
        keyDrivers: ["Oil export volumes to China", "Petrochemical industry expansion", "Domestic manufacturing import substitution", "Agricultural self-sufficiency efforts"],
        summary: "Iran operates the OIC's only fully Islamic banking system (100% Shariah-compliant) but faces severe economic constraints from international sanctions. Despite sanctions, GDP growth of 3.3% reflects resilience through oil exports to China and domestic manufacturing. Chronic inflation above 35% and currency depreciation remain the dominant macroeconomic challenges, while a large educated workforce represents untapped potential."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with sanctions regime",
        keyFeatures: ["Sanctions-constrained trade", "Full Islamic banking system", "Parallel exchange rate dynamics", "Import substitution model"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "kazakhstan": {
      name: "Kazakhstan",
      code: "KAZ",
      flag: "🇰🇿",
      region: "Central Asia",
      incomeGroup: "Upper-Middle Income",
      currency: "KZT",
      capital: "Astana",

      headline: {
        gdp: 261,
        gdpGrowth: 4.5,
        inflation: 8.5,
        population: 20.2,
        debtToGdp: 22.8,
        unemployment: 4.8,
        currentAccount: -3.2,
        fiscalBalance: -1.5,
        policyRate: 14.25,
        fdi: 3.8,
        reserves: 35.5,
        exchangeRate: 470
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [4.5, -2.5, 4.3, 3.2, 5.1, 4.8, 4.5],
        inflation: [5.3, 6.8, 8.0, 20.3, 14.0, 9.5, 8.5],
        unemployment: [4.8, 5.0, 4.9, 4.9, 4.8, 4.8, 4.8],
        debtToGdp: [19.8, 25.8, 24.2, 22.5, 22.0, 22.5, 22.8],
        currentAccount: [-3.6, -3.8, -4.0, 3.1, -3.5, -3.0, -3.2],
        oilProduction: [1.96, 1.80, 1.82, 1.91, 1.95, 1.92, 1.90]
      },

      structure: {
        gdpBysector: { agriculture: 5.2, industry: 34.8, services: 60.0 },
        tradeOpenness: 52.8,
        topExports: ["Crude Oil", "Natural Gas", "Metals (Uranium, Copper)", "Iron Ore", "Wheat"],
        topPartners: ["China", "Italy", "Russia", "Netherlands", "France"],
        islamicFinanceShare: 4.5
      },

      outlook: {
        rating: "Stable",
        gdpForecast2026: 4.8,
        gdpForecast2027: 5.0,
        inflationForecast2026: 7.0,
        keyRisks: ["Oil and commodity price volatility", "Russia sanctions spillover", "Geopolitical positioning (Russia-China-West)", "Water scarcity and Aral Sea legacy"],
        keyDrivers: ["Tengiz oil field expansion (TCO)", "Trans-Caspian energy corridor", "Astana International Financial Centre (AIFC)", "Mineral wealth (uranium, rare earths)"],
        summary: "Kazakhstan is Central Asia's largest economy and the world's leading uranium producer, with strong growth of 4.5% driven by oil production and mineral exports. The Astana International Financial Centre is developing an Islamic finance hub. Inflation is moderating from 2022 peaks, and the economy benefits from strategic positioning as a transit corridor between China and Europe."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with resource-rich transition",
        keyFeatures: ["Multi-commodity export dynamics", "Sovereign wealth fund (National Fund)", "Russia-China trade corridor effects", "Managed float with inflation targeting"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    },

    "senegal": {
      name: "Senegal",
      code: "SEN",
      flag: "🇸🇳",
      region: "West Africa",
      incomeGroup: "Lower-Middle Income",
      currency: "XOF",
      capital: "Dakar",

      headline: {
        gdp: 32,
        gdpGrowth: 8.8,
        inflation: 2.5,
        population: 18.3,
        debtToGdp: 72.5,
        unemployment: 22.0,
        currentAccount: -8.5,
        fiscalBalance: -3.8,
        policyRate: 3.5,
        fdi: 5.2,
        reserves: 2.8,
        exchangeRate: 605
      },

      timeSeries: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        gdpGrowth: [4.6, 1.3, 6.5, 4.0, 4.3, 7.5, 8.8],
        inflation: [1.0, 2.5, 2.2, 9.7, 5.9, 3.2, 2.5],
        unemployment: [16.9, 22.5, 21.8, 22.2, 22.5, 22.2, 22.0],
        debtToGdp: [61.8, 68.8, 73.2, 75.5, 73.8, 73.0, 72.5],
        currentAccount: [-7.5, -10.5, -12.2, -12.0, -9.5, -8.8, -8.5],
        oilGasProduction: [0, 0, 0, 0, 0, 0.05, 0.10]
      },

      structure: {
        gdpBysector: { agriculture: 16.5, industry: 24.8, services: 58.7 },
        tradeOpenness: 52.5,
        topExports: ["Gold", "Petroleum Products", "Phosphates", "Fish", "Groundnuts"],
        topPartners: ["Mali", "India", "Switzerland", "China", "France"],
        islamicFinanceShare: 8.5
      },

      outlook: {
        rating: "Positive",
        gdpForecast2026: 10.5,
        gdpForecast2027: 7.2,
        inflationForecast2026: 2.8,
        keyRisks: ["Oil/gas production ramp-up execution risk", "High public debt levels", "Youth unemployment", "Climate and Sahel security challenges"],
        keyDrivers: ["Sangomar oil field production start", "GTA gas project revenues", "BRT infrastructure (Dakar)", "Agricultural modernization and phosphate exports"],
        summary: "Senegal is experiencing a transformative economic moment with first oil production from the Sangomar field and imminent gas production from the Grand Tortue Ahmeyim (GTA) project. Growth is projected to surge to 8.8-10.5% making it one of the world's fastest-growing economies. The challenge is managing the oil windfall to address persistent youth unemployment and diversify the economy sustainably."
      },

      dsge: {
        status: "planned",
        modelType: "Open-economy NK with new oil producer",
        keyFeatures: ["Oil production ramp-up dynamics", "CFA franc zone membership", "Agricultural supply shocks", "Infrastructure investment channel"],
        calibrationDate: null,
        shocks: [],
        linkPath: null
      }
    }

  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ECON_DATA;
}
