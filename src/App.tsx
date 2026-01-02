import { RouterProvider } from 'react-router-dom';
import './global.css';

import { routes } from './route';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster, toast } from 'sonner'

export default function App() {
  return (
    <>
      <HelmetProvider>
        <Helmet titleTemplate='%s | pizza.shop'/> {/* Altera o título da página mantendo o sufixo */}
        <Toaster richColors />
        <RouterProvider router={routes}/>
      </HelmetProvider>
    </>
  );
}
