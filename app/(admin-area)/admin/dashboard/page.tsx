import { ChartComponent } from "./chart";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

type chartCardType = {
    count: number;
    name: string;
};
function ChartCard({ count, name }: chartCardType) {
    return (
        <div className="flex gap-2 flex-col bg-secondary p-5 min-w-64 max-w-screen-md">
            <div className="mt-4 text-6xl text-accent font-semibold">
                {count}
            </div>
            <div className="text-neutral-50 font-normal">{name}</div>
        </div>
    );
}

function ChardCardContainer({ children }: { children: React.ReactNode }) {
    return <div className="flex gap-4">{children}</div>;
}

function InformationCard({ children }: { children: React.ReactNode }) {
    let titleComponent: React.ReactNode | null = null;
    const content: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === InfoCardTitle) {
            titleComponent = child;
        } else {
            content.push(child);
        }
    });

    if (!titleComponent) {
        throw new Error(
            "InformationCard harus mengandung satu InfoCardTitle sebagai child."
        );
    }

    return (
        <section>
            {titleComponent}
            <div className="">{content}</div>
        </section>
    );
}

function InfoCardTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="font-medium text-2xl mb-8">{children}</h2>;
}

export default async function Page() {
    // Get Current User data
    const supabase = await createClient();
    const currentUser = await supabase.auth.getUser();

    const fullname = currentUser.data.user?.user_metadata.fullname;

    const { data: tasksData, error: tasksError } = await supabase.rpc(
        "get_tasks_count_by_month"
    );

    let chartData = [];

    chartData = tasksData.map((item: { month: string; task_count: number }) => {
        return {
            month: item.month.trim(),
            tugas: item.task_count,
        };
    });

    if (tasksError) {
        chartData = [{ month: "Bulan", tugas: 1 }];
    }

    const totalTugas = chartData.length;

    const { data: usersData, error: usersError } = await supabase
        .from("profiles")
        .select("id", {
            count: "exact",
        });

    const totalUsers = usersData?.length || 0;

    const chartConfig = {
        tugas: {
            label: "Tugas",
            color: "#1d5d25",
        },
    };

    if (!fullname) {
        return redirect("/sign-in");
    }
    /**
     * @TODO fetch count total users from db
     * @TODO fetch count total tasks from db
     * @TODO fetch count total tasks group by months from db
     */
    return (
        <div className="flex flex-col w-full gap-12 max-w-7xl">
            <InformationCard>
                <InfoCardTitle>Halo! {fullname}</InfoCardTitle>
                <ChardCardContainer>
                    <ChartCard count={totalUsers} name="Total Pengguna" />
                    <ChartCard count={totalTugas} name="Total Tugas" />
                </ChardCardContainer>
            </InformationCard>
            <InformationCard>
                <InfoCardTitle>Statistik Tugas</InfoCardTitle>
                <div className="flex flex-col gap-8">
                    <p className="text-sm text-neutral-600">
                        Total tugas yang telah dibuat
                    </p>
                    <ChartComponent config={chartConfig} data={chartData} />
                </div>
            </InformationCard>
        </div>
    );
}
