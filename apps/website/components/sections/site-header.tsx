import Link from "next/link";
import { HeartIcon, ExternalLinkIcon } from "doodle-icon-react";
import { Logo } from "@/components/ui/logo";
import { ThemeControl } from "./theme-control";
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav aria-label="Main navigation">
          <Link href="/collections">Collections</Link>
          <Link href="/" className="nav-library">
            Icons
          </Link>
          <Link href="/docs">Documentation</Link>
          <Link href="/figma">
            For Figma <span className="tiny-label">PLUGIN</span>
          </Link>
        </nav>
        <div className="header-actions">
          <ThemeControl />
          <a
            className="github-link"
            href="https://github.com/utl-shadab/doodleicons"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ExternalLinkIcon size={15} iconStyle="outline" />
          </a>
          <Link href="/support" className="support-link">
            <HeartIcon size={17} iconStyle="outline" />
            Support the project
          </Link>
        </div>
      </div>
    </header>
  );
}
