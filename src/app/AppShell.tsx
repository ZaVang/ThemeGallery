import { useMemo, useState } from 'react';
import { ComposerPage } from '../pages/composer/ComposerPage';
import { InspirationsPage } from '../pages/inspirations/InspirationsPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { ThemeWorkbenchPage } from '../pages/theme-workbench/ThemeWorkbenchPage';
import { appAppearancePresets, defaultAppAppearancePreset } from './appearance/appAppearance';
import type { AppAppearancePatch } from './appearance/appAppearancePatch';
import { resolveAppAppearance } from './appearance/appAppearancePatch';
import { appAppearanceToCssVars } from './appearance/appAppearanceCssVars';
import { AppTopNav } from './AppTopNav';
import type { AppPageId } from './appPages';

export function AppShell() {
  const [activePage, setActivePage] = useState<AppPageId>('themes');
  const [appearancePresetId, setAppearancePresetId] = useState(defaultAppAppearancePreset.id);
  const [appearancePatch, setAppearancePatch] = useState<AppAppearancePatch | undefined>();
  const baseAppearancePreset =
    appAppearancePresets.find((preset) => preset.id === appearancePresetId) ?? defaultAppAppearancePreset;
  const appearancePreset = useMemo(
    () => resolveAppAppearance(baseAppearancePreset, appearancePatch),
    [appearancePatch, baseAppearancePreset],
  );
  const appearanceVars = useMemo(() => appAppearanceToCssVars(appearancePreset), [appearancePreset]);

  function handleAppearancePresetChange(nextPresetId: string) {
    setAppearancePresetId(nextPresetId);
    setAppearancePatch(undefined);
  }

  return (
    <div
      className="app-root"
      data-app-material={appearancePreset.material}
      data-testid="app-root"
      style={appearanceVars}
    >
      <AppTopNav activePage={activePage} onPageChange={setActivePage} />
      {activePage === 'themes' && <ThemeWorkbenchPage />}
      {activePage === 'inspirations' && <InspirationsPage onApplyAppearancePatch={setAppearancePatch} />}
      {activePage === 'composer' && <ComposerPage />}
      {activePage === 'settings' && (
        <SettingsPage activeAppearanceId={baseAppearancePreset.id} onAppearanceChange={handleAppearancePresetChange} />
      )}
    </div>
  );
}
