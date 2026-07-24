import React from 'react';
import { AppProviders } from './providers.jsx';
import { AppRoutes } from './routes.jsx';

const App = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;
