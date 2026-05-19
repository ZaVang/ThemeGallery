export function DashboardPreview() {
  return (
    <div className="scene scene-dashboard">
      <aside className="scene-sidebar">
        <strong>Northstar</strong>
        <span>Overview</span>
        <span>Customers</span>
        <span>Reports</span>
        <span>Settings</span>
      </aside>
      <main className="scene-main">
        <header className="scene-header">
          <div>
            <p>Workspace health</p>
            <h2>Active work</h2>
          </div>
          <button className="preview-button" type="button">Create report</button>
        </header>
        <section className="metric-grid">
          <div className="preview-card">
            <span>Revenue</span>
            <strong>$48.2k</strong>
          </div>
          <div className="preview-card">
            <span>Pipeline</span>
            <strong>128</strong>
          </div>
          <div className="preview-card">
            <span>Velocity</span>
            <strong>92%</strong>
          </div>
        </section>
        <section className="preview-card chart-card" aria-label="Activity chart">
          <span className="chart-bar chart-bar-a" />
          <span className="chart-bar chart-bar-b" />
          <span className="chart-bar chart-bar-c" />
          <span className="chart-bar chart-bar-d" />
        </section>
        <section className="preview-table">
          {['Design review', 'Launch checklist', 'Customer research'].map((item) => (
            <div className="preview-row" key={item}>
              <span>{item}</span>
              <span className="preview-badge">On track</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

