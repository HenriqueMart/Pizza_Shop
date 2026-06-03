import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectTrigger, Value } from "@radix-ui/react-select";
import { Search, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const orderFiltersSchemea = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchemea>

export function OrderTableFilters(){
    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get('orderId');
    const customerName = searchParams.get('customerName');
    const status = searchParams.get('status');

    const {register, handleSubmit, control, reset } = useForm<OrderFiltersSchema>({
        resolver: zodResolver(orderFiltersSchemea),
        defaultValues: {
            orderId: orderId ?? '',
            customerName: customerName ?? '',
            status: status ?? 'all',
        },
    })    

    function handleFilter({orderId, customerName, status}: OrderFiltersSchema){
        setSearchParams(state => {
            if(orderId){
                state.set('orderId', orderId)
            }else {
                state.delete('orderId')
            }

            if(customerName){
                state.set('customerName', customerName)
            }else {
                state.delete('customerName')
            }

            if(status){
                state.set('status', status)
            }else {
                state.delete('status')
            }

            state.set('page', '1')

            return state
        })
    }

    function handleClearFilter(){
        setSearchParams(state => {
            state.delete('orderId')
            state.delete('customerName')
            state.delete('status')
            state.set('page', '1')

            return state
        })

        reset({
            orderId: '',
            customerName: '',
            status: 'all',
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2 text-foreground">
                <span className="text-sm font-semibold">
                    Filtros: 
                </span>
                <Input placeholder="Id do Pedido" className="h-8 w-auto" {...register('orderId')}/>
                <Input placeholder="Nome do Cliente" className="h-8 w-[320px] " {...register('customerName')}/>
                <Controller
                    name="status"
                    control={control}
                    render={({ field: {name, onChange, value, disabled}}) => {
                        return (
                            <Select defaultValue="all" name={name} onValueChange={onChange} value={value} disabled={disabled}>
                                <SelectTrigger className="h-8 w-[180px] ">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent position="popper" //Para perder a refência do elemento pai e conseguir ficar na mesma posição do seu selector
                                    side="bottom"
                                    sideOffset={4}
                                    align="center"
                                    className="z-50 gap-2 p-2 border rounded-md shadow-md bg-muted text-muted-foreground"
                                >
                                    <SelectItem value="all">Todos Status</SelectItem>
                                    <SelectItem value="pending">Pendente</SelectItem>
                                    <SelectItem value="canceled">Cancelado</SelectItem>
                                    <SelectItem value="processing">Em preparo</SelectItem>
                                    <SelectItem value="Deliveriring">Em entrega</SelectItem>
                                    <SelectItem value="delivered">Entregue</SelectItem>
                                </SelectContent>
                            </Select>
                        )
                    }}
                />
                
                <Button type="submit" variant="secondary" size="xs">
                    <Search className="h-4 w-4 mr-2"/>
                    Filtrar Resultado
                </Button>
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="xs"
                    className="text-muted-foreground"
                    onClick={() => handleClearFilter()}
                    >
                    <X className="h-4 w-4 mr-2 "/>
                    Remover Filtros
                </Button>
                   
                
        </form>
    )
}
