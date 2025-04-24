import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", weight: "300" });

export default async function Signup(props: {
    searchParams: Promise<Message>;
}) {
    const searchParams = await props.searchParams;

    return (
        <>
            <div className="flex flex-col sm:flex-row border shadow-xl">
                <div className="text-neutral-50 flex-1 flex flex-col gap-2 items-start justify-between bg-secondary p-8">
                    <h1 className="text-4xl font-medium">
                        Create your Account...
                    </h1>
                    <p
                        className={`${inter.className} font-normal text-xl text-wrap`}
                    >
                        Jadwal Tertata,
                        <br /> Hidup Lebih Berkualitas.
                    </p>
                </div>
                <form className="flex-1 flex flex-col py-20 pl-8 pr-20">
                    <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 ">
                        <Label htmlFor="fullname">Nama Lengkap</Label>
                        <Input
                            name="fullname"
                            type="text"
                            placeholder="Dimas Januardi"
                            required
                        />
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                        />
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            required
                        />

                        <Label htmlFor="confirm_password">
                            Konfirmasi Password
                        </Label>
                        <Input
                            type="text"
                            name="confirm_password"
                            placeholder="Konfirmasi password"
                            required
                        />
                        <SubmitButton
                            pendingText="Signing In..."
                            formAction={signUpAction}
                        >
                            Sign in
                        </SubmitButton>
                        <p className="text-sm text-foreground">
                            Sudah punya akun?{" "}
                            <Link
                                className="text-foreground font-medium underline"
                                href="/sign-in"
                            >
                                Login
                            </Link>
                        </p>

                        <FormMessage message={searchParams} />
                    </div>
                </form>
            </div>

            {/* <SmtpMessage /> */}
        </>
    );
}
