import { PageHeader } from '../../components/common/PageHeader';
import type { AppAppearancePreset } from '../../app/appearance/appAppearance';
import { appAppearancePresets } from '../../app/appearance/appAppearance';

interface SettingsPageProps {
  activeAppearanceId: string;
  onAppearanceChange: (presetId: string) => void;
}

export function SettingsPage({ activeAppearanceId, onAppearanceChange }: SettingsPageProps) {
  return (
    <main className="app-page">
      <PageHeader
        eyebrow="Application appearance"
        title="Settings"
        summary="Tune ThemeGallery's own interface independently from the themes and references you are evaluating."
      />
      <section className="settings-grid" aria-label="App appearance presets">
        {appAppearancePresets.map((preset) => (
          <AppearancePresetCard
            isActive={preset.id === activeAppearanceId}
            key={preset.id}
            preset={preset}
            onSelect={onAppearanceChange}
          />
        ))}
      </section>
    </main>
  );
}

interface AppearancePresetCardProps {
  isActive: boolean;
  preset: AppAppearancePreset;
  onSelect: (presetId: string) => void;
}

function AppearancePresetCard({ isActive, preset, onSelect }: AppearancePresetCardProps) {
  return (
    <article className={isActive ? 'appearance-card is-active' : 'appearance-card'}>
      <div className="appearance-card__preview" style={{ background: preset.tokens.bg, color: preset.tokens.text }}>
        <span style={{ background: preset.tokens.surface, borderColor: preset.tokens.border }} />
        <span style={{ background: preset.tokens.accent }} />
      </div>
      <div>
        <h2>{preset.name}</h2>
        <p>{preset.description}</p>
      </div>
      <button
        aria-pressed={isActive}
        className={isActive ? 'primary-action' : 'secondary-action'}
        type="button"
        onClick={() => onSelect(preset.id)}
      >
        {preset.name}
      </button>
    </article>
  );
}
