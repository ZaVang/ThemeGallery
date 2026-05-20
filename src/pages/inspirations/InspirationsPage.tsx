import { PageHeader } from '../../components/common/PageHeader';

export function InspirationsPage() {
  return (
    <main className="app-page">
      <PageHeader
        eyebrow="Reference library"
        title="Inspirations"
        summary="Collect palettes, visual cues, material references, and style notes without forcing them into full themes."
      />
      <section className="placeholder-panel">
        <h2>Inspiration dimensions</h2>
        <p>
          This page will separate color, material, shape, typography, layout, radius, border, and lighting references.
        </p>
      </section>
    </main>
  );
}
