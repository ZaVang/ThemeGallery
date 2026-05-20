import { isHexColor, readableTextColor } from '../../theme/colorMath';
import { sortColorSwatchesForDisplay } from '../../theme/colorDisplay';
import type { ColorSwatch, NormalizedTheme } from '../../types/theme';

interface ColorCardPreviewProps {
  theme: NormalizedTheme;
  useThemeGradient?: boolean;
}

function displayHex(value: string): string {
  return isHexColor(value) ? value.toUpperCase() : value;
}

function swatchTextColor(swatch: ColorSwatch): string {
  return isHexColor(swatch.hex) ? readableTextColor(swatch.hex) : '#ffffff';
}

function swatchMeta(swatch: ColorSwatch): string {
  return swatch.role ?? swatch.token ?? 'color';
}

export function ColorCardPreview({ theme, useThemeGradient = true }: ColorCardPreviewProps) {
  const primaryGradient = useThemeGradient ? theme.gradients[0] : undefined;
  const artStyle = primaryGradient
    ? { background: `linear-gradient(135deg, ${primaryGradient.from}, ${primaryGradient.to})` }
    : undefined;
  const colorSwatches = sortColorSwatchesForDisplay(theme.colorSwatches);

  return (
    <div className="scene scene-color-card">
      <section className="color-card-art" aria-label={`${theme.name} color card`} style={artStyle}>
        <div className="color-card-atmosphere" />
        <header className="color-card-header">
          <p>{theme.kind === 'palette-derived' ? 'Collected palette' : 'Theme palette'}</p>
          <h2>{theme.name}</h2>
        </header>

        <div className="color-card-stack">
          {colorSwatches.map((swatch) => (
            <article
              className="color-card-row"
              key={`${swatch.name}-${swatch.hex}-${swatch.role ?? swatch.token ?? 'color'}`}
              style={{ backgroundColor: swatch.hex, color: swatchTextColor(swatch) }}
            >
              <div>
                <strong>{swatch.name}</strong>
                <span>{swatchMeta(swatch)}</span>
              </div>
              <code>HEX: {displayHex(swatch.hex)}</code>
            </article>
          ))}
        </div>

        <footer className="color-card-footer">
          <span>{theme.source ?? theme.filePath}</span>
          {theme.mood && <span>{theme.mood}</span>}
        </footer>
      </section>
    </div>
  );
}
