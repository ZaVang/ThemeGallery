export function ComponentsPreview() {
  return (
    <div className="scene scene-components">
      <header className="scene-header">
        <div>
          <p>Token board</p>
          <h2>Components</h2>
        </div>
      </header>
      <div className="component-grid">
        <section className="preview-card">
          <h3>Buttons</h3>
          <div className="inline-actions">
            <button className="preview-button" type="button">Primary</button>
            <button className="preview-button secondary" type="button">Secondary</button>
            <button className="preview-button tertiary" type="button">Tertiary</button>
            <button className="preview-button ghost" type="button">Ghost</button>
          </div>
        </section>
        <section className="preview-card">
          <h3>Inputs</h3>
          <input className="preview-input" value="Theme search" readOnly />
        </section>
        <section className="preview-card">
          <h3>Badges</h3>
          <div className="inline-actions">
            <span className="preview-badge">Palette</span>
            <span className="preview-badge secondary">Ready</span>
            <span className="preview-badge tertiary">Accent</span>
            <span className="preview-badge success">Live</span>
            <span className="preview-badge warning">Review</span>
            <span className="preview-badge info">Info</span>
            <span className="preview-badge error">Risk</span>
          </div>
        </section>
        <section className="preview-card">
          <h3>Modal</h3>
          <div className="mini-modal">
            <strong>Save theme?</strong>
            <p>Warnings stay visible before export.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
