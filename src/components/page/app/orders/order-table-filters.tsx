import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import { Search, X } from "lucide-react";



export function OrderTableFilters(){
    return (
        <form className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                    Filtros: 
                </span>
                <Input placeholder="Id do Pedido" className="h-8 w-auto"/>
                <Input placeholder="Nome do Cliente" className="h-8 w-[320px] "/>
                <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-[180px] ">
                         <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper" //Para perder a refência do elemento pai e conseguir ficar na mesma posição do seu selector
                        side="bottom"
                        sideOffset={4}
                        align="center"
                        className="z-50 gap-2 p-2 border rounded-md shadow-md bg-white"
                    >
                        <SelectItem value="all">Todos Status</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="canceled">Cancelado</SelectItem>
                        <SelectItem value="processing">Em preparo</SelectItem>
                        <SelectItem value="Deliveriring">Em entrega</SelectItem>
                        <SelectItem value="delivered">Entregue</SelectItem>
                    </SelectContent>
                </Select>
                <Button type="submit" variant="secondary" size="xs">
                    <Search className="h-4 w-4 mr-2"/>
                    Filtrar Resultado
                </Button>
                <Button type="button" variant="outline" size="xs">
                    <X className="h-4 w-4 mr-2"/>
                    Remover Filtros
                </Button>
                   
                
        </form>
    )
}
