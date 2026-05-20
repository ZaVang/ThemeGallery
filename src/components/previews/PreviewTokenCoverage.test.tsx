import { render } from '@testing-library/react';
import { ComponentsPreview } from './ComponentsPreview';
import { DashboardPreview } from './DashboardPreview';
import { LandingPreview } from './LandingPreview';
import { MobilePreview } from './MobilePreview';

describe('preview token coverage', () => {
  it('renders hooks for accent, neutral, and status color tokens', () => {
    const { container } = render(
      <>
        <DashboardPreview />
        <LandingPreview />
        <MobilePreview />
        <ComponentsPreview />
      </>,
    );

    expect(container.querySelector('.chart-bar-tertiary')).toBeInTheDocument();
    expect(container.querySelector('.chart-bar-neutral')).toBeInTheDocument();
    expect(container.querySelector('.preview-button.tertiary')).toBeInTheDocument();
    expect(container.querySelector('.product-panel__body .is-tertiary')).toBeInTheDocument();

    for (const variant of ['success', 'warning', 'info', 'error']) {
      expect(container.querySelector(`.preview-badge.${variant}`)).toBeInTheDocument();
    }
  });
});
