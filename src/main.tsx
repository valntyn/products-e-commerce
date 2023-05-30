import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { ErrorFallback } from '@components/ErrorFallback';
import { store, persistor } from '@store/store';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </ErrorBoundary>
      </Router>
    </Provider>
  </React.StrictMode>,
);
