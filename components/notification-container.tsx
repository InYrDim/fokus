"use client";
import { updateNotification } from "@/app/actions";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { CheckIcon } from "./icons";
import { useState } from "react";
import { Separator } from "./ui/separator";
import ModalTaskActionUi from "./modal-task-action";

export interface NotificationsContainerProps {
    is_sent: boolean;
    task: {
        id: string;
        title: string;
        status: "todo" | "done";
        due_date: string;
        description: string;
    };
}

export default function NotificationsContainer({
    notifications,
}: {
    notifications: NotificationsContainerProps[];
}) {
    if (notifications.length === 0) {
        return (
            <div className="py-4 px-4">
                <p className="text-neutral-600">Pengingat tugas kosong....</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-screen-sm max-h-[200] overflow-auto">
            {notifications.map((notif, index) => (
                <div key={index} className={`flex flex-col px-2 `}>
                    <div className="flex py-2  items-center">
                        <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                                <span className="bg-primary h-fit px-4 text-neutral-50 text-xs rounded-full w-fit">
                                    {notif.task.status}
                                </span>
                                <ModalTaskActionUi
                                    type="info"
                                    taskDescription={notif.task.description}
                                    taskId={notif.task.id}
                                    taskName={notif.task.title}
                                    taskStatus={notif.task.status}
                                    taskDueDate={notif.task.due_date}
                                >
                                    <h3 className="text-lg font-semibold">
                                        {notif.task.title}
                                    </h3>
                                </ModalTaskActionUi>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Deadline:{" "}
                                {new Date(notif.task.due_date).toString()}
                            </p>
                        </div>

                        <UpdateNotificationComponent taskId={notif.task.id} />
                    </div>

                    <Separator />
                </div>
            ))}
        </div>
    );
}

function UpdateNotificationComponent({ taskId }: { taskId: string }) {
    const [isDisabled, setIsDisabled] = useState(false);
    return (
        <Button
            onClick={async () => {
                // Disable the button when clicked
                setIsDisabled(true);

                // Perform the update notification action
                await updateNotification({
                    taskId,
                });
            }}
            variant={"ghost"}
            className="text-xs w-fit hover:bg-transparent"
            disabled={isDisabled} // Disable button based on state
        >
            <CheckIcon classname="fill-primary hover:fill-accent" />
        </Button>
    );
}
