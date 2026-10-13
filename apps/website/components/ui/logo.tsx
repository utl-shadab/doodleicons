import Link from "next/link";
export function Logo() {
  return (
    <Link href="/" aria-label="DoodleIcons home" className="logo">
      <svg
        width="31"
        height="31"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 5c4-3 6 2 9 0s6-1 8 3 6 3 6 7-5 5-3 9-5 6-9 3-8 3-11-2 2-7-1-11S1 8 5 5Z"
          fill="currentColor"
        />
        <path
          d="M11 12v2m9-2v2m-9 5c2 4 7 4 10 0"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span>
        doodle<span className="logo-light">icons</span>
        <span className="logo-dot">.</span>
      </span>
    </Link>
  );
}
