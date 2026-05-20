import { PageHeader } from '../../components/common/PageHeader';
import { PaletteExtractor } from '../../components/workbench/PaletteExtractor';

export function ImportAssetsPage() {
  return (
    <main className="app-page">
      <PageHeader
        eyebrow="Image ingestion"
        title="Import"
        summary="Extract color assets from reference images, adjust roles, and save them into assets/colors."
      />
      <section className="import-page-grid" aria-label="Image import tools">
        <PaletteExtractor />
      </section>
    </main>
  );
}
