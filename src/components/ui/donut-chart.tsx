import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
  "hsl(262.1 83.3% 57.8%)", // purple
  "hsl(221.2 83.2% 53.3%)", // blue
  "hsl(142.1 76.2% 36.3%)", // green
  "hsl(38.4 81.2% 60.0%)", // yellow
];

interface DonutChartData {
  name: string;
  value: number;
  percentage: number;
}

interface DonutChartProps {
  data: DonutChartData[];
  total: number;
  centerLabel: string;
  centerValue: string | number;
  className?: string;
}

export function DonutChart({ data, total, centerLabel, centerValue, className }: DonutChartProps) {
  const chartConfig = data.reduce((acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: COLORS[index % COLORS.length]
    };
    return acc;
  }, {} as any);

  return (
    <div className={cn("relative", className)}>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[200px]">
        <PieChart>
          <ChartTooltip 
            cursor={false} 
            content={
              <ChartTooltipContent 
                hideLabel 
                formatter={(value, name) => [
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{value}</span>
                    <span className="text-muted-foreground">
                      ({Math.round((Number(value) / total) * 100)}%)
                    </span>
                  </div>,
                  name
                ]} 
              />
            }
          />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{centerValue}</div>
          <div className="text-xs text-muted-foreground">{centerLabel}</div>
        </div>
      </div>
    </div>
  );
}