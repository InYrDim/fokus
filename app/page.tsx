import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
    return (
        <>
            <Hero />
            <main className="flex-1 flex flex-col gap-6 px-4 items-center">
                <Link
                    href="/beranda"
                    className="flex-1 flex flex-col gap-6 px-4"
                >
                    <Button className="w-fit px-12 py-2">Mulai!</Button>
                </Link>
            </main>
        </>
    );
}
