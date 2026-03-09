import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManagerRestaurant } from "@/api/get-manager-restaurant";
import { Skeleton } from "./ui/skeleton";
import { StoreProfileDialog } from "./ui/store-profile-dialog";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { signOut } from "@/api/sign-out";
import { signIn } from "@/api/sign-in";

export function AccountMenu(){
    const navigation = useNavigate();
    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'], // Definindo a identificação para essa chamada, se caso ocorrer novamente, rele pegar com base nesse key
        queryFn: getProfile,
        staleTime: Infinity //Não buscara essa informação caso coloque segundo, todas as vezes que o focus sair da página após os milisegundos é recarregado quando o foco volta da página.
    })
    const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'], // Definindo a identificação para essa chamada, se caso ocorrer novamente, rele pegar com base nesse key
        queryFn: getManagerRestaurant,
        staleTime: Infinity
    })

    const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            navigation('/sign-in', {replace: true})
        }
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
            <DropdownMenuContent align="start" className=" flex flex-col w-56 bg-muted p-2 mt-2 border gap-2 rounded-md shadow-md">
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
                    
                            <Building className="w-4 h-4 "/>
                            <span>Perfil da Loja </span>
                        
                    </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400" disabled={isSigningOut}>
                    <button className="w-full" onClick={() => {
                        signOutFn
                    }}>

                    
                        <Link to="/sign-in" className="flex">
                        <LogOut className="w-4 h-4 mr-2"/>
                        <span>Sair</span>
                        </Link>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <StoreProfileDialog/>
        </Dialog>
    )
}