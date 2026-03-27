

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {  TableCell, TableRow } from "@/components/ui/table"
import { ArrowRight, Search, X } from "lucide-react"
import { OrdersDetails } from "./orders-details"
import { OrdersStatus } from "@/components/orders-status"
import {formatDistanceToNow} from "date-fns"
import {ptBR} from "date-fns/locale"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelOrder } from "@/api/cancel-order"
import type { getOrdersResponse } from "@/api/get-orders"


export interface OrderTableRowProps {
    order: {
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
    }
}

export function OrderTableRow({ order }: OrderTableRowProps){
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const queryClient = useQueryClient();

    const {mutateAsync: cancelOrderFn} = useMutation({
        mutationFn:  cancelOrder,
        onSuccess(_, {orderId}){
            const ordersListCache = queryClient.getQueriesData<getOrdersResponse>({
                queryKey: ['orders'],
            })

            ordersListCache.forEach(([cacheKey, cacheData]) => {
                if(!cacheData){
                    return
                }

                queryClient.setQueryData<getOrdersResponse>(cacheKey, {
                    ...cacheData,
                    orders: cacheData.orders.map((order) => {
                        if(order.orderId == orderId){
                            return {...order, status: 'canceled'}
                        }

                        return order
                    })
                })
            })
        }


    });

    return (
      <TableRow>
        <TableCell>
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogTrigger asChild>       
                <Button variant="outline" size="xs">
                    <Search className="h-3 w-3"/>
                    <span className="sr-only">Detalhe do Pedido</span>{/* sr-only -> Leitura só do leitor de Tela */}
                </Button>
                </DialogTrigger>
                <OrdersDetails open={isDetailsOpen} orderId={order.orderId}/>
            </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>
        <TableCell className="text-muted-foreground">{formatDistanceToNow(order.createdAt, {
            locale: ptBR,
            addSuffix: true, //Colocar o texto Há tanto tempo
        })}</TableCell>
        <TableCell>
            <OrdersStatus status={order.status}/>
        </TableCell>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell className="font-medium">{(order.total / 100).toLocaleString('pt-BR', {
            style:'currency',
            currency: 'BRL',
        })}</TableCell>
        <TableCell>
            <Button variant='ghost' size='xs'>
                <ArrowRight className="mr-2 h-3 w-3"/>
                Aprovar
            </Button>
        </TableCell>
        <TableCell>
            <Button disabled={!['pending', 'processing'].includes(order.status)}
            variant='ghost' 
            size='xs'
            onClick={() => cancelOrder({orderId: order.orderId})}>
                <X className="mr-2 h-3 w-3"/>
                Cancelar
            </Button>
        </TableCell>
    </TableRow>
    )
}