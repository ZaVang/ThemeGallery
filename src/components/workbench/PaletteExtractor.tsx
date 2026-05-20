import { useMemo, useState } from 'react';
import { extractPaletteFromImageFile } from '../../palette/imagePaletteExtraction';
import {
  createPaletteFileName,
  createPaletteMarkdown,
  defaultPaletteRoles,
  normalizeEditableHex,
  type EditablePaletteColor,
} from '../../palette/paletteMarkdown';
import { savePaletteMarkdown, type SavePaletteInput, type SavePaletteResult } from '../../palette/savePalette';
import { themeToCssVars } from '../../theme/cssVars';
import { normalizeTheme } from '../../theme/normalizeTheme';
import { scenarioTagLabel, scenarioTags, type ScenarioTag } from '../../theme/scenarioTags';

const paletteRoleOptions = Array.from(new Set([...defaultPaletteRoles, 'tertiary', 'text', 'danger', 'error']));

const roleSlots = [
  { role: 'background', label: 'Background' },
  { role: 'surface', label: 'Surface' },
  { role: 'primary', label: 'Primary' },
  { role: 'secondary', label: 'Secondary' },
  { role: 'accent', label: 'Accent' },
  { role: 'text', label: 'Text' },
  { role: 'danger', label: 'Danger' },
] as const;

interface PaletteExtractorProps {
  initialColors?: EditablePaletteColor[];
  reloadAfterSave?: boolean;
  savePalette?: (input: SavePaletteInput) => Promise<SavePaletteResult>;
}

function titleFromFile(file: File): string {
  return file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
}

function updateColor(
  colors: EditablePaletteColor[],
  id: string,
  patch: Partial<EditablePaletteColor>,
): EditablePaletteColor[] {
  return colors.map((color) => (color.id === id ? { ...color, ...patch } : color));
}

function colorOptionLabel(color: EditablePaletteColor, index: number): string {
  return `${color.name.trim() || `Color ${index + 1}`} (${normalizeEditableHex(color.hex)})`;
}

export function PaletteExtractor({
  initialColors = [],
  reloadAfterSave = true,
  savePalette = savePaletteMarkdown,
}: PaletteExtractorProps) {
  const [name, setName] = useState('Imported Palette');
  const [source, setSource] = useState('小红书');
  const [mood, setMood] = useState('');
  const [colors, setColors] = useState<EditablePaletteColor[]>(initialColors);
  const [fileName, setFileName] = useState('No image selected');
  const [status, setStatus] = useState('Upload a Xiaohongshu color card image to extract swatches.');
  const [actionStatus, setActionStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedScenarioTags, setSelectedScenarioTags] = useState<ScenarioTag[]>([]);

  const markdown = useMemo(
    () => createPaletteMarkdown({ name, source, mood, tags: selectedScenarioTags, colors }),
    [colors, mood, name, selectedScenarioTags, source],
  );
  const previewTheme = useMemo(
    () =>
      normalizeTheme({
        sourceKind: 'palette',
        filePath: 'palettes/imported-preview.md',
        id: 'palette-extractor-preview',
        name: name.trim() || 'Imported Palette',
        tags: ['imported', 'palette', ...selectedScenarioTags],
        source,
        mood,
        colors,
        gradients: [],
        markdownBody: mood.trim() || 'Imported from image. Adjust names, roles, and colors before saving.',
        warnings: [],
      }),
    [colors, mood, name, selectedScenarioTags, source],
  );

  async function handleFile(file: File | undefined) {
    if (!file) {
      return;
    }

    setStatus('Extracting color bars...');
    setFileName(file.name);
    setName(titleFromFile(file));
    try {
      const extracted = await extractPaletteFromImageFile(file);
      setColors(extracted);
      setStatus(extracted.length > 0 ? `Extracted ${extracted.length} swatches. Adjust them below.` : 'No swatches found. Add or adjust colors manually.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to extract palette.');
    }
  }

  function addColor() {
    const index = colors.length;
    setColors([
      ...colors,
      {
        id: crypto.randomUUID?.() ?? `${Date.now()}-${index}`,
        name: `Color ${index + 1}`,
        hex: '#000000',
        role: defaultPaletteRoles[index] ?? 'accent',
      },
    ]);
  }

  function removeColor(id: string) {
    setColors(colors.filter((color) => color.id !== id));
  }

  function toggleScenarioTag(tag: ScenarioTag) {
    setSelectedScenarioTags((currentTags) =>
      currentTags.includes(tag) ? currentTags.filter((currentTag) => currentTag !== tag) : [...currentTags, tag],
    );
  }

  function colorIdForRole(role: string): string {
    const match = colors.find((color) => {
      if (role === 'accent') {
        return color.role === 'accent' || color.role === 'tertiary';
      }

      if (role === 'danger') {
        return color.role === 'danger' || color.role === 'error';
      }

      return color.role === role;
    });

    return match?.id ?? '';
  }

  function assignRole(role: string, id: string) {
    setColors((currentColors) =>
      currentColors.map((color) => {
        const roleMatches = color.role === role || (role === 'danger' && color.role === 'error');
        if (!id && roleMatches) {
          return { ...color, role: 'accent' };
        }

        if (color.id === id) {
          return { ...color, role };
        }

        if (role !== 'accent' && roleMatches) {
          return { ...color, role: 'accent' };
        }

        return color;
      }),
    );
  }

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(markdown);
      setActionStatus('Markdown copied.');
    } catch {
      setActionStatus('Copy failed. Select the Markdown text and copy it manually.');
    }
  }

  function downloadMarkdown() {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = createPaletteFileName(name);
    link.click();
    URL.revokeObjectURL(url);
    setActionStatus(`Downloaded ${link.download}. Save it into palettes/.`);
  }

  async function saveToLibrary() {
    if (colors.length === 0) {
      setActionStatus('Add at least one color before saving.');
      return;
    }

    const nextFileName = createPaletteFileName(name);
    setIsSaving(true);
    setActionStatus(`Saving to palettes/${nextFileName}...`);
    try {
      const result = await savePalette({ fileName: nextFileName, markdown });
      setActionStatus(`Saved to ${result.filePath}. Reloading library...`);
      if (reloadAfterSave) {
        window.setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      setActionStatus(error instanceof Error ? error.message : 'Unable to save palette Markdown.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <details className="palette-extractor" open>
      <summary>Palette Extractor</summary>
      <div className="palette-extractor__body">
        <label className="upload-field">
          <span>Image</span>
          <span className="file-picker">
            <input
              aria-label="Upload palette image"
              accept="image/*"
              type="file"
              onChange={(event) => void handleFile(event.currentTarget.files?.[0])}
            />
            <span className="file-picker__button">Choose image</span>
            <span className="file-picker__name" title={fileName}>
              {fileName}
            </span>
          </span>
        </label>
        <p className="extractor-status">{status}</p>

        <label className="search-field">
          <span>Name</span>
          <input aria-label="Palette name" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="search-field">
          <span>Source</span>
          <input aria-label="Palette source" value={source} onChange={(event) => setSource(event.target.value)} />
        </label>
        <label className="search-field">
          <span>Mood</span>
          <input aria-label="Palette mood" value={mood} onChange={(event) => setMood(event.target.value)} />
        </label>

        <section className="scenario-tag-panel" aria-label="Usage scenario tags">
          <div className="scenario-tag-panel__heading">
            <h3>Usage tags</h3>
            <p>Mark likely product contexts for later filtering.</p>
          </div>
          <div className="scenario-tag-grid">
            {scenarioTags.map((tag) => (
              <label className="scenario-tag-option" key={tag}>
                <input
                  checked={selectedScenarioTags.includes(tag)}
                  type="checkbox"
                  onChange={() => toggleScenarioTag(tag)}
                />
                <span>{scenarioTagLabel(tag)}</span>
              </label>
            ))}
          </div>
        </section>

        {colors.length > 0 && (
          <section className="role-mapping-panel" aria-label="Color role mapping">
            <div className="role-mapping-panel__heading">
              <h3>Role mapping</h3>
              <p>Assign key UI roles before saving.</p>
            </div>
            <div className="role-slot-grid">
              {roleSlots.map((slot) => (
                <label className="role-slot" key={slot.role}>
                  <span>{slot.label}</span>
                  <select
                    aria-label={`Assign ${slot.role} role`}
                    value={colorIdForRole(slot.role)}
                    onChange={(event) => assignRole(slot.role, event.target.value)}
                  >
                    <option value="">Unassigned</option>
                    {colors.map((color, index) => (
                      <option key={color.id} value={color.id}>
                        {colorOptionLabel(color, index)}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <div className="role-preview" aria-label="Derived role preview" style={themeToCssVars(previewTheme)}>
              <div className="role-preview__surface">
                <span>Live derived preview</span>
                <strong>{previewTheme.name}</strong>
                <p>{previewTheme.mood || 'Role changes update this local derived palette preview.'}</p>
                <div className="role-preview__actions">
                  <button type="button">Primary action</button>
                  <span>Danger state</span>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="editable-palette-list" aria-label="Editable palette colors">
          {colors.map((color, index) => (
            <div className="editable-palette-row" key={color.id}>
              <input
                aria-label={`Color picker for color ${index + 1}`}
                className="editable-palette-row__picker"
                type="color"
                value={normalizeEditableHex(color.hex)}
                onChange={(event) => setColors(updateColor(colors, color.id, { hex: event.target.value.toUpperCase() }))}
              />
              <div className="editable-palette-row__fields">
                <input
                  aria-label={`Name for color ${index + 1}`}
                  value={color.name}
                  onChange={(event) => setColors(updateColor(colors, color.id, { name: event.target.value }))}
                />
                <input
                  aria-label={`Hex for color ${index + 1}`}
                  value={color.hex}
                  onBlur={() => setColors(updateColor(colors, color.id, { hex: normalizeEditableHex(color.hex) }))}
                  onChange={(event) => setColors(updateColor(colors, color.id, { hex: event.target.value.toUpperCase() }))}
                />
                <select
                  aria-label={`Role for color ${index + 1}`}
                  value={color.role}
                  onChange={(event) => setColors(updateColor(colors, color.id, { role: event.target.value }))}
                >
                  {paletteRoleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <button aria-label={`Remove color ${index + 1}`} className="icon-text-button" type="button" onClick={() => removeColor(color.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <button className="secondary-action" type="button" onClick={addColor}>
          Add color
        </button>

        <label className="markdown-output">
          <span>Palette Markdown</span>
          <textarea aria-label="Generated palette markdown" readOnly value={markdown} />
        </label>
        <div className="extractor-actions">
          <button className="primary-action" type="button" disabled={isSaving} onClick={() => void saveToLibrary()}>
            {isSaving ? 'Saving...' : 'Save to palettes/'}
          </button>
        </div>
        <p className="extractor-status">Primary save target: palettes/{createPaletteFileName(name)}</p>
        <div className="extractor-actions">
          <button className="secondary-action" type="button" onClick={() => void copyMarkdown()}>
            Copy Markdown
          </button>
          <button className="secondary-action" type="button" onClick={downloadMarkdown}>
            Download .md
          </button>
        </div>
        {actionStatus && <p className="extractor-status">{actionStatus}</p>}
      </div>
    </details>
  );
}
