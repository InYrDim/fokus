"use client";
import { updateNotification } from "@/app/actions";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { ChekcIcon } from "./icons";

export interface NotificationsContainerProps {
    is_sent: boolean;
    task: {
        id: string;
        title: string;
        status: "todo" | "done";
        due_date: string | number | Date;
        description: string | null;
    };
}

export default function NotificationsContainer({
    notifications,
}: {
    notifications: NotificationsContainerProps[];
}) {
    if (notifications.length === 0) {
        return (
            <p className="text-gray-500 italic">Tidak ada tugas saat ini.</p>
        );
    }

    return (
        <div className="space-y-4 w-full max-w-screen-sm">
            <ScrollArea className="max-h-[200px]">
                {notifications.map((notif, index) => (
                    <div
                        key={index}
                        className={`rounded-lg shadow-md flex items-center`}
                    >
                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <span className="bg-primary py-1 px-4 text-neutral-50 rounded-full w-fit">
                                    {notif.task.status}
                                </span>
                                <h3 className="text-lg font-semibold">
                                    {notif.task.title}
                                </h3>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Deadline:{" "}
                                {new Date(notif.task.due_date).toString()}
                            </p>
                        </div>

                        <Button
                            onClick={async () => {
                                updateNotification({
                                    taskId: notif.task.id,
                                });
                            }}
                            variant={"ghost"}
                            className="text-xs w-fit hover:bg-transparent"
                        >
                            <ChekcIcon classname="fill-primary hover:fill-accent" />
                        </Button>
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}
