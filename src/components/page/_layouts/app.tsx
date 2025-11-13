import { Outlet } from "react-router-dom"; //Elemento que vai ser renderizado de cada página.

export function AppLayout(){
    return (
        <div>
            <h1>Cabeçalho</h1>
            <div>
                <Outlet/> 
            </div>
        </div>
    )
}