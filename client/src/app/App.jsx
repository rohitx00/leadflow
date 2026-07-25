import React from 'react';
import { AppProviders } from './providers.jsx';
import { AppRoutes } from './routes.jsx';
import { Footer } from '../components/common/Footer.jsx';

const App = () => {
  return (
    <AppProviders>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex flex-col">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AppProviders>
  );
};

export default App;
