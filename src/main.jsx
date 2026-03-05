import React from 'react';
import { createRoot } from 'react-dom/client';
import { ExperimentalAtlasThemeProvider } from '@diligentcorp/atlas-theme-mui';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ExperimentalAtlasThemeProvider tokenMode="atlas-dark">
      <App />
    </ExperimentalAtlasThemeProvider>
  </React.StrictMode>
);
