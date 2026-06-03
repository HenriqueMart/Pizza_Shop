import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { useSearchParams } from "react-router-dom";
import z from "zod";

export function Orders(){
    const [searchParams, setSearchParans] = useSearchParams();

    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')
    

    const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1).
    parse(searchParams.get('page') ?? '1'); //Em vez de aparecer 0 para o usuário, vai aparecer 1 mas sendo transformado para zero no código.

    const {data: result} = useQuery({
        queryKey: ['orders', pageIndex, orderId, customerName, status], //Para alterar o status com a paginação é necessário colocar no queryKey.
        queryFn: () => getOrders({pageIndex, orderId, customerName, status: status === 'all' ? null: status}),
    })
    

    function handlePaginate(pageIndex: number){
        if( pageIndex >= 0){
            setSearchParans(prev => {
                prev.set('page', (pageIndex + 1).toString());

                return  prev;
            })
        }
        
    }

    return (
        <>
            <Helmet title="Pedidos"/>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Pedidos</h1>
            
            <div className="space-y-2.5">
                <OrderTableFilters />
                <div className="border rounded-md text-foreground">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[64px]"></TableHead>
                                <TableHead className="w-[140px]">Identificador</TableHead>
                                <TableHead className="w-[180px]">Realizado há</TableHead>
                                <TableHead className="w-[140px]">Status</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="w-[140px]">Total de Pedido</TableHead>
                                <TableHead className="w-[164px]"></TableHead>
                                <TableHead className="w-[132px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                            <TableBody>
                                {result && result.orders.map(order => {
                                    return <OrderTableRow key={order.orderId} order={order}/>
                                })}
                            </TableBody>
                    </Table>
                    </div>

                    {result && (
                        <Pagination 
                            onPageChange={handlePaginate}
                            pageIndex={result.meta.pageIndex} 
                            totalCount={result.meta.totalCount} 
                            perPage={result.meta.perPage}/>
                    )
                    }
                </div>
            </div>
        </>
        
    )
}