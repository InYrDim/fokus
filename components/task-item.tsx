"use client";
import { Input } from "./ui/input";
import { useState } from "react";
interface TaskItemProps {
    task: string;
    isDone: boolean;
    id: number;

    // onToggle: (id: number) => void;
    // onEdit: (id: number) => void;
    // onDelete: (id: number) => void;
    // onDone: (id: number) => void;
}

function EditIcon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className="fill-primary"
        >
            <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
        </svg>
    );
}

function DeleteIcon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-primary"
            width={size}
            height={size}
        >
            <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
        </svg>
    );
}

export default function TaskItem({ id, task, isDone }: TaskItemProps) {
    const [isTaskDone, setIsTaskDone] = useState(isDone);

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
                        readOnly
                        onChange={(e) => {
                            if (e.target.checked) {
                                alert("done");
                            }
                            setIsTaskDone(e.target.checked);
                        }}
                    />
                </div>

                {/* Task name */}
                <div>{task}</div>
            </div>

            {/**
             * @TODO : Handle Action: edit, delete
             */}
            <div className="flex gap-4">
                {/**
                 * @TODO : handle edit by displaying popup form
                 */}
                <button
                    onClick={() => {
                        alert(`Edit ${id}`);
                    }}
                >
                    <EditIcon size={20} />
                </button>

                {/**
                 * @TODO : handle delete by displaying popup alert
                 */}
                <button
                    onClick={() => {
                        alert(`Delete ${id}`);
                    }}
                >
                    <DeleteIcon size={20} />
                </button>
            </div>
        </div>
    );
}
