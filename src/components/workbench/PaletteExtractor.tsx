import { useMemo, useState } from 'react';
import { extractPaletteFromImageFile } from '../../palette/imagePaletteExtraction';
import {
  createPaletteFileName,
  createPaletteMarkdown,
  defaultPaletteRoles,
  normalizeEditableHex,
  type EditablePaletteColor,
} from '../../palette/paletteMarkdown';

interface PaletteExtractorProps {
  initialColors?: EditablePaletteColor[];
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

export function PaletteExtractor({ initialColors = [] }: PaletteExtractorProps) {
  const [name, setName] = useState('Imported Palette');
  const [source, setSource] = useState('小红书');
  const [mood, setMood] = useState('');
  const [colors, setColors] = useState<EditablePaletteColor[]>(initialColors);
  const [fileName, setFileName] = useState('No image selected');
  const [status, setStatus] = useState('Upload a Xiaohongshu color card image to extract swatches.');
  const [actionStatus, setActionStatus] = useState('');

  const markdown = useMemo(
    () => createPaletteMarkdown({ name, source, mood, colors }),
    [colors, mood, name, source],
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
                  {[...defaultPaletteRoles, 'tertiary', 'error'].map((role) => (
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
          <button className="secondary-action" type="button" onClick={() => void copyMarkdown()}>
            Copy Markdown
          </button>
          <button className="secondary-action" type="button" onClick={downloadMarkdown}>
            Download .md
          </button>
        </div>
        <p className="extractor-status">
          Save it into palettes/{createPaletteFileName(name)} so ThemeGallery can load it on the next refresh.
        </p>
        {actionStatus && <p className="extractor-status">{actionStatus}</p>}
      </div>
    </details>
  );
}
