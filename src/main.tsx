import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { ErrorFallback } from '@components/ErrorFallback';
import { store } from '@store/store';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <App />
        </ErrorBoundary>
      </Router>
    </Provider>
  </React.StrictMode>,
);
