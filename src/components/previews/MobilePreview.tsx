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
        {[
          ['Design system audit', 'Done', 'success'],
          ['Palette review', 'Watch', 'warning'],
          ['Preview polish', 'Info', 'info'],
        ].map(([item, status, variant]) => (
          <div className="phone-list-item" key={item}>
            <span>{item}</span>
            <span className={`preview-badge ${variant}`}>{status}</span>
          </div>
        ))}
        <nav className="phone-tabs">
          <span className="is-active">Home</span>
          <span>Insights</span>
          <span>Profile</span>
        </nav>
      </div>
    </div>
  );
}
