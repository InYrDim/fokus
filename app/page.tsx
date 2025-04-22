import Hero from "@/components/hero";
import Button from "@/components/primary-button";
import Link from "next/link";

export default async function Home() {
    return (
        <>
            <Hero />
            <main className="flex-1 flex flex-col gap-6 px-4">
                <Link
                    href="/beranda"
                    className="flex-1 flex flex-col gap-6 px-4"
                >
                    <Button>Mulai!</Button>
                </Link>
            </main>
        </>
    );
}
