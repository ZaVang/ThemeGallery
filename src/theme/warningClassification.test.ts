import { countActionableWarnings, splitThemeWarnings } from './warningClassification';

describe('warningClassification', () => {
  it('treats auto-healed parser and fallback messages as notes', () => {
    const warnings = [
      'Palette-derived theme uses Base UI Foundation typography, spacing, radius, and component tokens.',
      'Mixed quoted YAML scalar "components.input.border" was wrapped for parsing.',
      'Missing color token "background"; used Base UI Foundation fallback.',
      'Duplicate YAML key "colors.on-tertiary" encountered; last value was used.',
    ];

    expect(splitThemeWarnings(warnings)).toEqual({
      warnings: [],
      notes: warnings,
    });
    expect(countActionableWarnings(warnings)).toBe(0);
  });

  it('keeps unresolved references and invalid source data as actionable warnings', () => {
    const warnings = [
      'Unresolved token reference "{colors.primary}" at components.button.',
      'Invalid palette color "Ink" was ignored.',
    ];

    expect(splitThemeWarnings(warnings)).toEqual({
      warnings,
      notes: [],
    });
    expect(countActionableWarnings(warnings)).toBe(2);
  });
});

