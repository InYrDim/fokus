import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { signInAction } from "../actions";

import { Inter } from "next/font/google";
import { KeyIcon, MailIcon } from "@/components/icons";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

export default function Admin() {
    return (
        <div className="flex gap-2 [&>input]:mb-3">
            <div className="pr-10">
                <form className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <MailIcon classname="fill-neutral-950" />
                        <Label htmlFor="email">Email</Label>
                    </div>
                    <Input
                        name="email"
                        placeholder="you@example.com"
                        required
                    />
                    <div className="flex gap-2 items-center">
                        <KeyIcon classname="fill-neutral-950" />
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        required
                    />
                    <SubmitButton
                        pendingText="Signing In..."
                        formAction={signInAction}
                    >
                        Login
                    </SubmitButton>
                </form>
            </div>
            <div className={` ${inter.className}`}>
                <h1 className={`text-4xl font-medium ${inter.className}`}>
                    Halo Admin!
                </h1>
                <p className="mt-4">Login dengan kredensial yang telah ada</p>
            </div>
        </div>
    );
}
