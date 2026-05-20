interface PageHeaderProps {
  eyebrow: string;
  title: string;
  summary: string;
}

export function PageHeader({ eyebrow, title, summary }: PageHeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      <p className="app-header__summary">{summary}</p>
    </header>
  );
}
