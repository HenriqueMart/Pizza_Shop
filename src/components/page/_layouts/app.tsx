import { Header } from "@/components/header";
import { Outlet } from "react-router-dom"; //Elemento que vai ser renderizado de cada página.

export function AppLayout(){
    return (
        <div className="flex min-h-screen flex-col antialiased">
            <Header/>
            <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
                <Outlet/> 
            </div>
        </div>
    )
}