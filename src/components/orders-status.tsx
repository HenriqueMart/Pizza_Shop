type OrdersStatus = "pending" | "canceled" | "processing" | "delivering" | "delivered";


interface OrdersStatusProps {
    status:  OrdersStatus
}

const ordersStatusMap: Record<OrdersStatus, string> = {
    pending: "Pendente",
    canceled: "Cancelado",
    delivered: "Entregue",
    delivering: "Em entrega",
    processing: "Em preparo",
}

export function OrdersStatus({status}: OrdersStatusProps){
    return (
        <div className="flex items-center gap-2">
                {status == 'pending'  && (
                    <span className="h-2 w-2 rounded-full bg-slate-400"/>
                )}
                {status == 'canceled'  && (
                    <span className="h-2 w-2 rounded-full bg-rose-400"/>
                )}
                {status == 'delivered'  && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500"/>
                )}
                {['processing', 'delivering'].includes(status)  && (
                    <span className="h-2 w-2 rounded-full bg-amber-400"/>
                )}
                <span className="font-medium text-muted-foreground">
                    {ordersStatusMap[status]}
                </span>
            </div>
    )
}