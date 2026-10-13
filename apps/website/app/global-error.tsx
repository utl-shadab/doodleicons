"use client";
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            fontFamily: "Arial, sans-serif",
            maxWidth: 640,
            margin: "80px auto",
            padding: 24,
          }}
        >
          <h1>DoodleIcons couldn’t start.</h1>
          <p>Please try loading the library again.</p>
          <button onClick={reset}>Try again</button>
        </main>
      </body>
    </html>
  );
}
