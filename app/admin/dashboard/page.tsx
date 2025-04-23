import { ChartComponent } from "./chart";

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

function InformationCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section id={title}>
            <h2 className="font-medium text-2xl mb-8">{title}</h2>
            <div className="flex gap-2 flex-col min-w-64 max-w-screen-md">
                {children}
            </div>
        </section>
    );
}

export default function AdminDashboard() {
    /**
     * @TODO fetch count total users from db
     * @TODO fetch count total tasks from db
     * @TODO fetch count total tasks group by months from db
     */
    return (
        <div className="flex flex-col w-full gap-12 max-w-7xl">
            <InformationCard title="Hello Admin!">
                <ChardCardContainer>
                    <ChartCard count={10} name="Total Pengguna" />
                    <ChartCard count={35} name="Total Tugas" />
                </ChardCardContainer>
            </InformationCard>
            <InformationCard title="Grafik Tugas">
                <p className="text-sm text-neutral-600">
                    Total tugas yang telah dibuat
                </p>
                <ChartComponent />
            </InformationCard>
        </div>
    );
}
