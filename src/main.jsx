import React from 'react';
import { createRoot } from 'react-dom/client';
import { ExperimentalAtlasThemeProvider } from '@diligentcorp/atlas-theme-mui';
import App from './App.jsx';
import './styles/responsive.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ExperimentalAtlasThemeProvider tokenMode="atlas-dark">
      <App />
    </ExperimentalAtlasThemeProvider>
  </React.StrictMode>
);
