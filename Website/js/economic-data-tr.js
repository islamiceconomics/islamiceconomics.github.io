const ECON_DATA = {
  "lastUpdated": "2025-Q4",
  "aggregate": {
    "totalCountries": 57,
    "combinedGDP": 7.7,
    "population": 1.8,
    "landArea": 25
  },
  "countries": {
    "saudi-arabia": {
      "name": "Suudi Arabistan",
      "code": "SAU",
      "flag": "🇸🇦",
      "region": "GCC",
      "incomeGroup": "Yüksek Gelir",
      "currency": "SAR",
      "capital": "Riyadh",
      "headline": {
        "gdp": 1069,
        "gdpGrowth": 3.2,
        "inflation": 2.1,
        "population": 36.9,
        "debtToGdp": 26.2,
        "unemployment": 4.9,
        "currentAccount": 3.2,
        "fiscalBalance": -2.1,
        "policyRate": 5.5,
        "fdi": 2.8,
        "reserves": 450,
        "exchangeRate": 3.75
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          0.3,
          -4.1,
          3.9,
          8.7,
          -0.8,
          1.3,
          3.2
        ],
        "inflation": [
          -2.1,
          3.4,
          3.1,
          2.5,
          2.3,
          1.7,
          2.1
        ],
        "unemployment": [
          5.7,
          7.4,
          6.6,
          5.6,
          4.8,
          4.7,
          4.9
        ],
        "debtToGdp": [
          22.8,
          32.4,
          30,
          23.8,
          26.2,
          27.5,
          26.2
        ],
        "currentAccount": [
          4.8,
          -2.8,
          5.3,
          13.6,
          3.5,
          2.8,
          3.2
        ],
        "oilPrice": [
          64.3,
          41.8,
          70.9,
          99,
          82.6,
          78,
          75
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 2.6,
          "industry": 44.2,
          "services": 53.2
        },
        "tradeOpenness": 57.3,
        "topExports": [
          "Ham petrol",
          "Rafine Petrol",
          "Polimerler",
          "Kimyasallar"
        ],
        "topPartners": [
          "Çin",
          "Hindistan",
          "Japonya",
          "Güney Kore",
          "Amerika"
        ],
        "islamicFinanceShare": 78.9
      },
      "outlook": {
        "rating": "Stable",
        "gdpForecast2026": 3.8,
        "gdpForecast2027": 3.5,
        "inflationForecast2026": 2.3,
        "keyRisks": [
          "Petrol fiyatı oynaklığı",
          "Vizyon 2030'un uygulanma riski",
          "Bölgesel jeopolitik gerilimler"
        ],
        "keyDrivers": [
          "Petrol dışı sektör çeşitlendirmesi",
          "Turizm büyümesi (Hac/eğlence)",
          "Altyapı yatırımı (NEOM, Giga projeleri)"
        ],
        "summary": "Suudi Arabistan ekonomisi, mega projeler ve turizmin genişlemesi yoluyla petrol dışı büyümenin hızlandığı Vizyon 2030 kapsamında geçiş yapıyor. Petrol fiyatlarındaki oynaklık önemli bir aşağı yönlü risk olmayı sürdürüyor ancak mali tamponlar ve yapısal reformlar orta vadeli istikrarı destekliyor. Mega projelerin tamamlanmasıyla birlikte büyümenin 2027'ye kadar %3,5-3,8'e düşmesi bekleniyor."
      },
      "dsge": {
        "status": "available",
        "modelType": "Petrol sektörüyle açık ekonomi NK",
        "keyFeatures": [
          "Petrole bağımlı mali kural",
          "Kâr oranlı para politikası",
          "İşgücü piyasası segmentasyonu (ulusal/yabancı)",
          "Zekat mali kanalı"
        ],
        "calibrationDate": "2025-Q3",
        "shocks": [
          "Petrol fiyatı şoku",
          "TFV şoku",
          "Para politikası şoku",
          "Mali harcama şoku"
        ],
        "linkPath": "theory/dsge_saudi_arabia.html"
      }
    },
    "turkey": {
      "name": "Türkiye",
      "code": "TUR",
      "flag": "🇹🇷",
      "region": "Orta Doğu/Avrupa",
      "incomeGroup": "Üst-Orta Gelir",
      "currency": "TRY",
      "capital": "Ankara",
      "headline": {
        "gdp": 1087,
        "gdpGrowth": 5.1,
        "inflation": 41.5,
        "population": 87.9,
        "debtToGdp": 34.8,
        "unemployment": 8.7,
        "currentAccount": -5.8,
        "fiscalBalance": -2.3,
        "policyRate": 32,
        "fdi": 1.2,
        "reserves": 95,
        "exchangeRate": 34.2
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          0.9,
          1.9,
          11.5,
          5.5,
          4.5,
          3.7,
          5.1
        ],
        "inflation": [
          15.2,
          14.6,
          19.6,
          64.8,
          61.5,
          52.1,
          41.5
        ],
        "unemployment": [
          13.7,
          13.3,
          11.9,
          10.6,
          8.8,
          8.7,
          8.7
        ],
        "debtToGdp": [
          32.5,
          35.5,
          33.8,
          33.2,
          35.2,
          35.8,
          34.8
        ],
        "currentAccount": [
          -6.3,
          -5.5,
          -5.9,
          -6.5,
          -4.9,
          -5.2,
          -5.8
        ],
        "cpiIncrease": [
          15.2,
          14.6,
          19.6,
          64.8,
          61.5,
          52.1,
          41.5
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 6.9,
          "industry": 27.5,
          "services": 65.6
        },
        "tradeOpenness": 48.9,
        "topExports": [
          "Araçlar",
          "Tekstil",
          "Çelik",
          "Kimyasallar",
          "Makineler"
        ],
        "topPartners": [
          "Almanya",
          "İtalya",
          "Rusya",
          "Amerika",
          "Çin"
        ],
        "islamicFinanceShare": 12.4
      },
      "outlook": {
        "rating": "Cautious",
        "gdpForecast2026": 4.2,
        "gdpForecast2027": 3.9,
        "inflationForecast2026": 28,
        "keyRisks": [
          "Enflasyonun yeniden hızlanması",
          "Para biriminin değer kaybı baskıları",
          "Jeopolitik riskler (Suriye, Yunanistan)",
          "İkiz açıklar"
        ],
        "keyDrivers": [
          "Üretim rekabet gücü",
          "Turizm toparlanması",
          "Parasal sıkılaştırmadan kaynaklanan enflasyonun düşürülmesi",
          "AB ticaret dinamikleri"
        ],
        "summary": "Türkiye ekonomisi 2025'te yüzde 5,1'lik sağlam bir büyümeyle toparlanıyor, ancak yüzde 41,5 civarında yükselen enflasyon ve kalıcı ikiz açıklar önemli riskler oluşturuyor. Merkez bankasının şahin politika duruşu enflasyonu kademeli olarak düşürüyor ancak reel faiz oranları yatırımlar üzerinde engel olmaya devam ediyor. Yakın vadeli istikrar, enflasyonun sürekli olarak düşürülmesine ve dış finansman istikrarına bağlıdır."
      },
      "dsge": {
        "status": "available",
        "modelType": "Para rejimi değişikliği ile açık ekonomi NK",
        "keyFeatures": [
          "Döviz kuru geçişi",
          "Enflasyon beklentileri dinamikleri",
          "Mali-parasal etkileşim",
          "Dolarizasyon etkileri"
        ],
        "calibrationDate": "2025-Q4",
        "shocks": [
          "Petrol fiyatı şoku",
          "Döviz kuru şoku",
          "Para politikası şoku",
          "Emtia fiyat şoku"
        ],
        "linkPath": "theory/dsge_turkey.html"
      }
    },
    "indonesia": {
      "name": "Endonezya",
      "code": "IDN",
      "flag": "🇮🇩",
      "region": "Güneydoğu Asya",
      "incomeGroup": "Alt-Orta Gelir",
      "currency": "IDR",
      "capital": "Jakarta",
      "headline": {
        "gdp": 1319,
        "gdpGrowth": 5,
        "inflation": 2.7,
        "population": 277.5,
        "debtToGdp": 35.2,
        "unemployment": 4,
        "currentAccount": -1.5,
        "fiscalBalance": -2.4,
        "policyRate": 6.25,
        "fdi": 1.9,
        "reserves": 142,
        "exchangeRate": 16200
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          5,
          -2.1,
          3.7,
          5.3,
          5.1,
          5.2,
          5
        ],
        "inflation": [
          3,
          2,
          1.6,
          4.7,
          4.9,
          2.8,
          2.7
        ],
        "unemployment": [
          3.7,
          4.2,
          3.8,
          3.9,
          3.8,
          4,
          4
        ],
        "debtToGdp": [
          29.6,
          32.6,
          34.5,
          35.4,
          35.8,
          36.2,
          35.2
        ],
        "currentAccount": [
          -2.7,
          -0.9,
          -0.3,
          -2.8,
          -2.4,
          -2,
          -1.5
        ],
        "oilPrice": [
          64.3,
          41.8,
          70.9,
          99,
          82.6,
          78,
          75
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 12.8,
          "industry": 32.4,
          "services": 54.8
        },
        "tradeOpenness": 39.2,
        "topExports": [
          "Petrol",
          "Hurma yağı",
          "Kömür",
          "Doğal Gaz",
          "Mineraller"
        ],
        "topPartners": [
          "Çin",
          "Japonya",
          "Amerika",
          "Singapur",
          "Hindistan"
        ],
        "islamicFinanceShare": 8.9
      },
      "outlook": {
        "rating": "Stable",
        "gdpForecast2026": 5.2,
        "gdpForecast2027": 5.4,
        "inflationForecast2026": 2.8,
        "keyRisks": [
          "Emtia fiyatlarındaki oynaklık",
          "Cari hesap baskıları",
          "Altyapı finansman boşlukları",
          "Mevzuat belirsizliği"
        ],
        "keyDrivers": [
          "Yurtiçi tüketim",
          "Altyapı yatırımı (IKN sermayesinin taşınması)",
          "Üretim büyümesi",
          "Emtia ihracatında istikrar"
        ],
        "summary": "Müslümanların çoğunlukta olduğu en büyük ekonomi olan Endonezya, güçlü iç tüketim ve altyapı genişlemesinin desteğiyle %5'lik sağlam bir büyüme sürdürüyor. Başkentin Nusantara'ya (IKN) geçişi büyük bir yapısal girişim olsa da uygulama riskleri devam ediyor. Emtia ihracatı güçlendikçe cari açık daralıyor ve orta vadeli %5,2-5,4'lük büyümeyi destekliyor."
      },
      "dsge": {
        "status": "available",
        "modelType": "Emtia sektörüyle açık ekonomi NK",
        "keyFeatures": [
          "Emtia ihracat bağımlılığı",
          "Yurt içi talep dinamikleri",
          "Sermaye akışları ve rezervler",
          "Altyapı mali kanalı"
        ],
        "calibrationDate": "2025-Q4",
        "shocks": [
          "Emtia fiyat şoku",
          "TFV şoku",
          "Para politikası şoku",
          "Dış talep şoku"
        ],
        "linkPath": "theory/dsge_indonesia.html"
      }
    },
    "malaysia": {
      "name": "Malezya",
      "code": "MYS",
      "flag": "🇲🇾",
      "region": "Güneydoğu Asya",
      "incomeGroup": "Yüksek Gelir Eşiği",
      "currency": "MYR",
      "capital": "Kuala Lumpur",
      "headline": {
        "gdp": 550,
        "gdpGrowth": 3.9,
        "inflation": 1.9,
        "population": 34.8,
        "debtToGdp": 59.3,
        "unemployment": 3.1,
        "currentAccount": 2.1,
        "fiscalBalance": -3.2,
        "policyRate": 3,
        "fdi": 3.2,
        "reserves": 118,
        "exchangeRate": 4.47
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          4.3,
          -5.6,
          3.3,
          8.7,
          3.9,
          2.6,
          3.9
        ],
        "inflation": [
          0.7,
          -1.1,
          2.5,
          3.3,
          2.5,
          2,
          1.9
        ],
        "unemployment": [
          3.3,
          3.9,
          3.6,
          3.5,
          3.3,
          3.1,
          3.1
        ],
        "debtToGdp": [
          55.9,
          60.3,
          62.1,
          57.8,
          58.9,
          59.8,
          59.3
        ],
        "currentAccount": [
          3.6,
          2.7,
          1.1,
          1.9,
          1.8,
          2.3,
          2.1
        ],
        "islamicFinanceAssets": [
          539,
          592,
          682,
          738,
          802,
          891,
          945
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 8,
          "industry": 34.2,
          "services": 57.8
        },
        "tradeOpenness": 130.4,
        "topExports": [
          "Elektrik/Elektronik",
          "Petrol",
          "Hurma yağı",
          "Kimyasallar",
          "Makineler"
        ],
        "topPartners": [
          "Çin",
          "Singapur",
          "Amerika",
          "Japonya",
          "Tayland"
        ],
        "islamicFinanceShare": 26.1
      },
      "outlook": {
        "rating": "Stable",
        "gdpForecast2026": 4.1,
        "gdpForecast2027": 4.3,
        "inflationForecast2026": 2.1,
        "keyRisks": [
          "Borç sürdürülebilirliği endişeleri",
          "Yarı iletken tedarik zinciri değişkenliği",
          "Jeopolitik gerilimler (Güney Çin Denizi)",
          "Mali konsolidasyon baskıları"
        ],
        "keyDrivers": [
          "İslami finans merkezi genişletiliyor",
          "Yüksek değerli elektronik üretimi",
          "Turizm toparlanması",
          "Dijital ekonomiye geçiş"
        ],
        "summary": "Malezya %3,9 büyüme ile yüksek gelir statüsüne yaklaşıyor ve bankacılık varlıklarının yaklaşık %26'sının Şer'i uyumlu enstrümanlardan oluşmasıyla dünya çapında lider İslami finans merkezi olarak faaliyet gösteriyor. Ancak kamu borcunun %59,3'e yükselmesi mali esnekliği kısıtlıyor ve sürdürülebilir gelir iyileştirmeleri gerektiriyor. Elektronik ihracatının dirençli kalması nedeniyle büyümenin %4,1-4,3'e hızlanması bekleniyor."
      },
      "dsge": {
        "status": "available",
        "modelType": "Finans sektörüyle açık ekonomi NK",
        "keyFeatures": [
          "İslami finans aktarımı",
          "İhracat odaklı büyüme modeli",
          "Borç sürdürülebilirliği kısıtlamaları",
          "Bölgesel ticaret dinamikleri"
        ],
        "calibrationDate": "2025-Q4",
        "shocks": [
          "Petrol fiyatı şoku",
          "Para politikası şoku",
          "Teknoloji sektörü şoku",
          "Bölgesel talep şoku"
        ],
        "linkPath": "theory/dsge_malaysia.html"
      }
    },
    "pakistan": {
      "name": "Pakistan",
      "code": "PAK",
      "flag": "🇵🇰",
      "region": "Güney Asya",
      "incomeGroup": "Alt-Orta Gelir",
      "currency": "PKR",
      "capital": "Islamabad",
      "headline": {
        "gdp": 447,
        "gdpGrowth": 2.4,
        "inflation": 3.6,
        "population": 230.4,
        "debtToGdp": 71.5,
        "unemployment": 5.3,
        "currentAccount": -0.5,
        "fiscalBalance": -6.5,
        "policyRate": 10.5,
        "fdi": 0.5,
        "reserves": 14.2,
        "exchangeRate": 278
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          2.2,
          3.9,
          6,
          6.2,
          2.4,
          2.5,
          2.4
        ],
        "inflation": [
          6.9,
          9.1,
          10.9,
          27.3,
          29.2,
          14.2,
          3.6
        ],
        "unemployment": [
          4.1,
          5.5,
          5.1,
          5,
          5.5,
          5.2,
          5.3
        ],
        "debtToGdp": [
          76.9,
          74.8,
          72.1,
          73.5,
          79.2,
          72.8,
          71.5
        ],
        "currentAccount": [
          -3,
          0.8,
          -1.1,
          -4.5,
          -0.7,
          -0.8,
          -0.5
        ],
        "reserves": [
          16.2,
          20,
          13.9,
          8.6,
          8.3,
          9.8,
          14.2
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 21.2,
          "industry": 20.6,
          "services": 58.2
        },
        "tradeOpenness": 28.5,
        "topExports": [
          "Tekstil",
          "Pirinç",
          "Triko",
          "Deri",
          "Pamuklu kumaşlar"
        ],
        "topPartners": [
          "Amerika",
          "Çin",
          "Almanya",
          "İngiltere",
          "BAE"
        ],
        "islamicFinanceShare": 21.6,
        "islamicFinancingShare": 31.1,
        "islamicDepositShare": 26.5,
        "islamicBranches": 6395,
        "sukukShareGovtDebt": 14.5
      },
      "outlook": {
        "rating": "Cautious",
        "gdpForecast2026": 2.8,
        "gdpForecast2027": 3.5,
        "inflationForecast2026": 5.2,
        "keyRisks": [
          "Ocak 2028 riba eleme son tarihi fizibilitesi",
          "Yüksek dış borç yükü",
          "İslami bankacılığa geçişte kurumsal boşluklar",
          "İklim hassasiyetleri (sel, kuraklık)"
        ],
        "keyDrivers": [
          "IMF EFF uyumluluğu ve reform ivmesi",
          "İslami bankacılık büyümesi (%21,6 → %50 hedef)",
          "Sukuk piyasasının gelişimi",
          "Tarımsal verimlilik"
        ],
        "summary": "Pakistan ekonomisi, politika faizinin %22'lik zirveden %10,5'e düşürülmesiyle 7 milyar dolarlık IMF EFF'si (Eylül 2024) altında istikrar kazanıyor. İslami bankacılık aktiflerin %21,6'sına, finansmanın ise %31,1'ine ulaştı. 26. Anayasa Değişikliği (Ekim 2024), ribanın 1 Ocak 2028'e kadar kaldırılmasını zorunlu kılıyor ve bu da tarihsel olarak benzeri görülmemiş bir geçiş sorunu yaratıyor. Hükümetin 28 Mali Yılı itibarıyla Şer'i uyumlu borcun %20'sini hedeflemesiyle, sukuk ihracı 2025'te 2 trilyon Rupi rekora ulaştı."
      },
      "dsge": {
        "status": "available",
        "modelType": "Kalkınma kısıtlamaları olan açık ekonomi NK",
        "keyFeatures": [
          "IMF programı etkileşimi",
          "Para politikasında mali hakimiyet",
          "Dış borçlanma kısıtlamaları",
          "Tarım sektörü dinamikleri"
        ],
        "calibrationDate": "2025-Q4",
        "shocks": [
          "Dış finansman şoku",
          "Tarımsal şok",
          "Siyasi şok",
          "Para politikası şoku"
        ],
        "linkPath": "theory/dsge_pakistan.html",
        "transitionAnalysis": {
          "status": "available",
          "title": "Pakistan'ın İslami Ekonomik Geçişi: Ampirik ve Analitik Bir Çerçeve",
          "scenarios": [
            "Kademeli (15 yıllık)",
            "Hızlandırılmış (7 yıllık)",
            "Şok (3 yıl)"
          ],
          "linkPath": "theory/pakistan_transition.html"
        }
      }
    },
    "nigeria": {
      "name": "Nijerya",
      "code": "NGA",
      "flag": "🇳🇬",
      "region": "Sahra Altı Afrika",
      "incomeGroup": "Alt-Orta Gelir",
      "currency": "NGN",
      "capital": "Abuja",
      "headline": {
        "gdp": 476,
        "gdpGrowth": 2.8,
        "inflation": 34.6,
        "population": 223.8,
        "debtToGdp": 37.2,
        "unemployment": 3.9,
        "currentAccount": 2.8,
        "fiscalBalance": -3.8,
        "policyRate": 27.25,
        "fdi": 0.6,
        "reserves": 34.1,
        "exchangeRate": 1547
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          2.3,
          -1.6,
          3.6,
          3.5,
          2.9,
          3.2,
          2.8
        ],
        "inflation": [
          11.4,
          13.9,
          17,
          21.8,
          28.8,
          32.2,
          34.6
        ],
        "unemployment": [
          8.8,
          27.1,
          13.9,
          5,
          4.1,
          3.8,
          3.9
        ],
        "debtToGdp": [
          27.3,
          34.8,
          38.1,
          39.5,
          37.8,
          37.5,
          37.2
        ],
        "currentAccount": [
          3.6,
          3.9,
          2.1,
          4.2,
          2.5,
          2.9,
          2.8
        ],
        "oilPrice": [
          64.3,
          41.8,
          70.9,
          99,
          82.6,
          78,
          75
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 21.1,
          "industry": 27.6,
          "services": 51.3
        },
        "tradeOpenness": 23.6,
        "topExports": [
          "Ham petrol",
          "Doğal Gaz",
          "Rafine Petrol",
          "Kakao",
          "Kaju fıstığı"
        ],
        "topPartners": [
          "Hindistan",
          "Amerika",
          "İspanya",
          "Fransa",
          "Hollanda"
        ],
        "islamicFinanceShare": 3.2
      },
      "outlook": {
        "rating": "Cautious",
        "gdpForecast2026": 3.2,
        "gdpForecast2027": 3.5,
        "inflationForecast2026": 22,
        "keyRisks": [
          "Naira devalüasyonundan kaynaklanan enflasyonun kalıcılığı",
          "Petrol üretimindeki oynaklık (güvenlik kaygıları)",
          "Sübvansiyonların kaldırılmasından kaynaklanan mali baskılar",
          "İklimin tarım üzerindeki etkileri"
        ],
        "keyDrivers": [
          "Petrol sektörünün toparlanması",
          "Tarımsal genişleme",
          "Para politikası normalleşmesi",
          "Petrol dışı gelir seferberliği"
        ],
        "summary": "Afrika'nın en büyük ekonomisi olan Nijerya, nairanın ciddi değer kaybının ardından %34'ün üzerinde yüksek enflasyonu yönetiyor, ancak emtia ihracatının gücü cari hesap fazlalarını destekliyor. Merkez Bankası'nın agresif faiz artışları fiyat baskılarını kademeli olarak azaltıyor, ancak yüksek faizler ve enflasyonun birleşimi reel sektörde ciddi olumsuzluklar yaratıyor. Enflasyondaki düşüş ilerledikçe ve petrol üretimi istikrara kavuştukça büyümenin ılımlı bir şekilde %3,2-3,5'e hızlanması bekleniyor."
      },
      "dsge": {
        "status": "available",
        "modelType": "Petrol ve emtia bağımlılığı olan açık ekonomi NK",
        "keyFeatures": [
          "Petrol geliri mali kuralı",
          "Döviz kuru geçişi",
          "Emtia fiyat şokları",
          "Gıda fiyatı dinamikleri"
        ],
        "calibrationDate": "2025-Q4",
        "shocks": [
          "Petrol fiyatı şoku",
          "Döviz kuru şoku",
          "Para politikası şoku",
          "Tarımsal şok"
        ],
        "linkPath": "theory/dsge_nigeria.html"
      }
    },
    "uae": {
      "name": "Birleşik Arap Emirlikleri",
      "code": "ARE",
      "flag": "🇦🇪",
      "region": "GCC",
      "incomeGroup": "Yüksek Gelir",
      "currency": "AED",
      "capital": "Abu Dhabi",
      "headline": {
        "gdp": 614,
        "gdpGrowth": 3.8,
        "inflation": 1.5,
        "population": 10.2,
        "debtToGdp": 29.1,
        "unemployment": 1.7,
        "currentAccount": 8.9,
        "fiscalBalance": 5.2,
        "policyRate": 5.5,
        "fdi": 4.1,
        "reserves": 188,
        "exchangeRate": 3.67
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          1.6,
          -4,
          4.2,
          7.1,
          3.6,
          2.8,
          3.8
        ],
        "inflation": [
          1.9,
          -2.1,
          0.9,
          4.7,
          3.1,
          2.2,
          1.5
        ],
        "unemployment": [
          2,
          2.2,
          2.1,
          1.9,
          1.8,
          1.7,
          1.7
        ],
        "debtToGdp": [
          28.4,
          34.2,
          31.6,
          28.9,
          29.5,
          29.8,
          29.1
        ],
        "currentAccount": [
          9.8,
          1.2,
          5.9,
          16.4,
          10.2,
          9.5,
          8.9
        ],
        "oilPrice": [
          64.3,
          41.8,
          70.9,
          99,
          82.6,
          78,
          75
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 0.8,
          "industry": 40.5,
          "services": 58.7
        },
        "tradeOpenness": 138.2,
        "topExports": [
          "Ham petrol",
          "Rafine Petrol",
          "Yeniden ihracat",
          "Kimyasallar",
          "Metaller"
        ],
        "topPartners": [
          "Hindistan",
          "Çin",
          "Japonya",
          "Amerika",
          "Suudi Arabistan"
        ],
        "islamicFinanceShare": 25.1
      },
      "outlook": {
        "rating": "Stable",
        "gdpForecast2026": 3.5,
        "gdpForecast2027": 3.2,
        "inflationForecast2026": 2,
        "keyRisks": [
          "Petrol fiyatı oynaklığı",
          "Bölgesel jeopolitik gerilimler",
          "Küresel ticarette yavaşlama",
          "Gayrimenkul sektörü riskleri"
        ],
        "keyDrivers": [
          "Petrol dışı çeşitlendirilmiş sektör (turizm, lojistik, finans)",
          "Expo 2025 ve turizm patlaması",
          "İslami finans merkezi genişletiliyor",
          "Yapay zeka ve teknoloji sektörünün büyümesi"
        ],
        "summary": "BAE'nin çeşitlendirilmiş, ticaret odaklı ekonomisi, turizm, lojistik ve İslami finans dahil olmak üzere petrol dışı güçlü sektörlerin desteğiyle 2025'te %3,8 büyüme sağladı. Ülke, cari hesap fazlaları ve yönetilebilir borçlarıyla olağanüstü mali ve dış pozisyonlarını sürdürüyor ve bu da politika esnekliği sağlıyor. Büyük olayların etkileri normalleştikçe ve enflasyonun sağlam sabitlenmesiyle büyümenin hafif bir şekilde %3,2-3,5'e gerilemesi bekleniyor."
      },
      "dsge": {
        "status": "available",
        "modelType": "Çeşitlendirilmiş ekonomiye sahip açık ekonomi NK",
        "keyFeatures": [
          "Petrol dışı sektör hakimiyeti",
          "Hub dinamiklerini yeniden dışa aktarın",
          "İslami finans kanalı",
          "Peg düzenleme kısıtlamaları"
        ],
        "calibrationDate": "2025-Q4",
        "shocks": [
          "Petrol fiyatı şoku",
          "Bölgesel talep şoku",
          "Para politikası şoku",
          "TFV şoku"
        ],
        "linkPath": "theory/dsge_uae.html"
      }
    },
    "egypt": {
      "name": "Mısır",
      "code": "EGY",
      "flag": "🇪🇬",
      "region": "MENA",
      "incomeGroup": "Alt-Orta Gelir",
      "currency": "EGP",
      "capital": "Cairo",
      "headline": {
        "gdp": 535,
        "gdpGrowth": 2.9,
        "inflation": 26.7,
        "population": 110.2,
        "debtToGdp": 89.4,
        "unemployment": 7.1,
        "currentAccount": -3.1,
        "fiscalBalance": -6.9,
        "policyRate": 27.25,
        "fdi": 2.3,
        "reserves": 33.4,
        "exchangeRate": 47.8
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          5.5,
          3.3,
          3.3,
          4.3,
          4.1,
          2.3,
          2.9
        ],
        "inflation": [
          9.4,
          5.7,
          4.5,
          8.8,
          35.4,
          28.5,
          26.7
        ],
        "unemployment": [
          7.8,
          8,
          7.6,
          7.5,
          7.2,
          7.1,
          7.1
        ],
        "debtToGdp": [
          84.7,
          88.2,
          86.7,
          83.5,
          92.5,
          91.2,
          89.4
        ],
        "currentAccount": [
          -2.1,
          -0.6,
          -2.4,
          -3.9,
          -4.2,
          -3.5,
          -3.1
        ],
        "suezCanalRevenue": [
          5.7,
          5.6,
          7,
          6.7,
          6.6,
          7.2,
          7.1
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 11.3,
          "industry": 32.8,
          "services": 55.9
        },
        "tradeOpenness": 38.9,
        "topExports": [
          "Petrol",
          "Doğal Gaz",
          "Tekstil",
          "Kimyasallar",
          "Portakal"
        ],
        "topPartners": [
          "Hindistan",
          "Suudi Arabistan",
          "BAE",
          "Amerika",
          "İtalya"
        ],
        "islamicFinanceShare": 13.2
      },
      "outlook": {
        "rating": "Cautious",
        "gdpForecast2026": 3.6,
        "gdpForecast2027": 4.2,
        "inflationForecast2026": 15,
        "keyRisks": [
          "EGP devalüasyonundan kaynaklanan enflasyonun kalıcılığı",
          "Dış borç sürdürülebilirliği",
          "Genç işsizliği ve beyin göçü",
          "Su kıtlığı ve iklim stresi"
        ],
        "keyDrivers": [
          "Yeni İdari Sermayenin tamamlanması",
          "Süveyş Kanalı geçiş ücreti gelirleri",
          "Doğal gaz üretiminin genişletilmesi",
          "Turizmin toparlanması (Kızıldeniz tatil köyleri)"
        ],
        "summary": "Mısır, 2024'teki büyük para birimi devalüasyonunun ardından %26'nın üzerindeki yüksek enflasyonu yönetirken, IMF programı kapsamındaki yapısal reformlar dış sürdürülebilirliği güçlendirmeyi amaçlıyor. Yeni İdari Sermaye projesi ve Süveyş Kanalı gelirleri önemli yapısal gelir kaynakları sağlıyor, ancak %89,4'lük yüksek borç ve mali baskılar endişe verici olmaya devam ediyor. Para politikası sıkılaştırmasının etkili olması ve büyümenin hızlanmasını desteklemesiyle enflasyonun 2026 yılına kadar kademeli olarak %15'e düşmesi bekleniyor."
      },
      "dsge": {
        "status": "available",
        "modelType": "Kalkınma ve döviz kuru dinamikleriyle açık ekonomi NK",
        "keyFeatures": [
          "Döviz rejimi geçişi",
          "Mali hakimiyet",
          "Süveyş Kanalı gelir kanalı",
          "Büyük nüfus emek dinamikleri"
        ],
        "calibrationDate": "2025-Q4",
        "shocks": [
          "Dış finansman şoku",
          "Kur şoku",
          "Para politikası şoku",
          "Emtia fiyat şoku"
        ],
        "linkPath": "theory/dsge_egypt.html"
      }
    },
    "qatar": {
      "name": "Katar",
      "code": "QAT",
      "flag": "🇶🇦",
      "region": "GCC",
      "incomeGroup": "Yüksek Gelir",
      "currency": "QAR",
      "capital": "Doha",
      "headline": {
        "gdp": 246,
        "gdpGrowth": 2.4,
        "inflation": 2.8,
        "population": 2.7,
        "debtToGdp": 42.5,
        "unemployment": 0.1,
        "currentAccount": 16.2,
        "fiscalBalance": 4.8,
        "policyRate": 5.75,
        "fdi": 1.1,
        "reserves": 47.2,
        "exchangeRate": 3.64
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          0.8,
          -3.6,
          1.6,
          4.9,
          2.4,
          2.1,
          2.4
        ],
        "inflation": [
          -0.7,
          -2.7,
          2.3,
          5,
          3.1,
          2.5,
          2.8
        ],
        "unemployment": [
          0.1,
          0.1,
          0.1,
          0.1,
          0.1,
          0.1,
          0.1
        ],
        "debtToGdp": [
          57.1,
          72.6,
          58.4,
          42.3,
          41.8,
          42.1,
          42.5
        ],
        "currentAccount": [
          2.4,
          -2.5,
          14.6,
          26.7,
          16.5,
          15.8,
          16.2
        ],
        "lngExports": [
          77.8,
          51.2,
          85.6,
          124.5,
          95.3,
          88,
          90
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 0.2,
          "industry": 52.8,
          "services": 47
        },
        "tradeOpenness": 82.5,
        "topExports": [
          "LNG",
          "Ham petrol",
          "Rafine Petrol",
          "Gübreler",
          "Petrokimya"
        ],
        "topPartners": [
          "Japonya",
          "Güney Kore",
          "Hindistan",
          "Çin",
          "Singapur"
        ],
        "islamicFinanceShare": 25.8
      },
      "outlook": {
        "rating": "Stable",
        "gdpForecast2026": 2.8,
        "gdpForecast2027": 3.2,
        "inflationForecast2026": 2.5,
        "keyRisks": [
          "LNG fiyat oynaklığı",
          "Bölgesel diplomatik gerilimler",
          "Demografik dengesizlik (%90 yabancı)",
          "Karbon geçiş riski"
        ],
        "keyDrivers": [
          "Kuzey Sahasının genişletilmesi (LNG kapasitesinin iki katına çıkarılması)",
          "FIFA 2022 altyapı mirası",
          "Finans merkezi büyümesi (QFC)",
          "Eğitim ve araştırma merkezleri"
        ],
        "summary": "Katar, devasa LNG ihracatı ve basiretli mali yönetim sayesinde dünyanın en yüksek kişi başına GSYİH seviyelerinden birini koruyor. Devam eden Kuzey Sahası genişletmesi, 2027 yılına kadar LNG kapasitesini neredeyse iki katına çıkaracak ve Katar'ın dünyanın en büyük LNG ihracatçısı konumunu güçlendirecek. FIFA sonrası altyapı, turizm, spor ve finansal hizmetlere yönelik çeşitliliği destekliyor."
      },
      "dsge": {
        "status": "planned",
        "modelType": "LNG sektörüyle açık ekonomi NK",
        "keyFeatures": [
          "LNG ihracat hakimiyeti",
          "Devlet varlık fonu dinamikleri",
          "Sabit döviz kuru rejimi",
          "Yabancı işgücü piyasası"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "kuwait": {
      "name": "Kuveyt",
      "code": "KWT",
      "flag": "🇰🇼",
      "region": "GCC",
      "incomeGroup": "Yüksek Gelir",
      "currency": "KWD",
      "capital": "Kuwait City",
      "headline": {
        "gdp": 164,
        "gdpGrowth": 2.6,
        "inflation": 3.4,
        "population": 4.9,
        "debtToGdp": 11.8,
        "unemployment": 2.1,
        "currentAccount": 22.4,
        "fiscalBalance": 8.1,
        "policyRate": 4.25,
        "fdi": 0.3,
        "reserves": 48.5,
        "exchangeRate": 0.31
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          -0.6,
          -8.7,
          1.3,
          8.2,
          -0.6,
          2.3,
          2.6
        ],
        "inflation": [
          1.1,
          2.1,
          3.4,
          4,
          3.6,
          3.2,
          3.4
        ],
        "unemployment": [
          2.2,
          2.3,
          2.2,
          2.1,
          2.1,
          2,
          2.1
        ],
        "debtToGdp": [
          14.8,
          29.2,
          20.5,
          8.4,
          10.2,
          11,
          11.8
        ],
        "currentAccount": [
          14.5,
          -2.8,
          21.3,
          33.5,
          25.1,
          23,
          22.4
        ],
        "oilProduction": [
          2.65,
          2.43,
          2.42,
          2.7,
          2.55,
          2.58,
          2.62
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 0.4,
          "industry": 58.6,
          "services": 41
        },
        "tradeOpenness": 78.2,
        "topExports": [
          "Ham petrol",
          "Rafine Petrol",
          "Petrokimya",
          "Gübreler"
        ],
        "topPartners": [
          "Çin",
          "Hindistan",
          "Güney Kore",
          "Japonya",
          "Amerika"
        ],
        "islamicFinanceShare": 40.2
      },
      "outlook": {
        "rating": "Stable",
        "gdpForecast2026": 2.9,
        "gdpForecast2027": 2.5,
        "inflationForecast2026": 2.8,
        "keyRisks": [
          "Petrol fiyatına bağımlılık (%90+ gelir)",
          "Siyasi tıkanıklık (parlamento-hükümet gerilimleri)",
          "Yavaş çeşitlendirme",
          "Sübvansiyon ve mali reform gecikmeleri"
        ],
        "keyDrivers": [
          "Kuveyt Yatırım Otoritesi geri dönüyor",
          "OPEC+ üretim toparlanması",
          "Vizyon 2035 çeşitlendirme planı",
          "Finans sektörünün büyümesi"
        ],
        "summary": "Kuveyt, dünyanın en büyük egemen servet fonlarından birine (900 Milyar Dolar+) sahip ve GCC'deki borcun GSYH'ye oranı %11,8 ile en düşük olan ülke konumunda ve olağanüstü mali tamponlar sağlıyor. Ancak ekonomi, tekrarlanan siyasi tıkanıklıklar nedeniyle sınırlı çeşitlendirme ilerlemesi ile büyük ölçüde petrole bağımlı olmaya devam ediyor. OPEC+ kota ayarlamaları ve yeni ortaya çıkan petrol dışı girişimler sayesinde büyümenin %2,5-2,9 oranında olması bekleniyor."
      },
      "dsge": {
        "status": "planned",
        "modelType": "Petrol ağırlıklı maliye ile açık ekonomi NK",
        "keyFeatures": [
          "Petrol ağırlıklı mali gelir",
          "Döviz sepeti mandalı",
          "Devlet servet fonu dengeleyicisi",
          "Ulusal-yabancı emek ikiliği"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "bahrain": {
      "name": "Bahreyn",
      "code": "BHR",
      "flag": "🇧🇭",
      "region": "GCC",
      "incomeGroup": "Yüksek Gelir",
      "currency": "BHD",
      "capital": "Manama",
      "headline": {
        "gdp": 46,
        "gdpGrowth": 3.1,
        "inflation": 1.2,
        "population": 1.6,
        "debtToGdp": 118.2,
        "unemployment": 3.9,
        "currentAccount": 5.2,
        "fiscalBalance": -5.1,
        "policyRate": 6,
        "fdi": 2.8,
        "reserves": 5.8,
        "exchangeRate": 0.376
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          2.2,
          -4.9,
          2.6,
          4.9,
          2.7,
          3,
          3.1
        ],
        "inflation": [
          1,
          -2.3,
          -0.6,
          3.6,
          1,
          1.1,
          1.2
        ],
        "unemployment": [
          3.8,
          4.5,
          4.2,
          4,
          3.9,
          3.8,
          3.9
        ],
        "debtToGdp": [
          102,
          128.5,
          128.9,
          117.5,
          120.1,
          119,
          118.2
        ],
        "currentAccount": [
          -2.1,
          -9.5,
          6.5,
          12.2,
          6.1,
          5.5,
          5.2
        ],
        "financialSectorGDP": [
          16.8,
          17.2,
          17.5,
          17.1,
          17.6,
          17.9,
          18.2
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 0.3,
          "industry": 35.9,
          "services": 63.8
        },
        "tradeOpenness": 115.8,
        "topExports": [
          "Rafine Petrol",
          "Alüminyum",
          "Demir cevheri",
          "Ham petrol"
        ],
        "topPartners": [
          "Suudi Arabistan",
          "BAE",
          "Amerika",
          "Japonya",
          "Hindistan"
        ],
        "islamicFinanceShare": 33.5
      },
      "outlook": {
        "rating": "Cautious",
        "gdpForecast2026": 3.3,
        "gdpForecast2027": 3,
        "inflationForecast2026": 1.5,
        "keyRisks": [
          "Çok yüksek kamu borcu (%118)",
          "Petrol fiyatı duyarlılığı",
          "GCC desteği bağımlılığı",
          "Bölgesel güvenlik gerilimleri"
        ],
        "keyDrivers": [
          "Finansal hizmetler merkezi derinleşiyor",
          "İslami finansta büyüme",
          "Turizm ve eğlencenin genişletilmesi",
          "Fintech ve startup ekosistemi"
        ],
        "summary": "Bahreyn, İslami finansın bankacılık varlıklarının %33,5'ini oluşturmasıyla Körfez İşbirliği Konseyi'nin finansal hizmetler merkezi olarak hizmet veriyor, ancak %118,2 ile bölgenin en yüksek borç/GSYİH oranını taşıyor. Mali konsolidasyon kritik önemini korusa da, %3,1'lik büyüme finans sektörünün genişlemesi ve turizm tarafından destekleniyor. Körfez İşbirliği Konseyi mali desteği ve Mali Denge Programı orta vadeli istikrarı desteklemektedir."
      },
      "dsge": {
        "status": "planned",
        "modelType": "Finansal merkeze sahip açık ekonomi NK",
        "keyFeatures": [
          "Finans sektörü hakimiyeti",
          "USD sabitleme kısıtlaması",
          "Yüksek borç dinamikleri",
          "GCC destek mekanizmaları"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "oman": {
      "name": "Umman",
      "code": "OMN",
      "flag": "🇴🇲",
      "region": "GCC",
      "incomeGroup": "Yüksek Gelir",
      "currency": "OMR",
      "capital": "Muscat",
      "headline": {
        "gdp": 115,
        "gdpGrowth": 1.8,
        "inflation": 1.6,
        "population": 5.2,
        "debtToGdp": 36.8,
        "unemployment": 2.4,
        "currentAccount": 2.5,
        "fiscalBalance": 0.8,
        "policyRate": 5.5,
        "fdi": 3.4,
        "reserves": 17.9,
        "exchangeRate": 0.385
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          -0.8,
          -3.4,
          3.1,
          4.3,
          1.3,
          1.5,
          1.8
        ],
        "inflation": [
          0.1,
          -0.9,
          1.5,
          2.8,
          1,
          1.3,
          1.6
        ],
        "unemployment": [
          2.5,
          3,
          2.8,
          2.6,
          2.5,
          2.4,
          2.4
        ],
        "debtToGdp": [
          60,
          81.1,
          63.3,
          40.8,
          37.2,
          36.5,
          36.8
        ],
        "currentAccount": [
          -5.1,
          -16.2,
          -4,
          5.5,
          3.2,
          2.8,
          2.5
        ],
        "oilProduction": [
          0.97,
          0.95,
          0.96,
          1.05,
          1.01,
          0.99,
          1
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 2.3,
          "industry": 50.8,
          "services": 46.9
        },
        "tradeOpenness": 85.6,
        "topExports": [
          "Ham petrol",
          "Rafine Petrol",
          "Doğal Gaz",
          "Metaller",
          "Kimyasallar"
        ],
        "topPartners": [
          "Çin",
          "Hindistan",
          "Güney Kore",
          "Japonya",
          "BAE"
        ],
        "islamicFinanceShare": 14.5
      },
      "outlook": {
        "rating": "Stable",
        "gdpForecast2026": 2.5,
        "gdpForecast2027": 3,
        "inflationForecast2026": 1.8,
        "keyRisks": [
          "Petrol fiyatı bağımlılığı",
          "Geçiş sırasında mali sürdürülebilirlik",
          "Su kıtlığı",
          "Genç istihdamı baskıları"
        ],
        "keyDrivers": [
          "Vizyon 2040 çeşitlendirmesi",
          "Yeşil hidrojen yatırımları",
          "Turizmin genişlemesi (Ras Al Hadd, Musandam)",
          "Liman ve lojistik merkezi (Duqm)"
        ],
        "summary": "Umman, disiplinli harcamalar ve uygun petrol fiyatları sayesinde borcun GSYH'ye oranını 2020'deki %81'den %36,8'e düşürerek önemli bir mali ilerleme kaydetti. Vizyon 2040, lojistiği (Duqm limanı), turizmi ve yeşil hidrojeni çeşitlendirmeye odaklanıyor. Petrol dışı sektörler ivme kazandıkça %2,5-3,0 büyüme bekleniyor, ancak petrole bağımlılık temel yapısal zorluk olmaya devam ediyor."
      },
      "dsge": {
        "status": "planned",
        "modelType": "Kaynak geçişli açık ekonomi NK",
        "keyFeatures": [
          "Petrolden çeşitlendirmeye geçiş",
          "USD sabit rejimi",
          "Yeşil enerji yatırım kanalı",
          "Emeğin millileştirilmesi dinamikleri"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "morocco": {
      "name": "Fas",
      "code": "MAR",
      "flag": "🇲🇦",
      "region": "Kuzey Afrika",
      "incomeGroup": "Alt-Orta Gelir",
      "currency": "MAD",
      "capital": "Rabat",
      "headline": {
        "gdp": 152,
        "gdpGrowth": 3.4,
        "inflation": 2.5,
        "population": 37.8,
        "debtToGdp": 69.5,
        "unemployment": 11.8,
        "currentAccount": -2.8,
        "fiscalBalance": -4.5,
        "policyRate": 2.75,
        "fdi": 1.8,
        "reserves": 36.2,
        "exchangeRate": 9.8
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          2.6,
          -7.2,
          8,
          1.3,
          3,
          3.2,
          3.4
        ],
        "inflation": [
          0.2,
          0.7,
          1.4,
          6.6,
          6.1,
          2.8,
          2.5
        ],
        "unemployment": [
          9.2,
          11.9,
          12.3,
          11.8,
          13,
          12.3,
          11.8
        ],
        "debtToGdp": [
          65.2,
          76.4,
          68.9,
          71.5,
          70.2,
          69.8,
          69.5
        ],
        "currentAccount": [
          -3.7,
          -1.5,
          -2.3,
          -3.5,
          -1.1,
          -2.5,
          -2.8
        ],
        "phosphateExports": [
          5.2,
          5,
          11,
          11.5,
          7.8,
          7.2,
          7.5
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 11.5,
          "industry": 25.4,
          "services": 63.1
        },
        "tradeOpenness": 73.8,
        "topExports": [
          "Fosfatlar",
          "Otomobiller",
          "Tekstil",
          "Elektronik",
          "Tarım"
        ],
        "topPartners": [
          "Fransa",
          "İspanya",
          "Brezilya",
          "Hindistan",
          "İtalya"
        ],
        "islamicFinanceShare": 3.8
      },
      "outlook": {
        "rating": "Stable",
        "gdpForecast2026": 3.8,
        "gdpForecast2027": 4,
        "inflationForecast2026": 2.3,
        "keyRisks": [
          "Kuraklığa karşı güvenlik açığı",
          "Yüksek genç işsizliği (%30+)",
          "AB ekonomik yavaşlamanın etkisi",
          "Mali konsolidasyon baskıları"
        ],
        "keyDrivers": [
          "2030 FIFA Dünya Kupası hazırlığı",
          "Otomotiv üretim merkezi büyümesi",
          "Yenilenebilir enerji genişlemesi",
          "Liman altyapısı (Tanger-Med)"
        ],
        "summary": "Fas, Tanger-Med'in Akdeniz'in en büyük limanı haline gelmesiyle kendisini Avrupa ile Afrika arasında bir üretim ve lojistik kapısı olarak konumlandırıyor. 2030 FIFA Dünya Kupası'nın ortak ev sahipliği, önemli altyapı yatırımlarına yol açacak. Otomotiv ve havacılık sektörlerindeki endüstriyel çeşitlendirme tarımsal maruziyeti azaltsa da, kalıcı kuraklık önemli bir güvenlik açığı olmaya devam ediyor."
      },
      "dsge": {
        "status": "planned",
        "modelType": "Tarımsal kırılganlığa sahip açık ekonomi NK",
        "keyFeatures": [
          "Tarımsal arz şokları",
          "AB ticaret entegrasyonu",
          "Yönetilen değişken döviz kuru",
          "Altyapı yatırım kanalı"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "jordan": {
      "name": "Ürdün",
      "code": "JOR",
      "flag": "🇯🇴",
      "region": "MENA",
      "incomeGroup": "Üst-Orta Gelir",
      "currency": "JOD",
      "capital": "Amman",
      "headline": {
        "gdp": 51,
        "gdpGrowth": 2.4,
        "inflation": 1.8,
        "population": 11.6,
        "debtToGdp": 88.7,
        "unemployment": 21.4,
        "currentAccount": -5.8,
        "fiscalBalance": -3.2,
        "policyRate": 7,
        "fdi": 1.5,
        "reserves": 17.8,
        "exchangeRate": 0.709
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          2,
          -1.6,
          2.2,
          2.5,
          2.6,
          2.3,
          2.4
        ],
        "inflation": [
          0.8,
          0.3,
          1.3,
          4.2,
          2.1,
          1.9,
          1.8
        ],
        "unemployment": [
          19.1,
          24.7,
          23.2,
          22.8,
          21.4,
          21.7,
          21.4
        ],
        "debtToGdp": [
          77.6,
          88.4,
          91.8,
          91.5,
          90,
          89.2,
          88.7
        ],
        "currentAccount": [
          -2.8,
          -7.2,
          -8.8,
          -7.8,
          -5.2,
          -5.5,
          -5.8
        ],
        "remittances": [
          3.8,
          3.5,
          4,
          4.3,
          4.1,
          4.2,
          4.3
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 4.5,
          "industry": 22.8,
          "services": 72.7
        },
        "tradeOpenness": 68.5,
        "topExports": [
          "Potas",
          "Fosfatlar",
          "İlaçlar",
          "Tekstil",
          "Gübreler"
        ],
        "topPartners": [
          "Amerika",
          "Suudi Arabistan",
          "Hindistan",
          "Irak",
          "BAE"
        ],
        "islamicFinanceShare": 16.2
      },
      "outlook": {
        "rating": "Cautious",
        "gdpForecast2026": 2.6,
        "gdpForecast2027": 2.8,
        "inflationForecast2026": 2,
        "keyRisks": [
          "Çok yüksek işsizlik (%21+)",
          "Mülteci yükü (Suriye/Irak)",
          "Yüksek kamu borcu",
          "Bölgesel istikrarsızlık yayılmaları"
        ],
        "keyDrivers": [
          "BT ve hizmet ihracatında büyüme",
          "Havale girişi istikrarı",
          "Turizmin toparlanması (Petra, Ölü Deniz)",
          "İlaç sektörünün genişlemesi"
        ],
        "summary": "Ürdün, %21'in üzerinde işsizlik ve GSYİH'nın %89'una yakın kamu borcu ve 1,3 milyondan fazla Suriyeli mülteciye ev sahipliği yapması nedeniyle kalıcı yapısal zorluklarla karşı karşıyadır. Büyüme %2,4-2,8 gibi mütevazı bir seviyede kalıyor ancak BT hizmetleri ihracatı ve turizmdeki toparlanmanın desteğiyle istikrarlı."
      },
      "dsge": {
        "status": "planned",
        "modelType": "Yardıma bağımlı küçük ekonomiye sahip açık ekonomi NK",
        "keyFeatures": [
          "Havale ve yardım akışları",
          "USD sabitleme kısıtlaması",
          "Yüksek işsizlik dengesi",
          "Mültecinin ekonomik etkisi"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "iraq": {
      "name": "Irak",
      "code": "IRQ",
      "flag": "🇮🇶",
      "region": "MENA",
      "incomeGroup": "Üst-Orta Gelir",
      "currency": "IQD",
      "capital": "Baghdad",
      "headline": {
        "gdp": 264,
        "gdpGrowth": -0.5,
        "inflation": 4,
        "population": 44.5,
        "debtToGdp": 44.2,
        "unemployment": 15.5,
        "currentAccount": -2.3,
        "fiscalBalance": -1.8,
        "policyRate": 7.5,
        "fdi": 1.2,
        "reserves": 112,
        "exchangeRate": 1310
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          4.5,
          -15.7,
          1.6,
          7,
          -2.9,
          0.2,
          -0.5
        ],
        "inflation": [
          -0.2,
          0.6,
          6,
          5,
          3.7,
          3.8,
          4
        ],
        "unemployment": [
          12.8,
          16.5,
          16.2,
          15,
          14.7,
          15.2,
          15.5
        ],
        "debtToGdp": [
          48.5,
          84.2,
          59.8,
          42.5,
          44,
          43.8,
          44.2
        ],
        "currentAccount": [
          1.5,
          -12.5,
          7.2,
          12.8,
          -2.1,
          -2,
          -2.3
        ],
        "oilProduction": [
          4.6,
          3.99,
          4.1,
          4.55,
          4.3,
          4.2,
          4.15
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 5,
          "industry": 55.8,
          "services": 39.2
        },
        "tradeOpenness": 58,
        "topExports": [
          "Ham petrol",
          "Rafine Petrol",
          "Altın",
          "Tarihler"
        ],
        "topPartners": [
          "Çin",
          "Hindistan",
          "Güney Kore",
          "Amerika",
          "Yunanistan"
        ],
        "islamicFinanceShare": 22.5
      },
      "outlook": {
        "rating": "Negative",
        "gdpForecast2026": 2.8,
        "gdpForecast2027": 3.2,
        "inflationForecast2026": 3.5,
        "keyRisks": [
          "Petrol fiyatlarındaki oynaklık (gelirin %95'i +)",
          "OPEC+ üretim kesintisi",
          "Güvenlik ve yönetim zorlukları",
          "Altyapı açığı"
        ],
        "keyDrivers": [
          "OPEC+ kota gevşeme potansiyeli",
          "İmar ve yatırım harcamaları",
          "Özel sektörün gelişimi",
          "Gaz yakalama ve elektrik üretimi"
        ],
        "summary": "Irak, OPEC'in ikinci en büyük kanıtlanmış rezervine sahip ancak OPEC+ üretim kesintileri nedeniyle 2025'te GSYİH'da %-0,5'lik bir daralmayla karşı karşıya kalacak. Ekonomi neredeyse tamamen petrole bağımlı ve hükümet gelirinin %95'i hidrokarbonlardan geliyor. OPEC+ kısıtlamaları hafifledikçe büyümenin %2,8-3,2'ye ulaşması bekleniyor."
      },
      "dsge": {
        "status": "planned",
        "modelType": "Çatışma sonrası yeniden yapılanmayla açık ekonomi NK",
        "keyFeatures": [
          "Aşırı petrol bağımlılığı",
          "OPEC+ kota dinamikleri",
          "Yeniden yapılanma yatırım kanalı",
          "Kurumsal kapasite kısıtlamaları"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "algeria": {
      "name": "Cezayir",
      "code": "DZA",
      "flag": "🇩🇿",
      "region": "Kuzey Afrika",
      "incomeGroup": "Alt-Orta Gelir",
      "currency": "DZD",
      "capital": "Algiers",
      "headline": {
        "gdp": 240,
        "gdpGrowth": 3.8,
        "inflation": 7.2,
        "population": 46.8,
        "debtToGdp": 48.5,
        "unemployment": 11.8,
        "currentAccount": -2.1,
        "fiscalBalance": -7.2,
        "policyRate": 3,
        "fdi": 0.5,
        "reserves": 68,
        "exchangeRate": 135.2
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          0.8,
          -5.1,
          3.4,
          3.6,
          4.2,
          3.9,
          3.8
        ],
        "inflation": [
          2,
          2.4,
          7.2,
          9.3,
          7.4,
          6.8,
          7.2
        ],
        "unemployment": [
          11.4,
          12.8,
          12.7,
          11.6,
          11.5,
          11.7,
          11.8
        ],
        "debtToGdp": [
          45.8,
          51.5,
          63,
          52.8,
          48,
          47.5,
          48.5
        ],
        "currentAccount": [
          -10,
          -12.8,
          -2.8,
          7.7,
          -0.5,
          -1.8,
          -2.1
        ],
        "hydrocarbonRevenue": [
          33.2,
          20.1,
          34.5,
          48.2,
          36.5,
          34,
          33.5
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 13.3,
          "industry": 37.5,
          "services": 49.2
        },
        "tradeOpenness": 42.5,
        "topExports": [
          "Ham petrol",
          "Doğal Gaz",
          "Rafine Petrol",
          "Amonyak",
          "Fosfatlar"
        ],
        "topPartners": [
          "İtalya",
          "Fransa",
          "İspanya",
          "Türkiye",
          "Çin"
        ],
        "islamicFinanceShare": 2.1
      },
      "outlook": {
        "rating": "Cautious",
        "gdpForecast2026": 3.5,
        "gdpForecast2027": 3.2,
        "inflationForecast2026": 6.5,
        "keyRisks": [
          "Hidrokarbon bağımlılığı (gelirin %60'ı)",
          "Sübvansiyon yükü ve mali baskılar",
          "Genç işsizliği ve sosyal gerilimler",
          "Petrol rezervlerinin uzun vadede azalması"
        ],
        "keyDrivers": [
          "Avrupa'ya doğalgaz ihracatı",
          "Tarımsal modernizasyon",
          "Yenilenebilir enerji potansiyeli (güneş)",
          "İnşaat ve konut programları"
        ],
        "summary": "Cezayir, Afrika'nın bölge bazında en büyük ülkesi ve Avrupa'nın önemli bir enerji tedarikçisidir; Avrupa, Rusya'dan farklılaştıkça doğal gaz da stratejik önem kazanmaktadır. Ağır sübvansiyonlar mali hesapları zorlasa da %3,5-3,8'lik büyüme hidrokarbon gelirleriyle destekleniyor. Hidrokarbonlardan uzaklaşmak, uzun vadeli kritik bir zorluk olmaya devam ediyor."
      },
      "dsge": {
        "status": "planned",
        "modelType": "Hidrokarbon geçişli açık ekonomi NK",
        "keyFeatures": [
          "Avrupa'ya gaz arz dinamikleri",
          "Sübvansiyon ağırlıklı mali yapı",
          "İthalata bağımlı ekonomi",
          "Kamu sektörü hakimiyeti"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "tunisia": {
      "name": "Tunus",
      "code": "TUN",
      "flag": "🇹🇳",
      "region": "Kuzey Afrika",
      "incomeGroup": "Alt-Orta Gelir",
      "currency": "TND",
      "capital": "Tunis",
      "headline": {
        "gdp": 49,
        "gdpGrowth": 1.6,
        "inflation": 7,
        "population": 12.4,
        "debtToGdp": 83.2,
        "unemployment": 15.8,
        "currentAccount": -6.5,
        "fiscalBalance": -5.8,
        "policyRate": 8,
        "fdi": 1.2,
        "reserves": 8.5,
        "exchangeRate": 3.12
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          1,
          -8.8,
          4.4,
          2.4,
          0.4,
          1.2,
          1.6
        ],
        "inflation": [
          6.7,
          5.6,
          5.7,
          8.3,
          9.3,
          7.5,
          7
        ],
        "unemployment": [
          14.9,
          17.4,
          16.2,
          15.3,
          15.8,
          15.9,
          15.8
        ],
        "debtToGdp": [
          68,
          79.5,
          79.8,
          80.2,
          82.5,
          83,
          83.2
        ],
        "currentAccount": [
          -8.5,
          -6,
          -6.2,
          -8.5,
          -3,
          -5.8,
          -6.5
        ],
        "tourismRevenue": [
          2,
          0.5,
          0.8,
          1.5,
          2.2,
          2.5,
          2.6
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 10.1,
          "industry": 25.2,
          "services": 64.7
        },
        "tradeOpenness": 85.2,
        "topExports": [
          "Tekstil",
          "Zeytinyağı",
          "Elektrik Ekipmanları",
          "Fosfatlar",
          "Petrol"
        ],
        "topPartners": [
          "Fransa",
          "İtalya",
          "Almanya",
          "İspanya",
          "Libya"
        ],
        "islamicFinanceShare": 6.8
      },
      "outlook": {
        "rating": "Negative",
        "gdpForecast2026": 2,
        "gdpForecast2027": 2.3,
        "inflationForecast2026": 6.5,
        "keyRisks": [
          "Dış finansman kısıtlamaları",
          "Siyasi belirsizlik",
          "Beyin göçü (vasıflı göç)",
          "Su kıtlığı ve iklim stresi"
        ],
        "keyDrivers": [
          "AB kıyıya yakın fırsatlar",
          "Turizm toparlanması",
          "Zeytinyağı ve tarım ihracatı",
          "BT dış kaynak kullanımında büyüme"
        ],
        "summary": "Tunus, %1,6'lık yavaş büyüme, %83,2'lik yüksek borç ve uluslararası finansmana sınırlı erişim ile sürekli ekonomik olumsuzluklarla karşı karşıya. AB'ye yakınlık ve turizmden kaynaklanan yakın fırsatlar potansiyel sunuyor ancak yapısal reformlar sürdürülebilir büyüme için hayati önem taşıyor."
      },
      "dsge": {
        "status": "planned",
        "modelType": "Çift hatlı ekonomiye sahip açık ekonomi NK",
        "keyFeatures": [
          "AB ticaret bağımlılığı",
          "Turizm gelirindeki oynaklık",
          "Dış finansman kısıtlamaları",
          "İşgücü piyasası katılıkları"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "bangladesh": {
      "name": "Bangladeş",
      "code": "BGD",
      "flag": "🇧🇩",
      "region": "Güney Asya",
      "incomeGroup": "Alt-Orta Gelir",
      "currency": "BDT",
      "capital": "Dhaka",
      "headline": {
        "gdp": 460,
        "gdpGrowth": 5.8,
        "inflation": 9.5,
        "population": 173.6,
        "debtToGdp": 38.5,
        "unemployment": 3.5,
        "currentAccount": -1.2,
        "fiscalBalance": -4.8,
        "policyRate": 8.5,
        "fdi": 0.4,
        "reserves": 24.8,
        "exchangeRate": 117.5
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          7.9,
          3.5,
          6.9,
          7.1,
          5.8,
          5.5,
          5.8
        ],
        "inflation": [
          5.5,
          5.7,
          5.6,
          7.7,
          9.5,
          9.8,
          9.5
        ],
        "unemployment": [
          4.2,
          5.3,
          4,
          3.6,
          3.5,
          3.4,
          3.5
        ],
        "debtToGdp": [
          34.5,
          37.5,
          36.8,
          37.2,
          38,
          38.8,
          38.5
        ],
        "currentAccount": [
          -1.7,
          -1.5,
          -1.1,
          -4.1,
          -0.7,
          -1,
          -1.2
        ],
        "garmentExports": [
          34.1,
          27.9,
          35.8,
          42.6,
          38.5,
          40.2,
          42
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 11.2,
          "industry": 34.2,
          "services": 54.6
        },
        "tradeOpenness": 32.8,
        "topExports": [
          "Giysiler (RMG)",
          "Tekstil",
          "Jüt",
          "Deri",
          "Karides"
        ],
        "topPartners": [
          "Amerika",
          "Almanya",
          "İngiltere",
          "Fransa",
          "İspanya"
        ],
        "islamicFinanceShare": 25.2
      },
      "outlook": {
        "rating": "Stable",
        "gdpForecast2026": 6.2,
        "gdpForecast2027": 6.5,
        "inflationForecast2026": 7.5,
        "keyRisks": [
          "Enflasyonun kalıcılığı",
          "Rezerv yeterliliği baskıları",
          "İklim hassasiyeti (sel, kasırgalar)",
          "Hazır giyim sektörü yarışması"
        ],
        "keyDrivers": [
          "Hazır giyim ihracatında artış",
          "Havale girişleri (22 Milyar Dolar+)",
          "Altyapı geliştirme (metro, köprüler)",
          "BT hizmetleri ve dijital ekonominin genişletilmesi"
        ],
        "summary": "Bangladeş, dünyanın en büyük ikinci ekonomisi olan 42 milyar dolarlık hazır giyim ihracat endüstrisinin etkisiyle dünyanın en hızlı büyüyen ekonomilerinden biri oldu. %5,8-6,5'lik büyüme, güçlü iç tüketim, işçi dövizleri ve üretimdeki rekabet gücüyle destekleniyor. Temel zorluklar arasında %9'un üzerinde kalıcı enflasyon, iklim hassasiyeti ve hazır giyimin ötesinde çeşitlendirme ihtiyacı yer alıyor."
      },
      "dsge": {
        "status": "planned",
        "modelType": "İhracata dayalı kalkınmayla açık ekonomi NK",
        "keyFeatures": [
          "Hazır giyim ihracat hakimiyeti",
          "Havale kanalı",
          "İklim şokuna karşı savunmasızlık",
          "Kalkınma finansmanı dinamikleri"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "iran": {
      "name": "İran",
      "code": "IRN",
      "flag": "🇮🇷",
      "region": "Orta Doğu",
      "incomeGroup": "Alt-Orta Gelir",
      "currency": "IRR",
      "capital": "Tehran",
      "headline": {
        "gdp": 388,
        "gdpGrowth": 3.3,
        "inflation": 35,
        "population": 89.2,
        "debtToGdp": 32.5,
        "unemployment": 9.2,
        "currentAccount": 2.5,
        "fiscalBalance": -3.5,
        "policyRate": 23,
        "fdi": 0.3,
        "reserves": 32,
        "exchangeRate": 42000
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          -3.1,
          1.9,
          4.7,
          3.8,
          5.4,
          3.5,
          3.3
        ],
        "inflation": [
          39.9,
          36.4,
          40.2,
          45.8,
          40,
          37.5,
          35
        ],
        "unemployment": [
          10.8,
          10.4,
          9.2,
          9.5,
          9,
          9.1,
          9.2
        ],
        "debtToGdp": [
          43,
          48.5,
          40.2,
          35,
          33,
          32.8,
          32.5
        ],
        "currentAccount": [
          -0.1,
          -0.5,
          2.5,
          3.8,
          3,
          2.8,
          2.5
        ],
        "oilProduction": [
          2.36,
          1.99,
          2.39,
          2.55,
          3.1,
          3.25,
          3.2
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 12,
          "industry": 38.5,
          "services": 49.5
        },
        "tradeOpenness": 30.5,
        "topExports": [
          "Ham petrol",
          "Petrokimya",
          "Çelik",
          "Mineraller",
          "Tarım"
        ],
        "topPartners": [
          "Çin",
          "Irak",
          "Türkiye",
          "BAE",
          "Hindistan"
        ],
        "islamicFinanceShare": 100
      },
      "outlook": {
        "rating": "Negative",
        "gdpForecast2026": 2.8,
        "gdpForecast2027": 2.5,
        "inflationForecast2026": 32,
        "keyRisks": [
          "Uluslararası yaptırımların etkisi",
          "Kronik yüksek enflasyon",
          "Sermaye kaçışı ve beyin göçü",
          "Bölgesel güvenlik gerilimleri"
        ],
        "keyDrivers": [
          "Çin'e petrol ihracatı hacimleri",
          "Petrokimya endüstrisinin genişlemesi",
          "Yerli imalat ithal ikamesi",
          "Tarımsal kendi kendine yeterlilik çabaları"
        ],
        "summary": "İran, İslam İşbirliği Teşkilatı'nın tek tamamen İslami bankacılık sistemini (%100 Şeriat uyumlu) işletiyor ancak uluslararası yaptırımlar nedeniyle ciddi ekonomik kısıtlamalarla karşı karşıya. Yaptırımlara rağmen %3,3'lük GSYİH büyümesi, Çin'e yapılan petrol ihracatı ve yerli üretim yoluyla sağlanan dayanıklılığı yansıtıyor. %35'in üzerindeki kronik enflasyon ve para birimindeki değer kaybı baskın makroekonomik zorluklar olmayı sürdürürken, eğitimli büyük bir işgücü kullanılmayan potansiyeli temsil ediyor."
      },
      "dsge": {
        "status": "planned",
        "modelType": "Yaptırım rejimine sahip açık ekonomi NK",
        "keyFeatures": [
          "Yaptırımlarla kısıtlı ticaret",
          "Tam İslami bankacılık sistemi",
          "Paralel döviz kuru dinamikleri",
          "İthalat ikame modeli"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "kazakhstan": {
      "name": "Kazakistan",
      "code": "KAZ",
      "flag": "🇰🇿",
      "region": "Orta Asya",
      "incomeGroup": "Üst-Orta Gelir",
      "currency": "KZT",
      "capital": "Astana",
      "headline": {
        "gdp": 261,
        "gdpGrowth": 4.5,
        "inflation": 8.5,
        "population": 20.2,
        "debtToGdp": 22.8,
        "unemployment": 4.8,
        "currentAccount": -3.2,
        "fiscalBalance": -1.5,
        "policyRate": 14.25,
        "fdi": 3.8,
        "reserves": 35.5,
        "exchangeRate": 470
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          4.5,
          -2.5,
          4.3,
          3.2,
          5.1,
          4.8,
          4.5
        ],
        "inflation": [
          5.3,
          6.8,
          8,
          20.3,
          14,
          9.5,
          8.5
        ],
        "unemployment": [
          4.8,
          5,
          4.9,
          4.9,
          4.8,
          4.8,
          4.8
        ],
        "debtToGdp": [
          19.8,
          25.8,
          24.2,
          22.5,
          22,
          22.5,
          22.8
        ],
        "currentAccount": [
          -3.6,
          -3.8,
          -4,
          3.1,
          -3.5,
          -3,
          -3.2
        ],
        "oilProduction": [
          1.96,
          1.8,
          1.82,
          1.91,
          1.95,
          1.92,
          1.9
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 5.2,
          "industry": 34.8,
          "services": 60
        },
        "tradeOpenness": 52.8,
        "topExports": [
          "Ham petrol",
          "Doğal Gaz",
          "Metaller (Uranyum, Bakır)",
          "Demir cevheri",
          "Buğday"
        ],
        "topPartners": [
          "Çin",
          "İtalya",
          "Rusya",
          "Hollanda",
          "Fransa"
        ],
        "islamicFinanceShare": 4.5
      },
      "outlook": {
        "rating": "Stable",
        "gdpForecast2026": 4.8,
        "gdpForecast2027": 5,
        "inflationForecast2026": 7,
        "keyRisks": [
          "Petrol ve emtia fiyatlarındaki oynaklık",
          "Rusya'ya yaptırımlar yayılıyor",
          "Jeopolitik konumlanma (Rusya-Çin-Batı)",
          "Su kıtlığı ve Aral Denizi mirası"
        ],
        "keyDrivers": [
          "Tengiz petrol sahasının genişletilmesi (TCO)",
          "Trans-Hazar enerji koridoru",
          "Astana Uluslararası Finans Merkezi (AIFC)",
          "Maden zenginliği (uranyum, nadir toprak elementleri)"
        ],
        "summary": "Kazakistan, petrol üretimi ve maden ihracatının etkisiyle %4,5'lik güçlü büyümeyle Orta Asya'nın en büyük ekonomisi ve dünyanın önde gelen uranyum üreticisidir. Astana Uluslararası Finans Merkezi bir İslami finans merkezi geliştiriyor. Enflasyon 2022'deki zirvelerinden sonra yavaşlıyor ve ekonomi, Çin ile Avrupa arasında bir geçiş koridoru olarak stratejik konumlanmasından yararlanıyor."
      },
      "dsge": {
        "status": "planned",
        "modelType": "Kaynak açısından zengin geçişe sahip açık ekonomi NK",
        "keyFeatures": [
          "Çoklu emtia ihracat dinamikleri",
          "Devlet servet fonu (Ulusal Fon)",
          "Rusya-Çin ticaret koridorunun etkileri",
          "Enflasyon hedeflemesi ile yönetilen dalgalanma"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    },
    "senegal": {
      "name": "Senegal",
      "code": "SEN",
      "flag": "🇸🇳",
      "region": "Batı Afrika",
      "incomeGroup": "Alt-Orta Gelir",
      "currency": "XOF",
      "capital": "Dakar",
      "headline": {
        "gdp": 32,
        "gdpGrowth": 8.8,
        "inflation": 2.5,
        "population": 18.3,
        "debtToGdp": 72.5,
        "unemployment": 22,
        "currentAccount": -8.5,
        "fiscalBalance": -3.8,
        "policyRate": 3.5,
        "fdi": 5.2,
        "reserves": 2.8,
        "exchangeRate": 605
      },
      "timeSeries": {
        "years": [
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025
        ],
        "gdpGrowth": [
          4.6,
          1.3,
          6.5,
          4,
          4.3,
          7.5,
          8.8
        ],
        "inflation": [
          1,
          2.5,
          2.2,
          9.7,
          5.9,
          3.2,
          2.5
        ],
        "unemployment": [
          16.9,
          22.5,
          21.8,
          22.2,
          22.5,
          22.2,
          22
        ],
        "debtToGdp": [
          61.8,
          68.8,
          73.2,
          75.5,
          73.8,
          73,
          72.5
        ],
        "currentAccount": [
          -7.5,
          -10.5,
          -12.2,
          -12,
          -9.5,
          -8.8,
          -8.5
        ],
        "oilGasProduction": [
          0,
          0,
          0,
          0,
          0,
          0.05,
          0.1
        ]
      },
      "structure": {
        "gdpBysector": {
          "agriculture": 16.5,
          "industry": 24.8,
          "services": 58.7
        },
        "tradeOpenness": 52.5,
        "topExports": [
          "Altın",
          "Petrol Ürünleri",
          "Fosfatlar",
          "Balık",
          "Yer fıstığı"
        ],
        "topPartners": [
          "Mali",
          "Hindistan",
          "İsviçre",
          "Çin",
          "Fransa"
        ],
        "islamicFinanceShare": 8.5
      },
      "outlook": {
        "rating": "Positive",
        "gdpForecast2026": 10.5,
        "gdpForecast2027": 7.2,
        "inflationForecast2026": 2.8,
        "keyRisks": [
          "Petrol/gaz üretiminde artış uygulama riski",
          "Yüksek kamu borcu seviyeleri",
          "Genç işsizliği",
          "İklim ve Sahil güvenliğiyle ilgili zorluklar"
        ],
        "keyDrivers": [
          "Sangomar petrol sahası üretimine başlandı",
          "GTA gaz projesi gelirleri",
          "Metrobüs altyapısı (Dakar)",
          "Tarımsal modernizasyon ve fosfat ihracatı"
        ],
        "summary": "Senegal, Sangomar sahasından ilk petrol üretimi ve Grand Tortue Ahmeyim (GTA) projesinden yakında gaz üretimi yapılmasıyla dönüştürücü bir ekonomik an yaşıyor. Büyümenin %8,8-10,5'e yükselerek onu dünyanın en hızlı büyüyen ekonomilerinden biri haline getirmesi bekleniyor. Zorluk, kalıcı genç işsizliğini gidermek ve ekonomiyi sürdürülebilir bir şekilde çeşitlendirmek için beklenmedik petrol düşüşünü yönetmektir."
      },
      "dsge": {
        "status": "planned",
        "modelType": "Yeni petrol üreticisiyle açık ekonomi NK",
        "keyFeatures": [
          "Petrol üretimi artış dinamikleri",
          "CFA frangı bölgesi üyeliği",
          "Tarımsal arz şokları",
          "Altyapı yatırım kanalı"
        ],
        "calibrationDate": null,
        "shocks": [],
        "linkPath": null
      }
    }
  }
};
