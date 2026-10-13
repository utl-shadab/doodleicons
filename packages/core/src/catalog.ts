import { interfaceIcons } from "./artwork/interface.js";
import { actionIcons } from "./artwork/actions.js";
import { communicationIcons } from "./artwork/communication.js";
import { technologyIcons } from "./artwork/technology.js";
import { commerceIcons } from "./artwork/commerce.js";
import { creativeIcons } from "./artwork/creative.js";
import { healthIcons } from "./artwork/health.js";
import { productivityIcons } from "./artwork/productivity.js";
import { travelIcons } from "./artwork/travel.js";
import { expressiveIcons } from "./artwork/expressive.js";
import type { IconDefinition } from "./types.js";
export { categories } from "./categories.js";
export const icons: readonly IconDefinition[] = [
  ...interfaceIcons,
  ...actionIcons,
  ...communicationIcons,
  ...technologyIcons,
  ...commerceIcons,
  ...creativeIcons,
  ...healthIcons,
  ...productivityIcons,
  ...travelIcons,
  ...expressiveIcons,
];
