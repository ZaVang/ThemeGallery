import { appPages, type AppPageId } from './appPages';

interface AppTopNavProps {
  activePage: AppPageId;
  onPageChange: (page: AppPageId) => void;
}

export function AppTopNav({ activePage, onPageChange }: AppTopNavProps) {
  return (
    <header className="app-topbar">
      <div className="app-brand">
        <span>ThemeGallery</span>
        <small>Design reference workbench</small>
      </div>
      <nav className="app-nav" aria-label="Primary pages">
        {appPages.map((page) => (
          <button
            aria-current={activePage === page.id ? 'page' : undefined}
            className={activePage === page.id ? 'app-nav__item is-active' : 'app-nav__item'}
            key={page.id}
            type="button"
            onClick={() => onPageChange(page.id)}
          >
            {page.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
