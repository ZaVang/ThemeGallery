const notePrefixes = [
  'Palette-derived theme uses Base UI Foundation',
  'Mixed quoted YAML scalar',
  'Missing color token',
  'Duplicate YAML key',
];

export interface SplitThemeWarnings {
  warnings: string[];
  notes: string[];
}

export function isActionableWarning(warning: string): boolean {
  return !notePrefixes.some((prefix) => warning.startsWith(prefix));
}

export function splitThemeWarnings(warnings: string[]): SplitThemeWarnings {
  return warnings.reduce<SplitThemeWarnings>(
    (groups, warning) => {
      if (isActionableWarning(warning)) {
        groups.warnings.push(warning);
      } else {
        groups.notes.push(warning);
      }
      return groups;
    },
    { warnings: [], notes: [] },
  );
}

export function countActionableWarnings(warnings: string[]): number {
  return warnings.filter(isActionableWarning).length;
}

