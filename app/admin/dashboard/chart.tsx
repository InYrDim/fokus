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

const chartData = [
    { month: "January", tugas: 186 },
    { month: "February", tugas: 305 },
    { month: "March", tugas: 237 },
    { month: "April", tugas: 73 },
    { month: "May", tugas: 209 },
    { month: "June", tugas: 214 },
];

const chartConfig = {
    tugas: {
        label: "Tugas",
        color: "#1d5d25",
    },
} satisfies ChartConfig;

export function ChartComponent() {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            {/* <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    className="fill-primary"
                    radius={4}
                />
            </BarChart> */}
            <LineChart width={730} height={250} data={chartData}>
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
