import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import LegalPage, { legalPageFromPath } from './legal/LegalPage.tsx';
import './index.css';

if (window.location.pathname === '/gift') {
  window.location.replace(`/gift/${window.location.search}${window.location.hash}`);
} else {
  const legalPage = legalPageFromPath(window.location.pathname);
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      {legalPage ? <LegalPage page={legalPage} /> : <App />}
    </StrictMode>,
  );
}
