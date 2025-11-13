import { Outlet } from "react-router-dom"; //Elemento que vai ser renderizado de cada página.

export function AuthLayout(){
    return (
        <div>
            <h1>Autenticão</h1>
            <div>
                <Outlet/> 
            </div>
        </div>
    )
}