export type AppPageId = 'themes' | 'inspirations' | 'composer' | 'settings';

export interface AppPage {
  id: AppPageId;
  label: string;
}

export const appPages: AppPage[] = [
  { id: 'themes', label: 'Themes' },
  { id: 'inspirations', label: 'Inspirations' },
  { id: 'composer', label: 'Composer' },
  { id: 'settings', label: 'Settings' },
];
