import { RouterProvider } from 'react-router-dom';
import '../src/global.css';

import { routes } from './route';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster, toast } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provide';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

export default function App() {
  return (
    <>
      <HelmetProvider>
        <ThemeProvider storageKey="pizzashop-theme" defaultTheme='dark'>
          <Helmet titleTemplate='%s | pizza.shop'/> {/* Altera o título da página mantendo o sufixo */}
          <Toaster richColors />
          {/* Todas as rotas tem o acesso do React Query */}
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes}/>
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}
