import { resolveReferences } from './resolveReferences';

describe('resolveReferences', () => {
  it('resolves exact and embedded token references', () => {
    const warnings: string[] = [];
    const result = resolveReferences(
      {
        backgroundColor: '{colors.primary}',
        border: '1px solid {colors.outline}',
        typography: '{typography.label-sm}',
      },
      {
        colors: {
          primary: '#123456',
          outline: '#d0d7de',
        },
        typography: {
          'label-sm': {
            fontFamily: 'Inter',
            fontSize: '12px',
            fontWeight: '700',
            lineHeight: '16px',
          },
        },
      },
      warnings,
    );

    expect(result.backgroundColor).toBe('#123456');
    expect(result.border).toBe('1px solid #d0d7de');
    expect(result.typography).toEqual({
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: '700',
      lineHeight: '16px',
    });
    expect(warnings).toEqual([]);
  });

  it('keeps unresolved references and emits warnings', () => {
    const warnings: string[] = [];
    const result = resolveReferences({ color: '{colors.missing}' }, { colors: {} }, warnings);

    expect(result.color).toBe('{colors.missing}');
    expect(warnings[0]).toMatch(/Unresolved token reference/);
  });
});

