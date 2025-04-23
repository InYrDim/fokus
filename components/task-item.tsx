"use client";
import { Input } from "./ui/input";
import { useState } from "react";
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
interface TaskItemProps {
    task: string;
    isDone: boolean;
    id: number;

    // onToggle: (id: number) => void;
    // onEdit: (id: number) => void;
    // onDelete: (id: number) => void;
    // onDone: (id: number) => void;
}
import { EditIcon, DeleteIcon } from "@/components/icons";
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
                        // checked={isTaskDone}
                        // onChange={(e) => {
                        //     if (e.target.checked) {
                        //     }
                        //     setIsTaskDone(e.target.checked);
                        // }}
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
                <Dialog>
                    <DialogTrigger asChild>
                        <button>
                            <EditIcon size={20} />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Tugas</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="title">Judul Tugas</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={task}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    className="col-span-3 border-secondary rounded-none"
                                    name="description"
                                    placeholder="Type your message here."
                                    id="description"
                                />
                            </div>
                            <div className="grid w-full gap-1.5">
                                <Input type="date" />
                                <Input type="time" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="border-secondary hover:bg-primary/70 hover:text-primary-foreground"
                                >
                                    Batal
                                </Button>
                            </DialogClose>
                            <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

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
