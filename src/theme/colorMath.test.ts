import { contrastRatio, mixHex, normalizeHex, readableTextColor } from './colorMath';

describe('colorMath', () => {
  it('normalizes short and long hex colors', () => {
    expect(normalizeHex('#abc')).toBe('#aabbcc');
    expect(normalizeHex('#AABBCC')).toBe('#aabbcc');
    expect(normalizeHex('112233')).toBe('#112233');
  });

  it('chooses readable text against light and dark backgrounds', () => {
    expect(readableTextColor('#ffffff')).toBe('#111827');
    expect(readableTextColor('#011c40')).toBe('#ffffff');
  });

  it('computes contrast ratio and mixes colors', () => {
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 0);
    expect(mixHex('#000000', '#ffffff', 0.5)).toBe('#808080');
  });
});

