import { useState } from 'react';
import { themeToCssVars } from '../../theme/cssVars';
import type { NormalizedTheme } from '../../types/theme';
import { ComponentsPreview } from '../previews/ComponentsPreview';
import { DashboardPreview } from '../previews/DashboardPreview';
import { LandingPreview } from '../previews/LandingPreview';
import { MobilePreview } from '../previews/MobilePreview';

const tabs = ['Dashboard', 'Landing', 'Mobile', 'Components'] as const;
type PreviewTab = (typeof tabs)[number];

interface PreviewStageProps {
  theme: NormalizedTheme;
}

export function PreviewStage({ theme }: PreviewStageProps) {
  const [activeTab, setActiveTab] = useState<PreviewTab>('Dashboard');

  return (
    <section className="stage-panel" aria-label="Preview stage" style={themeToCssVars(theme)}>
      <div className="stage-toolbar">
        <div>
          <p className="stage-kicker">Current theme</p>
          <h2>{theme.name}</h2>
        </div>
        <div className="tab-list" role="tablist" aria-label="Preview scenes">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab}
              className={activeTab === tab ? 'preview-tab is-active' : 'preview-tab'}
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="stage-canvas">
        {activeTab === 'Dashboard' && <DashboardPreview />}
        {activeTab === 'Landing' && <LandingPreview />}
        {activeTab === 'Mobile' && <MobilePreview />}
        {activeTab === 'Components' && <ComponentsPreview />}
      </div>
    </section>
  );
}

