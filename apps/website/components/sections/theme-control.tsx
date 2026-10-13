"use client";
import { useEffect, useState } from "react";
type Theme = "light" | "dark" | "system";
export function ThemeControl() {
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => {
    try {
      const stored = localStorage.getItem("doodleicons-theme");
      if (stored === "light" || stored === "dark") setTheme(stored);
    } catch {}
  }, []);
  const change = (value: string) => {
    const next: Theme =
      value === "light" || value === "dark" ? value : "system";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("doodleicons-theme", next);
    } catch {}
  };
  return (
    <label className="theme-control">
      <span className="sr-only">Color theme</span>
      <select
        aria-label="Color theme"
        value={theme}
        onChange={(event) => change(event.target.value)}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
