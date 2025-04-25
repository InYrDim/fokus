"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type DayPickerProps = {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    onCancel?: () => void;
};

export function DayPicker({ value, onChange, onCancel }: DayPickerProps) {
    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState(false);

    // 👇 Sync value from parent
    useEffect(() => {
        if (value) {
            setDate(value);
        } else {
            setDate(undefined);
        }
    }, [value]);

    const handleSelect = (selected: Date | undefined) => {
        setDate(selected);
        onChange?.(selected);
    };

    const handleCancel = () => {
        setDate(undefined);
        setOpen(false);
        onCancel?.();
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="bg-secondary rounded-full font-normal flex gap-2">
                    <CalendarIcon />
                    {date ? (
                        format(date, "MM/dd/yyyy")
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                />
                <div className="flex p-2 mt-2 pointer-events-auto">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        className="w-full"
                    >
                        Cancel
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
