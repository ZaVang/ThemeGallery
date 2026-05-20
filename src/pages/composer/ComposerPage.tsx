import { useMemo, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import type { AppAppearancePatch } from '../../app/appearance/appAppearancePatch';
import { mergeAppAppearancePatches, resolveAppAppearance } from '../../app/appearance/appAppearancePatch';
import { appAppearanceToCssVars } from '../../app/appearance/appAppearanceCssVars';
import { defaultAppAppearancePreset } from '../../app/appearance/appAppearance';
import { loadThemeLibrary } from '../../data/themeLoader';
import {
  getInspirationAtoms,
  inspirationDimensionLabels,
  type InspirationDimension,
  type InspirationReference,
} from '../../inspirations/inspirationReferences';
import {
  composeDesignMarkdown,
  createDefaultDesignMdSelections,
  designMdSectionConfigs,
  findMissingDesignMdSections,
  getDesignMdCandidateThemes,
  type DesignMdSectionId,
} from '../../theme/designMdComposer';
import { composeThemeMarkdown, createDesignFileName } from '../../theme/composedThemeMarkdown';
import { saveThemeMarkdown } from '../../theme/saveTheme';
import type { NormalizedTheme } from '../../types/theme';

const composerDimensions: InspirationDimension[] = ['color', 'typography', 'radius', 'material', 'lighting', 'layout'];
const composedDesignFileName = 'composed-design-direction.md';

interface ComposerPageProps {
  onApplyAppearancePatch: (patch: AppAppearancePatch) => void;
  saveTheme?: typeof saveThemeMarkdown;
  themes?: NormalizedTheme[];
}

export function ComposerPage({ onApplyAppearancePatch, saveTheme = saveThemeMarkdown, themes }: ComposerPageProps) {
  const loadedThemes = useMemo(() => themes ?? loadThemeLibrary(), [themes]);
  const designMdThemes = useMemo(() => getDesignMdCandidateThemes(loadedThemes), [loadedThemes]);
  const defaultDesignMdSelections = useMemo(() => createDefaultDesignMdSelections(designMdThemes), [designMdThemes]);
  const [designMdSelectionOverrides, setDesignMdSelectionOverrides] = useState<Partial<Record<DesignMdSectionId, string>>>(
    {},
  );
  const designMdSelections = useMemo(
    () => ({
      ...defaultDesignMdSelections,
      ...designMdSelectionOverrides,
    }),
    [defaultDesignMdSelections, designMdSelectionOverrides],
  );
  const composedDesignMarkdown = useMemo(
    () => composeDesignMarkdown({ themes: designMdThemes, selections: designMdSelections }),
    [designMdSelections, designMdThemes],
  );
  const missingDesignMdSections = useMemo(
    () => findMissingDesignMdSections({ themes: designMdThemes, selections: designMdSelections }),
    [designMdSelections, designMdThemes],
  );
  const [designMdActionStatus, setDesignMdActionStatus] = useState('');
  const [themeName, setThemeName] = useState('Composed Design Direction');
  const [isSavingTheme, setIsSavingTheme] = useState(false);
  const [selectedAtomIds, setSelectedAtomIds] = useState<Partial<Record<InspirationDimension, string>>>({});
  const selectedAtoms = useMemo(
    () =>
      composerDimensions.flatMap((dimension) => {
        const selectedId = selectedAtomIds[dimension];
        const selectedAtom = getInspirationAtoms(dimension).find((atom) => atom.id === selectedId);

        return selectedAtom ? [selectedAtom] : [];
      }),
    [selectedAtomIds],
  );
  const styleMixPatch = useMemo(
    () => mergeAppAppearancePatches(selectedAtoms.map((atom) => atom.appearancePatch)),
    [selectedAtoms],
  );
  const styleMixVars = useMemo(
    () => appAppearanceToCssVars(resolveAppAppearance(defaultAppAppearancePreset, styleMixPatch)),
    [styleMixPatch],
  );
  const composedThemeMarkdown = useMemo(
    () =>
      composeThemeMarkdown({
        name: themeName,
        themes: designMdThemes,
        selections: designMdSelections,
        selectedAtoms,
      }),
    [designMdSelections, designMdThemes, selectedAtoms, themeName],
  );

  function selectAtom(dimension: InspirationDimension, atomId: string) {
    setSelectedAtomIds((current) => {
      if (current[dimension] === atomId) {
        const next = { ...current };
        delete next[dimension];

        return next;
      }

      return {
        ...current,
        [dimension]: atomId,
      };
    });
  }

  function selectDesignMdSource(sectionId: DesignMdSectionId, themeId: string) {
    setDesignMdSelectionOverrides((current) => ({
      ...current,
      [sectionId]: themeId,
    }));
  }

  async function copyComposedDesignMarkdown() {
    try {
      await navigator.clipboard.writeText(composedDesignMarkdown);
      setDesignMdActionStatus('Copied design.md to clipboard.');
    } catch {
      setDesignMdActionStatus('Copy failed. Select the Markdown text and copy it manually.');
    }
  }

  function downloadComposedDesignMarkdown() {
    const blob = new Blob([composedDesignMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = composedDesignFileName;
    link.click();
    URL.revokeObjectURL(url);
    setDesignMdActionStatus(`Downloaded ${composedDesignFileName}.`);
  }

  async function saveComposedTheme() {
    if (!themeName.trim()) {
      setDesignMdActionStatus('Theme name is required before saving.');
      return;
    }

    const fileName = createDesignFileName(themeName);
    setIsSavingTheme(true);
    setDesignMdActionStatus(`Saving to assets/designs/${fileName}...`);
    try {
      const result = await saveTheme({ fileName, markdown: composedThemeMarkdown });
      setDesignMdActionStatus(`Saved to ${result.filePath}. Reloading library...`);
      window.setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      setDesignMdActionStatus(error instanceof Error ? error.message : 'Unable to save theme Markdown.');
    } finally {
      setIsSavingTheme(false);
    }
  }

  return (
    <main className="app-page">
      <PageHeader
        eyebrow="Style lab"
        title="Composer"
        summary="Mix real theme sections into a design.md draft, then use atoms only as a temporary appearance scratchpad."
      />

      <section className="composer-workspace">
        <div className="composer-main">
          <section className="composer-panel">
            <div className="composer-panel__header">
              <p className="eyebrow">Design.md field mixer</p>
              <h2>Compose from full themes</h2>
              <p>Pick the best section from each complete theme. This produces a real Markdown design brief.</p>
            </div>
            <div className="theme-field-grid">
              {designMdSectionConfigs.map((section) => (
                <label className="theme-field-source" key={section.id}>
                  <span>{section.label} source</span>
                  <select
                    disabled={designMdThemes.length === 0}
                    value={designMdSelections[section.id]}
                    onChange={(event) => selectDesignMdSource(section.id, event.target.value)}
                  >
                    {designMdThemes.map((theme) => (
                      <option key={theme.id} value={theme.id}>
                        {theme.name}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </section>

          <section className="composer-panel">
            <div className="composer-panel__header">
              <p className="eyebrow">Appearance scratchpad</p>
              <h2>Try atomic inspiration</h2>
              <p>Atoms are reversible visual probes. Use them to feel a direction, not to create a full theme.</p>
            </div>
            <div className="composer-column">
              {composerDimensions.map((dimension) => (
                <AtomPicker
                  dimension={dimension}
                  key={dimension}
                  selectedAtomId={selectedAtomIds[dimension]}
                  onSelectAtom={selectAtom}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="composer-preview" style={styleMixVars}>
          <label className="search-field">
            <span>Theme name</span>
            <input
              aria-label="Theme name"
              value={themeName}
              onChange={(event) => setThemeName(event.target.value)}
            />
          </label>
          <div className="design-md-actions">
            <button className="primary-action" type="button" disabled={isSavingTheme} onClick={() => void saveComposedTheme()}>
              {isSavingTheme ? 'Saving...' : 'Save as theme'}
            </button>
          </div>
          <label className="design-md-output">
            <span>Composed design.md</span>
            <textarea aria-label="Composed design.md" readOnly value={composedDesignMarkdown} />
          </label>
          <div className="design-md-actions">
            <button className="secondary-action" type="button" onClick={() => void copyComposedDesignMarkdown()}>
              Copy design.md
            </button>
            <button className="secondary-action" type="button" onClick={downloadComposedDesignMarkdown}>
              Download design.md
            </button>
          </div>
          {designMdActionStatus && <p className="composer-status">{designMdActionStatus}</p>}
          {missingDesignMdSections.length > 0 && (
            <section className="design-md-warning" aria-label="Missing design.md sections">
              <strong>Missing sections</strong>
              <ul>
                {missingDesignMdSections.map((section) => (
                  <li key={`${section.sectionId}-${section.themeName}`}>
                    {section.label} from {section.themeName}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <div className="composer-preview__surface">
            <p className="eyebrow">Style mix preview</p>
            <h2>{selectedAtoms.length > 0 ? selectedAtoms.map((atom) => atom.name).join(' + ') : 'Select atoms'}</h2>
            <p>
              Combine one-dimensional inspiration atoms here. Save/promotion can come later once the mix feels reusable.
            </p>
            <div className="composer-preview__controls">
              <button type="button">Primary action</button>
              <span>Reference card</span>
            </div>
          </div>
          <button
            className="primary-action"
            type="button"
            disabled={selectedAtoms.length === 0}
            onClick={() => onApplyAppearancePatch(styleMixPatch)}
          >
            Apply style mix to app appearance
          </button>
        </aside>
      </section>
    </main>
  );
}

interface AtomPickerProps {
  dimension: InspirationDimension;
  selectedAtomId?: string;
  onSelectAtom: (dimension: InspirationDimension, atomId: string) => void;
}

function AtomPicker({ dimension, selectedAtomId, onSelectAtom }: AtomPickerProps) {
  const atoms = getInspirationAtoms(dimension);

  if (atoms.length === 0) {
    return null;
  }

  return (
    <fieldset className="atom-picker" aria-label={`${inspirationDimensionLabels[dimension]} atoms`}>
      <legend>{inspirationDimensionLabels[dimension]}</legend>
      <div className="atom-picker__grid">
        {atoms.map((atom) => (
          <AtomOption
            atom={atom}
            isSelected={atom.id === selectedAtomId}
            key={atom.id}
            onSelect={() => onSelectAtom(dimension, atom.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}

interface AtomOptionProps {
  atom: InspirationReference;
  isSelected: boolean;
  onSelect: () => void;
}

function AtomOption({ atom, isSelected, onSelect }: AtomOptionProps) {
  return (
    <button
      aria-label={`Use ${atom.name}`}
      aria-pressed={isSelected}
      className={isSelected ? 'atom-option is-selected' : 'atom-option'}
      type="button"
      onClick={onSelect}
    >
      <span className="atom-option__swatches" aria-hidden="true">
        {atom.colors.map((color) => (
          <span key={color} style={{ background: color }} />
        ))}
      </span>
      <strong>Use {atom.name}</strong>
      <span>{atom.summary}</span>
    </button>
  );
}
