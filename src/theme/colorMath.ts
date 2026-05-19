interface Rgb {
  r: number;
  g: number;
  b: number;
}

const HEX_PATTERN = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export function isHexColor(input: string): boolean {
  return HEX_PATTERN.test(input.trim());
}

export function normalizeHex(input: string): string {
  const match = input.trim().match(HEX_PATTERN);
  if (!match) {
    throw new Error(`Invalid hex color: ${input}`);
  }

  const value = match[1].toLowerCase();
  if (value.length === 3) {
    return `#${value[0]}${value[0]}${value[1]}${value[1]}${value[2]}${value[2]}`;
  }

  return `#${value}`;
}

function hexToRgb(hex: string): Rgb {
  const normalized = normalizeHex(hex).slice(1);
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function channelToLinear(channel: number): number {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b);
}

export function contrastRatio(a: string, b: string): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}

export function readableTextColor(background: string): '#111827' | '#ffffff' {
  return contrastRatio(background, '#111827') >= contrastRatio(background, '#ffffff') ? '#111827' : '#ffffff';
}

export function mixHex(a: string, b: string, amount: number): string {
  const start = hexToRgb(a);
  const end = hexToRgb(b);
  const ratio = Math.min(1, Math.max(0, amount));
  const mixed: Rgb = {
    r: Math.round(start.r + (end.r - start.r) * ratio),
    g: Math.round(start.g + (end.g - start.g) * ratio),
    b: Math.round(start.b + (end.b - start.b) * ratio),
  };

  return `#${[mixed.r, mixed.g, mixed.b].map((part) => part.toString(16).padStart(2, '0')).join('')}`;
}

export function normalizeColorValue(value: string): string {
  return isHexColor(value) ? normalizeHex(value) : value.trim();
}

