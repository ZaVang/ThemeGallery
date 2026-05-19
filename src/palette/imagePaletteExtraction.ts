import { defaultPaletteRoles, type EditablePaletteColor } from './paletteMarkdown';

type Rgb = [number, number, number];

export interface PixelSource {
  width: number;
  height: number;
  getPixel: (x: number, y: number) => Rgb;
}

interface RowSample {
  y: number;
  deviation: number;
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? 0;
}

function medianRgb(pixels: Rgb[]): Rgb {
  return [median(pixels.map((pixel) => pixel[0])), median(pixels.map((pixel) => pixel[1])), median(pixels.map((pixel) => pixel[2]))];
}

function rgbToHex([r, g, b]: Rgb): string {
  return `#${[r, g, b].map((part) => part.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function rowDeviation(pixels: Rgb[], baseline: Rgb): number {
  return pixels.reduce((total, pixel) => {
    return total + Math.abs(pixel[0] - baseline[0]) + Math.abs(pixel[1] - baseline[1]) + Math.abs(pixel[2] - baseline[2]);
  }, 0) / pixels.length;
}

function collectRows(source: PixelSource): RowSample[] {
  const xStart = Math.floor(source.width * 0.27);
  const xEnd = Math.floor(source.width * 0.74);
  const yStart = Math.floor(source.height * 0.08);
  const yEnd = Math.floor(source.height * 0.9);
  const rows: RowSample[] = [];

  for (let y = yStart; y < yEnd; y += 1) {
    const pixels: Rgb[] = [];
    for (let x = xStart; x < xEnd; x += 4) {
      pixels.push(source.getPixel(x, y));
    }
    rows.push({ y, deviation: rowDeviation(pixels, medianRgb(pixels)) });
  }

  return rows;
}

function detectRuns(rows: RowSample[], source: PixelSource): Array<[number, number]> {
  const candidates = rows.filter((row) => row.deviation < 30).map((row) => row.y);
  const runs: Array<[number, number]> = [];
  let start: number | undefined;
  let previous: number | undefined;

  for (const y of candidates) {
    if (start === undefined || previous === undefined || y > previous + 1) {
      if (start !== undefined && previous !== undefined && previous - start >= 35) {
        runs.push([start, previous]);
      }
      start = y;
    }
    previous = y;
  }

  if (start !== undefined && previous !== undefined && previous - start >= 35) {
    runs.push([start, previous]);
  }

  return runs.filter(([y1]) => y1 >= source.height * 0.12 && y1 <= source.height * 0.84).slice(0, 5);
}

function sampleRun(source: PixelSource, y1: number, y2: number): Rgb {
  const xStart = Math.floor(source.width * 0.27) + 24;
  const xEnd = Math.floor(source.width * 0.74) - 24;
  const pixels: Rgb[] = [];

  for (let y = y1; y <= y2; y += 2) {
    for (let x = xStart; x < xEnd; x += 4) {
      const pixel = source.getPixel(x, y);
      if (pixel[0] > 225 && pixel[1] > 225 && pixel[2] > 225) {
        continue;
      }
      pixels.push(pixel);
    }
  }

  return medianRgb(pixels);
}

export function extractSwatchesFromPixelSource(source: PixelSource): EditablePaletteColor[] {
  return detectRuns(collectRows(source), source).map(([y1, y2], index) => ({
    id: crypto.randomUUID?.() ?? `${Date.now()}-${index}`,
    name: `Color ${index + 1}`,
    hex: rgbToHex(sampleRun(source, y1, y2)),
    role: defaultPaletteRoles[index] ?? 'accent',
  }));
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Unable to read image.'));
    };
    image.src = url;
  });
}

export async function extractPaletteFromImageFile(file: File): Promise<EditablePaletteColor[]> {
  const image = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    throw new Error('Canvas is unavailable.');
  }

  context.drawImage(image, 0, 0);
  const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  return extractSwatchesFromPixelSource({
    width: canvas.width,
    height: canvas.height,
    getPixel(x, y) {
      const index = (y * canvas.width + x) * 4;
      return [data[index], data[index + 1], data[index + 2]];
    },
  });
}
