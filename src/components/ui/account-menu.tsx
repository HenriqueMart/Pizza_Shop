import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { DropdownMenuItem } from "./dropdown-menu";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManagerRestaurant } from "@/api/get-manager-restaurant";

export function AccountMenu(){
    const { data: profile } = useQuery({
        queryKey: ['profile'], // Definindo a identificação para essa chamada, se caso ocorrer novamente, rele pegar com base nesse key
        queryFn: getProfile,
    })
    const { data: managedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'], // Definindo a identificação para essa chamada, se caso ocorrer novamente, rele pegar com base nesse key
        queryFn: getManagerRestaurant,
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="flex items-center gap-2 select-none">
                    {managedRestaurant?.name}
                    <ChevronDown className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className=" flex flex-col w-56 bg-muted p-2 mt-2 border gap-2 rounded-md shadow-md">
               <DropdownMenuLabel className="flex flex-col gap-2">
                    <span className="">{profile?.name}</span>
                     <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
               </DropdownMenuLabel>
                <DropdownMenuItem>
                   
                        <Building className="w-4 h-4 mr-2"/>
                        <span>Perfil da Loja </span>
                    
                </DropdownMenuItem>
                <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                     <Link to="/sign-in" className="flex">
                    <LogOut className="w-4 h-4 mr-2"/>
                    <span>Sair</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}