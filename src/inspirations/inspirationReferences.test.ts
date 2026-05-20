import { inspirationReferences } from './inspirationReferences';

describe('inspirationReferences', () => {
  it('separates atomic inspiration references from multi-dimension combinations', () => {
    const lunaColor = inspirationReferences.find((reference) => reference.id === 'luna-ocean-color');
    const lunaCombination = inspirationReferences.find((reference) => reference.id === 'luna-blue-metal');

    expect(lunaColor).toBeDefined();
    expect(lunaColor!.kind).toBe('atom');
    expect(lunaColor!.dimensions).toEqual(['color']);
    expect(lunaColor!.appearancePatch?.tokens?.accent).toBe('#54ACBF');

    expect(lunaCombination).toBeDefined();
    expect(lunaCombination!.kind).toBe('combination');
    expect(lunaCombination!.dimensions).toEqual(expect.arrayContaining(['color', 'material', 'lighting', 'shape']));
    expect(lunaCombination!.appearancePatch?.material).toBe('glass');
  });
});
