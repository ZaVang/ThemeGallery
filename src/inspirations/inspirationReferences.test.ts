import { inspirationReferences } from './inspirationReferences';

describe('inspirationReferences', () => {
  it('keeps references as inspiration dimensions with optional app appearance patches', () => {
    const luna = inspirationReferences.find((reference) => reference.id === 'luna-blue-metal');

    expect(luna).toBeDefined();
    expect(luna!.dimensions).toEqual(expect.arrayContaining(['color', 'material', 'lighting', 'shape']));
    expect(luna!.appearancePatch?.material).toBe('glass');
    expect(luna!.appearancePatch?.tokens?.accent).toBe('#54ACBF');
  });
});
