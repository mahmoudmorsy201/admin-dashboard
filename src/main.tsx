import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from 'App';
import { ReactQueryProvider } from 'react-query';

import './index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </StrictMode>,
);