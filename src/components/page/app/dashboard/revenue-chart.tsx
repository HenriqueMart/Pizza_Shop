import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip} from 'recharts'
import colors from 'tailwindcss/colors'

const data = [
    {
        date: '17/10',
        revenue: 1200
    },
    {
        date: '18/10',
        revenue: 800
    },
    {
        date: '19/10',
        revenue: 500
    },
    {
        date: '20/10',
        revenue: 200
    },
    {
        date: '21/10',
        revenue: 1500
    },
    {
        date: '22/10',
        revenue: 900
    },{
        date: '23/10',
        revenue: 400
    }

]

export function RevenueChart(){
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
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={data} style={{fontSize: 12}}>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16}/>

                        <YAxis stroke="#888" width={80} axisLine={false} tickLine={false} tickFormatter={(value: number) => {
                            return value.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })
                        }
                        }/>

                        <Line type="linear" strokeWidth={2} dataKey="revenue" stroke={colors.violet['500']}/>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}