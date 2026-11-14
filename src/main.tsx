import {StrictMode, type ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { legalPageFromPath } from './legal/pages.ts';
import './index.css';

const render = (node: ReactNode) =>
  createRoot(document.getElementById('root')!).render(<StrictMode>{node}</StrictMode>);

if (window.location.pathname === '/gift') {
  window.location.replace(`/gift/${window.location.search}${window.location.hash}`);
} else {
  // Only StarPay serves these pages; YulduzPay's legal pages are in its mini app (app.yulduzpay.uz).
  const isStarPay = (import.meta.env.VITE_BRAND_NAME || '').replace(/[\s_-]/g, '').toLowerCase() === 'starpay';
  const legalPage = isStarPay ? legalPageFromPath(window.location.pathname) : null;
  if (legalPage) {
    // The legal pages are their own chunk; the landing page does not download them.
    import('./legal/LegalPage.tsx').then(({ default: LegalPage }) => render(<LegalPage page={legalPage} />));
  } else {
    render(<App />);
  }
}
