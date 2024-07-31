"use client"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import CustomLink from "@/components/ui/custom-link";

const chartConfig = {
  visitors: {
    label: "Applied Status",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface ChartData {
  jobCount: number;
}

export function CircleChart({ jobCount }: ChartData) {
  const chartData = [
    { browser: "Applied Status", visitors: jobCount, fill: "var(--color-safari)" },
  ]

  return (
    <Card className="flex flex-col space-y-2 p-4 group rounded-none bg-transparent border border-brand-secondary">
      <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-medium">
          Jobs Applied Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={jobCount * 10}
            innerRadius={80}
            outerRadius={140}
            className="secondary last:fill-brand-primary"
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-brand-secondary last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        />
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="p-0">
        <CustomLink
          href={"/developer/application-history"}
          textarea={"View All Applications"}
          className="text-brand-primary"
          divClassName="bg-brand-primary"
        />
      </CardFooter>
    </Card>
  )
}