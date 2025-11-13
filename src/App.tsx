import { RouterProvider } from 'react-router-dom';
import './global.css';

import { routes } from './route';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <>
      <HelmetProvider>
        <Helmet titleTemplate='%s | pizza.shop'/> {/* Altera o título da página mantendo o sufixo */}
        <RouterProvider router={routes}/>
      </HelmetProvider>
    </>
  );
}
