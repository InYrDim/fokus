"use client";

import { useState, useEffect } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"; // Assuming PopoverClose exists in your library
import { Button } from "@/components/ui/button";
import { TimeIcon } from "./icons";
import { ScrollArea } from "@/components/ui/scroll-area"; // Assuming this is your custom scroll area component

type TimePickerProps = {
    value?: string; // format "HH:mm"
    onChange?: (time: string) => void;
    onCancel?: () => void;
};

export function TimePicker({ value, onChange, onCancel }: TimePickerProps) {
    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const [time, setTime] = useState<string | null>(value || null); // Set initial time to null
    const [open, setOpen] = useState(false); // State to control the popover visibility

    useEffect(() => {
        if (value) {
            const date = new Date(value);
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            setTime(`${hours}:${minutes}`);
        } else {
            setTime(null);
        }
    }, [value]);

    const handleTimeChange = (type: "hour" | "minute", value: string) => {
        const [currentHour, currentMinute] = time?.split(":").map(Number) || [
            0, 0,
        ];

        let newHour = currentHour;
        let newMinute = currentMinute;

        if (type === "hour") {
            newHour = parseInt(value);
        } else if (type === "minute") {
            newMinute = parseInt(value);
        }

        const newTime = `${String(newHour).padStart(2, "0")}:${String(newMinute).padStart(2, "0")}`;
        setTime(newTime);
        onChange?.(newTime);
    };

    const handleCancel = () => {
        setTime(null); // Reset time to null
        setOpen(false); // Close the popover
        onCancel?.();
    };

    const handleSave = () => {
        onChange?.(time || "");
        setOpen(false); // Close the popover after saving
    };

    // Hours from 1-12
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    // Minutes from 00-55 in increments of 5
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="bg-secondary rounded-full font-normal flex gap-2">
                    <TimeIcon />
                    {time ? time : <span>Pilih waktu</span>}{" "}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="flex flex-row h-[200px] divide-y z-50 pointer-events-auto">
                    {/* Hours */}
                    <ScrollArea className="w-auto">
                        <div className="flex flex-col p-2">
                            {hours.reverse().map((hour) => (
                                <Button
                                    key={hour}
                                    size="icon"
                                    variant={
                                        time?.startsWith(
                                            `${hour.toString().padStart(2, "0")}:`
                                        )
                                            ? "default"
                                            : "ghost"
                                    }
                                    className="w-full shrink-0 aspect-square"
                                    onClick={() =>
                                        handleTimeChange(
                                            "hour",
                                            hour.toString()
                                        )
                                    }
                                >
                                    {hour}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Minutes */}
                    <ScrollArea className="w-auto">
                        <div className="flex flex-col p-2">
                            {minutes.map((minute) => (
                                <Button
                                    key={minute}
                                    size="icon"
                                    variant={
                                        time?.endsWith(
                                            `:${String(minute).padStart(2, "0")}`
                                        )
                                            ? "default"
                                            : "ghost"
                                    }
                                    className="w-full shrink-0 aspect-square"
                                    onClick={() =>
                                        handleTimeChange(
                                            "minute",
                                            String(minute)
                                        )
                                    }
                                >
                                    {String(minute).padStart(2, "0")}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

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
