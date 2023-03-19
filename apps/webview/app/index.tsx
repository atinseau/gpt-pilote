import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

import './styles/globals.scss';
import { ChatProvider } from './contexts/ChatContext';

const renderApp = () => {
  const container = document.getElementById('app');
  if (!container) throw new Error('No container found!');
  const root = createRoot(container);
  root.render(
    <ChatProvider>
      <App />
    </ChatProvider>,
  );
};

renderApp();
