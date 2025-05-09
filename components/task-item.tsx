"use client";
import { Input } from "./ui/input";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
export interface TaskItemProps {
    taskId: string;
    taskName: string;
    taskDescription: string;
    taskDueDate: string;
    taskStatus: "done" | "todo";
}
import { EditIcon, DeleteIcon } from "@/components/icons";
import ModalTaskActionUi from "./modal-task-action";
import { createClient } from "@/utils/supabase/client";
export default function TaskItem(taskItemProps: TaskItemProps) {
    const { taskId, taskName, taskStatus } = taskItemProps;
    const isDone: boolean = taskStatus === "done";
    const [isTaskDone, setIsTaskDone] = useState(isDone);

    const currentTaskItemProps: TaskItemProps = {
        ...taskItemProps,
        taskStatus: isTaskDone ? "done" : "todo",
    };

    const handleTaskChecked = useCallback(
        debounce(async () => {
            const supabase = createClient();

            await supabase
                .from("tasks")
                .update({ status: isTaskDone ? "todo" : "done" })
                .eq("id", taskId);

            setIsTaskDone((prev) => !prev);
        }, 1000), // delay in ms
        [isTaskDone, taskId]
    );

    return (
        <div className="bg-neutral-50 flex items-center px-5 py-5 rounded-sm">
            <div className="flex-1 gap-4 flex items-center">
                {/**
                 * @TODO : handle checkbox when clicked
                 * @TODO : remove readOnly
                 */}
                <div>
                    <Input
                        type="checkbox"
                        className="accent-secondary w-4 h-4"
                        checked={isTaskDone}
                        onChange={handleTaskChecked}
                    />
                </div>

                {/* Task name */}
                <div>
                    <ModalTaskActionUi type="info" {...currentTaskItemProps}>
                        <div className="dark:text-neutral-950 first-letter:capitalize">
                            {taskName}
                        </div>
                    </ModalTaskActionUi>
                </div>
            </div>

            {/**
             * @TODO : Handle Action: edit, delete
             */}
            <div className="flex gap-4">
                {/**
                 * @TODO : handle edit by displaying popup form
                 */}
                <ModalTaskActionUi type="edit" {...currentTaskItemProps}>
                    <button>
                        <EditIcon size={20} />
                    </button>
                </ModalTaskActionUi>

                {/**
                 * @TODO : handle delete by displaying popup alert
                 */}

                <ModalTaskActionUi type="delete" {...currentTaskItemProps}>
                    <button>
                        <DeleteIcon size={20} />
                    </button>
                </ModalTaskActionUi>
            </div>
        </div>
    );
}
