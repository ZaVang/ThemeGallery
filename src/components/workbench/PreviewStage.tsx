import { useState } from 'react';
import { themeToCssVars } from '../../theme/cssVars';
import type { NormalizedTheme } from '../../types/theme';
import { PreviewScene, previewTabs, type PreviewTab } from './previewScenes';

interface PreviewStageProps {
  activeTab?: PreviewTab;
  onActiveTabChange?: (tab: PreviewTab) => void;
  theme: NormalizedTheme;
}

export function PreviewStage({ activeTab, onActiveTabChange, theme }: PreviewStageProps) {
  const [localActiveTab, setLocalActiveTab] = useState<PreviewTab>('Dashboard');
  const currentTab = activeTab ?? localActiveTab;

  function handleTabChange(tab: PreviewTab) {
    if (onActiveTabChange) {
      onActiveTabChange(tab);
      return;
    }

    setLocalActiveTab(tab);
  }

  return (
    <section className="stage-panel" aria-label="Preview stage" style={themeToCssVars(theme)}>
      <div className="stage-toolbar">
        <div>
          <p className="stage-kicker">Current theme</p>
          <h2>{theme.name}</h2>
        </div>
        <div className="tab-list" role="tablist" aria-label="Preview scenes">
          {previewTabs.map((tab) => (
            <button
              aria-selected={currentTab === tab}
              className={currentTab === tab ? 'preview-tab is-active' : 'preview-tab'}
              key={tab}
              onClick={() => handleTabChange(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="stage-canvas">
        <PreviewScene activeTab={currentTab} theme={theme} />
      </div>
    </section>
  );
}
