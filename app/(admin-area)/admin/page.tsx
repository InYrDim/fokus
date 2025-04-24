import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { signInAction } from "@/app/actions";

import { Inter } from "next/font/google";
import { KeyIcon, MailIcon } from "@/components/icons";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

export default function Page() {
    return (
        <div className="flex flex-col sm:flex-row gap-2 [&>input]:mb-3">
            <div className="pr-10 sm:mt-auto mt-4 order-2 sm:order-1">
                <form className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <MailIcon classname="fill-neutral-950 dark:fill-neutral-50" />
                        <Label htmlFor="email">Email</Label>
                    </div>
                    <Input
                        name="email"
                        placeholder="you@example.com"
                        required
                    />
                    <div className="flex gap-2 items-center">
                        <KeyIcon classname="fill-neutral-950 dark:fill-neutral-50" />
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        required
                    />
                    <SubmitButton
                        className="mt-4"
                        pendingText="Signing In..."
                        formAction={signInAction}
                    >
                        Login
                    </SubmitButton>
                </form>
            </div>
            <div className={`order-1 sm:order-2 ${inter.className}`}>
                <h1 className={`text-4xl font-medium ${inter.className}`}>
                    Halo Admin!
                </h1>
                <p className="mt-4">Login dengan kredensial yang telah ada</p>
            </div>
        </div>
    );
}
