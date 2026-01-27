import { RouterProvider } from 'react-router-dom';
import '../src/global.css';

import { routes } from './route';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster, toast } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provide';

export default function App() {
  return (
    <>
      <HelmetProvider>
        <ThemeProvider storageKey="pizzashop-theme" defaultTheme='dark'>
          <Helmet titleTemplate='%s | pizza.shop'/> {/* Altera o título da página mantendo o sufixo */}
          <Toaster richColors />
          <RouterProvider router={routes}/>
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}
