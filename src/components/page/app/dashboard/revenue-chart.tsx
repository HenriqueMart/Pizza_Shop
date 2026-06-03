import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/data-range-picker";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import {ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip} from 'recharts'
import colors from 'tailwindcss/colors'
import { subDays } from 'date-fns'
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";



export function RevenueChart(){
    const [dateRanger, setDateRanger] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    })

    const { data: dailyRevenueInPeriod } = useQuery({
        queryKey: ['metrics', 'daily-revenue-in-period', dateRanger],
        queryFn: () => getDailyRevenueInPeriod({
            from: dateRanger?.from,
            to: dateRanger?.to,
        }),

    })

    const chartDate = useMemo(() => {
        return dailyRevenueInPeriod?.map(charItem => {
            return{
                date: charItem.date,
                receipt: charItem.receipt / 100,
            }
        })
    }, [dailyRevenueInPeriod])

    return(
        

        <Card className="col-span-6">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">
                        Receita no Período
                    </CardTitle>
                    <CardDescription>
                        Receita diária no período
                    </CardDescription>
                </div>

                <div className="flex items-center gap-2">
                    <Label>Período</Label>
                    <DatePickerWithRange date={dateRanger} onDateChange={setDateRanger}/>
                </div>
            </CardHeader>
            <CardContent>
                {chartDate && (
                <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={chartDate} style={{fontSize: 12}}>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16}/>

                        <YAxis stroke="#888" 
                            width={80} 
                            axisLine={false} 
                            tickLine={false} 
                            tickFormatter={(value: number) => {
                                return value.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })
                            }
                        }/>
                        <CartesianGrid vertical={false} className="stroke-muted"/>
                        <Line 
                        type="linear" 
                        strokeWidth={2} 
                        dataKey="receipt" 
                        stroke={colors.violet['500']}/>

          
                    </LineChart>
                </ResponsiveContainer>
        )}
            </CardContent>
        </Card>
    )
}