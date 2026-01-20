import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";



export function OrdersDetails() {

    return(
        
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Pedido: 1545da1496
                </DialogTitle>
                <DialogDescription>
                    Detalhes do Pedido
                </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-10 ">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Status</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400"/>
                                    <span className="font-medium text-muted-foreground">
                                        Pendente
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
                                        José Henrique
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
                                        (74)99909-9999
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
                                        henrique@teste.com
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
                                        há 3 Minutos
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
                        <TableRow>
                            <TableCell>
                                Pizza de Calabresa - Média
                            </TableCell>
                            <TableCell className="text-right">
                                1
                            </TableCell>
                            <TableCell className="text-right">
                                R$ 35,00
                            </TableCell>
                            <TableCell className="text-right">
                                R$ 35,00
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Pizza de Frango - Grande
                            </TableCell>
                            <TableCell className="text-right">
                                2
                            </TableCell>
                            <TableCell className="text-right">
                                R$ 60,00
                            </TableCell>
                            <TableCell className="text-right">
                                R$ 120,00
                            </TableCell>
                        </TableRow>
                        
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>
                                Total do Pedido: 
                            </TableCell>
                            <TableCell className="text-right font-medium">
                                R$ 155,00
                            </TableCell>
                        </TableRow>
                            
                    </TableFooter>
                </Table>
            </div>
        </DialogContent>
    )

}