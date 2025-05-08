"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { CalendarIcon, EditIcon, TimeIcon } from "@/components/icons";
import { TaskItemProps } from "./task-item";

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

import {
    addTaskAction,
    deleteTaskAction,
    updateTaskAction,
} from "@/app/task-actions";
import { useEffect, useState } from "react";
import { DayPicker } from "./date-picker";
import { TimePicker } from "./time-picker";
import { combineDateAndTime, splitDateAndTime } from "@/utils/utils";

interface ModalTaskActionProps extends TaskItemProps {
    type: "add" | "edit" | "delete" | "info";
    children: React.ReactNode;
}

function TaskTitle({
    id,
    taskName,
    type = "form",
}: {
    id: string;
    taskName: string;
    type?: "form" | "dialog";
}) {
    return (
        <>
            {type === "form" ? (
                <>
                    <Label htmlFor="title">Judul Tugas</Label>
                    <Input
                        id={`${id}-title`}
                        name="title"
                        defaultValue={taskName}
                        className="col-span-3"
                    />
                </>
            ) : (
                <p className="text-xl font-medium">{taskName}</p>
            )}
        </>
    );
}

function TaskDescription({
    id,
    taskDescription,
    type = "form",
}: {
    id: string;
    taskDescription: string;
    type?: "form" | "dialog";
}) {
    return (
        <>
            {type === "form" ? (
                <>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                        id={`${id}-description`}
                        name="description"
                        defaultValue={taskDescription}
                        className=" border-secondary rounded-none col-span-3"
                    />
                </>
            ) : (
                <p className="text-sm">{taskDescription}</p>
            )}
        </>
    );
}

function TaskTime({
    type = "form",
    timestampz,
}: {
    type?: "form" | "dialog";
    timestampz: string;
}) {
    const [time, setTime] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (timestampz) {
            const timeString = splitDateAndTime(timestampz).time;
            const [hours, minutes] = timeString.split(":").map(Number);
            const newTime = new Date();
            newTime.setHours(hours, minutes, 0, 0);
            setTime(newTime.toISOString());
        }
    }, [timestampz]);

    const handleCancel = () => {
        setTime(undefined);
    };

    if (type === "dialog") {
        return (
            <>
                <div className="bg-secondary w-fit  py-2 px-5 text-white rounded-full flex gap-2">
                    <TimeIcon />
                    {time ? time : "Waktu Tidak Diatur"}
                </div>
            </>
        );
    }
    console.log("time: ", timestampz);

    return (
        <>
            <TimePicker
                value={timestampz}
                onChange={(t) => {
                    const [hours, minutes] = t.split(":").map(Number);

                    // Keep the original date, parse it in UTC
                    const baseDate = new Date(timestampz); // This must be a UTC string like "2025-05-01T00:00:00Z"

                    // Update only time in UTC, keep date
                    baseDate.setHours(hours);
                    baseDate.setMinutes(minutes);
                    baseDate.setMilliseconds(0);
                    baseDate.setSeconds(0);

                    // Output as UTC
                    const updated = baseDate.toISOString();

                    console.log(updated); // ✅ "2025-05-01T19:04:00.000Z"
                    setTime(updated);
                }}
                onCancel={handleCancel}
            />

            {time && <input type="hidden" name="time" value={time} />}
        </>
    );
}

function TaskDate({
    type = "form",
    timestampz,
}: {
    type?: "form" | "dialog";
    timestampz: string;
}) {
    const [date, setDate] = useState<string | null>(null); // Inisialisasi dengan string kosong

    const handleCancel = () => {
        setDate(null);
    };

    console.log("date: ", timestampz);
    useEffect(() => {
        if (timestampz) {
            const date = splitDateAndTime(timestampz).date;
            setDate(new Date(date).toISOString());
        }
    }, [timestampz]);

    if (type === "dialog") {
        const date = splitDateAndTime(timestampz).date;
        return (
            <>
                <div className="bg-secondary w-fit  py-2 px-5 text-white rounded-full flex gap-2">
                    <CalendarIcon />
                    {date ? date : "Waktu Tidak Diatur"}
                </div>
            </>
        );
    }
    return (
        <>
            <DayPicker
                value={timestampz ? new Date(timestampz) : undefined}
                onChange={(selectedDate) => {
                    if (selectedDate) {
                        setDate(selectedDate.toISOString()); // Set ke string format YYYY-MM-DD

                        console.log(selectedDate);
                    } else {
                        setDate(null);
                    }
                }}
                onCancel={handleCancel}
            />
            {date && <input type="hidden" name="date" value={date} />}
        </>
    );
}

function TaskStatus({ text }: { text: string }) {
    return (
        <>
            <div className="rounded-full border-primary border-2 py-2 px-8 text-primary font-semibold w-fit">
                {text}
            </div>
        </>
    );
}

type DialogActionProps = {
    action?: (formData: FormData) => void | Promise<any>;
    text?: string;
    pendingText?: string;
};
function DialogAction({
    action,
    text = "Simpan",
    pendingText = "Loading...",
}: DialogActionProps) {
    const [error, setError] = useState<string | null>(null);
    // handle loading
    const [loading, setLoading] = useState(false);

    const handleFormAction = async (formData: FormData) => {
        setLoading(true);
        setError(null); // Reset error dulu
        if (typeof action === "function") {
            const result = await action(formData);
            if (result?.status === "error") {
                setError(result.text);
            }
        }
    };
    return (
        <>
            {loading && (
                <AlertDialog open={loading}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Error!</AlertDialogTitle>
                            <AlertDialogDescription>
                                {error}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                onClick={() => setLoading(false)}
                            >
                                Ok
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

            <div className="flex gap-2 mt-4">
                <DialogClose asChild>
                    <Button
                        variant="outline"
                        className="border-secondary hover:bg-primary/70 hover:text-primary-foreground"
                    >
                        Batal
                    </Button>
                </DialogClose>
                <SubmitButton
                    formAction={handleFormAction}
                    pendingText={pendingText}
                >
                    {text}
                </SubmitButton>
            </div>
        </>
    );
}

function TaskDialogLayout({
    taskItemProps,
    title, // h1 title
    type,
    children, //for button
}: {
    title: string;
    type: "add" | "edit" | "delete" | "info";
    taskItemProps: TaskItemProps;
    children: React.ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {type === "info" ? (
                            <div className="">
                                <TaskStatus text={taskItemProps.taskStatus} />
                            </div>
                        ) : (
                            title
                        )}
                    </DialogTitle>
                </DialogHeader>
                <form>
                    <input
                        type="hidden"
                        name="task_id"
                        defaultValue={taskItemProps.taskId}
                        readOnly
                    />

                    <div className="flex flex-col gap-4">
                        {type === "edit" && (
                            <>
                                <div className="">
                                    <TaskTitle
                                        id={taskItemProps.taskId}
                                        taskName={taskItemProps.taskName}
                                    />
                                </div>
                                <div className="">
                                    <TaskDescription
                                        id={taskItemProps.taskId}
                                        taskDescription={
                                            taskItemProps.taskDescription
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="w-fit">
                                        <TaskTime
                                            timestampz={
                                                taskItemProps.taskDueDate
                                            }
                                        />
                                    </div>
                                    <div className="w-fit">
                                        <TaskDate
                                            timestampz={
                                                taskItemProps.taskDueDate
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="">
                                    <TaskStatus
                                        text={taskItemProps.taskStatus}
                                    />
                                </div>
                            </>
                        )}
                        {type === "add" && (
                            <>
                                <div className="">
                                    <TaskTitle
                                        id={taskItemProps.taskId}
                                        taskName={taskItemProps.taskName}
                                    />
                                </div>
                                <div className="">
                                    <TaskDescription
                                        id={taskItemProps.taskId}
                                        taskDescription={
                                            taskItemProps.taskDescription
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="w-fit">
                                        <TaskTime
                                            timestampz={
                                                taskItemProps.taskDueDate
                                            }
                                        />
                                    </div>
                                    <div className="w-fit">
                                        <TaskDate
                                            timestampz={
                                                taskItemProps.taskDueDate
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="">
                                    <TaskStatus
                                        text={taskItemProps.taskStatus}
                                    />
                                </div>
                            </>
                        )}

                        {type === "info" && (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <div className="w-fit">
                                        <TaskTime
                                            type="dialog"
                                            timestampz={
                                                taskItemProps.taskDueDate
                                            }
                                        />
                                    </div>
                                    <div className="w-fit">
                                        <TaskDate
                                            type="dialog"
                                            timestampz={
                                                taskItemProps.taskDueDate
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <TaskTitle
                                        id={taskItemProps.taskId}
                                        taskName={taskItemProps.taskName}
                                        type="dialog"
                                    />
                                </div>
                                <div className="">
                                    <TaskDescription
                                        id={taskItemProps.taskId}
                                        taskDescription={
                                            taskItemProps.taskDescription
                                        }
                                        type="dialog"
                                    />
                                </div>
                            </div>
                        )}

                        {type === "delete" && (
                            <div className="">
                                <TaskTitle
                                    id={taskItemProps.taskId}
                                    taskName={`${taskItemProps.taskName}`}
                                    type="dialog"
                                />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        {type === "delete" && (
                            <DialogAction action={deleteTaskAction} />
                        )}
                        {type === "add" && (
                            <DialogAction action={addTaskAction} />
                        )}
                        {type === "edit" && (
                            <DialogAction action={updateTaskAction} />
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function ModalTaskActionUi(taskItemProps: ModalTaskActionProps) {
    const taskProps = {
        taskId: taskItemProps.taskId,
        taskName: taskItemProps.taskName,
        taskDescription: taskItemProps.taskDescription,
        taskDueDate: taskItemProps.taskDueDate,
        taskStatus: taskItemProps.taskStatus,
    };

    const type = taskItemProps.type;

    if (taskItemProps.type === "add")
        return (
            <TaskDialogLayout
                type={type}
                title="Tambah Tugas"
                taskItemProps={taskProps}
            >
                {taskItemProps.children}
            </TaskDialogLayout>
        );

    if (taskItemProps.type === "delete")
        return (
            <TaskDialogLayout
                type={type}
                title="Delete Tugas"
                taskItemProps={taskProps}
            >
                {taskItemProps.children}
            </TaskDialogLayout>
        );

    if (taskItemProps.type === "edit")
        return (
            <TaskDialogLayout
                type={type}
                title="Edit Tugas"
                taskItemProps={taskProps}
            >
                {taskItemProps.children}
            </TaskDialogLayout>
        );

    if (taskItemProps.type === "info")
        return (
            <TaskDialogLayout
                type={type}
                title="Info Tugas"
                taskItemProps={taskProps}
            >
                {taskItemProps.children}
            </TaskDialogLayout>
        );
}
