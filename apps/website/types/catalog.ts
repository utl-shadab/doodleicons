import type { Category, IconDefinition } from "doodle-icon";
export interface CategoryCount extends Category {
  readonly count: number;
}
export interface CatalogData {
  readonly icons: readonly IconDefinition[];
  readonly categories: readonly CategoryCount[];
  readonly total: number;
  readonly matching: number;
  readonly query: string;
  readonly category: string;
  readonly page: number;
  readonly pages: number;
}
export type SearchParameters = Record<string, string | string[] | undefined>;
