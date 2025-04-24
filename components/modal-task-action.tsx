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
import { EditIcon } from "@/components/icons";
import { TaskItemProps } from "./task-item";

import {
    addTaskAction,
    deleteTaskAction,
    updateTaskAction,
} from "@/app/task-actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

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

function TaskTime() {
    return (
        <>
            <Input type="time" />
        </>
    );
}

function TaskDate() {
    return (
        <>
            <Input type="date" />
        </>
    );
}

function TaskStatus({ text }: { text: string }) {
    return (
        <>
            <div className="rounded-full py-2 px-8 bg-primary text-neutral-50 w-fit">
                {text}
            </div>
        </>
    );
}

function DialogAction({
    action,
    text = "simpan",
    pendingText = "Loading...",
}: {
    action: string | ((formData: FormData) => void | Promise<void>) | undefined;
    text?: string;
    pendingText?: string;
}) {
    return (
        <>
            <DialogClose asChild>
                <Button
                    variant="outline"
                    className="border-secondary hover:bg-primary/70 hover:text-primary-foreground"
                >
                    Batal
                </Button>
            </DialogClose>
            <SubmitButton formAction={action} pendingText={pendingText}>
                {text}
            </SubmitButton>
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
                                <div className="">
                                    <TaskTime />
                                </div>
                                <div className="">
                                    <TaskDate />
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
                                <div className="">
                                    <TaskTime />
                                </div>
                                <div className="">
                                    <TaskDate />
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
                                <div className="">
                                    <TaskTime />
                                </div>
                                <div className="">
                                    <TaskDate />
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
