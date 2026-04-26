const SCRIPTURE_DATA = {
  "topics": [
    {
      "id": "riba",
      "name": "Faiz/Tefecilik",
      "nameAr": "الربا",
      "description": "İslami finansta büyük bir günah olarak kabul edilen, faiz getiren işlemlerin İslami olarak yasaklanması.",
      "icon": "⚠️",
      "color": "#e74c3c"
    },
    {
      "id": "zakat",
      "name": "Zorunlu Hayırseverlik",
      "nameAr": "الزكاة",
      "description": "İslam'ın zorunlu zekatı ve servet arındırma direği, servetin dolaşmasını ve fakirlere yardım etmesini sağlamaktır.",
      "icon": "🤲",
      "color": "#27ae60"
    },
    {
      "id": "sadaqah",
      "name": "Gönüllü Hayırseverlik",
      "nameAr": "الصدقة",
      "description": "Zorunlu zekatı tamamlayan ve İslami şefkati yansıtan gönüllü bağış ve hayır işleri.",
      "icon": "💝",
      "color": "#2ecc71"
    },
    {
      "id": "trade",
      "name": "Ticaret ve Ticaret",
      "nameAr": "البيع والتجارة",
      "description": "İslam ekonomisinde alım, satım ve ticari işlemleri düzenleyen ilkeler.",
      "icon": "🛍️",
      "color": "#3498db"
    },
    {
      "id": "waqf",
      "name": "Bağışlar",
      "nameAr": "الوقف",
      "description": "Sürekli olarak kamu yararına hizmet eden mülk bağışları yoluyla sürekli hayırseverlik.",
      "icon": "🏛️",
      "color": "#9b59b6"
    },
    {
      "id": "wealth",
      "name": "Zenginlik ve Mülkiyet",
      "nameAr": "المال",
      "description": "Zenginlik mülkiyeti, yönetimi ve maddi kaynakların doğru kullanımına ilişkin İslami öğretiler.",
      "icon": "💰",
      "color": "#f39c12"
    },
    {
      "id": "justice",
      "name": "Adalet ve Adalet",
      "nameAr": "العدل",
      "description": "Ticarette adil muameleyi, dürüst işlemleri ve adil muameleyi sağlayan temel İslami prensip.",
      "icon": "⚖️",
      "color": "#34495e"
    },
    {
      "id": "contracts",
      "name": "Sözleşmeler ve Anlaşmalar",
      "nameAr": "العقود",
      "description": "Bağlayıcı anlaşmaları, sözleşmeleri ve yükümlülüklerin yerine getirilmesini düzenleyen İslami ilkeler.",
      "icon": "📜",
      "color": "#16a085"
    },
    {
      "id": "poverty",
      "name": "Yoksulluk ve Sosyal Refah",
      "nameAr": "الفقر",
      "description": "Yoksulluğu ele alan ve toplumun savunmasız üyelerini destekleyen İslami sosyal refah sistemleri.",
      "icon": "🤝",
      "color": "#c0392b"
    },
    {
      "id": "moderation",
      "name": "Moderasyon ve İsraf",
      "nameAr": "الاعتدال",
      "description": "Ölçülü harcamaya önem verilmesi, israftan kaçınılması ve israfın önlenmesi.",
      "icon": "⏸️",
      "color": "#8e44ad"
    },
    {
      "id": "hoarding",
      "name": "İstifçilik ve Tekel",
      "nameAr": "الاكتناز",
      "description": "Temel malların istiflenmesine ilişkin İslami yasak ve topluluklara zarar veren tekelci uygulamalar.",
      "icon": "🚫",
      "color": "#d35400"
    },
    {
      "id": "sustenance",
      "name": "Geçim ve Emek",
      "nameAr": "الرزق",
      "description": "Dürüst çalışarak kazanma, Allah'ın hükmüne güvenme ve işçi haklarına dair İslami öğretiler.",
      "icon": "🌾",
      "color": "#1abc9c"
    },
    {
      "id": "inheritance",
      "name": "Miras",
      "nameAr": "الميراث",
      "description": "Ölümden sonra servetin dağıtımını düzenleyen İslami miras kanunları.",
      "icon": "📋",
      "color": "#2c3e50"
    },
    {
      "id": "debt",
      "name": "Borç ve Borç Verme",
      "nameAr": "الدَّين",
      "description": "Borç verme, borçlanma, borç geri ödemesi ve alacaklı-borçlu ilişkilerini düzenleyen İslami ilkeler.",
      "icon": "📝",
      "color": "#7f8c8d"
    },
    {
      "id": "governance",
      "name": "Ekonomik Yönetişim",
      "nameAr": "الحكم الاقتصادي",
      "description": "Kamu maliyesi, vergilendirme, hazine yönetimi ve yöneticilerin ekonomik sorumlulukları.",
      "icon": "🏛",
      "color": "#1a237e"
    },
    {
      "id": "ethics",
      "name": "İş Etiği",
      "nameAr": "أخلاق التجارة",
      "description": "Dürüstlük, dolandırıcılığın önlenmesi, rüşvetin yasaklanması ve güvenilirlik de dahil olmak üzere iş hayatında etik davranışlar.",
      "icon": "🤝",
      "color": "#00695c"
    },
    {
      "id": "market-regulation",
      "name": "Piyasa Düzenlemesi",
      "nameAr": "تنظيم السوق",
      "description": "Adil piyasa uygulamalarını, fiyat düzenlemesini, tüketicinin korunmasını ve hisbah (piyasa denetimi) sistemini düzenleyen İslami ilkeler.",
      "icon": "⚖️",
      "color": "#8e44ad"
    },
    {
      "id": "islamic-finance",
      "name": "İslami Finans",
      "nameAr": "التمويل الإسلامي",
      "description": "Mudaraba, muşaraka, sukuk ve tekaful dahil olmak üzere Şeriat hukukuna uygun finansal araçlar ve uygulamalar.",
      "icon": "🏦",
      "color": "#2980b9"
    },
    {
      "id": "wealth-distribution",
      "name": "Servet Dağılımı",
      "nameAr": "توزيع الثروة",
      "description": "Miras payları, zekat tahsisi ve sosyal güvenlik ağları da dahil olmak üzere toplumda servetin adil dağılımına yönelik mekanizmalar.",
      "icon": "📊",
      "color": "#16a085"
    },
    {
      "id": "charity",
      "name": "Hayırseverlik ve Bağış",
      "nameAr": "الإحسان والعطاء",
      "description": "Hem zorunlu (zekat) hem de gönüllü (sadaka) biçimleri ve cömertliğin erdemlerini kapsayan genel hayırseverlik.",
      "icon": "🤝",
      "color": "#1abc9c"
    },
    {
      "id": "labor",
      "name": "İşgücü ve İstihdam",
      "nameAr": "العمل والتوظيف",
      "description": "İşçi hakları, adil ücretler, emeğin onuru ve işveren-işçi ilişkilerinde İslami etik.",
      "icon": "👷",
      "color": "#e67e22"
    },
    {
      "id": "property",
      "name": "Mülkiyet Hakları",
      "nameAr": "حقوق الملكية",
      "description": "Mülkiyet, toprak hakları, kaynakların idaresi ve vesayet (hilafet) kavramını düzenleyen İslami ilkeler.",
      "icon": "🏠",
      "color": "#d35400"
    }
  ],
  "entries": [
    {
      "id": 1,
      "type": "quran",
      "reference": "Al-Baqarah 2:275",
      "arabic": "الَّذِينَ يَأْكُلُونَ الرِّبَا لَا يَقُومُونَ إِلَّا كَمَا يَقُومُ الَّذِي يَتَخَبَّطُهُ الشَّيْطَانُ مِنَ الْمَسِّ",
      "translation": "Faiz yiyenler, şeytanın dokunuşuyla dayak yiyen kimseden başkası gibi ayakta durmazlar.",
      "topics": [
        "riba",
        "justice"
      ],
      "context": "Bu ayette riba alışverişi kınanmakta ve faize dayalı alışveriş yapanlar için ağır manevi sonuçlar anlatılmaktadır.",
      "relatedIds": [
        2,
        3,
        4,
        5
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 2,
      "type": "quran",
      "reference": "Al-Baqarah 2:276-279",
      "arabic": "يَمْحَقُ اللَّهُ الرِّبَا وَيُرْبِي الصَّدَقَاتِ وَاللَّهُ لَا يُحِبُّ كُلَّ كَفَّارٍ أَثِيمٍ",
      "translation": "Allah faizi yok eder, hayırları ise artırır. Ve Allah, her nankör ve günahkârı sevmez.",
      "topics": [
        "riba",
        "sadaqah",
        "wealth"
      ],
      "context": "Bu ayet, ribanın yıkıcı niteliğini sadakanın faydalı etkileriyle karşılaştırarak bu işlemlerle ilgili temel İslami prensibi ortaya koymaktadır.",
      "relatedIds": [
        1,
        6,
        7,
        15
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 3,
      "type": "quran",
      "reference": "Ali 'Imran 3:130",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا الرِّبَا أَضْعَافًا مُّضَاعَفَةً وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
      "translation": "Ey iman edenler, kat kat ve katlanarak artan faiz yemeyin. Ve Allah'tan korkun ki kurtuluşa eresiniz.",
      "topics": [
        "riba",
        "justice",
        "wealth"
      ],
      "context": "Bu ayet, riba tüketimini her türlü şekilde doğrudan yasaklamakta, özellikle artan artışlara vurgu yapmakta ve itaati ekonomik başarıya bağlamaktadır.",
      "relatedIds": [
        1,
        2,
        4
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 4,
      "type": "quran",
      "reference": "An-Nisa 4:161",
      "arabic": "وَأَخْذِهِمُ الرِّبَا وَقَدْ نُهُوا عَنْهُ وَأَكْلِهِمْ أَمْوَالَ النَّاسِ بِالْبَاطِلِ",
      "translation": "Ve kendilerine yasaklanmış olan faizi almaları ve insanların mallarını haksız yere yemeleri nedeniyle.",
      "topics": [
        "riba",
        "justice"
      ],
      "context": "Bu ayet, riba uygulamasını kınamakta ve onu başkalarının mallarının haksız tüketimiyle ilişkilendirmekte ve onun adaletsiz niteliğini vurgulamaktadır.",
      "relatedIds": [
        1,
        3,
        5
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 5,
      "type": "quran",
      "reference": "Ar-Rum 30:39",
      "arabic": "وَمَا آتَيْتُم مِّن رِّبًا لِّيَرْبُوَ فِي أَمْوَالِ النَّاسِ فَلَا يَرْبُو عِندَ اللَّهِ وَمَا آتَيْتُم مِّن زَكَاةٍ تُرِيدُونَ وَجْهَ اللَّهِ",
      "translation": "İnsanların malları artsın diye verdiğiniz riba, Allah katında artmaz. Ama Allah'ın rızasını arayarak verdiğiniz zekat, onu kat kat artıracak olanlardır.",
      "topics": [
        "riba",
        "zakat",
        "wealth"
      ],
      "context": "Bu ayet, ribayı zekatla karşılaştırarak, sadaka verenlerin sevap ve nimetlerini artırırken, ribadan elde edilen haram kazançların Allah katında katlanmadığını göstermektedir.",
      "relatedIds": [
        2,
        6,
        23,
        24
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 6,
      "type": "hadith",
      "reference": "Sahih Muslim 1597",
      "arabic": "عَنْ جَابِرٍ أَنَّ النَّبِيَّ صلى الله عليه وسلم لَعَنَ آكِلَ الرِّبَا وَمُوكِلَهُ وَكَاتِبَهُ وَشَاهِدَهُ",
      "translation": "Câbir'den: Peygamber (s.a.v.) riba yiyene, onu sağlayana, kâtibe ve şahit olana lanet etmiştir.",
      "topics": [
        "riba",
        "justice"
      ],
      "context": "Bu hadis, laneti sadece doğrudan tüketiciye değil, ilgili tüm taraflara yayarak riba işlemlerinin ciddiyetini vurgulamaktadır.",
      "relatedIds": [
        1,
        2,
        3
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 7,
      "type": "hadith",
      "reference": "Sunan Ibn Majah 2273",
      "arabic": "عَنْ عَبْدِ اللَّهِ بْنِ حَنْظَلَةَ أَنَّ النَّبِيَّ صلى الله عليه وسلم قَالَ: دِرْهَمُ رِبًا يَأْكُلُهُ الرَّجُلُ وَهُوَ يَعْلَمُ أَشَدُّ مِنْ سِتَّةٍ وَثَلَاثِينَ زِنْيَةً",
      "translation": "Peygamber (sav) şöyle buyurmuştur: Bir dirhem ribayı bilerek yiyen kimse, otuz altı zina yapmaktan daha kötüdür.",
      "topics": [
        "riba",
        "justice"
      ],
      "context": "Bu hadis, ribanın aşırı ciddiyetini anlatmakta, onu ciddi günahlara olumsuz bir şekilde benzeterek, onun yasağını ve manevi sonuçlarını vurgulamaktadır.",
      "relatedIds": [
        1,
        6
      ],
      "strength": "hasan",
      "collection": "İbn Mâce"
    },
    {
      "id": 8,
      "type": "hadith",
      "reference": "Sahih Bukhari 2087",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: الدَّهَقُ نَوْعٌ مِنَ التَّمْرِ لَا يَحِلُّ بَيْعُهُ بِالدَّهَقِ",
      "translation": "Peygamber (s.a.v.), mübadelede miktar artışı söz konusu olduğunda bir çeşit hurmanın diğeriyle satılmasını yasaklamıştır.",
      "topics": [
        "riba",
        "trade",
        "justice"
      ],
      "context": "Bu hadis ticarette eşit alışverişin temel ilkesini ortaya koymakta, işlemlerde her türlü faiz ve avantajın önlenmesini sağlamaktadır.",
      "relatedIds": [
        9,
        10,
        46
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 9,
      "type": "quran",
      "reference": "Al-Baqarah 2:43",
      "arabic": "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ",
      "translation": "Namazı kılın, zekatı verin ve rükû edenlerle birlikte rükû edin.",
      "topics": [
        "zakat",
        "justice"
      ],
      "context": "Bu ayet, zekatın, namaz ve diğer temel yükümlülüklerin yanında İslam'ın temel direklerinden biri olduğunu ortaya koymaktadır.",
      "relatedIds": [
        10,
        11,
        12
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 10,
      "type": "quran",
      "reference": "Al-Baqarah 2:110",
      "arabic": "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ",
      "translation": "Namazı kılın ve zekatı verin. Kendiniz için önceden göndereceğiniz her iyilik, onu Allah katında bulacaksınız.",
      "topics": [
        "zakat",
        "wealth"
      ],
      "context": "Bu ayet, zekatı, ahiret için salih ameller gönderme kavramına bağlayarak, onu hem toplumsal bir yükümlülük hem de sonsuzluğa yatırım haline getirmektedir.",
      "relatedIds": [
        9,
        11,
        24
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 11,
      "type": "quran",
      "reference": "Al-Baqarah 2:177",
      "arabic": "لَيْسَ الْبِرُّ أَن تُولُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَكِنَّ الْبِرَّ مَن آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَالْمَلَائِكَةِ وَالْكِتَابِ وَالنَّبِيِّينَ وَآتَى الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ",
      "translation": "İyilik, yüzlerinizi doğuya veya batıya çevirmenizde değildir; fakat (gerçek) iyilik, Allah'a, ahiret gününe, meleklere, kitaba ve peygamberlere iman eden ve sevgisine rağmen malı yakınlara, yetimlere ve yoksullara veren kimsedir.",
      "topics": [
        "zakat",
        "sadaqah",
        "poverty",
        "justice"
      ],
      "context": "Doğrulukla ilgili bu kapsamlı ayet, temel bir İslami erdem olarak yoksullara ve muhtaçlara yardım etmenin merkezi önemini vurguluyor.",
      "relatedIds": [
        10,
        14,
        15,
        55,
        56
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 12,
      "type": "quran",
      "reference": "At-Taubah 9:60",
      "arabic": "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ",
      "translation": "Zekât, yalnızca fakirler, muhtaçlar, onu toplamakla görevli olanlar, kalpleri uzlaşacak olanlar, köleler, borçlular, Allah yolunda ve yolcular için Allah'ın bir farzıdır.",
      "topics": [
        "zakat",
        "poverty",
        "justice"
      ],
      "context": "Bu ayet, İslami çerçevede kapsamlı bir sosyal refah sistemi kurarak zekat alıcılarının sekiz kategorisini belirtmektedir.",
      "relatedIds": [
        9,
        11,
        55,
        56,
        57
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 13,
      "type": "quran",
      "reference": "At-Taubah 9:103",
      "arabic": "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا",
      "translation": "(Ey Muhammed), onların mallarından bir sadaka al, onunla onları arındırırsın ve çoğaltırsın.",
      "topics": [
        "zakat",
        "wealth"
      ],
      "context": "Bu ayet, zekatın ikili bir amaca hizmet ettiğini vurgulamaktadır: verme eylemi yoluyla zenginliği arındırmak ve ruhları arındırmak.",
      "relatedIds": [
        10,
        24,
        25
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 14,
      "type": "quran",
      "reference": "Al-Baqarah 2:267",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ وَمِمَّا أَخْرَجْنَا لَكُم مِّنَ الْأَرْضِ",
      "translation": "Ey iman edenler, kazandıklarınızın temiz olanlarından ve sizin için yerden çıkardığımız şeylerden infak edin.",
      "topics": [
        "zakat",
        "sadaqah",
        "wealth"
      ],
      "context": "Bu ayet, kazancın en güzelini hayır işlerinde harcamayı teşvik etmekte, malın en iyisinden gönüllü olarak verme ilkesini tesis etmektedir.",
      "relatedIds": [
        11,
        13,
        15
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 15,
      "type": "hadith",
      "reference": "Sahih Bukhari 1395",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ رضى الله عنه قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: مَا مِنْ يَوْمٍ يُصْبِحُ الْعِبَادُ فِيهِ إِلَّا مَلَكَانِ يَنْزِلَانِ فَيَقُولُ أَحَدُهُمَا: اللَّهُمَّ أَعْطِ مُنْفِقًا خَلَفًا",
      "translation": "Ebu Hureyre'den: Peygamber (sav) şöyle buyurmuştur: Her gün iki melek iner, bunlardan biri şöyle der: 'Allah'ım, senin yolunda infak eden herkese tazminat öde.'",
      "topics": [
        "zakat",
        "sadaqah",
        "wealth"
      ],
      "context": "Bu hadis, cömertliği teşvik ederek hayır işlerinde harcayanlara verilecek manevi mükâfatları ve ilahi mükâfatı göstermektedir.",
      "relatedIds": [
        2,
        5,
        10,
        14
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 16,
      "type": "hadith",
      "reference": "Sahih Muslim 1218",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: مَنْ تَصَدَّقَ بِعَدْلِ تَمْرَةٍ مِنْ كَسْبٍ طَيِّبٍ وَاللَّهُ لَا يَقْبَلُ إِلَّا الطَّيِّبَ",
      "translation": "Peygamber (s.a.v.) şöyle buyurmuştur: Kim iyi bir kazançtan bir hurma kadar sadaka verirse -çünkü Allah yalnızca iyi olanı kabul eder- o sadakayı Allah sağ eliyle alır.",
      "topics": [
        "zakat",
        "sadaqah"
      ],
      "context": "Bu hadis, hayırların niteliği ve kaynağının önemli olduğunu, helal kazançtan verilen az miktardaki bağışın bile kıymetli olduğunu ortaya koymaktadır.",
      "relatedIds": [
        14,
        15,
        71
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 17,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 1574",
      "arabic": "عَنْ مُعَاذِ بْنِ جَبَلٍ أَنَّ النَّبِيَّ صلى الله عليه وسلم قَالَ: أَتْبَعْتُ بِالزَّكَاةِ الصَّلَاةَ",
      "translation": "Peygamber (sav) Muaz ibn Cebel'e şu talimatı verdi: 'İnsanlara, Allah'ın namazı farz kıldığı gibi zekatı da farz kıldığını öğret.'",
      "topics": [
        "zakat",
        "justice"
      ],
      "context": "Bu hadis, zekatın, İslam'ın temel direklerinden biri olan namazla eşit önemde temel bir dini yükümlülük olduğunu ortaya koymaktadır.",
      "relatedIds": [
        9,
        12,
        37
      ],
      "strength": "hasan",
      "collection": "Ebu Davud"
    },
    {
      "id": 18,
      "type": "quran",
      "reference": "Al-Baqarah 2:261-262",
      "arabic": "مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ",
      "translation": "Mallarını Allah yolunda harcayanların örneği, yedi başak veren bir tohum gibidir; her başakta yüz tane vardır.",
      "topics": [
        "sadaqah",
        "wealth",
        "zakat"
      ],
      "context": "Bu ayette, sadakanın ve Allah yolunda harcamanın kat kat artan sevaplarını göstermek için tohumların büyümesi benzetmesi kullanılmaktadır.",
      "relatedIds": [
        15,
        19,
        20
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 19,
      "type": "quran",
      "reference": "At-Taubah 9:121",
      "arabic": "لَيْسَ عَلَيْكَ هُدَاهُمْ وَلَٰكِنَّ اللَّهَ يَهْدِي مَن يَشَاءُ وَمَا تُنفِقُوا مِنْ خَيْرٍ فَلِأَنفُسِكُمْ",
      "translation": "Harcadığınız her iyilik kendiniz içindir ve Allah'ın rızasını aramak dışında harcamazsınız.",
      "topics": [
        "sadaqah",
        "wealth"
      ],
      "context": "Bu ayet, hayırseverliğin, verene manevi yükselme ve Allah'tan gelen mükâfat yoluyla fayda sağladığını vurgulamaktadır.",
      "relatedIds": [
        18,
        20,
        24
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 20,
      "type": "quran",
      "reference": "Al-Hadid 57:7",
      "arabic": "آمِنُوا بِاللَّهِ وَرَسُولِهِ وَأَنفِقُوا مِمَّا جَعَلَكُم مُّسْتَخْلَفِينَ فِيهِ",
      "translation": "Allah'a ve Resulüne inanın ve sizi halife kıldığı şeylerden infak edin.",
      "topics": [
        "sadaqah",
        "wealth",
        "zakat"
      ],
      "context": "Bu ayet, zenginliğin Allah'ın bir emaneti olduğunu, müminlerin ise hayır yolunda harcamakla yükümlü halefler olduklarını bildirmektedir.",
      "relatedIds": [
        18,
        19,
        25
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 21,
      "type": "hadith",
      "reference": "Sahih Bukhari 2468",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: إِذَا مَاتَ الْإِنسَانُ انْقَطَعَ عَملُهُ إِلَّا مِنْ ثَلَاثَةٍ: صَدَقَةٌ جَارِيَةٌ",
      "translation": "Peygamber Efendimiz (s.a.v.) şöyle buyurmuştur: \"Kişi öldüğünde üç şey dışında ameli kesilir: Devam eden sadaka, insanlara fayda veren ilim ve kendisine dua eden salih evlat.",
      "topics": [
        "sadaqah",
        "waqf"
      ],
      "context": "Bu hadis, özellikle devam eden hayırseverlik veya bağışlar olarak yapılandırıldığında, sadakanın sürekli mükâfatını göstermektedir.",
      "relatedIds": [
        18,
        35,
        36
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 22,
      "type": "hadith",
      "reference": "Sahih Muslim 2204",
      "arabic": "عَنْ أَبِي ذَرٍّ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: كُلُّ نَفْسٍ تَصَدَّقْ",
      "translation": "Peygamber (s.a.v.) şöyle buyurmuştur: Her nefs sadaka vermelidir. 'Ya insanın hiçbir şeyi yoksa?' 'Elleriyle çalışmalı, kendine fayda sağlamalı ve sadaka vermelidir.'",
      "topics": [
        "sadaqah",
        "sustenance"
      ],
      "context": "Bu hadis, serveti ne olursa olsun hayırseverliğin herkese farz olduğunu ve bizzat çalışmanın bir bağış aracı olabileceğini ortaya koymaktadır.",
      "relatedIds": [
        21,
        70,
        71
      ],
      "strength": "hasan",
      "collection": "Müslüman"
    },
    {
      "id": 23,
      "type": "hadith",
      "reference": "Sahih Bukhari 1469",
      "arabic": "عَنْ عَائِشَةَ رضى الله عنها قَالَتْ: دَخَلَ عَلَيَّ النَّبِيُّ صلى الله عليه وسلم وَفِي الْبَيْتِ قِطَعٌ مِنْ أَدِيمٍ، فَقَالَ: تَصَدَّقِي بِهِ",
      "translation": "Peygamber (s.a.v.), Aişe'nin evinde bazı deri parçaları gördü ve şöyle dedi: 'Onları sadaka olarak verin.'",
      "topics": [
        "sadaqah",
        "wealth"
      ],
      "context": "Bu hadis, Peygamber Efendimiz'in, mütevazı değerdeki eşyalarda bile hayırseverliği teşvik ettiğini göstermektedir.",
      "relatedIds": [
        15,
        21
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 24,
      "type": "quran",
      "reference": "Al-Baqarah 2:282",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
      "translation": "Ey iman edenler, belirli bir süre için borçlandığınız zaman onu yazın. Bir katip bunu sadakatle yazsın.",
      "topics": [
        "trade",
        "contracts",
        "justice"
      ],
      "context": "Bu ayet, anlaşmazlıkları önlemek ve adil alışverişi sağlamak için ticari işlemlerin belgelenmesine ilişkin İslami prensibi tesis etmektedir.",
      "relatedIds": [
        25,
        26,
        27,
        46
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 25,
      "type": "quran",
      "reference": "An-Nisa 4:29",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ إِلَّا أَن تَكُونَ تِجَارَةً عَن تَرَاضٍ مِّنكُمْ",
      "translation": "Ey iman edenler, karşılıklı rıza ile yapılan ticaret dışında birbirinizin mallarını haksız yere yemeyin.",
      "topics": [
        "trade",
        "justice",
        "contracts"
      ],
      "context": "Bu ayet, meşru ticaretin karşılıklı anlaşmaya ve özgür rızaya dayanması gerektiği şeklindeki temel prensibi ortaya koymaktadır.",
      "relatedIds": [
        24,
        26,
        27,
        46
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 26,
      "type": "quran",
      "reference": "Al-Jumu'ah 62:10",
      "arabic": "فَإِذَا قُضِيَتِ الصَّلَاةُ فَانتَشِرُوا فِي الْأَرْضِ وَابْتَغُوا مِن فَضْلِ اللَّهِ",
      "translation": "Namaz kılınınca artık yeryüzüne dağılın ve Allah'ın lütfundan arayın.",
      "topics": [
        "trade",
        "sustenance"
      ],
      "context": "Bu ayet, dini vecibeleri yerine getirdikten sonra geçim sağlamanın meşru bir yolu olarak ticareti ve alışverişi teşvik etmektedir.",
      "relatedIds": [
        25,
        70,
        71
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 27,
      "type": "quran",
      "reference": "An-Nahl 16:90",
      "arabic": "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ وَيَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ وَالْبَغْيِ",
      "translation": "Şüphesiz Allah, adaleti, iyiliği, yakınlara yardım etmeyi emreder, ahlaksızlığı, yanlış davranışı ve zulmü yasaklar.",
      "topics": [
        "trade",
        "justice",
        "contracts"
      ],
      "context": "Bu ayet, adaleti, ticari işlemler de dahil olmak üzere tüm işlemlerde geçerli olması gereken temel bir İslami prensip olarak tesis etmektedir.",
      "relatedIds": [
        24,
        25,
        46
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 28,
      "type": "hadith",
      "reference": "Sahih Bukhari 2087",
      "arabic": "عَنْ أَبِي سَعِيدٍ رضى الله عنه قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: الْبَيِّعَانِ بِالْخِيَارِ مَا لَمْ يَتَفَرَّقَا",
      "translation": "Peygamber (s.a.v.) şöyle buyurmuştur: Satışta iki taraf, ayrılmadıkları sürece [alışı tamamlama veya iptal etme] konusunda seçim hakkına sahiptir.",
      "topics": [
        "trade",
        "contracts",
        "justice"
      ],
      "context": "Bu hadis, işlemlerde alıcı ve satıcının haklarını tesis eder, adaleti sağlar ve değerlendirmeye zaman tanır.",
      "relatedIds": [
        24,
        25,
        46
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 29,
      "type": "hadith",
      "reference": "Sahih Muslim 1537",
      "arabic": "عَنْ أَبِي سَعِيدٍ الخدري قَالَ: جَاءَ رَجُلٌ إِلَى النَّبِيِّ صلى الله عليه وسلم فَقَالَ: يَا رَسُول اللَّهِ، أَيُّ الْكَسْبِ أَطْيَبُ؟ قَالَ: عَمَلُ الرَّجُلِ بِيَدِهِ وَكُلُّ بَيْعٍ مَبْرُورٌ",
      "translation": "Bir adam Peygamber Efendimiz'e (sav) sordu: 'Hangi kazanç daha hayırlıdır?' Cevap verdi: 'Bir adamın işi ve her dürüst işlem.'",
      "topics": [
        "trade",
        "sustenance"
      ],
      "context": "Bu hadis, meşru ve şerefli bir kazanç yolu olarak dürüst ticaretin ve el emeğinin faziletini vurgulamaktadır.",
      "relatedIds": [
        26,
        70,
        71
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 30,
      "type": "hadith",
      "reference": "Sunan Ibn Majah 2150",
      "arabic": "عَنْ حَكِيمِ بْنِ حِزَامٍ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: الْمُتَبَايِعَانِ بِالْخِيَارِ فِي الْبَيْعِ مَا لَمْ يَتَفَرَّقَا",
      "translation": "İşlem yapan iki taraf, ayrılmadıkları sürece işlemde seçim hakkına sahiptir.",
      "topics": [
        "trade",
        "contracts"
      ],
      "context": "Bu hadis, ticari işlemlerde alıcı ve satıcının özgürlük ve hakları ilkesini pekiştirmektedir.",
      "relatedIds": [
        28,
        24
      ],
      "strength": "hasan",
      "collection": "İbn Mâce"
    },
    {
      "id": 31,
      "type": "quran",
      "reference": "Al-Baqarah 2:261",
      "arabic": "مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ",
      "translation": "Mallarını Allah yolunda harcayanların örneği, yedi başak veren bir tohum gibidir.",
      "topics": [
        "waqf",
        "sadaqah",
        "wealth"
      ],
      "context": "Bu ayet, topluma sürekli olarak hizmet eden hayırsever bağışların bileşik ödüllerini göstermektedir.",
      "relatedIds": [
        18,
        21,
        35,
        36
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 32,
      "type": "quran",
      "reference": "Al 'Imran 3:92",
      "arabic": "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ",
      "translation": "Sevdiğiniz şeylerden infak etmedikçe asla iyiliğe ulaşamazsınız.",
      "topics": [
        "waqf",
        "sadaqah"
      ],
      "context": "Bu ayet, gerçek hayırseverliğin fedakarlık ve en çok değer verilen şeylerden vazgeçmeyi gerektirdiğini ortaya koymaktadır.",
      "relatedIds": [
        31,
        35,
        36
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 33,
      "type": "quran",
      "reference": "An-Nahl 16:41",
      "arabic": "وَالَّذِينَ هَاجَرُوا فِي سَبِيلِ اللَّهِ ثُمَّ قُتِلُوا أَوْ مَاتُوا لَيَرْزُقَهُمُ اللَّهُ رِزْقًا حَسَنًا",
      "translation": "Allah yolunda hicret eden, sonra öldürülen veya ölenlere gelince, Allah onlara elbette güzel bir rızık verecektir.",
      "topics": [
        "waqf",
        "sustenance"
      ],
      "context": "Bu ayet, hayırsever bağışları teşvik ederek, Allah'ın ilahi rızık davası uğruna dünyevi uğraşlardan vazgeçenlere güvence verir.",
      "relatedIds": [
        21,
        35,
        36
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 34,
      "type": "hadith",
      "reference": "Sahih Bukhari 2661",
      "arabic": "عَنْ عُمَرَ رضى الله عنه قَالَ: يَا رَسُول اللَّهِ، إِنَّ لِي أَرْضَ بِخَيْبَرَ وَإِنِّي لَمْ أُصِبْ مَالًا قَطُّ أَنْفَسَ عِندِي مِنْهُ، فَقَالَ: إِنْ شِئْتَ حَبَسْتَ أَصْلَهَا وَتَصَدَّقْتَ بِهَا",
      "translation": "Ömer, Peygamber Efendimize (s.a.v.) kendisi için en kıymetli olan Hayber'deki arazisini sordu. Peygamberimiz şöyle cevap verdi: 'Dilersen malı elinde tutar ve sadaka olarak verirsin.'",
      "topics": [
        "waqf",
        "sadaqah"
      ],
      "context": "Bu hadis, Ömer'in en değerli topraklarını vakfetmesiyle İslam vakıf sisteminin temelini oluşturmaktadır.",
      "relatedIds": [
        31,
        32,
        35,
        36
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 35,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 2871",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: إِذَا مَاتَ الْإِنسَانُ انْقَطَعَ عَملُهُ إِلَّا مِنْ ثَلَاثَةٍ: صَدَقَةٌ جَارِيَةٌ أَوْ عِلْمٌ يُنْتَفَعُ بِهِ أَوْ وَلَدٌ صَالِحٌ يَدْعُو لَهُ",
      "translation": "İnsan öldüğünde üç şey dışında ameli kesilir: Devam eden sadaka, faydalı ilim veya kendisine dua eden salih evlat.",
      "topics": [
        "waqf",
        "sadaqah"
      ],
      "context": "Bu hadis, vakfın daimi manevi mükâfatlarını, verene ölümden sonra da fayda sağlamaya devam eden bir hayır işi olarak tesis eder.",
      "relatedIds": [
        21,
        31,
        34,
        36
      ],
      "strength": "hasan",
      "collection": "Ebu Davud"
    },
    {
      "id": 36,
      "type": "hadith",
      "reference": "Sahih Muslim 1218",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ أَنَّ رَسُول اللَّهِ صلى الله عليه وسلم قَالَ: أَفْضَل الصَّدَقَةِ أَنْ تَتَصَدَّقَ وَأَنْتَ صَحِيحٌ شَحِيحٌ",
      "translation": "Peygamber Efendimiz (s.a.v.) şöyle buyurmuştur: En üstün sadaka, ihtiyaç halindeyken verdiğiniz ve temel ihtiyaçlarınızı karşılamadığınız sadakadır.",
      "topics": [
        "waqf",
        "sadaqah"
      ],
      "context": "Bu hadis, kişinin yaşamı boyunca hayırseverlik faaliyetlerini kişisel olarak denetleyebileceği bağışları teşvik eder.",
      "relatedIds": [
        34,
        35
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 37,
      "type": "quran",
      "reference": "At-Taubah 9:34",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّ كَثِيرًا مِّنَ الْأَحْبَارِ وَالرُّهْبَانِ لَيَأْكُلُونَ أَمْوَالَ النَّاسِ بِالْبَاطِلِ",
      "translation": "Ey iman edenler, şüphesiz alimlerden ve rahiplerden birçoğu insanların mallarını haksız yere yer.",
      "topics": [
        "wealth",
        "justice"
      ],
      "context": "Bu ayet, başkalarının servetini hukuka aykırı olarak tüketenleri kınamakta ve serveti idare etmenin ahlaki sorumluluğunu vurgulamaktadır.",
      "relatedIds": [
        38,
        39,
        40
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 38,
      "type": "quran",
      "reference": "Al-Isra 17:26-27",
      "arabic": "وَآتِ ذَا الْقُرْبَىٰ حَقَّهُ وَالْمِسْكِينَ وَابْنَ السَّبِيلِ وَلَا تُبَذِّرْ تَبْذِيرًا",
      "translation": "Akrabaya, fakire ve yolcuya hakkını verin ve israf etmeyin.",
      "topics": [
        "wealth",
        "moderation",
        "poverty"
      ],
      "context": "Bu ayet, israftan kaçınarak dengeli servet dağılımı ilkesini ortaya koymaktadır.",
      "relatedIds": [
        37,
        39,
        61,
        62
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 39,
      "type": "quran",
      "reference": "Al-Qasas 28:77",
      "arabic": "وَابْتَغِ فِيمَا آتَاكَ اللَّهُ الدَّارَ الْآخِرَةَ وَلَا تَنسَ نَصِيبَكَ مِنَ الدُّنْيَا وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ",
      "translation": "Ahireti Allah'ın sana verdikleriyle ara ve dünyadan nasibini unutma. Allah'ın sana iyilik ettiği gibi sen de iyilik yap.",
      "topics": [
        "wealth",
        "moderation"
      ],
      "context": "Bu ayet, manevi hedeflere öncelik verirken dünyevi rızkı teşvik ederek dengeli servet yönetimini öğretir.",
      "relatedIds": [
        38,
        40,
        61
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 40,
      "type": "quran",
      "reference": "Al-'Alaq 104:1-4",
      "arabic": "كَلَّا إِنَّ الْإِنسَانَ لَيَطْغَىٰ أَن رَّآهُ اسْتَغْنَىٰ",
      "translation": "HAYIR! Aslında insan, kendini yeterli gördüğü için haddi aşıyor.",
      "topics": [
        "wealth",
        "hoarding",
        "moderation"
      ],
      "context": "Bu ayet, Allah'ı anmadan zengin olmanın ve kendine yetmenin manevi tehlikelerine karşı uyarıda bulunmaktadır.",
      "relatedIds": [
        37,
        38,
        65,
        66
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 41,
      "type": "hadith",
      "reference": "Sahih Bukhari 3821",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: كُفّ عَنِ النَّاسِ شَرّك وَتَصَدَّق بِفَضْلِك",
      "translation": "Peygamber (sav) şöyle buyurmuştur: İnsanlara zarar vermekten kaçının ve malınızın fazlasını hayır işlerinde harcayın.",
      "topics": [
        "wealth",
        "sadaqah"
      ],
      "context": "Bu hadis, zenginliğin başkalarına fayda sağlamak için kullanılması ve ölçülü kullanılması gerektiğini vurgulamaktadır.",
      "relatedIds": [
        37,
        38,
        14
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 42,
      "type": "hadith",
      "reference": "Sunan At-Tirmidhi 2431",
      "arabic": "عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: لَا تُغْلِقُوا الرَّزْقَ عَلَى أَنْفُسِكُمْ",
      "translation": "Peygamber Efendimiz (sav) şöyle uyarmıştır: Rızkınızı kendinizden esirgemeyin.",
      "topics": [
        "wealth",
        "sustenance"
      ],
      "context": "Bu hadis dengeli harcamayı teşvik etmekte ve aşırı istifçiliğe ve cimriliğe karşı uyarmaktadır.",
      "relatedIds": [
        39,
        40
      ],
      "strength": "hasan",
      "collection": "Tirmizi"
    },
    {
      "id": 43,
      "type": "quran",
      "reference": "Al-Ma'idah 5:8",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنفُسِكُمْ أَوِ الْوَالِدَيْنِ وَالْأَقْرَبِينَ",
      "translation": "Ey iman edenler, kendiniz, anne-babanız ve yakınlarınız aleyhine de olsa, Allah için şahitler olarak adaleti ayakta tutun.",
      "topics": [
        "justice",
        "contracts"
      ],
      "context": "Bu ayet, adaleti en yüksek prensip olarak tesis etmekte ve kişisel çıkarlara zarar verse bile tarafsızlığı zorunlu kılmaktadır.",
      "relatedIds": [
        27,
        44,
        45
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 44,
      "type": "quran",
      "reference": "Al-Hajj 22:25",
      "arabic": "إِنَّ الَّذِينَ كَفَرُوا وَيَصِدُّونَ عَن سَبِيلِ اللَّهِ وَالْمَسْجِدِ الْحَرَامِ الَّذِي جَعَلْنَاهُ لِلنَّاسِ سَوَاءً الْعَاكِفُ فِيهِ وَالْبَادِي",
      "translation": "Gerçekten onlar, inkar edenler ve insanları Allah'ın yolundan ve insanlar için eşit kıldığımız Mescid-i Haram'dan alıkoyanlardır.",
      "topics": [
        "justice",
        "wealth"
      ],
      "context": "Bu ayet ekonomik ve sosyal konularda eşit erişim ve adil muameleyi vurgulamaktadır.",
      "relatedIds": [
        43,
        45,
        27
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 45,
      "type": "quran",
      "reference": "Al-Rahman 55:7-9",
      "arabic": "وَالسَّمَاءَ رَفَعَهَا وَوَضَعَ الْمِيزَانَ أَلَّا تَطْغَوْا فِي الْمِيزَانِ وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ",
      "translation": "Ve O, göğü yükseltti ve teraziyi kurdu ki, terazide aşırılığa düşmeyesiniz. Tartıyı adaletle yapın ve teraziyi eksik yapmayın.",
      "topics": [
        "justice",
        "trade",
        "contracts"
      ],
      "context": "Bu ayet, teraziyi ticarette adaleti temsil eden bir metafor olarak kullanmakta ve ticarette dürüst ölçüyü vurgulamaktadır.",
      "relatedIds": [
        43,
        44,
        24,
        25
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 46,
      "type": "hadith",
      "reference": "Sahih Muslim 1532",
      "arabic": "عَنْ أَبِي الْأَحْوَصِ عَنْ أَبِيهِ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: التَّاجِرُ الصَّادِقُ الْأَمِينُ مَعَ النَّبِيِّينَ يَوْمَ الْقِيَامَةِ",
      "translation": "Peygamber Efendimiz (sav) şöyle buyurmuştur: Doğru ve güvenilir tüccar, kıyamet gününde peygamberlerle birlikte olacaktır.",
      "topics": [
        "justice",
        "trade"
      ],
      "context": "Bu hadis, dürüst tüccarları en yüksek manevi mertebelere yükselterek ticari dürüstlüğün faziletini vurgulamaktadır.",
      "relatedIds": [
        28,
        45,
        29
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 47,
      "type": "hadith",
      "reference": "Sunan Ibn Majah 2206",
      "arabic": "عَنْ أَبِي سَعِيدٍ الْخُدْرِيِّ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: مِنْ يَتَعَاطَى إِلَيْهِ دِهَقَ وَيَنْقُصُ الْمِيزَانَ",
      "translation": "Peygamber Efendimiz (s.a.v.) ticarette hile yapanlara ve teraziyi değiştirenlere karşı uyarmıştır.",
      "topics": [
        "justice",
        "trade"
      ],
      "context": "Bu hadis, ticarette sahtekarlığı ve dürüst olmayan ölçümleri ticari ahlâkın ciddi bir ihlali olarak kınamaktadır.",
      "relatedIds": [
        45,
        46
      ],
      "strength": "hasan",
      "collection": "İbn Mâce"
    },
    {
      "id": 48,
      "type": "quran",
      "reference": "Al-Baqarah 2:283",
      "arabic": "فَإِن آمِنَ بَعْضُكُم بَعْضًا فَلْيُؤَدِّ الَّذِي اؤْتُمِنَ أَمَانَتَهُ",
      "translation": "Eğer birbirinize güveniyorsanız emaneti emanet eden, emanetini yerine getirsin.",
      "topics": [
        "contracts",
        "justice"
      ],
      "context": "Bu ayet, İslami güven ilkesini ve sözleşme ilişkilerinde yükümlülüklerin yerine getirilmesini tesis etmektedir.",
      "relatedIds": [
        24,
        49,
        50
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 49,
      "type": "quran",
      "reference": "Al-Maidah 5:1",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ",
      "translation": "Ey iman edenler, ahitlerinizi yerine getirin.",
      "topics": [
        "contracts",
        "justice"
      ],
      "context": "Bu ayet, sözleşmelerin yerine getirilmesini dini bir yükümlülük haline getirerek, anlaşmaların kutsallığını vurgulamaktadır.",
      "relatedIds": [
        48,
        50,
        51
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 50,
      "type": "quran",
      "reference": "Al-Isra 17:34",
      "arabic": "وَأَوْفُوا بِالْعَهْدِ إِنَّ الْعَهْدَ كَانَ مَسْؤُولًا",
      "translation": "Ve antlaşmayı yerine getirin. Şüphesiz ahit sorguya çekilecektir.",
      "topics": [
        "contracts",
        "justice"
      ],
      "context": "Bu ayet, ahdin yerine getirilmesinin Allah'a karşı bir sorumluluk meselesi olacak kadar önemli olduğunu vurgulamaktadır.",
      "relatedIds": [
        48,
        49
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 51,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 3597",
      "arabic": "عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: مِنْ أَضْحَكَ اللَّهُ ضَاحِكَتَهُ الْمُحَافِظَةُ عَلَى الْعَهْدِ",
      "translation": "Peygamber Efendimiz (sav) şöyle buyurmuştur: Allah'ı gülümseten şeylerden biri de ahitlerin yerine getirilmesidir.",
      "topics": [
        "contracts",
        "justice"
      ],
      "context": "Bu hadis, sözleşmeden doğan yükümlülükleri yerine getirmenin İlahi zevkini vurgulamaktadır.",
      "relatedIds": [
        49,
        50
      ],
      "strength": "hasan",
      "collection": "Ebu Davud"
    },
    {
      "id": 52,
      "type": "hadith",
      "reference": "Sahih Bukhari 2108",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: ثَلَاثُ خِصَالٍ مَن كُنَّ فِيهِ وَجَدَ بِهِنَّ حَلَاوَةَ الْإِيمَانِ",
      "translation": "Peygamber (s.a.v.) şöyle buyurmuştur: Üç haslet insana imanın, ahdin ve tevekkülün tatlılığını verir.",
      "topics": [
        "contracts",
        "justice"
      ],
      "context": "Bu hadis, sözleşme ve emaneti yerine getirmenin bir müminin temel özelliği olduğunu belirtmektedir.",
      "relatedIds": [
        48,
        50,
        51
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 53,
      "type": "quran",
      "reference": "Al-Baqarah 2:177",
      "arabic": "وَآتَىٰ الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ وَابْنَ السَّبِيلِ",
      "translation": "Ve malı, ona olan sevgisine rağmen, akrabalara, yetimlere, yoksullara ve yolda kalmışlara verdi.",
      "topics": [
        "poverty",
        "zakat",
        "sadaqah"
      ],
      "context": "Bu ayet, doğal zenginlik sevgisine rağmen fakir ve savunmasızları desteklemenin dini yükümlülüğünü vurgulamaktadır.",
      "relatedIds": [
        11,
        54,
        55,
        56
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 54,
      "type": "quran",
      "reference": "At-Taubah 9:60",
      "arabic": "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ",
      "translation": "Zekat sadece fakir ve muhtaçlara verilir.",
      "topics": [
        "poverty",
        "zakat"
      ],
      "context": "Bu ayet, sadaka ve zekatın özellikle yoksulluğu hafifletmek ve zayıf durumdakileri desteklemek için tasarlandığını ortaya koymaktadır.",
      "relatedIds": [
        12,
        53,
        55
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 55,
      "type": "quran",
      "reference": "Al-Ma'idah 5:95",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن تَتَّقُوا اللَّهَ يَجْعَل لَّكُمْ فُرْقَانًا وَيُكَفِّرْ عَنكُمْ سَيِّئَاتِكُمْ",
      "translation": "Ey iman edenler, eğer Allah'tan korkarsanız, Allah size farklı bir ölçü verecektir.",
      "topics": [
        "poverty",
        "justice"
      ],
      "context": "Bu ayet, dindarlık ve adaleti, sosyal refahla ilgili konularda manevi yükseliş ve ilahi rehberlikle ilişkilendirir.",
      "relatedIds": [
        53,
        54,
        56
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 56,
      "type": "hadith",
      "reference": "Sahih Bukhari 1339",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: لَيْسَ الْمِسْكِينُ الَّذِي تَرُدُّهُ التَّمْرَةُ وَالتَّمْرَتَانِ",
      "translation": "Fakir, bir iki hurmayla geri çevrilen değil, doymayandır.",
      "topics": [
        "poverty",
        "zakat"
      ],
      "context": "Bu hadis, İslami bağlamda yoksulluğu yeniden tanımlıyor ve ihtiyaç sahiplerine yeterli düzeyde yardım sağlama sorumluluğunu vurguluyor.",
      "relatedIds": [
        53,
        54,
        55
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 57,
      "type": "hadith",
      "reference": "Sunan Ibn Majah 1840",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: مَنْ لَمْ يَرْحَمْ النَّاسَ لَمْ يَرْحَمْهُ اللَّهُ",
      "translation": "Peygamber Efendimiz (sav) şöyle buyurmuştur: Kim insanlara merhamet etmezse, Allah da ona merhamet etmez.",
      "topics": [
        "poverty",
        "sadaqah"
      ],
      "context": "Bu hadis-i şerifte Allah'ın rahmetinin gereği olarak fakirlere ve muhtaçlara merhametli olunması gerektiği vurgulanmaktadır.",
      "relatedIds": [
        53,
        56
      ],
      "strength": "sahih",
      "collection": "İbn Mâce"
    },
    {
      "id": 58,
      "type": "hadith",
      "reference": "Sunan At-Tirmidhi 1980",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: كُلُّ النَّاسِ يُصْبِحُ، فَكُلُّ نَفْسٍ تُصَدِّقُ عَلَى نَفْسِهَا",
      "translation": "Peygamber Efendimiz (s.a.v.) şöyle buyurmuştur: Her sabah, her nefis kendine sadaka vermelidir.",
      "topics": [
        "poverty",
        "sadaqah"
      ],
      "context": "Bu hadis, hayırseverliğin mümin için temel günlük uygulama olduğunu vurgulamak için canlı bir dil kullanıyor.",
      "relatedIds": [
        56,
        57
      ],
      "strength": "hasan",
      "collection": "Tirmizi"
    },
    {
      "id": 59,
      "type": "quran",
      "reference": "Al-'Araf 7:31",
      "arabic": "كُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ",
      "translation": "Yiyin, için ama israf etmeyin. Şüphesiz Allah israf edenleri sevmez.",
      "topics": [
        "moderation",
        "wealth"
      ],
      "context": "Bu ayet, İslam'ın ölçülülük ilkesini ortaya koyar ve israfı yasaklar.",
      "relatedIds": [
        38,
        60,
        61,
        62
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 60,
      "type": "quran",
      "reference": "Al-Furqan 25:67",
      "arabic": "وَالَّذِينَ إِذَا أَنفَقُوا لَمْ يُسْرِفُوا وَلَمْ يَقْتُرُوا وَكَانَ بَيْنَ ذَٰلِكَ قَوَامًا",
      "translation": "Onlar, harcadıklarında aşırıya kaçmazlar, cimrilik etmezler, orta yol tutarlar.",
      "topics": [
        "moderation",
        "wealth"
      ],
      "context": "Bu ayette aşırı israftan ve aşırı cimrilikten uzak durarak dengeli harcama yaklaşımı övülmektedir.",
      "relatedIds": [
        59,
        61,
        62
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 61,
      "type": "quran",
      "reference": "Al-Isra 17:29",
      "arabic": "وَلَا تَجْعَلْ يَدَكَ مَغْلُولَةً إِلَىٰ عُنُقِكَ وَلَا تَبْسُطْهَا كُلَّ الْبَسْطِ فَتَقْعُدَ مَلُومًا مَّحْسُورًا",
      "translation": "Elinizi boynunuza bağlı tutmayın ve tamamen açmayın, yoksa kınanır ve pişman olursunuz.",
      "topics": [
        "moderation",
        "wealth"
      ],
      "context": "Bu ayet, harcamalarda dengeyi öğretmek için canlı tasvirler kullanıyor ve hem cimriliği hem de aşırı cömertliği kınamaktadır.",
      "relatedIds": [
        59,
        60,
        38,
        62
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 62,
      "type": "hadith",
      "reference": "Sahih Bukhari 5290",
      "arabic": "عَنْ عَائِشَةَ رضى الله عنها قَالَتْ: دَخَلَ عَلَيَّ النَّبِيُّ صلى الله عليه وسلم وَحَوْلِي قُتُرٌ فَقَالَ: يَا عَائِشَةُ إِيَّاكِ وَالسَّرَفَ",
      "translation": "Hz. Peygamber (s.a.v.), Aişe'nin çevresinde lüksün izlerini gördü ve onu şöyle uyardı: 'Aişe, israftan sakın.'",
      "topics": [
        "moderation",
        "wealth"
      ],
      "context": "Bu hadis, Hz. Peygamber'in israftan kaçınma ve sadeliği koruma konusundaki kişisel vurgusunu göstermektedir.",
      "relatedIds": [
        59,
        60,
        61
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 63,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 4382",
      "arabic": "عَنْ أَنَسٍ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: مَن يَتَمَسَّكْ بِسُنَّتِي عِند فَسَادِ أُمَّتِي يَكُونُ لَهُ أَجْرُ مِائَة شَهِيدٍ",
      "translation": "Peygamber Efendimiz (s.a.v.) şöyle tavsiye etmiştir: Kim ölçülü ve sade davranırsa, büyük bir mükâfat alacaktır.",
      "topics": [
        "moderation",
        "wealth"
      ],
      "context": "Bu hadis, ölçülü yaşama bağlılığı büyük bir manevi mükâfatla ilişkilendirmektedir.",
      "relatedIds": [
        59,
        60
      ],
      "strength": "hasan",
      "collection": "Ebu Davud"
    },
    {
      "id": 64,
      "type": "quran",
      "reference": "At-Taubah 9:34",
      "arabic": "وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلَا يُنفِقُونَهَا فِي سَبِيلِ اللَّهِ",
      "translation": "Onlar, altın ve gümüşü biriktirip Allah yolunda harcamayanlardır.",
      "topics": [
        "hoarding",
        "wealth"
      ],
      "context": "Bu ayet, kıymetli madenlerin faydalı amaçlarla harcanmadan istiflenmesini kınamaktadır.",
      "relatedIds": [
        65,
        40,
        66
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 65,
      "type": "quran",
      "reference": "At-Taubah 9:35",
      "arabic": "يَوْمَ يُحْمَىٰ عَلَيْهَا فِي نَارِ جَهَنَّمَ فَتُكْوَىٰ بِهَا جِبَاهُهُمْ وَجُنُوبُهُمْ وَظُهُورُهُمْ",
      "translation": "Cehennem ateşinde kızdırılacakları ve onunla damgalanacakları gün.",
      "topics": [
        "hoarding",
        "wealth"
      ],
      "context": "Bu ayette, mal biriktirenlere verilecek ağır ceza anlatılmakta ve bu günahın ağırlığına vurgu yapılmaktadır.",
      "relatedIds": [
        64,
        66
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 66,
      "type": "hadith",
      "reference": "Sahih Muslim 1501",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: مَنْ احْتَكَرَ طَعَامًا أَرْبَعِينَ لَيْلَةً فَقَدْ بَرِئَ مِنَ اللَّهِ وَبَرِئَ اللَّهُ مِنْهُ",
      "translation": "Peygamber (sav) şöyle buyurmuştur: Kim kırk gün yiyecek biriktirirse Allah'tan uzaklaşmış olur, Allah da ondan uzaklaşmıştır.",
      "topics": [
        "hoarding",
        "justice",
        "poverty"
      ],
      "context": "Bu hadis, temel ihtiyaç maddelerinin istiflenmesini yasaklamakta ve başkalarını temel ihtiyaçlardan mahrum bırakmanın günahını vurgulamaktadır.",
      "relatedIds": [
        64,
        65,
        67
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 67,
      "type": "hadith",
      "reference": "Sunan Ibn Majah 2150",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ: لَا يَحْتَكِرُ إِلَّا خَاطِئٌ",
      "translation": "Peygamber (sav) şöyle buyurmuştur: Günahkardan başkası yiyecek istiflemez.",
      "topics": [
        "hoarding",
        "justice"
      ],
      "context": "Bu hadis-i şerifte istifçilik açıkça günahkâr bir davranış olarak nitelendirilmekte ve bu davranışta bulunanları kınanmaktadır.",
      "relatedIds": [
        66,
        64
      ],
      "strength": "hasan",
      "collection": "İbn Mâce"
    },
    {
      "id": 68,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 3400",
      "arabic": "عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ: مَنْ احْتَكَرَ فَهُوَ خَاطِئٌ",
      "translation": "İstifçilik yapan kişi günah işlemiş olur.",
      "topics": [
        "hoarding",
        "trade"
      ],
      "context": "Bu hadis, piyasa istikrarına ve topluma zarar veren tekelci istifçilik uygulamalarının yasaklanmasını güçlendirmektedir.",
      "relatedIds": [
        66,
        67
      ],
      "strength": "hasan",
      "collection": "Ebu Davud"
    },
    {
      "id": 69,
      "type": "quran",
      "reference": "Hud 11:6",
      "arabic": "وَمَا مِن دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَىٰ اللَّهِ رِزْقُهَا",
      "translation": "Yeryüzünde rızkı Allah'a ait olmayan hiçbir mahlûk yoktur.",
      "topics": [
        "sustenance"
      ],
      "context": "Bu ayet, İslam ekonomi düşüncesinin temeli olarak Allah'ın hükmüne olan güveni tesis etmektedir.",
      "relatedIds": [
        70,
        71,
        72
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 70,
      "type": "quran",
      "reference": "Al-Ankabut 29:60",
      "arabic": "وَكَأَيِّن مِن دَابَّةٍ لَّا تَحْمِلُ رِزْقَهَا اللَّهُ يَرْزُقُهَا وَإِيَّاكُمْ",
      "translation": "Ve nice yaratıklar rızklarını taşımazlar. Hem onların hem de sizin rızkınızı Allah sağlar.",
      "topics": [
        "sustenance",
        "trade"
      ],
      "context": "Bu ayet, rızık verenin Allah olduğunu pekiştirmekte ve Allah'ın rızkına güvenmeyi teşvik etmektedir.",
      "relatedIds": [
        69,
        71,
        26
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 71,
      "type": "quran",
      "reference": "Al-Mulk 67:15",
      "arabic": "هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِن رِّزْقِهِ",
      "translation": "O, yeryüzünü sizin hizmetinize verendir; onun için onun yamaçlarında yürüyün ve O'nun rızkından yiyin.",
      "topics": [
        "sustenance",
        "trade"
      ],
      "context": "Bu ayet, tüm rızkın Allah'tan geldiğini kabul ederek, dünyayla aktif etkileşimi teşvik etmektedir.",
      "relatedIds": [
        69,
        70,
        26
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 72,
      "type": "quran",
      "reference": "Ad-Dhuha 93:10",
      "arabic": "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ",
      "translation": "O halde yetime zulmetmeyin ve soranı da geri çevirmeyin.",
      "topics": [
        "sustenance",
        "poverty"
      ],
      "context": "Bu ayet, geçim arayışında olan savunmasız topluluklara nazik muamele ve destek çağrısında bulunmaktadır.",
      "relatedIds": [
        69,
        56
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 73,
      "type": "hadith",
      "reference": "Sahih Bukhari 2070",
      "arabic": "عَنْ الْمِقْدَامِ بْنِ مَعْدِيكَرِبَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: مَا أَكَلَ أَحَدٌ طَعَامًا قَطُّ خَيْرًا مِنْ أَنْ يَأْكُلَ مِنْ عَمَلِ يَدِهِ",
      "translation": "Peygamber (s.a.v.) şöyle buyurmuştur: Hiç kimse kendi elleriyle kazandığından daha hayırlı bir yemek yememiştir.",
      "topics": [
        "sustenance",
        "trade"
      ],
      "context": "Bu hadis, dürüst emek ve kol emeğiyle kazanmanın şeref ve faziletini vurgulamaktadır.",
      "relatedIds": [
        70,
        71,
        29
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 74,
      "type": "hadith",
      "reference": "Sunan An-Nasai 3532",
      "arabic": "عَنْ رَافِعِ بْنِ خَدِيجٍ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: مَنْ غَرَسَ شَجَرَةً فَصَبَرَ عَلَيْهَا حَتَّىٰ تُثْمِرَ كَانَ لَهُ فِيهَا أَجْرٌ",
      "translation": "Peygamber (s.a.v.) şöyle buyurmuştur: Kim bir ağaç diker ve meyve verene kadar ona sabırla bakarsa ona bir sevap vardır.",
      "topics": [
        "sustenance",
        "sadaqah"
      ],
      "context": "Bu hadis, geçim ve ödüle giden yol olarak üretken emeği ve çevre yönetimini teşvik etmektedir.",
      "relatedIds": [
        71,
        73
      ],
      "strength": "hasan",
      "collection": "Nesai"
    },
    {
      "id": 75,
      "type": "hadith",
      "reference": "Sahih Muslim 1218",
      "arabic": "عَنْ أَبِي هُرَيْرَةَ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: لَأَنْ يَأْخُذَ أَحَدُكُمْ حَبْلَهُ فَيَحْتَطِبَ خَيْرٌ لَهُ مِنْ أَنْ يَسْأَلَ النَّاسَ",
      "translation": "Peygamber (sav) şöyle buyurmuştur: Birinizin çıkıp odun toplaması, insanlardan yardım istemekten daha hayırlıdır.",
      "topics": [
        "sustenance",
        "trade"
      ],
      "context": "Bu hadis, bağımlılık ve dilencilikten ziyade, özgüvene ve dürüst çalışmayla kazanmaya değer vermektedir.",
      "relatedIds": [
        73,
        74
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 76,
      "type": "hadith",
      "reference": "Sunan At-Tirmidhi 1988",
      "arabic": "عَنْ عَبْدِ اللَّهِ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: إِنَّ اللَّهَ يُحِبُّ الْعَامِلَ الْمُحْتَرِفَ",
      "translation": "Peygamber Efendimiz (sav) şöyle buyurmuştur: Şüphesiz Allah, işinde usta olan işçiyi sever.",
      "topics": [
        "sustenance"
      ],
      "context": "Bu hadiste hünerli çalışma ve mesleki ustalık Allah'ın değer verdiği erdemler olarak övülmektedir.",
      "relatedIds": [
        73,
        74,
        75
      ],
      "strength": "hasan",
      "collection": "Tirmizi"
    },
    {
      "id": 77,
      "type": "hadith",
      "reference": "Sunan Ibn Majah 2138",
      "arabic": "عَنْ أَبِي ذَرٍّ قَالَ: قَالَ لِي النَّبِيُّ صلى الله عليه وسلم: يَا أَبَا ذَرٍّ، إِنَّ خَيْرَ الدِّينِ الدِّينُ وَالْعِلْمُ وَالْعَمَلُ",
      "translation": "Peygamber (sav) Ebu Zer'e şöyle buyurdu: 'Ey Ebu Zer, imanın en hayırlısı iman, ilim ve birlikte amel etmektir.'",
      "topics": [
        "sustenance",
        "wealth"
      ],
      "context": "Bu hadis, salih ameli, iman ve ilim ile, güzel bir hayatın temel unsurları olarak bağlamaktadır.",
      "relatedIds": [
        73,
        76
      ],
      "strength": "hasan",
      "collection": "İbn Mâce"
    },
    {
      "id": 78,
      "type": "hadith",
      "reference": "Sahih Muslim 1598",
      "arabic": "عَنْ أَنَسٍ بْنِ مَالِكٍ قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: الْوَالِدُ أَفْضَلُ الصَّدَقَةِ",
      "translation": "Peygamber Efendimiz (sav) şöyle buyurmuştur: Ailenin geçimini sağlamak en üstün sadakadır.",
      "topics": [
        "sadaqah",
        "sustenance",
        "poverty"
      ],
      "context": "Bu hadis, aile desteğinin bir çeşit hayır işi ve temel bir sorumluluk olduğunu vurgulamaktadır.",
      "relatedIds": [
        57,
        72,
        73
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 79,
      "type": "hadith",
      "reference": "Sunan Ibn Majah 2141",
      "arabic": "عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو قَالَ: قَالَ النَّبِيُّ صلى الله عليه وسلم: لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيُوَقِّرْ كَبِيرَنَا",
      "translation": "Peygamber Efendimiz (sav) şöyle buyurmuştur: Küçüklere merhamet, yaşlılara saygı göstermeyen bizden değildir.",
      "topics": [
        "justice",
        "poverty"
      ],
      "context": "Bu hadis, savunmasız toplumlara yönelik şefkatin temel bir İslami değer olduğunu ortaya koymaktadır.",
      "relatedIds": [
        55,
        57
      ],
      "strength": "hasan",
      "collection": "İbn Mâce"
    },
    {
      "id": 80,
      "type": "quran",
      "reference": "Al-Hadid 57:11",
      "arabic": "مَن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ",
      "translation": "Kim Allah'a, kendisine kat kat kat kat vereceği güzel bir borcu vermek ister?",
      "topics": [
        "zakat",
        "sadaqah",
        "wealth"
      ],
      "context": "Bu ayette Allah'a borç verme metaforu kullanılarak hayır harcamalarının sonsuzluğa yatırım olarak yapılması teşvik edilmektedir.",
      "relatedIds": [
        10,
        18,
        24
      ],
      "strength": null,
      "collection": null
    },
    {
      "id": 81,
      "type": "quran",
      "reference": "Al-Baqarah 2:188",
      "arabic": "وَلَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ وَتُدْلُوا بِهَا إِلَى الْحُكَّامِ",
      "translation": "Ve birbirinizin mallarını haksız yere yemeyin ve insanların mallarından bir kısmını günahla yemenizde size yardımcı olmaları için onu yöneticilere rüşvet olarak göndermeyin.",
      "topics": [
        "justice",
        "ethics"
      ],
      "context": "Zenginliğin rüşvet, yolsuzluk ve haksız yollardan tüketilmesinin yasaklanması.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 82,
      "type": "quran",
      "reference": "Al-Baqarah 2:215",
      "arabic": "يَسْأَلُونَكَ مَاذَا يُنفِقُونَ",
      "translation": "Size ne kadar harcamaları gerektiğini soruyorlar. De ki: Hayır olarak yapacağınız her harcama, ana-baba, yakınlar, yetimler, yoksullar ve yolda kalmışlar içindir.",
      "topics": [
        "sadaqah",
        "poverty"
      ],
      "context": "Hayır amaçlı harcamaların öncelikli alıcılarını belirtir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 83,
      "type": "quran",
      "reference": "Al-Baqarah 2:219",
      "arabic": "وَيَسْأَلُونَكَ مَاذَا يُنفِقُونَ قُلِ الْعَفْوَ",
      "translation": "Ve sana ne harcamaları gerektiğini soruyorlar. De ki: İhtiyaçların ötesindeki fazlalık.",
      "topics": [
        "sadaqah",
        "moderation"
      ],
      "context": "Hayırseverliğin ihtiyaçlardan değil zenginlikten gelmesi gerektiği ilkesi.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 84,
      "type": "quran",
      "reference": "Al-Baqarah 2:220",
      "arabic": "وَيَسْأَلُونَكَ عَنِ الْيَتَامَىٰ",
      "translation": "Ve sana yetimlerin durumunu soruyorlar. De ki: İyileşme onlar için en hayırlısıdır. Ve eğer kendi işinizi onlarınkine karıştırırsanız, onlar sizin kardeşlerinizdir.",
      "topics": [
        "poverty",
        "inheritance"
      ],
      "context": "Yetimlerin servetini dürüstlükle yönetme konusunda rehberlik.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 85,
      "type": "quran",
      "reference": "Al-Baqarah 2:245",
      "arabic": "مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً",
      "translation": "Allah'a, kendisine kat kat kat kat artıracağı güzel bir borç verecek olan kimdir?",
      "topics": [
        "sadaqah",
        "waqf"
      ],
      "context": "Manevi yatırım olarak hayırseverliği teşvik etmek için Allah'a borç verme metaforu.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 86,
      "type": "quran",
      "reference": "Al-Baqarah 2:254",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِمَّا رَزَقْنَاكُم",
      "translation": "Ey iman edenler, alışverişin, dostluğun ve şefaatin olmadığı bir gün gelmeden önce size verdiğimiz rızıklardan infak edin.",
      "topics": [
        "sadaqah",
        "wealth"
      ],
      "context": "Kıyamet gününden önce hayırseverlik yapmanın aciliyeti.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 87,
      "type": "quran",
      "reference": "Al-Baqarah 2:261",
      "arabic": "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ",
      "translation": "Mallarını Allah yolunda harcayanların örneği, yedi başak bitiren bir tohum gibidir; her başakta yüz tane vardır.",
      "topics": [
        "sadaqah",
        "waqf"
      ],
      "context": "Çarpma ilkesi: Hayırseverlik 700 kat veya daha fazla getiri sağlar.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 88,
      "type": "quran",
      "reference": "Al-Baqarah 2:262",
      "arabic": "الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ ثُمَّ لَا يُتْبِعُونَ مَا أَنفَقُوا مَنًّا وَلَا أَذًى",
      "translation": "Mallarını Allah yolunda harcayan, sonra da harcadıklarının peşinden cömertlik ve haksızlık yapmayanların mükâfatları vardır.",
      "topics": [
        "sadaqah",
        "ethics"
      ],
      "context": "Sadaka, küçümsemeden ve karşılık beklemeden verilmelidir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 89,
      "type": "quran",
      "reference": "Al-Baqarah 2:267",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ",
      "translation": "Ey iman edenler, kazandıklarınızın temiz olanlarından ve sizin için yerden çıkardığımız şeylerden infak edin.",
      "topics": [
        "sadaqah",
        "trade"
      ],
      "context": "Sadaka, helal kazançtan ve kaliteli maldan gelmelidir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 90,
      "type": "quran",
      "reference": "Al-Baqarah 2:271",
      "arabic": "إِن تُبْدُوا الصَّدَقَاتِ فَنِعِمَّا هِيَ",
      "translation": "Hayır amaçlı harcamalarınızı açıklarsanız, bunlar iyidir; Ama onları gizleyip fakirlere verirseniz bu sizin için daha hayırlıdır.",
      "topics": [
        "sadaqah"
      ],
      "context": "Samimiyet açısından özel hayırseverlik, kamusal hayırseverliğe tercih edilir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 91,
      "type": "quran",
      "reference": "Al-Baqarah 2:274",
      "arabic": "الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً",
      "translation": "Mallarını gece ve gündüz, gizli ve açık harcayanların Rableri katında mükâfatları vardır.",
      "topics": [
        "sadaqah"
      ],
      "context": "Tutarlı hayırseverlik her zaman övülür.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 92,
      "type": "quran",
      "reference": "Al-Baqarah 2:280",
      "arabic": "وَإِن كَانَ ذُو عُسْرَةٍ فَنَظِرَةٌ إِلَىٰ مَيْسَرَةٍ",
      "translation": "Ve eğer biri zorluk içindeyse, o zaman rahatlığa kadar ertelensin. Ancak hakkınızdan sadaka olarak verirseniz bu sizin için daha hayırlıdır.",
      "topics": [
        "debt",
        "justice"
      ],
      "context": "Alacaklılar zor durumdaki borçlulara mühlet vermelidir; borcu affetmek daha da iyidir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 93,
      "type": "quran",
      "reference": "Al-Baqarah 2:282",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
      "translation": "Ey iman edenler, belirli bir süre için borçlandığınız zaman onu yazın. Ve aranızda bir katip adaletle yazsın.",
      "topics": [
        "contracts",
        "debt"
      ],
      "context": "Kur'an'ın en uzun ayeti mali işlemlerin belgelenmesi zorunluluğunu ortaya koymaktadır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 94,
      "type": "quran",
      "reference": "Al-Baqarah 2:283",
      "arabic": "وَإِن كُنتُمْ عَلَىٰ سَفَرٍ وَلَمْ تَجِدُوا كَاتِبًا فَرِهَانٌ مَّقْبُوضَةٌ",
      "translation": "Yolculukta olup da katip bulamazsanız, o zaman bir depozito alınması gerekir.",
      "topics": [
        "contracts",
        "debt"
      ],
      "context": "Yazılı belgelemenin mümkün olmadığı durumlarda teminatın kabul edilebilir olmasını sağlar.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 95,
      "type": "quran",
      "reference": "Al-Imran 3:92",
      "arabic": "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ",
      "translation": "Sevdiğiniz şeylerden infak etmedikçe hayırlara asla ulaşamazsınız.",
      "topics": [
        "sadaqah",
        "waqf"
      ],
      "context": "Gerçek doğruluk, vakfın temel ayeti olan sevgili mallardan fedakarlık etmeyi gerektirir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 96,
      "type": "quran",
      "reference": "Al-Imran 3:130",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا الرِّبَا أَضْعَافًا مُّضَاعَفَةً",
      "translation": "Ey iman edenler, kat kat artan faiz yemeyin ve Allah'tan korkun ki kurtuluşa eresiniz.",
      "topics": [
        "riba"
      ],
      "context": "Kur'an'da bileşik faizin açıkça yasaklanması.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 97,
      "type": "quran",
      "reference": "Al-Imran 3:134",
      "arabic": "الَّذِينَ يُنفِقُونَ فِي السَّرَّاءِ وَالضَّرَّاءِ",
      "translation": "Onlar, bollukta da, darlıkta da infak ederler, öfkelerini yutarlar ve insanları affederler.",
      "topics": [
        "sadaqah",
        "moderation"
      ],
      "context": "Hayırseverlik, ekonomik koşullar ne olursa olsun tutarlı olmalıdır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 98,
      "type": "quran",
      "reference": "An-Nisa 4:2",
      "arabic": "وَآتُوا الْيَتَامَىٰ أَمْوَالَهُمْ",
      "translation": "Yetimlerin mallarını verin ve iyiyi kusurluyla değiştirmeyin.",
      "topics": [
        "poverty",
        "justice",
        "inheritance"
      ],
      "context": "Yetimlerin servetinin sömürüden korunması.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 99,
      "type": "quran",
      "reference": "An-Nisa 4:5",
      "arabic": "وَلَا تُؤْتُوا السُّفَهَاءَ أَمْوَالَكُمُ",
      "translation": "Allah'ın sizin için geçim kaynağı kıldığı mallarınızı akılsızlara vermeyin.",
      "topics": [
        "wealth",
        "governance"
      ],
      "context": "Bunu yönetemeyenlerin mülkiyeti üzerinde velayet.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 100,
      "type": "quran",
      "reference": "An-Nisa 4:6",
      "arabic": "وَابْتَلُوا الْيَتَامَىٰ حَتَّىٰ إِذَا بَلَغُوا النِّكَاحَ",
      "translation": "Yetimleri evlenme çağına gelinceye kadar imtihan edin. Eğer onlarda sağlam bir hüküm görürseniz, mallarını onlara bırakın.",
      "topics": [
        "inheritance",
        "justice"
      ],
      "context": "Yetimlere mülk devredilmeden önce yeterlilik testinin oluşturulması.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 101,
      "type": "quran",
      "reference": "An-Nisa 4:7",
      "arabic": "لِّلرِّجَالِ نَصِيبٌ مِّمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ",
      "translation": "Ana-babanın ve yakın akrabaların bıraktıklarından erkeklere, ana-babanın ve yakın akrabaların bıraktıklarından da kadınlara bir pay vardır.",
      "topics": [
        "inheritance"
      ],
      "context": "Hem erkeklerin hem de kadınların miras haklarına sahip olduğunu tespit eder.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 102,
      "type": "quran",
      "reference": "An-Nisa 4:10",
      "arabic": "إِنَّ الَّذِينَ يَأْكُلُونَ أَمْوَالَ الْيَتَامَىٰ ظُلْمًا إِنَّمَا يَأْكُلُونَ فِي بُطُونِهِمْ نَارًا",
      "translation": "Yetimlerin mallarını haksız yere yiyenler, ancak karınlarını ateşle doldurmuş olurlar.",
      "topics": [
        "inheritance",
        "justice"
      ],
      "context": "Yetimlerin mallarının zimmete geçirilmesine karşı sert uyarı.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 103,
      "type": "quran",
      "reference": "An-Nisa 4:11",
      "arabic": "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ",
      "translation": "Allah size çocuklarınız hakkında şunu emrediyor: Erkeğe iki kadının payı kadar.",
      "topics": [
        "inheritance"
      ],
      "context": "Çocuklar ve ebeveynler için paylaşımlar kuran temel miras ayeti.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 104,
      "type": "quran",
      "reference": "An-Nisa 4:12",
      "arabic": "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ",
      "translation": "Çocukları yoksa eşlerinizin bıraktıklarının yarısı size aittir.",
      "topics": [
        "inheritance"
      ],
      "context": "Eşin miras payları.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 105,
      "type": "quran",
      "reference": "An-Nisa 4:29",
      "arabic": "لَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ إِلَّا أَن تَكُونَ تِجَارَةً عَن تَرَاضٍ",
      "translation": "Birbirinizin mallarını haksız yere yemeyin, ancak karşılıklı rıza ile meşru ticaret yoluyla tüketin.",
      "topics": [
        "trade",
        "justice",
        "contracts"
      ],
      "context": "Temel ayet: Ticaret karşılıklı rızayı gerektirir ve yasal olmalıdır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 106,
      "type": "quran",
      "reference": "An-Nisa 4:32",
      "arabic": "وَلَا تَتَمَنَّوْا مَا فَضَّلَ اللَّهُ بِهِ بَعْضَكُمْ عَلَىٰ بَعْضٍ",
      "translation": "Erkeklere kazandıklarından bir pay, kadınlara da kazandıklarından bir pay vardır.",
      "topics": [
        "wealth",
        "sustenance"
      ],
      "context": "Kazandıkları konusunda kadın ve erkekler için eşit ekonomik haklar.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 107,
      "type": "quran",
      "reference": "An-Nisa 4:36",
      "arabic": "وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ",
      "translation": "Ana-babaya, akrabaya, yetimlere, yoksullara, yakın komşuya, uzak komşuya, yanınızdaki arkadaşa, yolcuya iyilik yapın.",
      "topics": [
        "poverty",
        "sadaqah"
      ],
      "context": "Çeşitli gruplara yönelik kapsamlı sosyal yardım yükümlülükleri.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 108,
      "type": "quran",
      "reference": "An-Nisa 4:37",
      "arabic": "الَّذِينَ يَبْخَلُونَ وَيَأْمُرُونَ النَّاسَ بِالْبُخْلِ",
      "translation": "Onlar cimrilik ederler, insanlara cimriliği emrederler ve Allah'ın kendilerine lütfundan verdiğini gizlerler.",
      "topics": [
        "hoarding",
        "wealth"
      ],
      "context": "Cimriliği kınamak ve Allah'ın nimetini gizlemek.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 109,
      "type": "quran",
      "reference": "An-Nisa 4:58",
      "arabic": "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
      "translation": "Şüphesiz Allah size, emanetleri ehline vermenizi ve insanlar arasında hükmettiğinizde adaletle hükmetmenizi emrediyor.",
      "topics": [
        "contracts",
        "justice",
        "ethics"
      ],
      "context": "Emaneti yerine getirmek ve adaletle hükmetmekle ilgili temel ayet.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 110,
      "type": "quran",
      "reference": "An-Nisa 4:135",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ",
      "translation": "Ey iman edenler, kendiniz, anne-babanız ve yakınlarınız aleyhine bile olsa, Allah için şahitlik yaparak adaleti ayakta tutun.",
      "topics": [
        "justice",
        "ethics"
      ],
      "context": "Adalet, kişisel veya aile çıkarlarıyla çatıştığında bile üstün gelmelidir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 111,
      "type": "quran",
      "reference": "An-Nisa 4:161",
      "arabic": "وَأَخْذِهِمُ الرِّبَا وَقَدْ نُهُوا عَنْهُ",
      "translation": "Ve kendilerine yasaklanmış olan faiz almaları ve insanların mallarını haksız yere yemeleri nedeniyle.",
      "topics": [
        "riba"
      ],
      "context": "Önceki topluluklar tarafından ihlal edilen riba yasağına tarihsel atıf.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 112,
      "type": "quran",
      "reference": "An-Nisa 4:176",
      "arabic": "يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ",
      "translation": "Sizden hukuki bir karar talep ediyorlar. De ki: Allah size, ne çocuğu ne de oğlu olan ve mirasçısı olmayan kimse hakkında hüküm veriyor.",
      "topics": [
        "inheritance"
      ],
      "context": "Kalalah, doğrudan mirasçısı olmayanlar için miras kurallarıdır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 113,
      "type": "quran",
      "reference": "Al-Ma'idah 5:1",
      "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ",
      "translation": "Ey iman edenler, bütün sözleşmeleri yerine getirin.",
      "topics": [
        "contracts"
      ],
      "context": "Tüm sözleşme yükümlülüklerinin yerine getirilmesine yönelik evrensel emir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 114,
      "type": "quran",
      "reference": "Al-Ma'idah 5:2",
      "arabic": "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
      "translation": "İyilikte ve takvada yardımlaşın, fakat günah ve saldırıda işbirliği yapmayın.",
      "topics": [
        "ethics",
        "justice"
      ],
      "context": "Ekonomik işbirliği yalnızca doğru faaliyetlerde olmalıdır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 115,
      "type": "quran",
      "reference": "Al-Ma'idah 5:8",
      "arabic": "وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا",
      "translation": "Ve bir kavme olan kininiz sizi adaletten alıkoymasın. Adil ol; bu, doğruluğa daha yakındır.",
      "topics": [
        "justice",
        "ethics"
      ],
      "context": "Adalet, kişisel duygu ve düşmanlıkların ötesindedir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 116,
      "type": "quran",
      "reference": "Al-An'am 6:141",
      "arabic": "وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ وَلَا تُسْرِفُوا",
      "translation": "Ve hasat gününde hakkını verin. Ve aşırı olmayın. Şüphesiz O, aşırı gidenleri sevmez.",
      "topics": [
        "zakat",
        "moderation"
      ],
      "context": "Hasat zamanında ödenmesi gereken tarımsal zekat; israfın yasaklanması.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 117,
      "type": "quran",
      "reference": "Al-A'raf 7:31",
      "arabic": "كُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا",
      "translation": "Yiyin ve için ama aşırıya kaçmayın. Şüphesiz O, aşırı gidenleri sevmez.",
      "topics": [
        "moderation"
      ],
      "context": "Tüketimde ölçülü olmanın temel ilkesi.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 118,
      "type": "quran",
      "reference": "Al-A'raf 7:85",
      "arabic": "فَأَوْفُوا الْكَيْلَ وَالْمِيزَانَ وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ",
      "translation": "Ölçüyü ve tartıyı tam yapın, insanların hakkını eksik vermeyin ve ıslah edildikten sonra yeryüzünde bozgunculuk yapmayın.",
      "topics": [
        "trade",
        "justice"
      ],
      "context": "Şuayb Peygamber Medyen halkına adil ticareti emrediyor.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 119,
      "type": "quran",
      "reference": "At-Tawbah 9:34",
      "arabic": "وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلَا يُنفِقُونَهَا فِي سَبِيلِ اللَّهِ",
      "translation": "Altın ve gümüşü biriktirip de Allah yolunda harcamayanlara acı bir azabı müjdele.",
      "topics": [
        "hoarding",
        "wealth"
      ],
      "context": "Değerli metallerin hayır amaçlı harcamak yerine istiflenmesinin şiddetle kınanması.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 120,
      "type": "quran",
      "reference": "At-Tawbah 9:35",
      "arabic": "يَوْمَ يُحْمَىٰ عَلَيْهَا فِي نَارِ جَهَنَّمَ فَتُكْوَىٰ بِهَا جِبَاهُهُمْ",
      "translation": "Cehennem ateşinde kızdırılacağı ve onunla yakılacağı gün, onların alınları, yanları ve sırtları olacaktır.",
      "topics": [
        "hoarding"
      ],
      "context": "Zenginliği istifleyenlere verilecek cezanın canlı açıklaması.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 121,
      "type": "quran",
      "reference": "At-Tawbah 9:60",
      "arabic": "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا",
      "translation": "Zekât harcamaları yalnızca fakirler, muhtaçlar, bu yolda çalışanlar, gönülleri buluşturanlar, esirleri azat edenler, Allah yolunda borçlular ve yolda kalmış yolcular içindir.",
      "topics": [
        "zakat",
        "poverty",
        "governance"
      ],
      "context": "Zekât alıcılarının sekiz kategorisi - İslami kamu maliyesinin temel ayeti.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 122,
      "type": "quran",
      "reference": "At-Tawbah 9:103",
      "arabic": "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا",
      "translation": "Onların mallarından, kendilerini arındıracağın ve artıracağın bir sadaka al.",
      "topics": [
        "zakat"
      ],
      "context": "Zekat hem arınma hem de büyüme amacına hizmet eder.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 123,
      "type": "quran",
      "reference": "At-Tawbah 9:71",
      "arabic": "وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ",
      "translation": "Mü'min erkekler ve mü'min kadınlar birbirlerinin velileridirler. İyiliği emrederler, namazı kılarlar ve zekatı verirler.",
      "topics": [
        "zakat"
      ],
      "context": "Zekâtın farzı ve mükafatında cinsiyet eşitliği.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 124,
      "type": "quran",
      "reference": "Hud 11:84-85",
      "arabic": "أَوْفُوا الْمِكْيَالَ وَالْمِيزَانَ وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ",
      "translation": "Ölçüyü ve ağırlığı tam olarak verin. Ve insanların haklarını eksik vermeyin ve yeryüzünde bozgunculuk yaparak bozgunculuk yapmayın.",
      "topics": [
        "trade",
        "justice"
      ],
      "context": "Peygamber Şu'ayb'ın adil ticari uygulamalar için tekrarlanan emri.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 125,
      "type": "quran",
      "reference": "Yusuf 12:47-49",
      "arabic": "تَزْرَعُونَ سَبْعَ سِنِينَ دَأَبًا فَمَا حَصَدتُّمْ فَذَرُوهُ فِي سُنبُلِهِ",
      "translation": "Yedi yıl üst üste ekeceksiniz; Yiyeceğiniz az bir miktar hariç, biçtiklerinizi başaklarında bırakın. Sonra yedi zor yıl gelecek.",
      "topics": [
        "governance",
        "wealth"
      ],
      "context": "Peygamber Yusuf'un kıtlığa yönelik mali planlama stratejisi - kaydedilen en eski ekonomi politikası.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 126,
      "type": "quran",
      "reference": "Yusuf 12:55",
      "arabic": "اجْعَلْنِي عَلَىٰ خَزَائِنِ الْأَرْضِ إِنِّي حَفِيظٌ عَلِيمٌ",
      "translation": "Dedi ki: Beni memleketin ambarlarına görevlendir. Gerçekten ben bilen bir koruyucu olacağım.",
      "topics": [
        "governance",
        "sustenance"
      ],
      "context": "Yusuf, ekonomik otoriteyi, nitelikli kamu yönetimi için model talep ediyor.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 127,
      "type": "quran",
      "reference": "An-Nahl 16:71",
      "arabic": "وَاللَّهُ فَضَّلَ بَعْضَكُمْ عَلَىٰ بَعْضٍ فِي الرِّزْقِ",
      "translation": "Ve Allah, rızık bakımından kiminizi kiminize üstün kıldı.",
      "topics": [
        "wealth",
        "sustenance"
      ],
      "context": "İlahi bilgeliğin bir parçası olarak rızıktaki doğal eşitsizliği kabul eder.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 128,
      "type": "quran",
      "reference": "An-Nahl 16:90",
      "arabic": "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ",
      "translation": "Şüphesiz Allah, adaleti, iyiliği, yakınlara yardım etmeyi emreder, ahlaksızlığı, kötülüğü ve zulmü yasaklar.",
      "topics": [
        "justice",
        "ethics"
      ],
      "context": "Kapsamlı etik çerçeve: adalet, iyilik ve zulmün yasaklanması.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 129,
      "type": "quran",
      "reference": "An-Nahl 16:91",
      "arabic": "وَأَوْفُوا بِعَهْدِ اللَّهِ إِذَا عَاهَدتُّمْ",
      "translation": "Allah'ın ahdini aldığınız zaman yerine getirin ve onların tasdikinden sonra yeminlerinizi bozmayın.",
      "topics": [
        "contracts"
      ],
      "context": "İslam'da ahit ve yeminlerin kutsallığı.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 130,
      "type": "quran",
      "reference": "Al-Isra 17:26-27",
      "arabic": "وَآتِ ذَا الْقُرْبَىٰ حَقَّهُ وَالْمِسْكِينَ وَابْنَ السَّبِيلِ وَلَا تُبَذِّرْ تَبْذِيرًا",
      "translation": "Akrabaya, yoksula ve yolcuya hakkını verin ve israf etmeyin. Muhakkak ki israf edenler, şeytanların kardeşleridir.",
      "topics": [
        "sadaqah",
        "moderation"
      ],
      "context": "Hayırseverlik yükümlülüklerini israf harcamalarının yasaklanmasıyla dengelemek.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 131,
      "type": "quran",
      "reference": "Al-Isra 17:29",
      "arabic": "وَلَا تَجْعَلْ يَدَكَ مَغْلُولَةً إِلَىٰ عُنُقِكَ وَلَا تَبْسُطْهَا كُلَّ الْبَسْطِ",
      "translation": "Elinizi boynunuza zincirleyip, tamamen uzatıp da suçlu ve aciz duruma düşmeyin.",
      "topics": [
        "moderation",
        "wealth"
      ],
      "context": "Dengeli harcama metaforu: ne cimri ne de müsrif.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 132,
      "type": "quran",
      "reference": "Al-Isra 17:34",
      "arabic": "وَأَوْفُوا بِالْعَهْدِ إِنَّ الْعَهْدَ كَانَ مَسْئُولًا",
      "translation": "Ve her antlaşmayı yerine getirin. Gerçekten de, antlaşma her zaman sorgulanmalıdır.",
      "topics": [
        "contracts",
        "ethics"
      ],
      "context": "Her söz ve sözleşme ilahi sorumluluğa tabi olacaktır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 133,
      "type": "quran",
      "reference": "Al-Isra 17:35",
      "arabic": "وَأَوْفُوا الْكَيْلَ إِذَا كِلْتُمْ وَزِنُوا بِالْقِسْطَاسِ الْمُسْتَقِيمِ",
      "translation": "Ölçtüğünüzde ölçüyü tam tutun ve teraziyle tartın. En iyi yol ve sonuç olarak en iyi yol budur.",
      "topics": [
        "trade",
        "justice"
      ],
      "context": "Ticari ölçümlerde dürüstlüğe doğrudan emir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 134,
      "type": "quran",
      "reference": "Al-Kahf 18:46",
      "arabic": "الْمَالُ وَالْبَنُونَ زِينَةُ الْحَيَاةِ الدُّنْيَا",
      "translation": "Mal ve çocuklar dünya hayatının süsünden başka bir şey değildir. Kalıcı iyilikler ise Rabbinin katında sevap bakımından daha hayırlıdır.",
      "topics": [
        "wealth"
      ],
      "context": "Zenginlik geçici bir dekorasyondur; Salih amellerin kalıcı değeri vardır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 135,
      "type": "quran",
      "reference": "Al-Hajj 22:41",
      "arabic": "الَّذِينَ إِن مَّكَّنَّاهُمْ فِي الْأَرْضِ أَقَامُوا الصَّلَاةَ وَآتَوُا الزَّكَاةَ",
      "translation": "Onlar ki, yeryüzünde kendilerine yetki verirsek, namazı kılarlar, zekatı verirler, iyiliği emreder, kötülükten men ederler.",
      "topics": [
        "zakat",
        "governance"
      ],
      "context": "Zekât, İslami yönetimin temel sorumluluğudur.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 136,
      "type": "quran",
      "reference": "An-Nur 24:37",
      "arabic": "رِجَالٌ لَّا تُلْهِيهِمْ تِجَارَةٌ وَلَا بَيْعٌ عَن ذِكْرِ اللَّهِ",
      "translation": "Ne ticaretin ne de alışverişin kendilerini Allah'ı anmaktan, namaz kılmaktan ve zekat vermekten alıkoymadığı erkekler.",
      "topics": [
        "trade",
        "zakat"
      ],
      "context": "Dünyevi ticareti manevi yükümlülüklerle dengelemek.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 137,
      "type": "quran",
      "reference": "Al-Furqan 25:67",
      "arabic": "وَالَّذِينَ إِذَا أَنفَقُوا لَمْ يُسْرِفُوا وَلَمْ يَقْتُرُوا",
      "translation": "Ve onlar, harcadıklarında ne aşırıya kaçarlar ne de tasarruflu davranırlar, ancak bu ikisi arasında ölçülü davranırlar.",
      "topics": [
        "moderation",
        "wealth"
      ],
      "context": "Altın ortalama: dengeli harcama, gerçek inananların bir işaretidir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 138,
      "type": "quran",
      "reference": "Ash-Shu'ara 26:181-183",
      "arabic": "أَوْفُوا الْكَيْلَ وَلَا تَكُونُوا مِنَ الْمُخْسِرِينَ وَزِنُوا بِالْقِسْطَاسِ الْمُسْتَقِيمِ",
      "translation": "Ölçüyü tam verin ve zarara uğrayanlardan olmayın. Ve eşit bir teraziyle tartın. Ve insanları haklarından mahrum etme.",
      "topics": [
        "trade",
        "justice"
      ],
      "context": "Dürüst ölçüme, adil tartıya ve mülkiyet haklarına saygıya üçlü vurgu.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 139,
      "type": "quran",
      "reference": "Al-Qasas 28:26-27",
      "arabic": "يَا أَبَتِ اسْتَأْجِرْهُ إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ",
      "translation": "Ey babam, onu işe al. Aslında kiralayabileceğiniz en iyi kişi güçlü ve güvenilir olandır.",
      "topics": [
        "sustenance",
        "contracts"
      ],
      "context": "İki temel işe alma kriteri: yeterlilik ve güvenilirlik.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 140,
      "type": "quran",
      "reference": "Al-Qasas 28:77",
      "arabic": "وَابْتَغِ فِيمَا آتَاكَ اللَّهُ الدَّارَ الْآخِرَةَ وَلَا تَنسَ نَصِيبَكَ مِنَ الدُّنْيَا",
      "translation": "Allah'ın sana verdiği şeylerle ahiret yurdunu ara. ve dünyadan payınızı almayı unutmayın.",
      "topics": [
        "wealth",
        "moderation"
      ],
      "context": "Dünyevi ekonomik faaliyet ile manevi uğraşlar arasındaki denge.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 141,
      "type": "quran",
      "reference": "Ar-Rum 30:39",
      "arabic": "وَمَا آتَيْتُم مِّن رِّبًا لِّيَرْبُوَ فِي أَمْوَالِ النَّاسِ فَلَا يَرْبُو عِندَ اللَّهِ",
      "translation": "Ve insanların mallarında artsın diye faize verdiğiniz şey, Allah katında artmaz. Ama Allah'ın rızasını isteyerek verdiğiniz zekat, işte çarpanlar bunlardır.",
      "topics": [
        "riba",
        "sadaqah"
      ],
      "context": "Riba (Allah katında artış olmaz) ile sadaka (Allah katında katlanarak artar) arasındaki zıtlık.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 142,
      "type": "quran",
      "reference": "Ash-Shura 42:38",
      "arabic": "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
      "translation": "İşleri kendi aralarında istişarede bulunanlar ve kendilerine verdiğimiz rızıklardan infak ederler.",
      "topics": [
        "governance",
        "sadaqah"
      ],
      "context": "İstişare (şura) ve hayır amaçlı harcamalar yoluyla ekonomik kararlar.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 143,
      "type": "quran",
      "reference": "Al-Hadid 57:7",
      "arabic": "آمِنُوا بِاللَّهِ وَرَسُولِهِ وَأَنفِقُوا مِمَّا جَعَلَكُم مُّسْتَخْلَفِينَ فِيهِ",
      "translation": "Allah'a ve Resulüne inanın ve sizi halife kıldığı şeylerden infak edin.",
      "topics": [
        "sadaqah",
        "wealth"
      ],
      "context": "Zenginlik Allah'ın bir emanetidir; insanlar mutlak sahipler değil, kahyalardır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 144,
      "type": "quran",
      "reference": "Al-Hadid 57:25",
      "arabic": "وَأَنزَلْنَا مَعَهُمُ الْكِتَابَ وَالْمِيزَانَ لِيَقُومَ النَّاسُ بِالْقِسْطِ",
      "translation": "Biz Kitab'ı ve mizanı, insanların işlerini adaletle yapabilmeleri için indirdik.",
      "topics": [
        "justice",
        "trade"
      ],
      "context": "Adil ölçüm sistemlerinin ilahi kökeni.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 145,
      "type": "quran",
      "reference": "Al-Hashr 59:7",
      "arabic": "كَيْ لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنكُمْ",
      "translation": "Öyle ki, zenginlik sadece aranızdaki zenginler arasında dolaşmıyor.",
      "topics": [
        "governance",
        "hoarding",
        "justice"
      ],
      "context": "Temel yeniden dağıtım ilkesi: Zenginlik seçkinler arasında yoğunlaşmamalıdır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 146,
      "type": "quran",
      "reference": "Al-Hashr 59:9",
      "arabic": "وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ",
      "translation": "Ve onlar, mahrumiyet içinde olmalarına rağmen kendilerine tercih ederler.",
      "topics": [
        "sadaqah",
        "poverty"
      ],
      "context": "Cömertliğin en üst seviyesi: İhtiyaç halinde bile başkasını kendine tercih etmek.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 147,
      "type": "quran",
      "reference": "Al-Jumu'ah 62:10",
      "arabic": "فَإِذَا قُضِيَتِ الصَّلَاةُ فَانتَشِرُوا فِي الْأَرْضِ وَابْتَغُوا مِن فَضْلِ اللَّهِ",
      "translation": "Namaz kılınınca artık yeryüzüne dağılın ve Allah'ın lütfundan arayın.",
      "topics": [
        "trade",
        "sustenance"
      ],
      "context": "İbadet sonrasında ekonomik faaliyette bulunmanın teşvik edilmesi.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 148,
      "type": "quran",
      "reference": "At-Taghabun 64:16",
      "arabic": "فَاتَّقُوا اللَّهَ مَا اسْتَطَعْتُمْ وَاسْمَعُوا وَأَطِيعُوا وَأَنفِقُوا خَيْرًا لِّأَنفُسِكُمْ",
      "translation": "O halde gücünüz yettiğince Allah'tan korkun, dinleyin, itaat edin ve infak edin. bu kendiniz için daha iyidir.",
      "topics": [
        "sadaqah",
        "wealth"
      ],
      "context": "Hayır kurumlarına yapılan harcamalar sonuçta kendi yararınadır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 149,
      "type": "quran",
      "reference": "At-Talaq 65:7",
      "arabic": "لِيُنفِقْ ذُو سَعَةٍ مِّن سَعَتِهِ",
      "translation": "Zengin olan, malından infak etsin, rızkı kısıtlı olan da Allah'ın kendisine verdiğinden infak etsin.",
      "topics": [
        "wealth",
        "sustenance"
      ],
      "context": "Harcama yükümlülüğü gelirle orantılıdır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 150,
      "type": "quran",
      "reference": "Al-Mutaffifin 83:1-3",
      "arabic": "وَيْلٌ لِّلْمُطَفِّفِينَ الَّذِينَ إِذَا اكْتَالُوا عَلَى النَّاسِ يَسْتَوْفُونَ",
      "translation": "Ölçü ve tartıyı eksik verenlerin vay haline. Onlar insanlardan bir ölçü aldıklarında tam olarak alırlar. Ama eğer verirlerse zarara sebep olurlar.",
      "topics": [
        "trade",
        "justice",
        "ethics"
      ],
      "context": "Ölçmede ticari sahtekarlığı kınayan sure açılışının tamamı.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 151,
      "type": "quran",
      "reference": "Al-Fajr 89:17-20",
      "arabic": "كَلَّا بَل لَّا تُكْرِمُونَ الْيَتِيمَ",
      "translation": "HAYIR! Ama siz yetimi onurlandırmıyorsunuz. Ve fakirleri doyurmayı teşvik etmiyorsunuz. Ve mirası tüketiyorsunuz, onu tamamen yiyip bitiriyorsunuz. Ve sen zenginliği büyük bir sevgiyle seversin.",
      "topics": [
        "poverty",
        "justice",
        "inheritance"
      ],
      "context": "Dört sosyal başarısızlık: Yetimleri ihmal etmek, açlığı görmezden gelmek, mirasa el koymak, zenginliğe takıntılı olmak.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 152,
      "type": "quran",
      "reference": "Al-Balad 90:11-16",
      "arabic": "فَلَا اقْتَحَمَ الْعَقَبَةَ",
      "translation": "Bir kölenin azat edilmesidir. Veya şiddetli açlık gününde yakın akrabalardan bir yetimi veya sıkıntı içindeki bir yoksulu doyurmak.",
      "topics": [
        "poverty",
        "sadaqah"
      ],
      "context": "Doğruluğa giden yol ekonomik eylemleri içerir: köleleri özgürleştirmek ve açları doyurmak.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 153,
      "type": "quran",
      "reference": "Ad-Duha 93:9-11",
      "arabic": "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ",
      "translation": "O halde yetime zulmetmeyin. Dilekçe sahibine gelince, sakın geri çevirme. Rabbinin nimetine gelince onu bildir.",
      "topics": [
        "poverty",
        "justice"
      ],
      "context": "Üç ekonomik görev: yetimleri korumak, dilekçe sahiplerine yardım etmek, nimetleri kabul etmek.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 154,
      "type": "quran",
      "reference": "Al-Ma'un 107:1-3",
      "arabic": "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ",
      "translation": "Cezayı yalanlayanı gördün mü? Yetimi uzaklaştıran, yoksulun doyurulmasını teşvik etmeyen kişidir.",
      "topics": [
        "poverty",
        "justice",
        "zakat"
      ],
      "context": "Dini inkar etmek, savunmasız nüfusa yönelik ekonomik adaletsizlikle eşdeğerdi.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 155,
      "type": "quran",
      "reference": "Al-Humazah 104:1-4",
      "arabic": "وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ",
      "translation": "Malları toplayan ve sürekli sayan her küçümseyenin ve alaycının vay haline. Zenginliğinin onu ölümsüz kılacağını düşünüyor.",
      "topics": [
        "hoarding",
        "wealth"
      ],
      "context": "Takıntılı servet birikiminin ve kalıcılık yanılsamasının kınanması.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 156,
      "type": "quran",
      "reference": "Al-Anfal 8:41",
      "arabic": "وَاعْلَمُوا أَنَّمَا غَنِمْتُم مِّن شَيْءٍ فَأَنَّ لِلَّهِ خُمُسَهُ",
      "translation": "Ve bilin ki, savaş ganimetlerinden elde ettiğiniz her şeyin beşte biri Allah'a, Peygamber'e, yakınlara, yetimlere, yoksullara ve yolcuya aittir.",
      "topics": [
        "governance"
      ],
      "context": "Savaş ganimetlerinden (ganimah) elde edilen devlet gelirlerinin dağıtım kuralları.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 157,
      "type": "quran",
      "reference": "An-Nisa 4:4",
      "arabic": "وَآتُوا النِّسَاءَ صَدُقَاتِهِنَّ نِحْلَةً",
      "translation": "Ve kadınlara evlenmeleri üzerine gelin hediyelerini karşılıksız bir hediye olarak verin.",
      "topics": [
        "wealth",
        "contracts"
      ],
      "context": "Mahr (çeyiz) kadının münhasır malı olarak.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 158,
      "type": "quran",
      "reference": "Al-Baqarah 2:177",
      "arabic": "وَآتَى الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ",
      "translation": "İyilik, malı sevdiği halde yakınlara, yetimlere, yoksullara, yolcuya, dileyenlere vermek ve köleleri azat etmek içindir.",
      "topics": [
        "sadaqah",
        "poverty",
        "zakat"
      ],
      "context": "Doğruluğun kapsamlı tanımı ekonomik cömertliğe odaklanmıştır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 159,
      "type": "quran",
      "reference": "Al-Muzzammil 73:20",
      "arabic": "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَأَقْرِضُوا اللَّهَ قَرْضًا حَسَنًا",
      "translation": "Namazı kılın, zekatı verin ve Allah'a güzel bir borç verin.",
      "topics": [
        "zakat",
        "sadaqah"
      ],
      "context": "Zekât ve hayır amaçlı borç verme, namazın yanı sıra temel yükümlülüklerdir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 160,
      "type": "quran",
      "reference": "Al-Bayyinah 98:5",
      "arabic": "وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ",
      "translation": "Ve onlara, Allah'a ibadet etmek, namaz kılmak ve zekat vermek dışında emrolunmadılar. Doğru din de budur.",
      "topics": [
        "zakat"
      ],
      "context": "Zekât, üç temel dini ibadetten biridir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 161,
      "type": "quran",
      "reference": "An-Nahl 16:97",
      "arabic": "مَنْ عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَلَنُحْيِيَنَّهُ حَيَاةً طَيِّبَةً",
      "translation": "Erkek olsun, kadın olsun, kim mü'min olarak salih amel işlerse, ona mutlaka güzel bir hayat yaşatacağız.",
      "topics": [
        "sustenance",
        "ethics"
      ],
      "context": "İyi işler, cinsiyete bakılmaksızın iyi bir geçim kaynağına yol açar.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 162,
      "type": "quran",
      "reference": "Al-Mulk 67:15",
      "arabic": "هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا",
      "translation": "O, sizin için yeryüzünü uysallaştırdı; onun için onun yamaçlarında yürüyün ve O'nun rızkından yiyin.",
      "topics": [
        "sustenance",
        "trade"
      ],
      "context": "Dünya, insanın ekonomik faaliyetleri ve tedariki için yaratılmıştır.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 163,
      "type": "quran",
      "reference": "Ash-Shura 42:27",
      "arabic": "وَلَوْ بَسَطَ اللَّهُ الرِّزْقَ لِعِبَادِهِ لَبَغَوْا فِي الْأَرْضِ",
      "translation": "Eğer Allah bütün kullarına rızık vermiş olsaydı, yeryüzünde zulm ederlerdi. Ama dilediği kadar indirir.",
      "topics": [
        "sustenance",
        "governance"
      ],
      "context": "Zulmü önlemek için servetin kontrollü dağıtımında ilahi hikmet.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 164,
      "type": "quran",
      "reference": "Saba 34:39",
      "arabic": "قُلْ إِنَّ رَبِّي يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ مِنْ عِبَادِهِ وَيَقْدِرُ لَهُ",
      "translation": "De ki: Şüphesiz Rabbim, kullarından dilediğine rızkı genişletir ve ona da daraltır.",
      "topics": [
        "sustenance",
        "wealth"
      ],
      "context": "Rızkın genişletilmesi de, daraltılması da Allah'ın elindedir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 165,
      "type": "quran",
      "reference": "Al-Hadid 57:18",
      "arabic": "إِنَّ الْمُصَّدِّقِينَ وَالْمُصَّدِّقَاتِ وَأَقْرَضُوا اللَّهَ قَرْضًا حَسَنًا يُضَاعَفُ لَهُمْ",
      "translation": "Sadaka veren erkeklerle, sadaka veren ve Allah'a güzel bir borç vermiş olan kadınların verdikleri, onlara kat kat artırılır.",
      "topics": [
        "sadaqah",
        "zakat"
      ],
      "context": "Hayır amaçlı bağışlarda cinsiyet eşitliğine dayalı ödül.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 166,
      "type": "quran",
      "reference": "Luqman 31:4",
      "arabic": "الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ",
      "translation": "Namazı kılanlar ve zekatı verenler, işte onlar, ahiret sahibidirler.",
      "topics": [
        "zakat"
      ],
      "context": "Zekât, hidâyete ermiş olmanın nişaneleri olarak namazla eşleştirilmiştir.",
      "relatedIds": [],
      "strength": null,
      "collection": null
    },
    {
      "id": 167,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2236",
      "arabic": "لَا يَبِيعُ بَعْضُكُمْ عَلَى بَيْعِ بَعْضٍ",
      "translation": "Kardeşinizin satışı üzerinden satış yapmayın. Birbirinize fazla teklif vermeyin.",
      "topics": [
        "trade",
        "ethics"
      ],
      "context": "Başka bir kişinin devam eden işlemine zarar verme yasağı, piyasada adil rekabet normlarının oluşturulması.",
      "relatedIds": [
        20,
        21
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 168,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2140",
      "arabic": "لَا تَلَقَّوُا الرُّكْبَانَ وَلَا يَبِعْ حَاضِرٌ لِبَادٍ",
      "translation": "Süvarilerle (tüccarlar pazara ulaşmadan önce) buluşmak için dışarı çıkmayın ve bölge sakini, çölde yaşayan adına satış yapmamalıdır.",
      "topics": [
        "trade",
        "market-regulation"
      ],
      "context": "Piyasa aracılarının bilgi asimetrisinden yararlanmasını önlemek. Satıcıların doğrudan pazara ulaşmasını sağlayarak adil piyasa fiyatları sağlar.",
      "relatedIds": [
        20,
        22
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 169,
      "type": "hadith",
      "reference": "Sahih Muslim 1605",
      "arabic": "مَنِ احْتَكَرَ فَهُوَ خَاطِئٌ",
      "translation": "Kim istiflerse o günahkârdır.",
      "topics": [
        "trade",
        "market-regulation"
      ],
      "context": "Fiyatları yapay olarak şişirmek amacıyla malların istiflenmesinin doğrudan yasaklanması. Piyasa manipülasyonu ile ilgili en güçlü hadislerden biri.",
      "relatedIds": [
        22,
        23
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 170,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 3381",
      "arabic": "الجَالِبُ مَرْزُوقٌ وَالمُحْتَكِرُ مَلْعُونٌ",
      "translation": "Pazara mal getirene rızık verilir, istifleyen ise lanetlenir.",
      "topics": [
        "trade",
        "market-regulation"
      ],
      "context": "Meşru ticareti (mal ithalatı) istifçilikle karşılaştırarak, piyasaları iyi tedarik etmeye yönelik İslami vurguyu güçlendiriyor.",
      "relatedIds": [
        169,
        22
      ],
      "strength": "hasan",
      "collection": "Ebu Davud"
    },
    {
      "id": 171,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2079",
      "arabic": "التَّاجِرُ الصَّدُوقُ الْأَمِينُ مَعَ النَّبِيِّينَ وَالصِّدِّيقِينَ وَالشُّهَدَاءِ",
      "translation": "Doğru ve güvenilir tüccar, Peygamberlerle, sıddıklarla ve şehitlerle birlikte olacaktır.",
      "topics": [
        "trade",
        "ethics"
      ],
      "context": "Dürüst ticareti en yüksek manevi mertebeye yükseltir ve İslam'ın ahlaki ticarete olumlu bakış açısını gösterir.",
      "relatedIds": [
        20,
        21
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 172,
      "type": "hadith",
      "reference": "Sahih Muslim 1532",
      "arabic": "نَهَى رَسُولُ اللَّهِ عَنْ بَيْعِ الْغَرَرِ",
      "translation": "Allah Resulü garar (aşırı belirsizlik) içeren satışı yasaklamıştır.",
      "topics": [
        "trade",
        "riba"
      ],
      "context": "İslam ticaret hukukunun temel hadisleri. Garar (belirsizlik/aldatma), ribanın yanı sıra en önemli yasaklardan biridir ve tüm işlemlerde açık şartlar gerektirir.",
      "relatedIds": [
        1,
        20
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 173,
      "type": "hadith",
      "reference": "Sunan Ibn Majah 2185",
      "arabic": "ثَلَاثٌ فِيهِنَّ الْبَرَكَةُ: الْبَيْعُ إِلَى أَجَلٍ، وَالْمُقَارَضَةُ، وَخَلْطُ الْبُرِّ بِالشَّعِيرِ لِلْبَيْتِ لَا لِلْبَيْعِ",
      "translation": "Üç şeyde bereket vardır: Vadeli satış, mukarada (kazanç paylaşımı) ve satış için değil, ev kullanımı için buğday ile arpanın karıştırılması.",
      "topics": [
        "trade",
        "islamic-finance"
      ],
      "context": "Mudaraba'yı (kar paylaşımı ortaklığı) İslami bankacılık modellerinin temelini oluşturan kutlu bir iş biçimi olarak açıkça onaylıyor.",
      "relatedIds": [
        20,
        28
      ],
      "strength": "hasan",
      "collection": "İbn Mâce"
    },
    {
      "id": 174,
      "type": "hadith",
      "reference": "Sahih Muslim 1598",
      "arabic": "لَعَنَ رَسُولُ اللَّهِ آكِلَ الرِّبَا وَمُؤْكِلَهُ وَكَاتِبَهُ وَشَاهِدَيْهِ وَقَالَ هُمْ سَوَاءٌ",
      "translation": "Allah Resulü, faiz yiyene, ödeyene, yazana ve şahit olan iki şahide lanet etmiş ve hepsinin (günahta eşit olduğunu) söylemiştir.",
      "topics": [
        "riba",
        "ethics"
      ],
      "context": "Sorumluluğu yalnızca borç verene değil, faize dayalı işlemlerde yer alan tüm taraflara genişleten kapsamlı kınama.",
      "relatedIds": [
        1,
        2,
        3
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 175,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2145",
      "arabic": "الذَّهَبُ بِالذَّهَبِ وَالْفِضَّةُ بِالْفِضَّةِ مِثْلاً بِمِثْلٍ سَوَاءً بِسَوَاءٍ يَدًا بِيَدٍ",
      "translation": "Altına altın, gümüşe gümüş, benzere benzer, eşite eşit, el ele. Kim eklerse veya fazlasını isterse riba yapmış olur.",
      "topics": [
        "riba",
        "trade"
      ],
      "context": "Altı malın (altın, gümüş, buğday, arpa, hurma, tuz) hadisi. Gizli faizi önlemek için döviz bozdurma ve emtia ticaretine ilişkin kurallar koyar.",
      "relatedIds": [
        1,
        2,
        174
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 176,
      "type": "hadith",
      "reference": "Sahih Muslim 1596",
      "arabic": "الرِّبَا ثَلَاثَةٌ وَسَبْعُونَ بَابًا أَيْسَرُهَا مِثْلُ أَنْ يَنْكِحَ الرَّجُلُ أُمَّهُ",
      "translation": "Riba'nın yetmiş üç kapısı vardır; bunlardan en küçüğü, erkeğin annesiyle ensest yapması gibidir.",
      "topics": [
        "riba",
        "ethics"
      ],
      "context": "Güçlü bir karşılaştırmayla İslam hukukunda ribanın aşırı ciddiyetini vurguluyor ve yasağı konusunda hiçbir belirsizliğe yer bırakmıyor.",
      "relatedIds": [
        1,
        174
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 177,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 1395",
      "arabic": "أَنَّ النَّبِيَّ بَعَثَ مُعَاذًا إِلَى الْيَمَنِ فَقَالَ أَخْبِرْهُمْ أَنَّ اللَّهَ افْتَرَضَ عَلَيْهِمْ صَدَقَةً تُؤْخَذُ مِنْ أَغْنِيَائِهِمْ فَتُرَدُّ فِي فُقَرَائِهِمْ",
      "translation": "Peygamber, Muaz'ı Yemen'e göndererek şöyle buyurdu: Onlara haber ver ki, Allah, onlara, zenginlerinden alınıp fakirlerine verilmek üzere bir sadaka (zekât) farz kıldı.",
      "topics": [
        "zakat",
        "wealth-distribution"
      ],
      "context": "Zekâtı, zenginlerden alınan ve aynı topluluk içindeki yoksullara verilen açık bir servet yeniden dağıtım mekanizması olarak kurar.",
      "relatedIds": [
        7,
        8,
        9
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 178,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 1403",
      "arabic": "مَا مِنْ صَاحِبِ ذَهَبٍ وَلَا فِضَّةٍ لَا يُؤَدِّي مِنْهَا حَقَّهَا إِلَّا إِذَا كَانَ يَوْمُ الْقِيَامَةِ صُفِّحَتْ لَهُ صَفَائِحُ مِنْ نَارٍ",
      "translation": "Kıyamet günü kendisi için ateşten tabaklar ısıtılmadıkça, borcunu ödemeyen altın ve gümüş sahibi yoktur.",
      "topics": [
        "zakat",
        "wealth-distribution"
      ],
      "context": "Parasal servet üzerinde zekatın stopajına karşı sert uyarı, bu yükümlülüğün servet sahiplerinin devredilemez bir görevi olduğunu güçlendiriyor.",
      "relatedIds": [
        7,
        8,
        177
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 179,
      "type": "hadith",
      "reference": "Sahih Muslim 987",
      "arabic": "مَا مِنْ صَاحِبِ إِبِلٍ وَلَا بَقَرٍ وَلَا غَنَمٍ لَا يُؤَدِّي زَكَاتَهَا إِلَّا جَاءَتْ يَوْمَ الْقِيَامَةِ أَعْظَمَ مَا كَانَتْ وَأَسْمَنَهُ تَنْطَحُهُ بِقُرُونِهَا وَتَطَؤُهُ بِأَخْفَافِهَا",
      "translation": "Zekâtını vermeyen deve, sığır ve koyun sahibi yok ki, kıyamet günü kendilerinden daha büyük ve şişman olarak gelip boynuzlarıyla vursunlar ve toynaklarıyla çiğnesinler.",
      "topics": [
        "zakat",
        "wealth-distribution"
      ],
      "context": "Hayvancılık servetinde zekatın durdurulmasına karşı uyarı, zekat yükümlülüğünün her türlü üretken varlığı kapsayacak şekilde genişletilmesi.",
      "relatedIds": [
        7,
        177,
        178
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 180,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 1609",
      "arabic": "فِي الرِّقَةِ رُبُعُ الْعُشْرِ",
      "translation": "Gümüşte onda birinin dörtte biri (%2,5) ödenecektir.",
      "topics": [
        "zakat",
        "wealth-distribution"
      ],
      "context": "Parasal varlıkların kesin zekat oranını belirtir — %2,5. Bu oran, İslam hukukunda tasarruf, altın, gümüş ve mali varlıkların zekatı için standart haline geldi.",
      "relatedIds": [
        7,
        8,
        177
      ],
      "strength": "sahih",
      "collection": "Ebu Davud"
    },
    {
      "id": 181,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 1427",
      "arabic": "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
      "translation": "Sadaka malı azaltmaz.",
      "topics": [
        "charity",
        "wealth-distribution"
      ],
      "context": "Zenginliği bağışlamanın, paradoksal olarak onu ilahi bereket (bereket) ve topluluk dayanışması yoluyla arttırdığını söyleyen manevi ve ekonomik prensip.",
      "relatedIds": [
        10,
        11,
        12
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 182,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 1442",
      "arabic": "الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى",
      "translation": "Üstteki el (veren el), alttaki elden (alıcı el) daha iyidir.",
      "topics": [
        "charity",
        "poverty"
      ],
      "context": "Mali kendine yeterliliği ve cömertliği teşvik eder. Verecek konumda olmak, alacak konumda olmaktan tercih edilir.",
      "relatedIds": [
        10,
        11
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 183,
      "type": "hadith",
      "reference": "Sahih Muslim 2588",
      "arabic": "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ",
      "translation": "Kim bir mü'minin dünya sıkıntısını giderirse, Allah da onun kıyamet gününün sıkıntısını giderir.",
      "topics": [
        "charity",
        "poverty",
        "debt"
      ],
      "context": "Karşılıklı desteği, manevi ödüllerle dini bir yükümlülük olarak tesis ederek İslami toplumsal dayanışmanın temelini oluşturur.",
      "relatedIds": [
        10,
        181
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 184,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 6011",
      "arabic": "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى",
      "translation": "Müminlerin birbirlerine merhamet, sevgi ve şefkat bakımından misali, bir vücut gibidir: Bir uzuv şikayet etse, vücudun geri kalanı uykusuzluk ve ateşle karşılık verir.",
      "topics": [
        "charity",
        "poverty",
        "ethics"
      ],
      "context": "'Tek vücut' metaforu, İslami sosyal refah teorisinin temelini oluşturur ve herhangi bir yerdeki yoksulluğun herkesin sorumluluğunda olduğunu ima eder.",
      "relatedIds": [
        10,
        11,
        184
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 185,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2227",
      "arabic": "أَعْطُوا الْأَجِيرَ أَجْرَهُ قَبْلَ أَنْ يَجِفَّ عَرَقُهُ",
      "translation": "İşçinin ücretini alın teri kurumadan verin.",
      "topics": [
        "labor",
        "ethics"
      ],
      "context": "Ücretlerin derhal ödenmesi konusunda vurgulu talimat. İslam'da emeğin saygınlığını ve işçi haklarını vurgular.",
      "relatedIds": [
        15,
        16
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 186,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2072",
      "arabic": "مَا أَكَلَ أَحَدٌ طَعَامًا قَطُّ خَيْرًا مِنْ أَنْ يَأْكُلَ مِنْ عَمَلِ يَدِهِ وَإِنَّ نَبِيَّ اللَّهِ دَاوُدَ كَانَ يَأْكُلُ مِنْ عَمَلِ يَدِهِ",
      "translation": "Hiçbir yiyecek kişinin kendi elinin emeğiyle kazandığından daha hayırlı değildir. Dâvûd Peygamber kendi elinin emeğinden yerdi.",
      "topics": [
        "labor",
        "trade"
      ],
      "context": "Kral olmasına rağmen elleriyle çalışan bir peygamberi örnek alarak el emeğini ve verimli çalışmayı yüceltir.",
      "relatedIds": [
        15,
        16,
        186
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 187,
      "type": "hadith",
      "reference": "Sahih Muslim 1015",
      "arabic": "إِنَّ اللَّهَ طَيِّبٌ لَا يَقْبَلُ إِلَّا طَيِّبًا",
      "translation": "Şüphesiz Allah temizdir ve ancak temiz olanı kabul eder.",
      "topics": [
        "ethics",
        "trade"
      ],
      "context": "Helal kazanç için temel prensip: İslam'da kabul edilebilir olması için tüm gelirlerin izin verilen ve etik kaynaklardan gelmesi gerekir.",
      "relatedIds": [
        20,
        21
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 188,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 3528",
      "arabic": "الْمُسْلِمُونَ عَلَى شُرُوطِهِمْ إِلَّا شَرْطًا حَرَّمَ حَلَالًا أَوْ أَحَلَّ حَرَامًا",
      "translation": "Helal olanı yasaklayan veya haram olana izin veren durumlar hariç, Müslümanlar kendi şartlarına (sözleşmelerine) tabidirler.",
      "topics": [
        "trade",
        "ethics",
        "governance"
      ],
      "context": "İslam hukukunda sözleşme özgürlüğünü tesis eder - tüm sözleşme şartları, İslami ilkeleri ihlal etmedikleri sürece bağlayıcıdır.",
      "relatedIds": [
        20,
        21
      ],
      "strength": "hasan",
      "collection": "Ebu Davud"
    },
    {
      "id": 189,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2387",
      "arabic": "مَطْلُ الْغَنِيِّ ظُلْمٌ",
      "translation": "Zengin bir kişinin ödemeyi geciktirmesi adaletsizliktir.",
      "topics": [
        "debt",
        "ethics"
      ],
      "context": "Borçlunun borcunu ödeme imkanı varsa, ödemeyi kasten geciktirmek adaletsizlik (zulm) olarak sınıflandırılır ve bu ciddi bir ahlaki ihlaldir.",
      "relatedIds": [
        183
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 190,
      "type": "hadith",
      "reference": "Sahih Muslim 1563",
      "arabic": "مَنْ أَخَذَ أَمْوَالَ النَّاسِ يُرِيدُ أَدَاءَهَا أَدَّى اللَّهُ عَنْهُ وَمَنْ أَخَذَ يُرِيدُ إِتْلَافَهَا أَتْلَفَهُ اللَّهُ",
      "translation": "Kim insanların parasını geri ödemek niyetiyle alırsa, Allah da onun adına karşılığını verecektir. Kim onu ​​yok etmek niyetiyle alırsa Allah onu helâk eder.",
      "topics": [
        "debt",
        "ethics"
      ],
      "context": "Geri ödeme niyetiyle dürüst borçlanma ile hileli borçlanma arasında ayrım yapar. İslam finans etiğinde niyet önemlidir.",
      "relatedIds": [
        189
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 191,
      "type": "hadith",
      "reference": "Sunan an-Nasa'i 4689",
      "arabic": "نَفْسُ الْمُؤْمِنِ مُعَلَّقَةٌ بِدَيْنِهِ حَتَّى يُقْضَى عَنْهُ",
      "translation": "Müminin ruhu, borcu ödeninceye kadar borcunun esiri olur.",
      "topics": [
        "debt",
        "ethics"
      ],
      "context": "Borç içinde ölmenin ciddiyetini vurguluyor. Müslüman toplumlarda aşırı borçlanmaya karşı güçlü bir kültürel teşvik oluşturur.",
      "relatedIds": [
        189,
        190
      ],
      "strength": "hasan",
      "collection": "Burada"
    },
    {
      "id": 192,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 6446",
      "arabic": "لَوْ كَانَ لِابْنِ آدَمَ وَادِيَانِ مِنْ مَالٍ لَابْتَغَى ثَالِثًا وَلَا يَمْلَأُ جَوْفَ ابْنِ آدَمَ إِلَّا التُّرَابُ",
      "translation": "Ademoğlunun iki vadi dolusu malı olsa üçüncüsünü ister. Âdemoğlunun karnını topraktan (ölümden) başka hiçbir şey doldurmaz.",
      "topics": [
        "wealth-distribution",
        "moderation"
      ],
      "context": "İnsan açgözlülüğünün doyumsuz doğası üzerine yorum. Sonsuz birikimden ziyade kanaati (kana'ah) ve cömertliği motive eder.",
      "relatedIds": [
        13,
        14
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 193,
      "type": "hadith",
      "reference": "Sahih Muslim 1054",
      "arabic": "لَيْسَ الْغِنَى عَنْ كَثْرَةِ الْعَرَضِ وَلَكِنَّ الْغِنَى غِنَى النَّفْسِ",
      "translation": "Zenginlik çok mala sahip olmak değildir. Aksine gerçek zenginlik, ruhun zenginliğidir.",
      "topics": [
        "wealth-distribution",
        "moderation"
      ],
      "context": "Maddi birikimin ötesinde refahı yeniden tanımlıyor. İslam ekonomisinin temeli, GSYİH üzerinden refahın vurgulanmasıdır.",
      "relatedIds": [
        13,
        14,
        192
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 194,
      "type": "hadith",
      "reference": "Sunan at-Tirmidhi 2325",
      "arabic": "مَنْ أَصْبَحَ مِنْكُمْ آمِنًا فِي سِرْبِهِ مُعَافًى فِي جَسَدِهِ عِنْدَهُ قُوتُ يَوْمِهِ فَكَأَنَّمَا حِيزَتْ لَهُ الدُّنْيَا",
      "translation": "Sizden kim evinde güvenlik içinde, bedeni sağlıklı ve günlük rızkını bulmuş olarak uyanırsa, sanki bütün dünya onun için toplanmış gibidir.",
      "topics": [
        "moderation",
        "poverty"
      ],
      "context": "Yeterliliği üç basit boyutta tanımlar: güvenlik, sağlık ve günlük tedarik. Zenginliğin materyalist tanımlarına meydan okuyor.",
      "relatedIds": [
        13,
        193
      ],
      "strength": "hasan",
      "collection": "Tirmizi"
    },
    {
      "id": 195,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2240",
      "arabic": "نَهَى النَّبِيُّ عَنْ بَيْعِ الثَّمَرِ حَتَّى يَبْدُوَ صَلَاحُهَا",
      "translation": "Peygamberimiz meyvelerin kalitesi belli oluncaya kadar satışını yasaklamıştır.",
      "topics": [
        "trade",
        "islamic-finance"
      ],
      "context": "Belirsiz mahsullerin ileri satışını önler. Ürünün gözlemlenebilir olgunluğunu gerektirerek tarımsal sözleşmelerdeki gharar'ı (belirsizliği) azaltır.",
      "relatedIds": [
        172,
        20
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 196,
      "type": "hadith",
      "reference": "Sahih Muslim 1604",
      "arabic": "مَنْ أَسْلَفَ فِي شَيْءٍ فَلْيُسْلِفْ فِي كَيْلٍ مَعْلُومٍ وَوَزْنٍ مَعْلُومٍ إِلَى أَجَلٍ مَعْلُومٍ",
      "translation": "Kim bir şeyin bedelini peşin olarak öderse, belli bir ölçü, belli bir ağırlık ve belli bir süre için ödesin.",
      "topics": [
        "trade",
        "islamic-finance"
      ],
      "context": "Selam (vadeli) sözleşmelere ilişkin kurallar – garar yasağının istisnası. Peşin ödeme sözleşmelerine izin verilebilmesi için tüm şartların kesin olarak belirtilmesi gerekir.",
      "relatedIds": [
        172,
        195
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 197,
      "type": "hadith",
      "reference": "Musnad Ahmad 15276",
      "arabic": "لَا ضَرَرَ وَلَا ضِرَارَ",
      "translation": "Zarar veya karşılıklı zarar olmamalıdır.",
      "topics": [
        "ethics",
        "governance",
        "trade"
      ],
      "context": "İslam hukukunun beş esasından biri. Tüketicinin korunması, çevre düzenlemesi ve İslam hukukundaki tüm ekonomi politikalarının temeli.",
      "relatedIds": [
        22,
        188
      ],
      "strength": "hasan",
      "collection": "Ahmed"
    },
    {
      "id": 198,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 7150",
      "arabic": "كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ",
      "translation": "Her biriniz çobansınız ve her biriniz sürüsünden sorumlusunuz.",
      "topics": [
        "governance",
        "ethics"
      ],
      "context": "Liderlikte evrensel hesap verebilirlik ilkesi. Ekonomik yönetişime uygulandığında bu, yöneticilerin vatandaşlarının ekonomik refahından sorumlu olduğu anlamına gelir.",
      "relatedIds": [
        197
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 199,
      "type": "hadith",
      "reference": "Sahih Muslim 1829",
      "arabic": "اللَّهُمَّ مَنْ وَلِيَ مِنْ أَمْرِ أُمَّتِي شَيْئًا فَشَقَّ عَلَيْهِمْ فَاشْقُقْ عَلَيْهِ",
      "translation": "Allah'ım, kime ümmetim üzerinde yetki verilir ve onlara zorluk çıkarırsa, sen de ona zorluk yaşat.",
      "topics": [
        "governance",
        "ethics"
      ],
      "context": "Baskıcı yönetime karşı peygamberlik duası. İnsanlara ekonomik zorluk getiren yöneticilerin ilahi sonuçlarla karşı karşıya kalacağını ortaya koyuyor.",
      "relatedIds": [
        198
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 200,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 2608",
      "arabic": "مَنِ اقْتَطَعَ حَقَّ امْرِئٍ مُسْلِمٍ بِيَمِينِهِ فَقَدْ أَوْجَبَ اللَّهُ لَهُ النَّارَ وَحَرَّمَ عَلَيْهِ الْجَنَّةَ",
      "translation": "Kim yalan yere yemin ederek bir Müslümanın hakkını alırsa, Allah onu cehenneme atar ve onu cennetten men eder.",
      "topics": [
        "governance",
        "ethics",
        "trade"
      ],
      "context": "Özellikle başkalarının mallarına el koymak için yalan yeminlerin kullanıldığı hukuki ve mali konularda dolandırıcılık ve yolsuzluğa karşı ciddi uyarı.",
      "relatedIds": [
        198,
        199
      ],
      "strength": "sahih",
      "collection": "Ebu Davud"
    },
    {
      "id": 201,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2452",
      "arabic": "مَنْ ظَلَمَ قِيدَ شِبْرٍ مِنَ الْأَرْضِ طُوِّقَهُ مِنْ سَبْعِ أَرَضِينَ",
      "translation": "Kim haksız yere bir karış toprağı ele geçirirse, kıyamet gününde yedi yerden onunla cezalandırılır.",
      "topics": [
        "property",
        "ethics",
        "governance"
      ],
      "context": "Arazi gaspı ve mülk hırsızlığına karşı güçlü uyarı. İslam hukukunda mülkiyet haklarının güçlü bir şekilde korunmasını sağlar.",
      "relatedIds": [
        17,
        18
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 202,
      "type": "hadith",
      "reference": "Sahih Muslim 1610",
      "arabic": "مَنْ أَحْيَا أَرْضًا مَيْتَةً فَهِيَ لَهُ",
      "translation": "Kim ölü (kullanılmayan) toprağı diriltirse, o onundur.",
      "topics": [
        "property",
        "labor"
      ],
      "context": "İhya al-mawat ilkesi: işlenmemiş arazinin verimli kullanımı yoluyla mülkiyet kazanmak. Tarımsal kalkınmayı teşvik eder ve üretken çabayı ödüllendirir.",
      "relatedIds": [
        17,
        201
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 203,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 3477",
      "arabic": "النَّاسُ شُرَكَاءُ فِي ثَلَاثٍ: الْمَاءِ وَالْكَلَإِ وَالنَّارِ",
      "translation": "İnsanlar üç şeyde ortaktırlar: Su, otlak ve ateş.",
      "topics": [
        "property",
        "governance",
        "wealth-distribution"
      ],
      "context": "Temel doğal kaynakların ortak mülkiyetini oluşturur. 'Ortak' kavramının erken bir biçimi - temel ihtiyaçlar özel olarak tekelleştirilemez.",
      "relatedIds": [
        17,
        18,
        201
      ],
      "strength": "hasan",
      "collection": "Ebu Davud"
    },
    {
      "id": 204,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 6724",
      "arabic": "أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَلِأَوْلَى رَجُلٍ ذَكَرٍ",
      "translation": "Belirlenen hisseleri hak sahiplerine verin, geri kalanlar en yakın erkek akrabaya verilir.",
      "topics": [
        "inheritance",
        "wealth-distribution"
      ],
      "context": "İslam miras hukukunun temel ilkesi. Önce sabit paylar (fera'id) dağıtılır, sonra geri kalan kısım (ta'sib) en yakın erkek akrabaya gider.",
      "relatedIds": [
        81,
        82,
        83
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 205,
      "type": "hadith",
      "reference": "Sahih Muslim 1614",
      "arabic": "تَعَلَّمُوا الْفَرَائِضَ وَعَلِّمُوهَا النَّاسَ فَإِنَّهُ نِصْفُ الْعِلْمِ",
      "translation": "Miras kanunlarını öğrenin ve bunları insanlara öğretin; çünkü bu, ilmin yarısıdır.",
      "topics": [
        "inheritance",
        "governance"
      ],
      "context": "Peygamber miras hukukunu tüm bilginin yarısı olarak tanımlamış ve bu onun karmaşıklığını ve İslam'ın ekonomik ve sosyal düzeni açısından merkezi önemini yansıtmıştır.",
      "relatedIds": [
        81,
        204
      ],
      "strength": "hasan",
      "collection": "Müslüman"
    },
    {
      "id": 206,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 2870",
      "arabic": "إِنَّ اللَّهَ قَدْ أَعْطَى كُلَّ ذِي حَقٍّ حَقَّهُ فَلَا وَصِيَّةَ لِوَارِثٍ",
      "translation": "Allah her mirasçıya kendi hakkını vermiştir, dolayısıyla mirasçıya miras yoktur.",
      "topics": [
        "inheritance",
        "wealth-distribution"
      ],
      "context": "Zengin bireylerin Kuran'daki miras paylarını geçersiz kılmak için vasiyetname kullanmalarını engeller. Vasiyetler üçte bir ile sınırlıdır ve mevcut mirasçılara verilemez.",
      "relatedIds": [
        81,
        204,
        205
      ],
      "strength": "sahih",
      "collection": "Ebu Davud"
    },
    {
      "id": 207,
      "type": "hadith",
      "reference": "Sahih Muslim 102",
      "arabic": "مَنْ غَشَّنَا فَلَيْسَ مِنَّا",
      "translation": "Bizi aldatan bizden değildir.",
      "topics": [
        "market-regulation",
        "ethics",
        "trade"
      ],
      "context": "Peygamber Efendimiz, kuru tahılın altına ıslak tahıl saklayan bir tüccar bulduğunda rivayet edilmiştir. Dolandırıcılığın ve aldatıcı iş uygulamalarının kategorik bir şekilde kınanması.",
      "relatedIds": [
        22,
        23,
        171
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 208,
      "type": "hadith",
      "reference": "Sunan at-Tirmidhi 1314",
      "arabic": "لَا يَحِلُّ لِمُسْلِمٍ أَنْ يَبِيعَ شَيْئًا إِلَّا بَيَّنَ مَا فِيهِ",
      "translation": "Bir Müslümanın, kusurlarını bildirmedikçe bir şeyi satması caiz değildir.",
      "topics": [
        "market-regulation",
        "trade",
        "ethics"
      ],
      "context": "Zorunlu açıklama gerekliliği — Satıcılar tüm ürün kusurlarını açıklamalıdır. Tüketicinin korunması ve reklamda doğruluk yasasının erken bir biçimi.",
      "relatedIds": [
        22,
        207
      ],
      "strength": "hasan",
      "collection": "Tirmizi"
    },
    {
      "id": 209,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2160",
      "arabic": "لَا تَنَاجَشُوا",
      "translation": "Necâş (fiyatları şişirmek için sahte ihale) yapmayın.",
      "topics": [
        "market-regulation",
        "trade"
      ],
      "context": "Açık artırmayı ve yapay fiyat enflasyonunu yasaklar. Bir malı satın almak niyetinde olmadan, sadece fiyatı yükseltmek için teklif veren kişi günah işlemiş olur.",
      "relatedIds": [
        22,
        168,
        207
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 210,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 3451",
      "arabic": "دَعُوا النَّاسَ يَرْزُقُ اللَّهُ بَعْضَهُمْ مِنْ بَعْضٍ",
      "translation": "Bırakın insanları, Allah kiminin rızkını kiminin aracılığıyla rızıklandırır.",
      "topics": [
        "market-regulation",
        "trade"
      ],
      "context": "Sahabeler enflasyon sırasında Peygamberimizden fiyatları sabitlemesini istediklerinde söylendi. Peygamber piyasa tarafından belirlenen fiyatlandırmayı onaylayarak bunu reddetti; ancak bu yalnızca istifleme veya manipülasyonun olmadığı durumlarda gerçekleşti.",
      "relatedIds": [
        22,
        169
      ],
      "strength": "hasan",
      "collection": "Ebu Davud"
    },
    {
      "id": 211,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 1645",
      "arabic": "مَنْ سَأَلَ النَّاسَ أَمْوَالَهُمْ تَكَثُّرًا فَإِنَّمَا يَسْأَلُ جَمْرًا",
      "translation": "Kim daha çok zengin olmak için insanlardan para isterse, yalnızca canlı (cehennem) kömürü istemiş olur.",
      "topics": [
        "poverty",
        "charity",
        "moderation"
      ],
      "context": "Gerçekten ihtiyacı olmadığında dilenmekten vazgeçirir. Gerçekten zor durumda olanlara hayırseverliği korurken kendi kendine yeterliliği teşvik eder.",
      "relatedIds": [
        10,
        182
      ],
      "strength": "sahih",
      "collection": "Ebu Davud"
    },
    {
      "id": 212,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2567",
      "arabic": "أَيُّمَا أَهْلِ عَرْصَةٍ أَصْبَحَ فِيهِمُ امْرُؤٌ جَائِعٌ فَقَدْ بَرِئَتْ مِنْهُمْ ذِمَّةُ اللَّهِ",
      "translation": "Bir mahallede bir kimse aç yatarsa, o mahalleden Allah'ın koruma ahdi kalkar.",
      "topics": [
        "poverty",
        "charity",
        "governance"
      ],
      "context": "Açlığın önlenmesinde kolektif sorumluluk. Topluluklar, herhangi bir üyesinin aç kalmasına izin verme konusunda ahlaki sorumluluk taşır; bu, güçlü bir sosyal güvenlik ağı ilkesidir.",
      "relatedIds": [
        184,
        183
      ],
      "strength": "hasan",
      "collection": "Buhari"
    },
    {
      "id": 213,
      "type": "hadith",
      "reference": "Sahih Muslim 1631",
      "arabic": "إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ صَدَقَةٍ جَارِيَةٍ أَوْ عِلْمٍ يُنْتَفَعُ بِهِ أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ",
      "translation": "İnsan öldüğünde üç şey dışında ameli kesilir: Sadaka-i cariye, faydalı ilim veya kendisine dua eden salih evlat.",
      "topics": [
        "charity",
        "property"
      ],
      "context": "Sadaka jariyah hadisi - vakıf (bağış) sisteminin temeli. Ölümden sonra da fayda sağlamaya devam eden hayır kurumları, İslam medeniyetinde önemli bir ekonomik kurum haline gelmiştir.",
      "relatedIds": [
        17,
        10,
        11
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 214,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2737",
      "arabic": "إِنْ شِئْتَ حَبَسْتَ أَصْلَهَا وَتَصَدَّقْتَ بِهَا",
      "translation": "Dilersen malı vakıf olarak alabilir ve ürünlerini sadaka olarak verebilirsin.",
      "topics": [
        "charity",
        "property",
        "governance"
      ],
      "context": "İslam'da kayıtlı ilk vakıf olan Hayber'deki arazisi hakkında Hz. Peygamber'in Ömer'e tavsiyesi. Orijinal varlık korunurken, geliri sürekli olarak hayır kurumlarına aktarılır.",
      "relatedIds": [
        213,
        17
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 215,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 3383",
      "arabic": "أَنَا ثَالِثُ الشَّرِيكَيْنِ مَا لَمْ يَخُنْ أَحَدُهُمَا صَاحِبَهُ فَإِذَا خَانَهُ خَرَجْتُ مِنْ بَيْنِهِمَا",
      "translation": "Biri diğerine ihanet etmediği sürece iki ortaktan üçüncüsüyüm. Biri ihanet ettiğinde aralarından çekilirim.",
      "topics": [
        "islamic-finance",
        "trade",
        "ethics"
      ],
      "context": "Allah'ın dürüst iş ortaklıklarını desteklediğini garanti ettiği ilahi bir hadis (hadis-kudsi). İhanet ilahi nimeti geçersiz kılar.",
      "relatedIds": [
        28,
        173
      ],
      "strength": "hasan",
      "collection": "Ebu Davud"
    },
    {
      "id": 216,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2287",
      "arabic": "رَحِمَ اللَّهُ رَجُلًا سَمْحًا إِذَا بَاعَ وَإِذَا اشْتَرَى وَإِذَا اقْتَضَى",
      "translation": "Satarken, alırken, borcunu tahsil ederken kolaylık gösteren kimseye Allah rahmet eylesin.",
      "topics": [
        "trade",
        "ethics",
        "debt"
      ],
      "context": "Tüm ticari işlemlerde - satışta (adil fiyatlar), satın almada (aşırı pazarlık yapmamak) ve borç tahsilatında (uzatma verilmesi) hoşgörüyü teşvik eder.",
      "relatedIds": [
        189,
        20
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 217,
      "type": "hadith",
      "reference": "Sahih Muslim 1600",
      "arabic": "مَنْ أَنْظَرَ مُعْسِرًا أَوْ وَضَعَ عَنْهُ أَظَلَّهُ اللَّهُ فِي ظِلِّهِ",
      "translation": "Kim darda kalan bir kimseye mühlet verir veya borcundan vazgeçerse Allah onu gölgesinde gölgelendirir.",
      "topics": [
        "debt",
        "charity",
        "ethics"
      ],
      "context": "Alacaklıları son teslim tarihlerini uzatmaya veya gerçekten zor durumda olanların borçlarını affetmeye teşvik eder. Kuran ayeti Bakara 2:280'i tamamlar.",
      "relatedIds": [
        189,
        183,
        100
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 218,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 3580",
      "arabic": "لَعَنَ رَسُولُ اللَّهِ الرَّاشِيَ وَالْمُرْتَشِيَ",
      "translation": "Allah Resulü rüşvet verene de rüşvet alana da lanet etmiştir.",
      "topics": [
        "governance",
        "ethics"
      ],
      "context": "Her türlü rüşvetin kategorik olarak yasaklanması. Rüşvet vermek de almak da eşit derecede kınanmaktadır; bu da yönetim ve ticarette yolsuzluğun önlenmesini sağlar.",
      "relatedIds": [
        198,
        200
      ],
      "strength": "sahih",
      "collection": "Ebu Davud"
    },
    {
      "id": 219,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 7163",
      "arabic": "هَدَايَا الْعُمَّالِ غُلُولٌ",
      "translation": "Kamu görevlilerine verilen hediyeler bir tür zimmete para geçirmedir (ghul).",
      "topics": [
        "governance",
        "ethics"
      ],
      "context": "Devlet memurlarına verilen hediyeleri kamu hazinesinden hırsızlık olarak sınıflandırarak yolsuzluğu önler. Kamu maliyesi için açık bir yolsuzlukla mücadele ilkesi.",
      "relatedIds": [
        198,
        218
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 220,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2320",
      "arabic": "مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا أَوْ يَزْرَعُ زَرْعًا فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ إِلَّا كَانَ لَهُ بِهِ صَدَقَةٌ",
      "translation": "Hiçbir Müslüman, kendisine sadaka sayılmadıkça, ağaç dikmez veya kuşların, insanların veya hayvanların yediği bir ürün ekmez.",
      "topics": [
        "charity",
        "property",
        "ethics"
      ],
      "context": "Ekim için sürekli manevi ödül vererek tarımı ve çevre yönetimini teşvik eder. Ekimden yararlanan her varlık, ekimcinin hayır kurumunu kazanır.",
      "relatedIds": [
        202,
        213
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 221,
      "type": "hadith",
      "reference": "Musnad Ahmad 12981",
      "arabic": "إِنْ قَامَتِ السَّاعَةُ وَفِي يَدِ أَحَدِكُمْ فَسِيلَةٌ فَإِنِ اسْتَطَاعَ أَنْ لَا تَقُومَ حَتَّى يَغْرِسَهَا فَلْيَغْرِسْهَا",
      "translation": "Eğer kıyamet kopacaksa ve birinizin elinde bir hurma fidanı varsa, kıyametin başlamasından önce onu ekmeye gücü yetiyorsa, bunu yapsın.",
      "topics": [
        "ethics",
        "property"
      ],
      "context": "Dünyanın sonunda bile üretken eylemin değeri vardır. Koşullar ne olursa olsun İslam'ın yapıcı katkıya verdiği önemi gösterir.",
      "relatedIds": [
        220
      ],
      "strength": "hasan",
      "collection": "Ahmed"
    },
    {
      "id": 222,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 5774",
      "arabic": "كُلُوا وَاشْرَبُوا وَالْبَسُوا وَتَصَدَّقُوا فِي غَيْرِ إِسْرَافٍ وَلَا مَخِيلَةٍ",
      "translation": "İsraf ve kibir olmadan yiyin, için, giyinin ve sadaka verin.",
      "topics": [
        "moderation",
        "charity",
        "ethics"
      ],
      "context": "Zenginlikten yararlanmaya izin verir, ancak sınırlar dahilinde. İkiz yasaklar - israfın olmaması (israf) ve gösterişin olmaması (makhilah) - İslami tüketim ahlâkını tanımlar.",
      "relatedIds": [
        13,
        14,
        192
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 223,
      "type": "hadith",
      "reference": "Sunan at-Tirmidhi 2378",
      "arabic": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ",
      "translation": "Allah'ım, küfürden ve fakirlikten sana sığınırım.",
      "topics": [
        "poverty",
        "moderation"
      ],
      "context": "Peygamber düzenli olarak fakirlikten korunmaya çalıştı ve bunu ciddi bir musibet olarak değerlendirdi. Bu, ekonomik kalkınmayı sadece dünyevi bir mesele olarak değil, dini bir görev olarak motive eder.",
      "relatedIds": [
        11,
        194
      ],
      "strength": "hasan",
      "collection": "Tirmizi"
    },
    {
      "id": 224,
      "type": "hadith",
      "reference": "Sahih Muslim 2959",
      "arabic": "ازْهَدْ فِي الدُّنْيَا يُحِبَّكَ اللَّهُ وَازْهَدْ فِيمَا عِنْدَ النَّاسِ يُحِبَّكَ النَّاسُ",
      "translation": "Dünyadan kopun, Allah sizi sevecektir. İnsanların sahip olduklarından uzaklaşın, insanlar sizi sevecektir.",
      "topics": [
        "moderation",
        "ethics"
      ],
      "context": "Zühd'ü (materyalizmden kopmayı) teşvik eder; yoksulluğu değil, zenginlikle sağlıklı bir ilişkiyi teşvik eder. Kişi zengin olmasına rağmen ruhsal olarak sahip olduklarından kopmuş olabilir.",
      "relatedIds": [
        193,
        194
      ],
      "strength": "hasan",
      "collection": "Müslüman"
    },
    {
      "id": 225,
      "type": "hadith",
      "reference": "Sunan Abu Dawud 3535",
      "arabic": "أَدِّ الْأَمَانَةَ إِلَى مَنِ ائْتَمَنَكَ وَلَا تَخُنْ مَنْ خَانَكَ",
      "translation": "Seni emanet edenin emanetini yerine getir, sana ihanet edene ihanet etme.",
      "topics": [
        "ethics",
        "trade",
        "islamic-finance"
      ],
      "context": "Biri sizi aldatsa bile siz onu aldatamazsınız. Güvene dayalı İslami finans sistemi için kritik olan güven görevini koşulsuz olarak belirler.",
      "relatedIds": [
        215,
        188
      ],
      "strength": "hasan",
      "collection": "Ebu Davud"
    },
    {
      "id": 226,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 33",
      "arabic": "آيَةُ الْمُنَافِقِ ثَلَاثٌ إِذَا حَدَّثَ كَذَبَ وَإِذَا وَعَدَ أَخْلَفَ وَإِذَا اؤْتُمِنَ خَانَ",
      "translation": "Münafığın alameti üçtür: Konuştuğu zaman yalan söyler; söz verdiğinde sözünü tutmaz; kendisine emanet edildiğinde emanete ihanet eder.",
      "topics": [
        "ethics",
        "trade"
      ],
      "context": "Yalan söylemek, söz vermemek ve güvene ihanet ikiyüzlülüğün işaretleridir. Ticari bağlamda bunlar İslami ticaretin amana (güven) temelini yok etmektedir.",
      "relatedIds": [
        225,
        171
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 227,
      "type": "hadith",
      "reference": "Sahih Muslim 2699",
      "arabic": "وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ",
      "translation": "Kul, kardeşinin yardımında olduğu sürece Allah da kulunun yardımındadır.",
      "topics": [
        "charity",
        "ethics",
        "poverty"
      ],
      "context": "İlahi destek başkalarına yardım etmekle bağlantılıdır. Bu ilke, İslam'daki kooperatif ekonomik modellerini (karşılıklı yardım toplulukları, kooperatif bankacılığı ve topluluk dayanışması) yönlendirmektedir.",
      "relatedIds": [
        183,
        184
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 228,
      "type": "hadith",
      "reference": "Sunan Ibn Majah 2443",
      "arabic": "مَنْ أَقْرَضَ اللَّهَ قَرْضًا حَسَنًا فَلَهُ أَجْرُهُ مَرَّتَيْنِ",
      "translation": "Kim Allah'a güzel bir borç verirse onun sevabı iki kat artırılır.",
      "topics": [
        "charity",
        "islamic-finance",
        "debt"
      ],
      "context": "İki kat manevi ödül vaat ederek faizsiz borç vermeyi (karz hasan) teşvik eder. Bu kavram İslami mikrofinans ve kooperatif bankacılığının merkezinde yer almaktadır.",
      "relatedIds": [
        217,
        183
      ],
      "strength": "hasan",
      "collection": "İbn Mâce"
    },
    {
      "id": 229,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2155",
      "arabic": "خَدِيجَةُ بِنْتُ خُوَيْلِدٍ كَانَتْ تَاجِرَةً ذَاتَ شَرَفٍ وَمَالٍ",
      "translation": "Hatice bint Huveylid şerefli ve zengin bir tüccardı.",
      "topics": [
        "trade",
        "ethics"
      ],
      "context": "Hatice'nin büyük bir iş kadını olarak tarihsel olarak tanınması. Ticari başarısı İslam'dan önceye dayanıyor ve hiçbir zaman sorgulanmadı, bu da kadınların ekonomik katılım hakkını doğruladı.",
      "relatedIds": [
        171,
        186
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 230,
      "type": "hadith",
      "reference": "Sunan an-Nasa'i 4449",
      "arabic": "لَا يَحِلُّ مَالُ امْرِئٍ مُسْلِمٍ إِلَّا بِطِيبِ نَفْسِهِ",
      "translation": "Müslümanın malı, rızası dışında helâl değildir.",
      "topics": [
        "property",
        "ethics",
        "trade"
      ],
      "context": "Mülkiyet haklarının mutlak korunması; kimsenin serveti, gerçek rıza olmadan alınamaz. Eşlerin bağımsız mali haklarını koruyarak, kadın ve erkeklere eşit şekilde uygulanır.",
      "relatedIds": [
        17,
        201
      ],
      "strength": "sahih",
      "collection": "Burada"
    },
    {
      "id": 231,
      "type": "hadith",
      "reference": "Sahih Muslim 1536",
      "arabic": "نَهَى رَسُولُ اللَّهِ عَنِ الْمُحَاقَلَةِ وَالْمُزَابَنَةِ",
      "translation": "Allah Resulü, muhakâleyi (hasat edilmiş tahıl karşılığında hasat edilmemiş tahılın satılmasını) ve müzâbeneyi (kuru hurma karşılığında ağaçta taze hurma satılmasını) yasaklamıştır.",
      "topics": [
        "trade",
        "market-regulation"
      ],
      "context": "Miktar belirsizliğinin çiftçiler ve tüccarlar arasında adil olmayan alışverişlere yol açtığı sömürücü tarımsal ticaret uygulamalarını önler.",
      "relatedIds": [
        195,
        172
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 232,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 2381",
      "arabic": "مَنْ كَانَتْ لَهُ أَرْضٌ فَلْيَزْرَعْهَا أَوْ لِيَمْنَحْهَا أَخَاهُ",
      "translation": "Kimin toprağı varsa onu kendisi eksin veya kardeşine versin.",
      "topics": [
        "property",
        "labor"
      ],
      "context": "Araziyi boşta bırakmaktan caydırır. Arazi, ya sahibi tarafından ya da onu yetiştirecek birine ödünç olarak verimli bir şekilde kullanılmalıdır. Verimli kullanım olmadan arazi spekülasyonunu önler.",
      "relatedIds": [
        202,
        17
      ],
      "strength": "sahih",
      "collection": "Buhari"
    },
    {
      "id": 233,
      "type": "hadith",
      "reference": "Sahih Muslim 1607",
      "arabic": "إِنَّ اللَّهَ لَمْ يُحَرِّمْ شَيْئًا إِلَّا وَقَدْ عَلِمَ أَنَّ بَعْضَ النَّاسِ سَيُصِيبُهُ ثُمَّ حَرَّمَهُ",
      "translation": "Allah, bazı kimselerin yine de bu işle meşgul olacaklarını bilmenin dışında hiçbir şeyi yasaklamamış ama yine de yasaklamıştır.",
      "topics": [
        "riba",
        "ethics"
      ],
      "context": "Yasağı korurken insanın ayartılmasını kabul eder. Bir şeyin yaygın olarak uygulanması bile onu izin verilebilir kılmaz; prensip ne olursa olsun geçerlidir.",
      "relatedIds": [
        1,
        174
      ],
      "strength": "sahih",
      "collection": "Müslüman"
    },
    {
      "id": 234,
      "type": "hadith",
      "reference": "Sunan at-Tirmidhi 1352",
      "arabic": "الصُّلْحُ جَائِزٌ بَيْنَ الْمُسْلِمِينَ إِلَّا صُلْحًا حَرَّمَ حَلَالًا أَوْ أَحَلَّ حَرَامًا",
      "translation": "Helal olanı yasaklayan veya haram olan bir şeyi caiz kılan uzlaşma dışında, Müslümanlar arasında uzlaşma caizdir.",
      "topics": [
        "governance",
        "trade",
        "ethics"
      ],
      "context": "Anlaşmazlıklar müzakere ve uzlaşma yoluyla çözülebilir, ancak çözüm İslami ilkelerin önüne geçemez. Sınırlar dahilinde özgürlük.",
      "relatedIds": [
        188,
        197
      ],
      "strength": "hasan",
      "collection": "Tirmizi"
    },
    {
      "id": 235,
      "type": "hadith",
      "reference": "Sahih al-Bukhari 3236",
      "arabic": "يُنْصِرُ الْمَظْلُومَ وَيُرْشِدُ الضَّالَّ",
      "translation": "Mazlumlara yardım edin, kaybolanlara yol gösterin.",
      "topics": [
        "governance",
        "poverty",
        "ethics"
      ],
      "context": "Ekonomik bağlamlara uygulanan genel bir sosyal adalet ilkesi: ekonomik baskıya, sömürüye ve eşitsizliğe karşı durmak.",
      "relatedIds": [
        198,
        212
      ],
      "strength": "sahih",
      "collection": "Buhari"
    }
  ]
};
