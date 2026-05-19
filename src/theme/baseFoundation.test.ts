import { baseFoundation } from './baseFoundation';

describe('baseFoundation', () => {
  it('contains the tokens required for derived palette themes', () => {
    expect(baseFoundation.typography['body-md'].fontFamily).toBe('Inter');
    expect(baseFoundation.rounded.md).toBe('0.75rem');
    expect(baseFoundation.spacing.unit).toBe('8px');
    expect(baseFoundation.components['button-primary'].backgroundColor).toBe('{colors.primary}');
    expect(baseFoundation.components['card-standard'].backgroundColor).toBe('{colors.surface-container}');
  });
});

