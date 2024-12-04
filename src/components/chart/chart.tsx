
import './chart.scss'
import { ArrowDownCircle } from 'react-feather';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'; 
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function ChartOverview() {
  const chartData = [
    { month: "Janeiro", value: "3500", current: 3000, previous: 3300 },
    { month: "Fevereiro", value: "3000", current: 2800, previous: 3000 },
    { month: "Março", value: "2500", current: 2400, previous: 2500 },
    { month: "Abril", value: "2000", current: 1500, previous: 2000 },
    { month: "Maio", value: "1500", current: 1400, previous: 1600 },
    { month: "Junho", value: "1000", current: 2000, previous: 2500 },
    { month: "Julho", value: "1000", current: 2700, previous: 3000 },
  ]

  const chartConfig = {
    current: {
      label: "Mês atual",
      color: "#E8E8E8",
    },
    previous: {
      label: "Mês anterior",
      color: "#FF698D",
    },
  } satisfies ChartConfig

  return (
    <div className='chart-container'>
      <div className='chart-contents'>
        <div className='chart-icon'>
          <p>Comparação Semanal</p>
          <ArrowDownCircle color='#525256' size={20} />
        </div>
        <div className='chart-caption'>
          <div className='chart-details-first'>
            <p>Mês anterior</p>
          </div>
          <div className='chart-details-second'>
            <p>Mês atual</p>
          </div>
        </div>
      </div>
      <div className='w-full md:w-[480px] md:max-w-[600px]'>
        <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false}/>
            <YAxis 
              dataKey='value'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey='current' fill='var(--color-current)' radius={4} />
            <Bar dataKey='previous' fill='var(--color-previous)' radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
