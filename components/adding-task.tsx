"use client";

import { Button } from "@/components/ui/button";

export default function AddingTask() {
    return (
        <div className="flex-1 flex flex-col gap-6 px-4">
            <Button
                className="flex-1 p-4 text-lg"
                onClick={() => {
                    alert("tambah tugas");
                }}
            >
                Tambah Tugas
            </Button>
        </div>
    );
}
