"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

interface labeledInput {
    title: string;
    name: string;
    alertText: string;
}
export function LabeledInput({ title, name, alertText }: labeledInput) {
    const [password, setPassword] = useState("");
    return (
        <>
            <Label htmlFor={name}>{title}</Label>
            <Input
                id={name}
                name={name}
                type="text"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            {
                // check if password length is less than 6
                password.length < 6 && (
                    <p className="text-xs text-red-500">{alertText}</p>
                )
            }
        </>
    );
}
