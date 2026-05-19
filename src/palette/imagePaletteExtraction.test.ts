import { extractSwatchesFromPixelSource } from './imagePaletteExtraction';

function createSource(width: number, height: number, bars: Array<{ y1: number; y2: number; rgb: [number, number, number] }>) {
  return {
    width,
    height,
    getPixel(x: number, y: number): [number, number, number] {
      const bar = bars.find((item) => y >= item.y1 && y <= item.y2 && x >= 81 && x <= 222);
      return bar?.rgb ?? [80 + ((x * 7 + y * 3) % 120), 70 + ((x * 5 + y * 11) % 120), 50 + ((x * 13 + y) % 120)];
    },
  };
}

describe('imagePaletteExtraction', () => {
  it('extracts centered horizontal color card bars in visual order', () => {
    const colors = extractSwatchesFromPixelSource(
      createSource(300, 420, [
        { y1: 70, y2: 112, rgb: [69, 40, 21] },
        { y1: 140, y2: 182, rgb: [115, 65, 31] },
        { y1: 210, y2: 252, rgb: [182, 136, 93] },
        { y1: 280, y2: 322, rgb: [224, 196, 160] },
        { y1: 330, y2: 372, rgb: [232, 211, 184] },
      ]),
    );

    expect(colors.map((color) => color.hex)).toEqual(['#452815', '#73411F', '#B6885D', '#E0C4A0', '#E8D3B8']);
    expect(colors.map((color) => color.role)).toEqual(['background', 'secondary', 'primary', 'accent', 'surface']);
  });
});
