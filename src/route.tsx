import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './components/page/app/dashboard';
import { SignIn } from './components/page/auth/sign-in';
import { AppLayout } from './components/page/_layouts/app';
import { AuthLayout } from './components/page/_layouts/auth';
import { SignUp } from './components/page/auth/sign-up';
import { Orders } from './components/page/app/orders/order';

export const routes = createBrowserRouter([
    {
        path: '/', 
        element: <AppLayout/>,
        children: [
           {path: '/', element: <Dashboard/>}, //Conseguimos colocar como layout e page que eserá renderizada
           {path: '/orders', element: <Orders/>}
        ]
    },
    {
        path: '/', 
        element: <AuthLayout/>,
        children: [
           {path: '/sign-in', element: <SignIn/>},
           {path: '/sign-up', element: <SignUp/>}
        ]
    },
   
])