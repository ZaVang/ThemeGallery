import type { NormalizedTheme } from '../../types/theme';
import { ColorCardPreview } from '../previews/ColorCardPreview';
import { ComponentsPreview } from '../previews/ComponentsPreview';
import { DashboardPreview } from '../previews/DashboardPreview';
import { LandingPreview } from '../previews/LandingPreview';
import { MobilePreview } from '../previews/MobilePreview';

export const previewTabs = ['Dashboard', 'Landing', 'Mobile', 'Components', 'Color Card'] as const;
export type PreviewTab = (typeof previewTabs)[number];

interface PreviewSceneProps {
  activeTab: PreviewTab;
  theme: NormalizedTheme;
  useThemeGradient?: boolean;
}

export function PreviewScene({ activeTab, theme, useThemeGradient = true }: PreviewSceneProps) {
  if (activeTab === 'Dashboard') {
    return <DashboardPreview />;
  }

  if (activeTab === 'Landing') {
    return <LandingPreview />;
  }

  if (activeTab === 'Mobile') {
    return <MobilePreview />;
  }

  if (activeTab === 'Components') {
    return <ComponentsPreview />;
  }

  return <ColorCardPreview theme={theme} useThemeGradient={useThemeGradient} />;
}
