export function LandingPreview() {
  return (
    <div className="scene scene-landing">
      <nav className="landing-nav">
        <strong>Orbit</strong>
        <div>
          <button className="preview-button ghost" type="button">Log in</button>
          <button className="preview-button" type="button">Start preview</button>
        </div>
      </nav>
      <section className="landing-hero">
        <div>
          <h2>Design faster with a theme system</h2>
          <p>Preview the product surface before committing to a visual direction.</p>
        </div>
        <div className="product-panel" aria-label="Product preview">
          <div className="product-panel__bar" />
          <div className="product-panel__body">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
      <section className="metric-grid">
        <div className="preview-card">
          <span>Conversion</span>
          <strong>14.8%</strong>
        </div>
        <div className="preview-card">
          <span>Activation</span>
          <strong>71%</strong>
        </div>
        <div className="preview-card">
          <span>Retention</span>
          <strong>42d</strong>
        </div>
      </section>
    </div>
  );
}

