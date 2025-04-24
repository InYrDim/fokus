import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Fokus!",
    description: "Jadwal Tertata, Hidup Lebih Berkualitas.",
};

import { poppins } from "@/app/fonts";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <html lang="en" className={poppins.className} suppressHydrationWarning>
            <body className="bg-background text-foreground">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="min-h-screen flex flex-col justify-between">
                        <main className="flex flex-1 flex-col items-center">
                            <div className="flex-1 w-full flex flex-col items-center ">
                                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                                    <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                                        <div className="flex gap-5 items-center font-semibold">
                                            <Link
                                                href={"/"}
                                                className="font-medium text-3xl"
                                            >
                                                FOKUS!
                                            </Link>
                                        </div>

                                        <HeaderAuth />
                                    </div>
                                </nav>
                                <div className="flex flex-1 flex-col gap-20 w-full max-w-5xl  p-5">
                                    {children}
                                </div>
                            </div>
                        </main>

                        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-5">
                            <p>
                                Powered by{" "}
                                <a
                                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                                    target="_blank"
                                    className="font-bold hover:underline"
                                    rel="noreferrer"
                                >
                                    Supabase
                                </a>
                            </p>
                            <ThemeSwitcher />
                        </footer>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
