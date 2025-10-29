import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element (#root)가 index.html에 없습니다.');
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
