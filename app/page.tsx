import Hero from "@/components/hero";
import Button from "@/components/primary-button";

export default async function Home() {
    return (
        <>
            <Hero />
            <main className="flex-1 flex flex-col gap-6 px-4">
                <Button>Mulai!</Button>
            </main>
        </>
    );
}
