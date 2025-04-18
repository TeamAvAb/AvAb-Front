import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryclient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryclient}>
    <App />
  </QueryClientProvider>,
);
