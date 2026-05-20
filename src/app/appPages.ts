export type AppPageId = 'themes' | 'import' | 'inspirations' | 'composer' | 'settings';

export interface AppPage {
  id: AppPageId;
  label: string;
}

export const appPages: AppPage[] = [
  { id: 'themes', label: 'Themes' },
  { id: 'import', label: 'Import' },
  { id: 'inspirations', label: 'Inspirations' },
  { id: 'composer', label: 'Composer' },
  { id: 'settings', label: 'Settings' },
];
