import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker safely with auto-update
try {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    registerSW({ immediate: true });
  }
} catch (swErr) {
  console.warn('PWA registerSW error (ignorable):', swErr);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
