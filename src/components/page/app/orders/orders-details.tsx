import { getOrderDetails } from "@/api/get-order-details";
import { OrdersStatus } from "@/components/orders-status";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { locales } from "zod";


export interface OrderDetailsProps {
    orderId: string;
    open: boolean;
}

export function OrdersDetails({orderId, open}: OrderDetailsProps) {

    const {data: order} = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderDetails( { orderId } ),
        enabled: open, //Só vai realizar a requisição se caso a variável for true. Se for aberto.
    })

    if(!order){
        return null;
    }

    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-foreground">
                    Pedido: {orderId}
                </DialogTitle>
                <DialogDescription>
                    Detalhes do Pedido
                </DialogDescription>
            </DialogHeader>
            {order && (
                <div className="mt-4 space-y-10 ">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Status</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-muted-foreground">
                                        <OrdersStatus status={order.status}/>
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Cliente</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400"/>
                                    <span className="font-medium text-muted-foreground">
                                        {order.customer.name}
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Telefone</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400"/>
                                    <span className="font-medium text-muted-foreground">
                                        {order.customer.phone ?? "Não informado"}
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">E-mail</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400"/>
                                    <span className="font-medium text-muted-foreground">
                                        {order.customer.email}
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Realizado há</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400"/>
                                    <span className="font-medium text-muted-foreground">
                                        {formatDistanceToNow(order.createdAt, {
                                            locale: ptBR,
                                            addSuffix: true,
                                        })}
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Table className="text-muted-foreground">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Produto
                            </TableHead>   
                            <TableHead className="text-right">
                                QTD
                            </TableHead>   
                            <TableHead className="text-right">
                                Preço
                            </TableHead>  
                            <TableHead className="text-right">
                                SubTotal
                            </TableHead>    
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        
                        {order.orderItems.map(item => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.product.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {(item.priceInCents / 100).toLocaleString('pt-BR', {style: 'currency', currency: "BRL"})}
                                    </TableCell>
                                    <TableCell className="text-right">
                                       {((item.priceInCents * (item.quantity ?? 1)) / 100).toLocaleString('pt-BR', {style: 'currency', currency: "BRL"})}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>
                                Total do Pedido: 
                            </TableCell>
                            <TableCell className="text-right font-medium">
                                {(order.totalInCents / 100).toLocaleString('pt-BR', {style: 'currency', currency: "BRL"})}
                            </TableCell>
                        </TableRow>
                            
                    </TableFooter>
                </Table>
            </div>
            )}
        </DialogContent>
    )

}