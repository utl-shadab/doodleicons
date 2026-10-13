import type { LibraryCategoryId } from "../packages/core/src/library/categories.js";
export const sourceSets = [
  "tabler",
  "hugeicons",
  "lucide",
  "icon-park-outline",
  "ri",
  "mdi",
  "ph",
  "healthicons",
  "game-icons",
  "simple-icons",
  "solar",
  "mingcute",
  "streamline",
  "fluent",
  "carbon",
] as const;
export const categoryRules: Partial<Record<LibraryCategoryId, string>> = {
  interface:
    "layout|menu|hamburger|sidebar|panel|grid|list|tab|toggle|switch|button|select|check-box|checkbox|radio|cursor|drag|resize|navigation|window|app-window|view|carousel|screen-full|screen-normal",
  arrows:
    "arrow|chevron|caret|direction|sort|align|indent|shuffle|undo|redo|expand|shrink|rotate|flip|swap|refresh|reload|return|rewind|forward|transfer",
  communication:
    "message|chat|comment|mail|inbox|send|share|broadcast|rss|notification|bell|megaphone|phone-call|telephone|at-sign|hashtag|mention|conversation|contact|call|speakerphone",
  enterprise:
    "briefcase|business|office|company|organization|presentation|project|strategy|target|goal|chart|graph|diagram|workflow|network|hierarchy|team|meeting|conference|report|analytics|dashboard|calendar|schedule|clipboard|contract|handshake|campaign|poll|survey",
  saas: "cloud|server|database|data|api|web|browser|dashboard|widget|app|integration|plugin|service|subscription|sync|storage|network|connection|automation|workflow|stack|layers|container|deploy|host|route|session|activity|performance|monitor|settings|configuration|backup",
  commerce:
    "shop|store|shopping|cart|basket|bag|product|package|box|barcode|qr|receipt|tag|discount|coupon|sale|delivery|truck|gift|inventory|warehouse|stock|return|checkout|purchase|cash|wallet|credit-card|payment|shipping|hanger|dress|shirt|shoe|clothes|sneaker|jewel|diamond|ring",
  finance:
    "bank|money|coin|cash|currency|dollar|euro|pound|rupee|yen|bitcoin|wallet|credit|debit|payment|finance|financial|fund|stock|chart|graph|trend|exchange|calculator|percent|receipt|invoice|tax|vault|safe|account|balance|scale|piggy|savings|insurance",
  health:
    "health|medical|medicine|hospital|clinic|doctor|nurse|patient|heart|pulse|pill|capsule|syringe|vaccine|blood|bandage|stethoscope|anatomy|brain|bone|tooth|teeth|dental|lung|kidney|liver|stomach|ear|eye|nose|skull|dna|virus|bacteria|first-aid|wheelchair|ambulance|mask|thermometer|gynecology|x-ray|ambulatory",
  education:
    "school|student|education|graduation|book|library|read|learn|notebook|pencil|pen|write|writing|ruler|abacus|alphabet|letter|number|math|calculator|blackboard|chalk|teacher|teach|trophy|medal|award|certificate|badge|knowledge|lightbulb|bulb|backpack|puzzle|exam|test|language|translate|globe",
  devices:
    "device|mobile|phone|smartphone|tablet|ipad|computer|laptop|desktop|monitor|keyboard|mouse|trackpad|printer|scanner|cpu|chip|usb|bluetooth|wifi|router|modem|memory|ram|hard-drive|harddisk|disc|floppy|battery|charger|charging|headphone|earphone|earbud|watch|airpod|camera|webcam|speaker|joystick|gamepad|tv|television|projector|remote",
  development:
    "code|coding|terminal|command|console|program|developer|debug|bug|git|branch|merge|commit|pull-request|fork|binary|bracket|function|variable|regex|regex|algorithm|codepen|css|html|javascript|typescript|python|json|xml|sql|markdown|docker|kubernetes|npm|nodejs|react|vue|angular|component|package|puzzle|test|inspect|wrench|circuit|resistor|capacitor|diode|transistor|logic",
  security:
    "shield|lock|unlock|key|password|passkey|fingerprint|biometric|security|privacy|private|protect|verified|verification|certificate|badge|user-check|user-lock|user-shield|scan|id-card|identity|passport|authentication|auth|safe|firewall|guard|captcha|vpn|incognito|cctv|surveillance|spy|police|warning|alert|siren",
  files:
    "file|document|folder|archive|note|clipboard|paperclip|attachment|attach|bookmark|task|checklist|todo|calendar|schedule|clock|timer|hourglass|history|progress|check|copy|paste|duplicate|save|floppy|edit|delete|trash|filter|search|find|magnif|zoom|link|pin|reminder|stapler",
  media:
    "music|audio|sound|volume|speaker|microphone|mic|record|headphone|earbud|earphone|podcast|radio|play|pause|stop|recording|equalizer|waveform|video|movie|film|cinema|camera|photo|picture|image|gallery|album|guitar|piano|drum|violin|trumpet|saxophone|instrument|playlist|disc|cd|vinyl|reel|clapper|broadcast",
  design:
    "brush|paint|palette|color|colour|gradient|swatch|crop|bezier|vector|pen-tool|path|anchor|ruler|compass|scissor|sew|needle|thread|yarn|knit|thimble|fabric|mannequin|design|draw|sketch|pencil|eraser|shape|polygon|rectangle|circle|square|triangle|hexagon|pentagon|texture|pattern|typography|font|text|letter-spacing|line-height|blend|contrast|brightness|wand",
  people:
    "user|person|people|human|man|woman|boy|girl|baby|child|family|parent|mother|father|elder|couple|friend|group|team|avatar|face|smile|smiley|emoji|emotion|happy|sad|angry|cry|laugh|hand|finger|thumb|gesture|accessibility|walk|run|stand|sit|body|head|hair|beard|mustache|moustache|dancer|dance|yoga|meditation",
  travel:
    "travel|map|location|pin|marker|compass|gps|navigation|route|road|sign|direction|world|globe|earth|flag|landmark|monument|tower|castle|palace|pyramid|lighthouse|eiffel|statue|bridge|hotel|motel|bed|suitcase|luggage|passport|ticket|tent|camp|beach|island|mountain|hiking|backpack|adventure|tour|vacation|holiday|airport|station|harbor|port|parking|restroom",
  transport:
    "car|bus|truck|van|vehicle|taxi|tram|train|rail|metro|subway|underground|locomotive|bicycle|bike|motorcycle|motorbike|scooter|plane|airplane|aircraft|helicopter|ship|boat|yacht|sail|ferry|submarine|rocket|tractor|forklift|excavator|bulldozer|crane|ambulance|firetruck|wheel|tire|tyre|engine|gearshift|steering|traffic|road|fuel|gas-station|petrol|charging-station|caravan|trailer|skateboard|skate|sleigh|sled|kayak|canoe|drone",
  nature:
    "tree|leaf|leaves|plant|flower|rose|tulip|lotus|daisy|sunflower|clover|palm|pine|cactus|seed|sprout|sapling|grass|moss|fern|wood|forest|jungle|vine|mushroom|bamboo|bonsai|blossom|petal|wheat|cotton|crop|fruit|acorn|pinecone|pine-cone|garden|watering|water|river|lake|ocean|sea|wave|mountain|hill|rock|stone|sun|moon|cloud|rain|snow|wind|storm|thunder|lightning|weather|rainbow|hurricane|tornado|ecology|eco|recycle|sustainab|environment|earth|globe|fire",
  animals:
    "animal|bird|cat|dog|pet|paw|owl|fox|wolf|bear|lion|tiger|leopard|cheetah|elephant|giraffe|zebra|horse|pony|unicorn|deer|moose|elk|reindeer|antelope|rabbit|bunny|hare|mouse|rat|squirrel|hedgehog|raccoon|badger|skunk|beaver|otter|seal|walrus|dolphin|whale|shark|fish|octopus|squid|crab|lobster|shrimp|prawn|seahorse|jellyfish|shell|turtle|tortoise|frog|toad|snake|lizard|crocodile|alligator|gecko|chameleon|dinosaur|dragon|butterfly|moth|bee|beetle|bug|ant|fly|dragonfly|spider|scorpion|worm|snail|slug|ladybug|ladybird|mantis|cricket|grasshopper|centipede|millipede|rooster|chicken|hen|duck|goose|swan|eagle|hawk|falcon|parrot|toucan|penguin|puffin|pigeon|dove|crow|raven|robin|sparrow|hummingbird|flamingo|ostrich|turkey|vulture|woodpecker|stork|pelican|kiwi|bat|monkey|gorilla|orangutan|chimp|panda|koala|kangaroo|camel|llama|alpaca|pig|boar|cow|bull|ox|buffalo|bison|goat|sheep|ram|hippo|rhino|tapir|capybara|hamster|guinea|ferret|porcupine|platypus|sloth|armadillo|mammoth",
  food: "food|drink|eat|meal|restaurant|dining|kitchen|cook|chef|bread|toast|croissant|bagel|pretzel|pizza|burger|sandwich|taco|burrito|sushi|rice|noodle|pasta|spaghetti|steak|meat|bacon|sausage|egg|cheese|milk|butter|apple|pear|peach|banana|orange|lemon|lime|grape|berry|cherry|melon|avocado|coconut|pineapple|mango|carrot|potato|tomato|onion|garlic|pepper|cucumber|broccoli|cabbage|corn|bean|pea|salad|soup|bowl|plate|fork|spoon|knife|chopstick|cup|mug|coffee|tea|bottle|wine|beer|cocktail|soda|juice|watermelon|candy|cake|cookie|biscuit|chocolate|ice-cream|dessert|donut|doughnut|honey|salt|spice|sugar|nut|peanut|walnut|almond|chestnut|popcorn|grill|oven|stove|fridge|refrigerator|kettle|blender|toaster",
  sports:
    "sport|ball|football|soccer|basketball|baseball|volleyball|tennis|badminton|golf|hockey|cricket|rugby|bowling|billiard|pool|dumbbell|weight|fitness|gym|exercise|yoga|meditation|run|walk|cycling|swim|surf|ski|snowboard|skate|boxing|karate|judo|wrestling|fencing|archery|target|dart|chess|dice|poker|game|puzzle|trophy|medal|podium|flag|racing|race|helmet|goggles|whistle|stopwatch|timer|camp|climb|hiking|fishing|diving|parachute|kite|playground|swing|seesaw",
  home: "home|house|building|apartment|architecture|architect|city|village|cottage|bungalow|villa|mansion|castle|palace|skyscraper|tower|office|warehouse|factory|barn|garage|church|mosque|temple|synagogue|school|hospital|hotel|store|shop|door|window|wall|roof|chimney|stairs|staircase|elevator|floor|room|bed|chair|sofa|couch|armchair|table|desk|furniture|cabinet|drawer|shelf|shelves|wardrobe|closet|lamp|light|chandelier|fan|air-condition|heater|fireplace|radiator|bathtub|bath|shower|toilet|sink|tap|faucet|mirror|curtain|blinds|carpet|rug|pillow|cushion|blanket|vase|flower-pot|plant-pot|fence|gate|balcony|terrace|garden|broom|clean|vacuum|mop|laundry|washing|iron",
  industry:
    "industry|industrial|factory|manufactur|warehouse|construction|building|crane|excavator|bulldozer|forklift|truck|tractor|tool|hammer|wrench|spanner|screw|bolt|nut|nail|drill|saw|axe|pick|pliers|shovel|spade|rake|trowel|level|ruler|measure|tape|helmet|hard-hat|gear|cog|machine|engine|motor|pump|pipe|valve|gauge|pressure|temperature|thermometer|electric|electr|power|energy|battery|plug|socket|outlet|switch|circuit|cable|wire|antenna|tower|solar|windmill|turbine|oil|gas|fuel|petrol|barrel|container|pallet|brick|concrete|steel|metal|magnet|recycle|trash|waste",
  science:
    "science|scientist|research|laboratory|lab|flask|beaker|test-tube|tube|chemical|chemistry|atom|molecule|dna|microscope|telescope|magnet|magnetic|radiation|radioactive|nuclear|biohazard|bacteria|virus|cell|petri|thermometer|temperature|scale|balance|ruler|measure|compass|caliper|gauge|pi|sigma|sum|infinity|math|plus|minus|divide|multiply|equal|percent|fraction|square-root|integral|function|formula|calculator|abacus|number|numeric|chart|graph|geometry|triangle|circle|polygon|cube|sphere|prism|cone|pyramid|cylinder",
  space:
    "space|astronaut|cosmonaut|rocket|satellite|planet|orbit|solar|sun|moon|star|comet|meteor|asteroid|galaxy|universe|cosmos|telescope|observatory|alien|ufo|earth|globe|world|mars|venus|mercury|jupiter|saturn|neptune|uranus|pluto|eclipse|constellation|zodiac|aries|taurus|gemini|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces",
};
export function matchesCategory(
  name: string,
  category: LibraryCategoryId,
): boolean {
  const rule = categoryRules[category];
  return (
    !!rule &&
    new RegExp(`(?:^|-)(?:${rule})(?:s|es|ing|ed)?(?:-|$)`, "i").test(name)
  );
}
