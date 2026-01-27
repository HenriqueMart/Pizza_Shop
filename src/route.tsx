import { createBrowserRouter } from 'react-router-dom';
import { SignIn } from './components/page/auth/sign-in';
import { AppLayout } from './components/page/_layouts/app';
import { AuthLayout } from './components/page/_layouts/auth';
import { SignUp } from './components/page/auth/sign-up';
import { Orders } from './components/page/app/orders/order';
import Dashboard from './components/page/app/dashboard/dashboard';
import { Notfound } from './components/page/404';

export const routes = createBrowserRouter([
    {
        path: '/', 
        element: <AppLayout/>,
        errorElement: <Notfound/>,
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