import { PageHeader } from '../../components/common/PageHeader';

export function ComposerPage() {
  return (
    <main className="app-page">
      <PageHeader
        eyebrow="Style lab"
        title="Composer"
        summary="Combine a base theme with color, material, typography, and layout cues before promoting a style mix."
      />
      <section className="placeholder-panel">
        <h2>Style mix workspace</h2>
        <p>Composer will preview fixed components while you combine design dimensions from the library.</p>
      </section>
    </main>
  );
}
