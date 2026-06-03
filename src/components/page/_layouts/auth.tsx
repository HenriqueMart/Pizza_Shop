import { Link, Outlet } from "react-router-dom"; //Elemento que vai ser renderizado de cada página.
import {Pizza} from "lucide-react";


export function AuthLayout(){
    return (
        <div className=" grid min-h-screen grid-cols-2 antialiased">
            <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between bg-gray-300">
                <div className="text-lg text-foreground">
                    <Link to="/" className="flex gap-3 items-center">
                    <Pizza className="h-5 w-5 " />
                    <span className="font-semibold">pizza.com</span>
                    </Link>
                </div>

                <footer className="text-sm">
                    Painel do Parceiro &copy; pizza.shop - {new Date().getFullYear()}
                </footer>
                
            </div>
            <div className="flex flex-col justify-center items-center relative dark:bg-black">
                <Outlet />
            </div>
        </div>
    )
}