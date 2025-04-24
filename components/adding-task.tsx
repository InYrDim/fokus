"use client";

import { Button } from "@/components/ui/button";
import ModalTaskActionUi from "./modal-task-action";
import { TaskItemProps } from "./task-item";

export default function AddingTask() {
    const taskItemProps: TaskItemProps = {
        taskId: "",
        taskName: "",
        taskDueDate: "",
        taskStatus: "todo",
        taskDescription: "",
    };
    return (
        <div className="flex-1 flex flex-col">
            <ModalTaskActionUi type="add" {...taskItemProps}>
                <Button>Tambah Tugas</Button>
            </ModalTaskActionUi>
        </div>
    );
}
