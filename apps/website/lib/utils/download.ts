export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export async function downloadPng(
  svg: string,
  size: number,
  filename: string,
  height: number = size,
): Promise<void> {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const bitmap = new Image();
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Image export timed out. Try SVG instead.")),
        8000,
      );
      bitmap.onload = () => {
        clearTimeout(timeout);
        resolve();
      };
      bitmap.onerror = () => {
        clearTimeout(timeout);
        reject(new Error("Could not create PNG. Try SVG instead."));
      };
      bitmap.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("PNG export is unavailable in this browser.");
    context.drawImage(bitmap, 0, 0, size, height);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (value) =>
          value ? resolve(value) : reject(new Error("PNG export failed.")),
        "image/png",
      ),
    );
    downloadBlob(blob, filename);
  } finally {
    URL.revokeObjectURL(url);
  }
}
