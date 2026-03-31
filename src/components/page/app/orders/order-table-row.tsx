

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
import { ApproveOrder } from "@/api/approve-order"
import { DispatchOrder } from "@/api/dispatch-order"
import { DeliverOrder } from "@/api/deliver-order"



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

    function updateOrdersCache(orderId: string, status: OrdersStatus){
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
                            return {...order, status}
                        }

                        return order
                    })
                })
            })
    }

    const {mutateAsync: cancelOrderFn, isPending: isCancelingOrder} = useMutation({
        mutationFn:  cancelOrder,
        async onSuccess(_, {orderId}){
            updateOrdersCache(orderId, 'canceled');
        }
    });
    const {mutateAsync: approveOrderFn, isPending: isApprovingOrder} = useMutation({
        mutationFn:  ApproveOrder,
        async onSuccess(_, {orderId}){
            updateOrdersCache(orderId, 'processing');
        }
    });
    const {mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder} = useMutation({
        mutationFn:  DispatchOrder,
        async onSuccess(_, {orderId}){
            updateOrdersCache(orderId, 'delivering');
        }
    });
    const {mutateAsync: deliverOrderFn, isPending: isDeliveringOrder} = useMutation({
        mutationFn:  DeliverOrder,
        async onSuccess(_, {orderId}){
            updateOrdersCache(orderId, 'delivered');
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
            {order.status === 'pending' && (
                <Button 
                    disabled={isApprovingOrder}
                    onClick={() => {
                    approveOrderFn({orderId: order.orderId})
                }} variant='ghost' size='xs'>
                    <ArrowRight className="mr-2 h-3 w-3"/>
                    Aprovar
                </Button>
            )}
             {order.status === 'processing' && (
                <Button 
                    disabled={isDispatchingOrder}
                    onClick={() => {
                    dispatchOrderFn({orderId: order.orderId})
                }} variant='ghost' size='xs'>
                    <ArrowRight className="mr-2 h-3 w-3"/>
                    Em entrega
                </Button>
            )}

            {order.status === 'delivered' && (
                <Button 
                    disabled={isDeliveringOrder}
                    onClick={() => {
                    deliverOrderFn({orderId: order.orderId})
                }} variant='ghost' size='xs'>
                    <ArrowRight className="mr-2 h-3 w-3"/>
                    Entregue
                </Button>
            )}
        </TableCell>
        <TableCell>
            <Button disabled={!['pending', 'processing'].includes(order.status)  || isCancelingOrder}
            variant='ghost' 
            size='xs'
            onClick={() => cancelOrderFn({orderId: order.orderId})}>
                <X className="mr-2 h-3 w-3"/>
                Cancelar
            </Button>
        </TableCell>
    </TableRow>
    )
}