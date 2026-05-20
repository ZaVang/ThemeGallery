import { useMemo, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import type { AppAppearancePatch } from '../../app/appearance/appAppearancePatch';
import {
  getInspirationAtoms,
  getInspirationCombinations,
  inspirationDimensionLabels,
  inspirationDimensions,
  type InspirationDimension,
  type InspirationReference,
} from '../../inspirations/inspirationReferences';

type DimensionFilter = 'combinations' | InspirationDimension;

interface InspirationsPageProps {
  onApplyAppearancePatch: (patch: AppAppearancePatch) => void;
}

export function InspirationsPage({ onApplyAppearancePatch }: InspirationsPageProps) {
  const [activeDimension, setActiveDimension] = useState<DimensionFilter>('combinations');
  const visibleReferences = useMemo(
    () =>
      activeDimension === 'combinations'
        ? getInspirationCombinations()
        : getInspirationAtoms(activeDimension),
    [activeDimension],
  );

  return (
    <main className="app-page">
      <PageHeader
        eyebrow="Reference library"
        title="Inspirations"
        summary="Collect palettes, visual cues, material references, and style notes without forcing them into full themes."
      />

      <section className="inspiration-workspace">
        <div className="dimension-filter" aria-label="Inspiration dimension filters">
          <button
            aria-pressed={activeDimension === 'combinations'}
            className={activeDimension === 'combinations' ? 'filter-pill is-active' : 'filter-pill'}
            type="button"
            onClick={() => setActiveDimension('combinations')}
          >
            Combinations
          </button>
          {inspirationDimensions.map((dimension) => (
            <button
              aria-pressed={activeDimension === dimension}
              className={activeDimension === dimension ? 'filter-pill is-active' : 'filter-pill'}
              key={dimension}
              type="button"
              onClick={() => setActiveDimension(dimension)}
            >
              {inspirationDimensionLabels[dimension]}
            </button>
          ))}
        </div>

        <div className="inspiration-grid">
          {visibleReferences.map((reference) => (
            <InspirationCard
              key={reference.id}
              reference={reference}
              onApplyAppearancePatch={onApplyAppearancePatch}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

interface InspirationCardProps {
  reference: InspirationReference;
  onApplyAppearancePatch: (patch: AppAppearancePatch) => void;
}

function InspirationCard({ reference, onApplyAppearancePatch }: InspirationCardProps) {
  return (
    <article className="inspiration-card" aria-label={`${reference.name} reference`}>
      <div
        className="inspiration-card__visual"
        style={{ background: createReferenceBackground(reference.colors) }}
        aria-hidden="true"
      >
        {reference.colors.map((color) => (
          <span key={color} style={{ background: color }} />
        ))}
      </div>
      <div className="inspiration-card__body">
        <div className="inspiration-card__heading">
          <span>{reference.kind === 'atom' ? `${inspirationDimensionLabels[reference.dimensions[0]]} atom` : sourceTypeLabel(reference.sourceType)}</span>
          <h2>{reference.name}</h2>
        </div>
        <p>{reference.summary}</p>
        <div className="inspiration-chip-row" aria-label={`${reference.name} dimensions`}>
          {reference.dimensions.map((dimension) => (
            <span key={dimension}>{dimension}</span>
          ))}
        </div>
        <ul className="cue-list">
          {reference.cues.map((cue) => (
            <li key={cue}>{cue}</li>
          ))}
        </ul>
      </div>
      {reference.appearancePatch && (
        <button
          className="secondary-action"
          type="button"
          aria-label={`Apply ${reference.name} to app appearance`}
          onClick={() => onApplyAppearancePatch(reference.appearancePatch!)}
        >
          Apply to app
        </button>
      )}
    </article>
  );
}

function sourceTypeLabel(sourceType: InspirationReference['sourceType']): string {
  if (sourceType === 'style-breakdown') {
    return 'Style breakdown';
  }

  if (sourceType === 'visual-reference') {
    return 'Visual reference';
  }

  return 'Palette';
}

function createReferenceBackground(colors: string[]): string {
  if (colors.length === 0) {
    return 'var(--app-surface-muted)';
  }

  return `linear-gradient(135deg, ${colors.join(', ')})`;
}
