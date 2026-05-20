import { createPaletteFileName, createPaletteMarkdown, normalizeEditableHex } from './paletteMarkdown';

describe('paletteMarkdown', () => {
  it('normalizes editable hex values', () => {
    expect(normalizeEditableHex('452815')).toBe('#452815');
    expect(normalizeEditableHex('#ABC')).toBe('#AABBCC');
  });

  it('exports edited palette rows as palette markdown', () => {
    expect(
      createPaletteMarkdown({
        name: 'Coffee Foam',
        source: '小红书 @mandatou6',
        mood: 'warm coffee palette',
        colors: [
          { id: '1', name: 'Coffee', hex: '#452815', role: 'surface' },
          { id: '2', name: 'Peru', hex: '#73411F', role: 'primary' },
        ],
      }),
    ).toContain('name: Coffee Foam');
    expect(
      createPaletteMarkdown({
        name: 'Coffee Foam',
        source: '小红书 @mandatou6',
        mood: 'warm coffee palette',
        colors: [
          { id: '1', name: 'Coffee', hex: '#452815', role: 'surface' },
          { id: '2', name: 'Peru', hex: '#73411F', role: 'primary' },
        ],
      }),
    ).toContain('hex: "#452815"');
  });

  it('stores curated scenario tags in palette markdown', () => {
    expect(
      createPaletteMarkdown({
        name: 'Coffee Foam',
        source: '小红书 @mandatou6',
        mood: 'warm coffee palette',
        tags: ['saas', 'ai tool', 'saas'],
        colors: [{ id: '1', name: 'Coffee', hex: '#452815', role: 'surface' }],
      }),
    ).toContain('tags: ["imported", "palette", "saas", "ai tool"]');
  });

  it('creates a filesystem-friendly markdown file name', () => {
    expect(createPaletteFileName('Coffee Foam')).toBe('coffee-foam.md');
    expect(createPaletteFileName('')).toBe('imported-palette.md');
  });
});
