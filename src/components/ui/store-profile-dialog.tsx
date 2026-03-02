import { useQuery } from "@tanstack/react-query";
import { Button } from "./button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { getManagerRestaurant } from "@/api/get-manager-restaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";

const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog(){
    const { data: managedRestaurant} = useQuery({
        queryKey: ['managed-restaurant'], // Definindo a identificação para essa chamada, se caso ocorrer novamente, rele pegar com base nesse key
        queryFn: getManagerRestaurant,
    })

    const {
        register,
        handleSubmit,
    } = useForm<StoreProfileSchema>({
        resolver:zodResolver(storeProfileSchema),
        values: { //Utilizamos o values e não o DefaultValues por motivo que da requisição pode mudar com o tempo, e com isso quando chegar a requisição, muda o dado
            name: managedRestaurant?.name ?? "",
            description: managedRestaurant?.description ?? "",
        }
    })

    console.log(managedRestaurant);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-foreground">
                    Perfil da Loja
                </DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visíveis ao seu cliente
                </DialogDescription>
            </DialogHeader>

            <form>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4 text-foreground">
                        <Label className="text-right" htmlFor="name">Nome</Label>
                        <Input className="col-span-3" id="name" {...register('name')}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 text-foreground">
                        <Label className="text-right" htmlFor="description">Descrição</Label>
                        <Textarea className="col-span-3" id="description" {...register('description')}/>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" type="button">Cancelar</Button>
                    <Button type="submit" variant="success">Salvar</Button>
                </DialogFooter>
            </form>

        </DialogContent>
    
    
    )
}