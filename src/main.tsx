import { StrictMode } from 'react';
import './global.css'
import { createRoot } from 'react-dom/client';
import App from './app.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
