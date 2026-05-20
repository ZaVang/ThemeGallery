import { lazy, Suspense, useMemo, useState } from 'react';
import { ThemeWorkbenchPage } from '../pages/theme-workbench/ThemeWorkbenchPage';
import { appAppearancePresets, defaultAppAppearancePreset } from './appearance/appAppearance';
import type { AppAppearancePatch } from './appearance/appAppearancePatch';
import { resolveAppAppearance } from './appearance/appAppearancePatch';
import { appAppearanceToCssVars } from './appearance/appAppearanceCssVars';
import { AppTopNav } from './AppTopNav';
import type { AppPageId } from './appPages';

const ImportAssetsPage = lazy(() =>
  import('../pages/import-assets/ImportAssetsPage').then((module) => ({ default: module.ImportAssetsPage })),
);
const InspirationsPage = lazy(() =>
  import('../pages/inspirations/InspirationsPage').then((module) => ({ default: module.InspirationsPage })),
);
const ComposerPage = lazy(() =>
  import('../pages/composer/ComposerPage').then((module) => ({ default: module.ComposerPage })),
);
const SettingsPage = lazy(() =>
  import('../pages/settings/SettingsPage').then((module) => ({ default: module.SettingsPage })),
);

function PageLoadingFallback() {
  return (
    <main className="app-page">
      <section className="placeholder-panel" aria-label="Loading page">
        <h2>Loading</h2>
        <p>Preparing this workspace.</p>
      </section>
    </main>
  );
}

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
      <Suspense fallback={<PageLoadingFallback />}>
        {activePage === 'themes' && <ThemeWorkbenchPage onApplyAppearancePatch={setAppearancePatch} />}
        {activePage === 'import' && <ImportAssetsPage />}
        {activePage === 'inspirations' && <InspirationsPage onApplyAppearancePatch={setAppearancePatch} />}
        {activePage === 'composer' && <ComposerPage onApplyAppearancePatch={setAppearancePatch} />}
        {activePage === 'settings' && (
          <SettingsPage activeAppearanceId={baseAppearancePreset.id} onAppearanceChange={handleAppearancePresetChange} />
        )}
      </Suspense>
    </div>
  );
}
