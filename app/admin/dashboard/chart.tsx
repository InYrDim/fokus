"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    LineChart,
    Line,
    Legend,
    XAxis,
    YAxis,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface chardComponet {
    data: any;
    config: ChartConfig;
}

export function ChartComponent({ data, config }: chardComponet) {
    return (
        <ChartContainer config={config} className="min-h-[200px] w-full">
            <LineChart width={730} height={250} data={data}>
                <CartesianGrid vertical={false} />
                <ChartLegend content={<ChartLegendContent />} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <XAxis dataKey="month" />
                <YAxis />
                <Line type="monotone" dataKey="tugas" stroke="#1d5d25" />
            </LineChart>
        </ChartContainer>
    );
}
