import React from 'react';
import ReactDOM from 'react-dom/client';
import PaintApp from './components/PaintApp';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <PaintApp />
    </React.StrictMode>
  );
}