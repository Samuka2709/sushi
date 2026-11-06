import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import Privacy from './Privacy';
import './styles.css';

const root = document.getElementById('root')!;
const Page = document.body.dataset.page === 'privacy' ? Privacy : App;
const tree = (
  <StrictMode>
    <Page />
  </StrictMode>
);

// No build, o HTML já vem pronto (pré-renderizado) e o React só o "hidrata".
if (root.hasChildNodes()) hydrateRoot(root, tree);
else createRoot(root).render(tree);
