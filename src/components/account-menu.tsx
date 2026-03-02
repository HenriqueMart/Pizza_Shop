import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManagerRestaurant } from "@/api/get-manager-restaurant";
import { Skeleton } from "./ui/skeleton";
import { StoreProfileDialog } from "./ui/store-profile-dialog";
import { Dialog, DialogTrigger } from "./ui/dialog";

export function AccountMenu(){
    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'], // Definindo a identificação para essa chamada, se caso ocorrer novamente, rele pegar com base nesse key
        queryFn: getProfile,
    })
    const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'], // Definindo a identificação para essa chamada, se caso ocorrer novamente, rele pegar com base nesse key
        queryFn: getManagerRestaurant,
    })

    return (
        <Dialog>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="flex items-center gap-2 select-none">
                    {isLoadingManagedRestaurant ? <Skeleton className="h-4 w-40"/> : managedRestaurant?.name}
                    <ChevronDown className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className=" flex flex-col w-56 bg-muted p-2 mt-2 border gap-2 rounded-md shadow-md">
               <DropdownMenuLabel className="flex flex-col gap-2">
                {isLoadingProfile ? (
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-32"/>
                        <Skeleton className="h-3 w-24"/>
                    </div>
                ): (
                  <>
                  <span className="">{profile?.name}</span>
                     <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
                 </>
                )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DialogTrigger asChild>
                    <DropdownMenuItem>
                    
                            <Building className="w-4 h-4 mr-2"/>
                            <span>Perfil da Loja </span>
                        
                    </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                     <Link to="/sign-in" className="flex">
                    <LogOut className="w-4 h-4 mr-2"/>
                    <span>Sair</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <StoreProfileDialog/>
        </Dialog>
    )
}