import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { SubmitButton } from "./submit-button";

export default async function AuthButton() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user ? (
        <div className="flex items-center gap-4">
            <form>
                <SubmitButton
                    formAction={signOutAction}
                    pendingText="Signing out..."
                >
                    Sign out
                </SubmitButton>
            </form>
        </div>
    ) : (
        <div className="flex gap-2">
            <Button asChild size="sm" variant={"outline"}>
                <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild size="sm" variant={"default"}>
                <Link href="/sign-up">Sign Up</Link>
            </Button>
        </div>
    );
}
