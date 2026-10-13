import type { LibraryIndexItem } from "doodle-icon/library";

// Search vocabulary stays on the server. Add language aliases here without
// changing asset IDs, package exports, or the original source attribution.
const concepts: readonly (readonly [terms: string, aliases: string])[] = [
  [
    "airplane|aeroplane|aircraft|plane|flight|jet",
    "plan|aeroplain|aeroplan|air plane|aero plane|hawai jahaj|hawaijahaj|hawai jahaz|havai jahaj|हवाई जहाज|विमान|हवाईजहाज|avion|avión|flugzeug|طائرة",
  ],
  ["helicopter|chopper", "heli|helicoptor|हेलीकॉप्टर"],
  [
    "car|automobile|taxi|vehicle",
    "auto|gadi|gaadi|gari|गाड़ी|कार|coche|voiture|سيارة",
  ],
  ["bicycle|bike|cycling", "cycle|bicycl|saikil|साइकिल|vélo|bicicleta"],
  ["motorcycle|motorbike|scooter", "moto|motor cycle|scooty|स्कूटर|मोटरसाइकिल"],
  ["train|railway|railroad|tram|metro", "rail|rel|रेल|रेलगाड़ी|ट्रेन|tren|zug"],
  ["bus|coach", "बस"],
  ["truck|lorry|delivery", "tempo|ट्रक|डिलीवरी"],
  [
    "ship|boat|sailboat|ferry|yacht",
    "jahaj|jahaz|nav|naav|नाव|जहाज|bateau|barco",
  ],
  ["rocket|spacecraft|spaceship|shuttle", "rkt|रॉकेट"],
  ["house|home|residence", "ghar|makan|makaan|घर|मकान|casa|maison|haus|منزل"],
  ["building|apartment|office", "imarat|daftar|इमारत|दफ्तर|ऑफिस"],
  [
    "school|education|classroom|graduation",
    "skool|vidyalaya|padhai|पढ़ाई|विद्यालय|स्कूल|escuela|école",
  ],
  ["book|reading|library", "kitab|kitaab|pustak|किताब|पुस्तक|libro|livre|كتاب"],
  ["student|teacher|graduate", "vidyarthi|adhyapak|छात्र|विद्यार्थी|शिक्षक"],
  [
    "hospital|medical|health|clinic|healthcare",
    "hosp|med|aspatal|sehat|swasthya|अस्पताल|स्वास्थ्य",
  ],
  ["doctor|physician|nurse", "doc|dr|daktar|डॉक्टर|चिकित्सक"],
  ["medicine|pill|capsule|pharmacy|tablet", "dawa|dawai|दवा|दवाई"],
  ["heart|love|valentine", "dil|pyar|pyaar|दिल|प्यार|corazón|coeur|قلب"],
  ["tooth|dental|dentist", "daant|dant|दांत"],
  ["eye|vision|view|visible", "aankh|ankh|आंख|आँख"],
  ["ear|hearing|listen", "kaan|kan|कान|सुनना"],
  ["brain|mind|neurology", "dimag|dimaag|दिमाग|मस्तिष्क"],
  [
    "money|cash|currency|coin|rupee|dollar|payment|wallet",
    "paisa|paise|pese|dhan|rupay|पैसा|पैसे|रुपया|रुपये|धन|dinero|argent|مال",
  ],
  ["bank|banking|atm", "bnk|बैंक"],
  [
    "shopping|shop|store|cart|basket|commerce",
    "dukan|dukaan|kharidari|दुकान|खरीदारी|tienda|magasin",
  ],
  [
    "phone|telephone|mobile|smartphone|call",
    "ph|tel|fon|fone|mob|संपर्क|फोन|फ़ोन|मोबाइल|llamada|téléphone|هاتف",
  ],
  [
    "message|chat|conversation|comment|sms",
    "msg|msgs|baat|sandesh|संदेश|बात|चैट|mensaje",
  ],
  ["email|mail|envelope|inbox", "e mail|eml|ईमेल|चिट्ठी|correo"],
  ["notification|bell|alert|alarm", "notif|noti|ghanti|घंटी|सूचना|अलर्ट"],
  [
    "calendar|date|schedule|appointment",
    "cal|calender|tarikh|tareekh|तारीख|कैलेंडर",
  ],
  ["clock|time|watch|timer", "ghadi|waqt|samay|घड़ी|समय|वक्त|reloj|horloge"],
  ["camera|photography|photo", "cam|foto|tasveer|tasvir|तस्वीर|कैमरा|फोटो"],
  ["video|movie|film|cinema", "vid|mov|वीडियो|फिल्म|फ़िल्म"],
  [
    "music|audio|song|headphone|speaker",
    "mus|gaana|gana|sangeet|गाना|संगीत|música|musique",
  ],
  ["microphone|mic|record", "mike|माइक"],
  ["image|picture|gallery|landscape", "img|pic|pics|chitra|चित्र|फोटोगैलरी"],
  [
    "computer|desktop|monitor|laptop",
    "pc|comp|cmptr|कंप्यूटर|लैपटॉप|ordinateur|computadora",
  ],
  ["keyboard|typing", "kbd|kb|कीबोर्ड"],
  ["mouse|cursor|pointer", "माउस|कर्सर"],
  ["wifi|wireless|internet|network|router", "wi fi|net|वाईफाई|इंटरनेट"],
  ["database|data|server|storage", "db|dbase|डेटाबेस|सर्वर"],
  [
    "artificial intelligence|robot|brain|automation|machine learning",
    "ai|ml|bot|कृत्रिम बुद्धिमत्ता|रोबोट",
  ],
  [
    "code|programming|developer|terminal|software",
    "dev|prog|coding|कोड|प्रोग्रामिंग",
  ],
  [
    "settings|gear|cog|configure|adjust",
    "setting|config|cfg|seting|सेटिंग|सेटिंग्स",
  ],
  [
    "search|magnify|magnifier|find|zoom",
    "srch|khoj|dhundho|dhundo|खोज|ढूंढो|खोजें|buscar|recherche",
  ],
  ["menu|hamburger|navigation|bars", "nav menu|मेनू|नेविगेशन"],
  [
    "user|person|profile|account|avatar",
    "usr|insaan|admi|aadmi|व्यक्ति|आदमी|यूजर|usuario",
  ],
  ["users|people|group|team|community", "log|teamwork|लोग|समूह|टीम"],
  ["woman|female|girl", "ladki|aurat|mahila|लड़की|महिला|औरत"],
  ["man|male|boy", "ladka|purush|लड़का|पुरुष"],
  ["child|kid|baby|infant", "bacha|bachcha|baccha|बच्चा|बच्चे"],
  [
    "lock|security|secure|password|shield",
    "pwd|pass|tala|taala|suraksha|ताला|सुरक्षा|पासवर्ड",
  ],
  ["key|unlock", "chabi|chabhi|चाबी"],
  ["document|file|paper|pdf", "docs|docu|kagaz|kaagaz|दस्तावेज|कागज|कागज़"],
  ["folder|directory", "dir|फोल्डर"],
  ["download|save|import", "dl|dwnld|डाउनलोड|सेव"],
  ["upload|export|share", "ul|upld|अपलोड|शेयर"],
  ["delete|trash|bin|remove", "del|rm|dustbin|kachra|कचरा|हटाओ|मिटाओ"],
  ["edit|pencil|pen|write", "likho|kalam|कलम|लिखो|संपादन"],
  ["plus|add|create", "new|jodo|जोड़ो|नया"],
  ["check|tick|success|done|confirm", "ok|sahi|सही|ठीक"],
  ["close|cross|cancel|error", "band|galat|बंद|गलत"],
  ["location|map|pin|gps|compass", "loc|jagah|jgah|naksha|pata|जगह|नक्शा|पता"],
  ["tree|forest|wood|pine", "ped|per|vriksh|पेड़|वृक्ष|arbre|árbol"],
  ["flower|blossom|bloom|floral", "phool|ful|fool|फूल|पुष्प|flor|fleur"],
  ["leaf|plant|nature|garden", "patta|paudha|patte|पत्ता|पौधा|प्रकृति"],
  ["sun|sunshine|sunrise|sunset", "suraj|sooraj|सूरज|सूर्य|sol|soleil"],
  ["moon|lunar|crescent", "chand|chaand|चाँद|चांद|चंद्रमा|luna|lune"],
  ["star|sparkle", "tara|taara|तारा|सितारा|estrella|étoile"],
  [
    "water|drop|droplet|rain",
    "pani|paani|barish|baarish|पानी|बारिश|जल|agua|eau",
  ],
  ["cloud|weather", "badal|baadal|mausam|बादल|मौसम|nuage|nube"],
  ["fire|flame|hot", "aag|agni|आग|अग्नि|fuego|feu"],
  ["dog|puppy|canine", "kutta|कुत्ता|perro|chien"],
  ["cat|kitten|feline", "billi|बिल्ली|gato|chaton"],
  ["bird|sparrow|parrot|pigeon", "chidiya|pakshi|चिड़िया|पक्षी|oiseau|pájaro"],
  ["fish|fishing|seafood", "machli|machhli|मछली|pez|poisson"],
  ["cow|cattle", "gai|gaay|गाय"],
  ["elephant", "hathi|haathi|हाथी"],
  ["lion|tiger", "sher|baagh|शेर|बाघ"],
  ["horse|pony", "ghoda|घोड़ा"],
  ["rabbit|bunny", "khargosh|खरगोश"],
  ["snake|serpent", "saap|saanp|साँप|सांप"],
  ["butterfly|insect|bug|bee", "titli|keet|madhumakhi|तितली|कीट|मधुमक्खी"],
  [
    "food|meal|restaurant|dining|utensils",
    "khana|khaana|bhojan|खाना|भोजन|comida|nourriture",
  ],
  ["coffee|tea|cup|mug", "chai|chaay|kafi|चाय|कॉफी|café|thé"],
  ["apple|fruit|banana|orange", "phal|seb|kela|फल|सेब|केला"],
  ["cake|dessert|birthday", "bday|janamdin|जन्मदिन|केक"],
  ["gift|present|celebration", "tohfa|uphar|उपहार|तोहफा|regalo|cadeau"],
  ["sport|fitness|exercise|gym|running", "khel|kasrat|vyayam|खेल|कसरत|व्यायाम"],
  ["football|soccer|ball", "फुटबॉल|गेंद|fútbol"],
  ["flag|banner", "jhanda|झंडा"],
  ["light|bulb|lamp|idea", "roshni|batti|रोशनी|बत्ती|बल्ब"],
  ["battery|power|charging|electric", "bijli|bijlee|बिजली|बैटरी"],
  ["arrow|direction", "teer|disha|तीर|दिशा"],
  [
    "interface|navigation|layout|dashboard",
    "ui|ux|interface design|इंटरफेस|डैशबोर्ड",
  ],
  ["arrows|directions", "arw|तीर के निशान|दिशाएं"],
  ["communication|social", "social media|समाज|संचार|बातचीत"],
  ["enterprise|business|briefcase", "biz|vyapar|karobar|व्यापार|कारोबार"],
  ["saas|cloud|hosting", "software as a service|क्लाउड|होस्टिंग"],
  ["commerce|ecommerce", "e commerce|online shopping|ऑनलाइन खरीदारी"],
  ["finance|investment|profit|budget", "fin|nivesh|munafa|निवेश|मुनाफा|वित्त"],
  ["health|healthcare", "swasth|aarogya|aarogy|सेहत|आरोग्य"],
  ["education|learning|training", "edu|shiksha|सीखना|शिक्षा"],
  [
    "devices|electronics|technology",
    "tech|electronic|taknik|उपकरण|तकनीक|इलेक्ट्रॉनिक्स",
  ],
  ["development|engineering", "engg|engr|इंजीनियरिंग|विकास"],
  ["security|privacy|protection", "sec|surakshit|गोपनीयता|सुरक्षित"],
  ["files|productivity", "file management|utpadakta|फ़ाइलें|उत्पादकता"],
  ["media|multimedia|broadcast", "मीडिया|प्रसारण"],
  ["design|craft|art|palette", "graphic design|kala|कला|कारीगरी|डिजाइन"],
  ["people|characters|human", "ppl|manav|insan|मानव|इंसान|लोगों"],
  [
    "travel|trip|tourism|vacation",
    "safar|yatra|ghumna|यात्रा|सफर|घूमना|छुट्टी",
  ],
  ["transport|vehicles|traffic", "vahan|parivahan|वाहन|परिवहन|यातायात"],
  ["nature|environment|ecology", "prakriti|paryavaran|प्रकृति|पर्यावरण"],
  ["animals|wildlife|pets", "janwar|jaanwar|pashu|जानवर|पशु|पालतू"],
  ["food|drink|beverage", "nashta|bhojan|नाश्ता|पेय"],
  ["sports|recreation|game", "gaming|खेलकूद|मनोरंजन"],
  ["home|architecture|housing", "vastu|vaastu|vastukala|आवास|वास्तुकला"],
  [
    "industry|factory|manufacturing",
    "industrial|udyog|karkhana|उद्योग|कारखाना",
  ],
  [
    "science|mathematics|math|experiment",
    "sci|maths|vigyan|ganit|विज्ञान|गणित|प्रयोग",
  ],
  [
    "space|astronomy|universe|galaxy",
    "antariksh|brahmand|अंतरिक्ष|ब्रह्मांड|खगोल",
  ],
  [
    "brands|logo|company|corporate",
    "brand logos|comp logo|kampani|कंपनी|ब्रांड|लोगो",
  ],
  [
    "wireframe|mesh|torus|surface",
    "3d wireframe|wire frame|jaali|जाली|वायरफ्रेम",
  ],
  ["isometric|dimensional", "iso|2 5d|ढाई आयामी|आइसोमेट्रिक"],
  ["abstract|geometric|geometry|pattern", "geo|jyamiti|ज्यामिति|आकृति|पैटर्न"],
  ["instagram", "ig|insta|इंस्टाग्राम"],
  ["facebook", "fb|फेसबुक"],
  ["youtube", "yt|यूट्यूब"],
  ["whatsapp", "wa|wapp|व्हाट्सएप|व्हाट्सऐप"],
  ["linkedin", "linked in|लिंक्डइन"],
  ["openai|chatgpt", "gpt|chat gpt|चैटजीपीटी"],
  ["calculator|calculation", "calc|calci|hisab|hisaab|हिसाब|कैलकुलेटर"],
  [
    "chart|graph|analytics|statistics",
    "stats|stat|analysis|aankde|आंकड़े|विश्लेषण",
  ],
  [
    "credit card|debit card|payment card",
    "cc|dc|bank card|क्रेडिट कार्ड|डेबिट कार्ड",
  ],
  ["invoice|receipt|bill", "rcpt|rasid|raseed|रसीद|बिल"],
  ["percentage|discount|sale", "pct|percent|chhoot|छूट|प्रतिशत"],
  ["coin|coins|currency", "sikka|sikke|सिक्का|सिक्के|मुद्रा"],
  ["trophy|medal|award|prize", "inaam|inam|puraskar|इनाम|पुरस्कार|पदक"],
  ["meeting|presentation|conference", "meet|mtg|baithak|बैठक|प्रस्तुति"],
  ["target|goal|aim", "lakshya|nishana|लक्ष्य|निशाना"],
  ["startup|growth|launch", "start up|tarakki|वृद्धि|तरक्की"],
  ["handshake|agreement|contract", "deal|samjhauta|समझौता|अनुबंध"],
  [
    "api|integration|connection",
    "application programming interface|जोड़ना|एकीकरण",
  ],
  ["git|branch|commit|merge", "version control|vcs|संस्करण"],
  ["bug|debug|fix|repair", "debugging|kharabi|marammat|खराबी|मरम्मत"],
  ["cpu|processor|chip|microchip", "proc|प्रोसेसर|चिप"],
  ["usb|drive|flash|disk", "pendrive|pen drive|hdd|ssd|यूएसबी|पेनड्राइव"],
  ["printer|printing|print", "prnt|chaap|chhapai|छपाई|प्रिंटर"],
  ["qr|barcode|scan", "qr code|scanner|स्कैन|बारकोड"],
  [
    "fingerprint|biometric|authentication",
    "auth|biometrics|ungli|फिंगरप्रिंट|प्रमाणीकरण",
  ],
  ["certificate|badge|verified", "cert|praman|प्रमाणपत्र|सत्यापित"],
  ["backup|restore|recovery", "bkp|recover|बैकअप|पुनर्स्थापना"],
  ["kidney|renal|urology", "kidni|gurda|गुर्दा|किडनी"],
  ["lung|lungs|pulmonary", "fefda|phephda|फेफड़ा|फेफड़े"],
  ["liver|hepatic|hepatology", "jigar|yakrit|जिगर|यकृत"],
  ["stomach|digestive|gastric", "pet|pait|पेट|पाचन"],
  ["bone|skeleton|orthopedic", "haddi|हड्डी|कंकाल"],
  ["blood|donation|hematology", "khoon|khun|rakta|खून|रक्त"],
  ["syringe|injection|vaccine", "inj|tika|teeka|टीका|इंजेक्शन"],
  ["thermometer|temperature|fever", "temp|bukhar|tapman|बुखार|तापमान"],
  ["wheelchair|disability|accessibility", "a11y|divyang|दिव्यांग|व्हीलचेयर"],
  ["bandage|first aid|emergency", "patti|marham|पट्टी|प्राथमिक उपचार|आपातकाल"],
  ["scissors|cut|cutting", "kainchi|kainchee|कैंची|काटना"],
  ["needle|sewing|stitch", "sui|silai|सुई|सिलाई"],
  ["thread|yarn|knitting", "dhaga|dhaaga|oon|धागा|ऊन|बुनाई"],
  [
    "shirt|clothing|clothes|dress",
    "tshirt|t shirt|kapda|kapde|कपड़ा|कपड़े|पोशाक",
  ],
  ["ruler|measure|measurement", "scale ruler|maap|nap|माप|नाप"],
  ["brush|paint|painting", "rang|rangna|रंग|चित्रकारी"],
  ["cube|box|cuboid", "ghan|घन|डिब्बा"],
  ["circle|round|sphere", "gol|gola|vritt|गोल|गोला|वृत्त"],
  ["triangle|pyramid", "tribhuj|त्रिभुज|पिरामिड"],
  ["square|rectangle", "varg|aayat|वर्ग|आयत"],
  ["wave|ripple|frequency", "lahar|lehar|tarang|लहर|तरंग"],
  ["atom|molecule|chemical|chemistry", "chem|anu|paramanu|अणु|परमाणु|रसायन"],
  ["magnet|magnetic", "chumbak|चुंबक"],
  [
    "telescope|astronaut|satellite|orbit",
    "durbin|doorbeen|upgrah|दूरबीन|अंतरिक्ष यात्री|उपग्रह|कक्षा",
  ],
  ["planet|solar system", "grah|ग्रह|सौर मंडल"],
  ["sewing machine", "silai machine|सिलाई मशीन"],
  ["engine|machine|motor", "mtr|yantra|इंजन|यंत्र|मशीन"],
  ["wrench|spanner|tool|tools", "auzar|औजार|पाना"],
  ["hammer|construction", "hathoda|nirman|हथौड़ा|निर्माण"],
  ["solar|renewable|wind|energy", "urja|oorja|ऊर्जा|सौर|नवीकरणीय"],
  [
    "electricity|circuit|resistor|capacitor",
    "ckt|vidyut|विद्युत|सर्किट|प्रतिरोधक|संधारित्र",
  ],
  ["bed|sleep|bedroom", "bistar|neend|सोना|बिस्तर|नींद"],
  ["chair|seat|furniture", "kursi|कुर्सी|फर्नीचर"],
  ["table|desk", "mez|mej|मेज़|मेज"],
  ["door|entrance|exit", "darwaza|darvaza|दरवाजा|प्रवेश|निकास"],
  ["window", "khidki|खिड़की"],
  ["stairs|ladder|elevator", "lift|seedhi|sidhi|सीढ़ी|लिफ्ट"],
  ["bridge|road|highway|street", "pul|sadak|rasta|पुल|सड़क|रास्ता"],
  ["mountain|hill|peak", "pahad|pahaad|पहाड़|पहाड़|पर्वत"],
  ["beach|ocean|sea|island", "samundar|samudra|समुद्र|समुंदर|द्वीप"],
  ["umbrella|raincoat", "chata|chhata|छाता"],
  ["snow|snowflake|ice|winter", "baraf|barf|sardi|बर्फ|सर्दी"],
  ["turtle|tortoise", "kachua|कछुआ"],
  ["frog", "mendhak|मेंढक"],
  ["owl", "ullu|उल्लू"],
  ["deer", "hiran|हिरण"],
  ["bread|sandwich|toast", "roti|रोटी|ब्रेड"],
  ["rice|bowl", "chawal|चावल|कटोरा"],
  ["pizza|burger|hamburger", "pizaa|पिज्जा|बर्गर"],
  ["spoon|fork|knife|cutlery", "chammach|kanta|chaku|चम्मच|कांटा|चाकू"],
  ["bottle|glass", "botal|gilas|बोतल|गिलास"],
  ["cricket|bat", "kriket|क्रिकेट|बल्ला"],
  ["swimming|pool|swim", "tairna|तैरना|तैराकी"],
  ["yoga|meditation", "yog|dhyan|योग|ध्यान"],
  ["outline|linear", "line art|rekha|रेखा|आउटलाइन"],
  ["solid|filled", "fill icon|bhara|भरा|ठोस"],
];

export function normalizeSearch(value: string): string {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}
const stopWords = new Set(
  "icon icons symbol symbols please show find me a an the of for mujhe mera meri ek ka ki ke ko wala wali wale chahiye dikhao दिखाओ चाहिए मुझे का की के वाला वाली एक आइकन".split(
    " ",
  ),
);
const aliasGroups = new Map<string, readonly string[]>();
for (const [terms, aliases] of concepts) {
  const values = terms.split("|").map(normalizeSearch);
  for (const alias of [...values, ...aliases.split("|").map(normalizeSearch)])
    aliasGroups.set(alias, [
      ...new Set([...(aliasGroups.get(alias) ?? []), ...values]),
    ]);
}
interface SearchUnit {
  input: string;
  alternatives: readonly string[];
}
interface SearchResult<T> {
  items: readonly T[];
  relatedTerms: readonly string[];
}
type SearchItem = Pick<
  LibraryIndexItem,
  "id" | "name" | "originalName" | "category" | "sourceName" | "style"
>;

// One insertion, deletion, substitution, or adjacent transposition. Short
// searches use prefixes/known abbreviations, never broad fuzzy matching.
function oneEditApart(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  if (i === a.length) return b.length === a.length + 1;
  if (a.length === b.length)
    return (
      a.slice(i + 1) === b.slice(i + 1) ||
      (a[i] === b[i + 1] &&
        a[i + 1] === b[i] &&
        a.slice(i + 2) === b.slice(i + 2))
    );
  return a.length > b.length
    ? a.slice(i + 1) === b.slice(i)
    : a.slice(i) === b.slice(i + 1);
}

export function createCatalogSearch<T extends SearchItem>(
  items: readonly T[],
): (query: string) => SearchResult<T> {
  const documents = items.map((item) => ({
    item,
    name: normalizeSearch(item.name),
    compact: normalizeSearch(item.name).replace(/ /g, ""),
    acronym: normalizeSearch(item.name)
      .split(" ")
      .filter(
        (word) =>
          !/^(fill|filled|line|outline|regular|bold|linear|duotone|\d+)$/.test(
            word,
          ),
      )
      .map((word) => word[0])
      .join(""),
    words: [
      ...new Set(
        normalizeSearch(`${item.name} ${item.originalName}`).split(" "),
      ),
    ],
    context: normalizeSearch(
      `${item.category} ${item.sourceName} ${item.style}`,
    ).split(" "),
  }));
  const vocabulary = [
    ...new Set(documents.flatMap((document) => document.words)),
  ];
  const vocabularySet = new Set(vocabulary);
  const byId = new Map(items.map((item) => [item.id, item]));
  const compactNames = new Set(documents.map((document) => document.compact));
  return (query: string): SearchResult<T> => {
    const exactId = byId.get(query.trim().toLowerCase());
    if (exactId) return { items: [exactId], relatedTerms: [] };
    const normalized = normalizeSearch(query).slice(0, 100);
    const words = normalized.split(" ").filter(Boolean);
    const units: SearchUnit[] = [];
    const related = new Set<string>();
    for (let position = 0; position < words.length; position++) {
      let input = words[position] ?? "",
        alternatives: readonly string[] = [];
      for (
        let length = Math.min(3, words.length - position);
        length > 0;
        length--
      ) {
        const phrase = words.slice(position, position + length).join(" ");
        const group =
          aliasGroups.get(phrase) ??
          aliasGroups.get(phrase.endsWith("s") ? phrase.slice(0, -1) : phrase);
        if (group) {
          input = phrase;
          alternatives = group;
          position += length - 1;
          break;
        }
      }
      if (stopWords.has(input)) continue;
      if (
        !alternatives.length &&
        input.length >= 4 &&
        /^[a-z]+$/.test(input) &&
        !vocabularySet.has(input) &&
        !compactNames.has(input) &&
        !vocabulary.some((word) => word.startsWith(input))
      ) {
        alternatives = vocabulary.filter((word) => oneEditApart(input, word));
        alternatives = [
          ...new Set(
            alternatives.flatMap((word) => [
              word,
              ...(aliasGroups.get(word) ?? []),
            ]),
          ),
        ];
      }
      for (const term of alternatives) if (term !== input) related.add(term);
      units.push({ input, alternatives });
    }
    if (!units.length) return { items, relatedTerms: [] };
    const scoreTerm = (
      term: string,
      document: (typeof documents)[number],
      allowPrefix: boolean,
    ): number => {
      if (document.name === term) return 160;
      if (allowPrefix && document.compact === term.replace(/ /g, ""))
        return 150;
      if (
        allowPrefix &&
        !aliasGroups.has(term) &&
        term.length >= 2 &&
        term.length <= 5 &&
        document.acronym === term
      )
        return 60;
      if (term.includes(" "))
        return ` ${document.name} `.includes(` ${term} `) ? 110 : 0;
      if (document.words.includes(term)) return 100;
      if (
        allowPrefix &&
        term.length >= 2 &&
        document.words.some((word) => word.startsWith(term))
      )
        return 45;
      if (document.context.includes(term)) return 15;
      return 0;
    };
    const ranked = documents
      .flatMap((document) => {
        let score = document.name === normalized ? 300 : 0;
        for (const unit of units) {
          const direct = scoreTerm(unit.input, document, true);
          const expanded = Math.max(
            0,
            ...unit.alternatives.map((term) =>
              scoreTerm(term, document, false),
            ),
          );
          const match = Math.max(direct, expanded ? expanded - 5 : 0);
          if (!match) return [];
          score += match;
        }
        return [{ item: document.item, score }];
      })
      .sort(
        (a, b) =>
          b.score - a.score ||
          a.item.name.length - b.item.name.length ||
          a.item.id.localeCompare(b.item.id),
      );
    return {
      items: ranked.map((result) => result.item),
      relatedTerms: [...related].slice(0, 5),
    };
  };
}
