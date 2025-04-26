import { MessageHandlerProps } from "@/utils/utils";
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
import { InfoIcon, WarningIcon } from "./icons";
export function PopUpMessage({ text, status }: MessageHandlerProps) {
    return (
        <AlertDialog defaultOpen={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {status === "error" && (
                        <AlertDialogTitle>
                            <div className="flex gap-2">
                                <WarningIcon classname="fill-neutral-950" />
                                Error!
                            </div>
                        </AlertDialogTitle>
                    )}
                    {status === "success" && (
                        <AlertDialogTitle>
                            <div className="flex gap-2">
                                <InfoIcon classname="fill-neutral-950" />
                                Success!
                            </div>
                        </AlertDialogTitle>
                    )}

                    <AlertDialogDescription>{text}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
