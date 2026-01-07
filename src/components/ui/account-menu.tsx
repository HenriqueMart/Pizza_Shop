import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { DropdownMenuItem } from "./dropdown-menu";

export function AccountMenu(){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="flex items-center gap-2 select-none">
                    Pizza Shop
                    <ChevronDown className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white p-2 gap-2 mt-2 border rounded-md shadow-md">
               <DropdownMenuLabel className="flex flex-col">
                    <span className="">Henrique Martins</span>
                     <span className="text-xs font-normal text-muted-foreground">Henrique@gmail.com</span>
               </DropdownMenuLabel>
               <DropdownMenuContent/>
               <DropdownMenuItem>
                     <Building className="w-4 h-4 mr-2"/>
                     <span>Perfil da Loja</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                     <LogOut className="w-4 h-4 mr-2"/>
                     <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}