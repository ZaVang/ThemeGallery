export function MobilePreview() {
  return (
    <div className="scene scene-mobile">
      <div className="phone-frame">
        <header className="phone-header">
          <div>
            <p>Today</p>
            <h2>Focus score</h2>
          </div>
          <span className="avatar-dot" />
        </header>
        <section className="phone-card">
          <span>Deep work</span>
          <strong>3h 24m</strong>
        </section>
        {['Design system audit', 'Palette review', 'Preview polish'].map((item) => (
          <div className="phone-list-item" key={item}>
            <span>{item}</span>
            <span className="preview-badge secondary">Done</span>
          </div>
        ))}
        <nav className="phone-tabs">
          <span>Home</span>
          <span>Insights</span>
          <span>Profile</span>
        </nav>
      </div>
    </div>
  );
}

