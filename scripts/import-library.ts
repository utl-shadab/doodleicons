import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { XMLParser } from "fast-xml-parser";
import type { IconifyJSON, IconifyInfo } from "@iconify/types";
import {
  libraryCategories,
  type LibraryCategoryId,
} from "../packages/core/src/library/categories.js";
import type {
  LibraryIcon,
  LibrarySource,
  LibraryNode,
  LibraryAttribute,
  LibraryTag,
  LibraryStyle,
} from "../packages/core/src/library/types.js";
import { sourceSets, matchesCategory } from "./library-rules.js";
import {
  generateWireframe,
  generateIsometric,
  generateAbstract,
  generateObj,
} from "./library-generative.js";
const root = new URL("../", import.meta.url);
const at = (path: string) => new URL(path, root);
const parser = new XMLParser({
  preserveOrder: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
  parseAttributeValue: false,
  processEntities: false,
});
const tags = new Set([
  "g",
  "path",
  "rect",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
]);
const attributes = new Set([
  "d",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "x",
  "y",
  "x1",
  "x2",
  "y1",
  "y2",
  "width",
  "height",
  "points",
  "fill",
  "stroke",
  "strokeWidth",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeDasharray",
  "strokeDashoffset",
  "opacity",
  "fillOpacity",
  "strokeOpacity",
  "fillRule",
  "clipRule",
  "transform",
]);
const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
function nodes(value: unknown): LibraryNode[] {
  if (!Array.isArray(value)) throw new Error("SVG nodes must be an array");
  return value.map((item: unknown): LibraryNode => {
    if (!record(item)) throw new Error("Invalid SVG node");
    const tag = Object.keys(item).find((key) => key !== ":@");
    if (!tag || !tags.has(tag))
      throw new Error(`Unsupported SVG element ${tag}`);
    const attrs: LibraryNode["attrs"] = {};
    const raw = item[":@"];
    if (record(raw))
      for (const [key, value] of Object.entries(raw)) {
        const normalized = key.replace(/-([a-z])/g, (_, letter: string) =>
          letter.toUpperCase(),
        );
        if (
          !attributes.has(normalized) ||
          (typeof value !== "string" && typeof value !== "number")
        )
          throw new Error(`Unsupported SVG attribute ${key}`);
        if (/url\s*\(|javascript:|[<>]/i.test(String(value)))
          throw new Error("External or executable SVG value");
        attrs[normalized as LibraryAttribute] = value;
      }
    const children = nodes(item[tag]);
    return {
      tag: tag as LibraryTag,
      attrs,
      ...(children.length ? { children } : {}),
    };
  });
}
function geometryHash(
  icon: Pick<LibraryIcon, "nodes" | "width" | "height">,
): string {
  const canonical = (node: LibraryNode): unknown => [
    node.tag,
    Object.entries(node.attrs)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => [
        key,
        ["fill", "stroke"].includes(key) &&
        value !== "none" &&
        value !== "transparent"
          ? "ink"
          : value,
      ]),
    node.children?.map(canonical) ?? [],
  ];
  return createHash("sha256")
    .update(
      JSON.stringify([icon.width, icon.height, icon.nodes.map(canonical)]),
    )
    .digest("hex");
}
const sources: LibrarySource[] = [];
const pool: LibraryIcon[] = [];
let unsupported = 0;
for (const source of sourceSets) {
  const set = JSON.parse(
    await readFile(
      at(`node_modules/@iconify-json/${source}/icons.json`),
      "utf8",
    ),
  ) as IconifyJSON;
  const info = JSON.parse(
    await readFile(
      at(`node_modules/@iconify-json/${source}/info.json`),
      "utf8",
    ),
  ) as IconifyInfo;
  const pkg = JSON.parse(
    await readFile(
      at(`node_modules/@iconify-json/${source}/package.json`),
      "utf8",
    ),
  ) as { version: string };
  sources.push({
    id: source,
    name: info.name,
    author: info.author.name,
    url: info.author.url ?? `https://icon-sets.iconify.design/${source}/`,
    license: info.license.spdx ?? info.license.title,
    licenseUrl:
      info.license.url ?? `https://spdx.org/licenses/${info.license.spdx}.html`,
    version: pkg.version,
  });
  for (const [name, icon] of Object.entries(set.icons)) {
    if (source === "ph" && /-(thin|light|bold)$/.test(name)) continue;
    if (source === "fluent" && !/-24-(regular|filled)$/.test(name)) continue;
    if (source === "solar" && !/-(linear|bold-duotone)$/.test(name)) continue;
    try {
      const parsed: unknown = parser.parse(icon.body);
      const tree = nodes(parsed);
      const style: LibraryStyle = /duotone/.test(name)
        ? "duotone"
        : /fill|solid|bold/.test(name) ||
            source === "game-icons" ||
            source === "simple-icons"
          ? "solid"
          : /stroke=/.test(icon.body) ||
              /outline|linear|-line$|regular/.test(name)
            ? "outline"
            : "solid";
      const base = {
        nodes: tree,
        width: icon.width ?? set.width ?? 16,
        height: icon.height ?? set.height ?? 16,
      };
      pool.push({
        ...base,
        id: `${source}-${name}`,
        name: name
          .replace(/-24-(regular|filled)$/, " $1")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        category: "interface",
        source,
        sourceName: info.name,
        sourceUrl:
          info.author.url ?? `https://icon-sets.iconify.design/${source}/`,
        license: info.license.spdx ?? info.license.title,
        originalName: name,
        style,
        geometryHash: geometryHash(base),
      });
    } catch {
      unsupported++;
    }
  }
}
const majorBrands =
  "google apple microsoft amazon meta facebook instagram whatsapp youtube tiktok x twitter linkedin pinterest snapchat telegram discord reddit slack zoom twitch spotify netflix github gitlab bitbucket openai anthropic claude googlegemini huggingface nvidia amd intel arm qualcomm samsung sony lg huawei xiaomi oneplus nokia motorola dell hp lenovo asus acer logitech razer corsair adobe figma canva sketch framer webflow wordpress shopify woocommerce squarespace wix stripe paypal visa mastercard americanexpress wise revolut klarna coinbase binance bitcoin ethereum solana cloudflare vercel netlify digitalocean heroku supabase firebase mongodb postgresql mysql redis docker kubernetes linux ubuntu debian archlinux fedora centos redhat android ios windows react nextdotjs vuedotjs angular svelte typescript javascript python rust go swift kotlin dart flutter nodedotjs npm pnpm bun deno expo electron tauri unity unrealengine blender autodesk notion obsidian evernote trello asana clickup mondaydotcom jira confluence atlassian linear airtable hubspot salesforce zendesk intercom mailchimp sendgrid twilio soundcloud applepodcasts applemusic steam epicgames roblox minecraft playstation xbox nintendo tesla ford bmw mercedesbenz audi volkswagen porsche toyota honda hyundai kia volvo ferrari lamborghini mazda suzuki renault uber lyft airbnb bookingdotcom tripadvisor expedia delta lufthansa emirates qatarairways ryanair boeing airbus nasa spacex nike adidas puma reebok underarmour newbalance asics patagonia thenorthface uniqlo hm zara gucci chanel louisvuitton rolex ikea walmart target costco ebay etsy aliexpress alibaba rakuten flipkart myntra meesho swiggy zomato doordash deliveroo ubereats starbucks mcdonalds burgerking kfc dominos pizzahut subway cocacola pepsi redbull nestle danone unilever loreal dove colgate oralb gillette duolingo coursera udemy edx khanacademy wikipedia stackoverflow leetcode hackerrank freecodecamp datacamp codecademy brilliant medium substack devdotto hashnode producthunt dribbble behance unsplash pexels pixabay shutterstock gettyimages bbc cnn reuters bloomberg forbes economist cnbc financialtimes theguardian nationalgeographic ted scratch codewars codeforces kaggle jupyter pytorch tensorflow scikitlearn keras pandas numpy scipy matplotlib plotly streamlit gradio ollama langchain llamaindex crewai zapier n8n make ifttt tableau looker grafana prometheus datadog newrelic sentry elastic opensearch splunk snowflake databricks palantir sap oracle ibm cisco vmware broadcom accenture infosys tcs wipro cognizant capgemini deloitte kpmg pwc ey generalelelectric siemens bosch philips panasonic toshiba mitsubishi hitachi canon nikon fujifilm gopro dji insta360 anker belkin sandisk westerndigital seagate synology qnap raspberrypi arduino espressif 3m abb schneiderelectric honeywell carrefour tesco lidl aldi spar walgreens cvshealth boots sephora muji miniso decathlon levis converse vans crocs birkenstock timberland oakley rayban swatch casio citizen seiko fossil fitbit garmin oura peloton strava alltrails komoot proton signal threema bitwarden 1password dashlane lastpass nordvpn expressvpn mullvad tor tails tailscale wireguard openvpn fortinet crowdstrike sentinelone okta auth0 clerk workos keycloak lastfm deezer tidal pandora shazam bandcamp audacity ableton flstudio roland yamaha korg bose sonos sennheiser jbl marshall pioneer akai denon nativeinstruments focusrite moog steinberg reaper bitwig avid serato obsstudio streamlabs davinciresolve capcut shotcut kdenlive openshot handbrake vlc kodi plex jellyfin crunchyroll hulu disneyplus paramountplus appletv primevideo peacock fedex ups dhl lazada shopee tokopedia mercadolibre mercari vinted depop poshmark gumroad ko-fi patreon buymeacoffee opencollective liberapay kickstarter indiegogo gofundme greenpeace creativecommons opensourceinitiative linuxfoundation apache eclipse mozilla firefox brave opera vivaldi safari googlechrome microsoftedge duckduckgo yahoo baidu yandex ecosia kagi perplexity arc bitly linktree carrd readme gitbook mintlify docusaurus astro eleventy vite webpack rollup parcel esbuild swc turborepo nx lerna biome eslint prettier stylelint babel jest vitest playwright cypress puppeteer testinglibrary storybook chromatic browserstack selenium appium postman insomnia bruno hoppscotch curl wget wireshark burpsuite kali metasploit nmap shodan virustotal snyk sonarqube codecov coveralls dependabot renovate semgrep trivy jfrog sonatype gitea forgejo sourcehut codeberg githubactions circleci travisci jenkins buildkite drone argo flux harness teamcity azuredevops googlecloud amazonwebservices ibmcloud alibabacloud hetzner ovh scaleway ionos linode vultr render railway flydotio koyeb coolify caprover dokku nomad consul vault packer terraform opentofu pulumi ansible puppet chef vagrant podman containerd rancher k3s openshift helm skaffold tilt gitpod replit glitch stackblitz codesandbox codepen observable cursor zed sublime notepadplusplus vscodium neovim vim emacs helix intellijidea pycharm webstorm phpstorm goland rubymine rider clion datagrip androidstudio xcode visualstudio rstudio".split(
    " ",
  );
const priority = new Map(majorBrands.map((name, index) => [name, index]));
const eligible = new Map<LibraryCategoryId, LibraryIcon[]>();
for (const [id] of libraryCategories) {
  if (["abstract", "wireframe", "isometric"].includes(id)) continue;
  eligible.set(
    id,
    pool.filter((icon) =>
      id === "brands"
        ? icon.source === "simple-icons"
        : icon.source !== "simple-icons" &&
          (matchesCategory(icon.originalName, id) ||
            (id === "health" && icon.source === "healthicons")),
    ),
  );
}
const seen = new Set<string>(),
  all: LibraryIcon[] = [];
for (const [category, candidates] of [...eligible].sort(
  (a, b) => a[1].length - b[1].length,
)) {
  const groups = sourceSets.map((source) =>
    candidates
      .filter((icon) => icon.source === source)
      .sort((a, b) =>
        category === "brands"
          ? (priority.get(a.originalName) ?? 9999) -
              (priority.get(b.originalName) ?? 9999) || a.id.localeCompare(b.id)
          : a.originalName.length - b.originalName.length ||
            a.id.localeCompare(b.id),
      ),
  );
  const selected: LibraryIcon[] = [];
  for (let position = 0; selected.length < 500; position++) {
    let remaining = false;
    for (const group of groups) {
      const icon = group[position];
      if (!icon) continue;
      remaining = true;
      if (seen.has(icon.geometryHash)) continue;
      seen.add(icon.geometryHash);
      selected.push({ ...icon, category });
      if (selected.length === 500) break;
    }
    if (!remaining)
      throw new Error(
        `${category}: only ${selected.length} distinct assets; refusing to pad count`,
      );
  }
  all.push(...selected);
}
const output = at("packages/core/data/");
await mkdir(new URL("categories/", output), { recursive: true });
await mkdir(new URL("icons/", output), { recursive: true });
await mkdir(at("apps/website/public/models/"), { recursive: true });
for (const [category, generator] of [
  ["wireframe", generateWireframe],
  ["isometric", generateIsometric],
  ["abstract", generateAbstract],
] as const) {
  for (let family = 0; family < 10; family++)
    for (let variant = 0; variant < 50; variant++) {
      const icon = generator(family, variant),
        hash = geometryHash(icon);
      if (seen.has(hash))
        throw new Error(`Duplicate generated geometry: ${icon.id}`);
      seen.add(hash);
      all.push({ ...icon, geometryHash: hash });
      if (category === "wireframe")
        await writeFile(
          at(`apps/website/public/models/${icon.id}.obj`),
          generateObj(family, variant),
        );
    }
}
sources.push({
  id: "doodleicons-studio",
  name: "DoodleIcons Studio",
  author: "DoodleIcons contributors",
  url: "https://github.com/utl-shadab/doodleicons",
  license: "MIT",
  licenseUrl: "https://github.com/utl-shadab/doodleicons/blob/main/LICENSE",
  version: "0.1.0",
});
for (const [id] of libraryCategories) {
  const icons = all.filter((icon) => icon.category === id);
  if (icons.length !== 500)
    throw new Error(`Invalid count for ${id}: ${icons.length}`);
  await writeFile(
    new URL(`categories/${id}.json`, output),
    JSON.stringify(icons),
  );
}
for (const icon of all)
  await writeFile(
    new URL(`icons/${icon.id}.js`, output),
    `export default ${JSON.stringify(icon)};\n`,
  );
await writeFile(
  new URL("icon.d.ts", output),
  'import type { LibraryIcon } from "../dist/library/types.js";\ndeclare const icon: LibraryIcon;\nexport default icon;\n',
);
await writeFile(
  new URL("index.json", output),
  JSON.stringify(all.map(({ nodes: _nodes, ...metadata }) => metadata)),
);
await writeFile(
  new URL("sources.json", output),
  JSON.stringify(sources, null, 2),
);
await mkdir(at("artifacts/library/"), { recursive: true });
await writeFile(
  at("artifacts/library/inventory.json"),
  JSON.stringify(
    {
      total: all.length,
      uniqueGeometry: seen.size,
      unsupportedSkipped: unsupported,
      categories: libraryCategories.map(([id, label]) => ({
        id,
        label,
        count: all.filter((icon) => icon.category === id).length,
      })),
      sources: sources.map((source) => ({
        ...source,
        count: all.filter((icon) => icon.source === source.id).length,
      })),
    },
    null,
    2,
  ),
);
console.log(
  `Imported ${all.length} distinct artworks; 30 categories × 500. Skipped ${unsupported} unsupported SVGs.`,
);
