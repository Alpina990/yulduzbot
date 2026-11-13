import type { PageKey } from './content';

// Kept apart from LegalPage.tsx so the landing page can route without loading the legal pages.
export const LEGAL_PAGES: PageKey[] = ['privacy', 'terms', 'prices', 'support'];

export const legalPageFromPath = (path: string): PageKey | null => {
  const key = path.replace(/^\/+|\/+$/g, '') as PageKey;
  return LEGAL_PAGES.includes(key) ? key : null;
};
