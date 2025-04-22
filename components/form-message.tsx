export type Message =
    | { success: string }
    | { error: string }
    | { message: string };

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function FormMessage({ message }: { message: Message }) {
    return (
        <div className="flex flex-col gap-2 w-full max-w-md text-sm">
            {"success" in message && (
                <AlertDialog defaultOpen={true}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Success!</AlertDialogTitle>
                            <AlertDialogDescription>
                                {message.success}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

            {"error" in message && (
                <AlertDialog defaultOpen={true}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Error!</AlertDialogTitle>
                            <AlertDialogDescription>
                                {message.error}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            {"message" in message && (
                <div className="text-foreground border-l-2 px-4">
                    {message.message}
                </div>
            )}
        </div>
    );
}
