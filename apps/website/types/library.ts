import type {
  LibraryIcon,
  LibrarySource,
  LibraryCategoryId,
} from "doodle-icon/library";
export interface LibraryQuery {
  q?: string | string[];
  category?: string | string[];
  style?: string | string[];
  source?: string | string[];
  page?: string | string[];
}
export interface LibraryData {
  icons: readonly LibraryIcon[];
  categories: readonly {
    id: LibraryCategoryId;
    name: string;
    description: string;
    count: number;
  }[];
  sources: readonly LibrarySource[];
  total: number;
  matching: number;
  page: number;
  pages: number;
  query: string;
  category: string;
  style: string;
  source: string;
  relatedTerms: readonly string[];
}
