import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard( ){

    const{data: dayOrdersAmount} = useQuery({
        queryFn: getDayOrdersAmount,
        queryKey: ['metrics', 'day-orders-amount'],
    })

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">Pedido (dia)</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent className="space-y-1">
               
                    {dayOrdersAmount && (
                        <>
                            <span className="text-2xl font-bold tracking-tight">
                                {dayOrdersAmount.amount.toLocaleString('pt-BR')}
                            </span>
                            <p className="text-xs text-muted-foreground">
                                {dayOrdersAmount.diffFromYesterday >= 0 ? (
                                    <>
                                        <span className="text-emeral-500 dark:text-emerald-400 font-bold">+{dayOrdersAmount.diffFromYesterday}% </span> 
                                    em relação a ontem
                                    </>
                                ) : (
                                    <>
                                    
                                        <span className="text-rose-500 dark:text-rose-400 font-bold">{dayOrdersAmount.diffFromYesterday}% </span> 
                                        em relação a ontem
                                    </>
                                )}
                            </p>
                        </>
                    )}
                
            </CardContent>
        </Card>
    )
}