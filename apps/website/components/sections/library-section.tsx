import Link from "next/link";
import {
  RocketIcon,
  FlowerIcon,
  HeartIcon,
  SearchIcon,
  ArrowRightIcon,
  CheckIcon,
} from "doodle-icon-react";
import { Explorer } from "./explorer";
import type { CatalogData } from "@/types/catalog";
export function LibrarySection({ data }: { data: CatalogData }) {
  return (
    <div className="library-page">
      <div className="collection-notice">
        <span>
          Explore the reference-based artwork: doodle scenes, characters,
          isometric, glass and wireframes.
        </span>
        <Link href="/collections">View all 11 collections →</Link>
      </div>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-note">
            <span className="status-dot" />
            Open source. Full of character.
          </p>
          <h1 id="hero-title">
            Little icons.
            <br />
            <span>Big personality.</span>
          </h1>
          <p className="hero-description">
            Give your next idea a human touch.
            <br />
            Customizable icons for interfaces that feel like you.
          </p>
          <div className="hero-meta">
            <span>
              <CheckIcon size={14} iconStyle="outline" />
              {data.total} original icons
            </span>
            <span>
              <CheckIcon size={14} iconStyle="outline" />
              Free for commercial use
            </span>
            <span>
              <CheckIcon size={14} iconStyle="outline" />
              React + Figma
            </span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit" />
          <div className="hero-flower">
            <FlowerIcon
              size={100}
              iconStyle="duotone"
              color="#002fa7"
              accent="#d8e5ff"
              strokeWidth={1.1}
            />
          </div>
          <div className="hero-rocket">
            <RocketIcon
              size={160}
              iconStyle="duotone"
              color="#242833"
              accent="#d8e5ff"
              strokeWidth={1.05}
            />
          </div>
          <div className="hero-heart">
            <HeartIcon
              size={76}
              iconStyle="soft"
              color="#002fa7"
              accent="#b9cdfa"
              strokeWidth={1.4}
            />
          </div>
          <span className="art-note">a little less ordinary</span>
          <svg className="art-arrow" viewBox="0 0 100 50">
            <path
              d="M5 8C40 5 25 45 83 30m-10-9 12 9-12 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </section>
      <div className="library-search-row">
        <form action="/" role="search" className="search-form">
          <SearchIcon size={22} iconStyle="outline" />
          <label className="sr-only" htmlFor="icon-search">
            Search icons
          </label>
          <input
            id="icon-search"
            name="q"
            type="search"
            placeholder="Find your next little detail…"
            defaultValue={data.query}
            maxLength={100}
          />
          {data.category !== "all" && (
            <input name="category" type="hidden" value={data.category} />
          )}
          <button type="submit" aria-label="Search icons">
            <ArrowRightIcon size={19} iconStyle="outline" />
          </button>
        </form>
        <Link href="/docs" className="install-pill">
          <span className="terminal-dollar">$</span>
          <code>npm i doodle-icon-react</code>
          <ArrowRightIcon size={16} iconStyle="outline" />
        </Link>
      </div>
      <Explorer
        key={`${data.category}:${data.query}:${data.page}`}
        data={data}
      />
      <div className="library-bottom">
        <p>Good design is in the small details. Make them yours.</p>
        <Link href="/docs">
          Meet the React package{" "}
          <ArrowRightIcon size={16} iconStyle="outline" />
        </Link>
      </div>
    </div>
  );
}
