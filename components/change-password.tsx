"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { changePasswordAction } from "@/app/clientside-actions";
import { PopUpMessage } from "./pop-up-message";
import { CircleFilIcon } from "./icons";

interface LabeledInputProps {
    title: string;
    name: string;
    alertText: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showError?: boolean;
}

function LabeledInput({
    title,
    name,
    alertText,
    value,
    onChange,
    showError = false,
}: LabeledInputProps) {
    return (
        <>
            <Label htmlFor={name}>{title}</Label>
            <Input
                id={name}
                name={name}
                type="password"
                value={value}
                onChange={onChange}
            />
            {showError && (
                <p className="text-xs text-red-500 mt-1">{alertText}</p>
            )}
        </>
    );
}

export default function EditPassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{
        status: "error" | "success";
        text: string;
    } | null>(null);

    const [errors, setErrors] = useState({
        current: false,
        new: false,
        confirm: false,
        match: false,
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        const newErrors = {
            current: currentPassword.length < 6,
            new: newPassword.length < 6,
            confirm: confirmPassword.length < 6,
            match: newPassword !== confirmPassword,
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some(Boolean);
        if (hasError) {
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("current_password", currentPassword);
        formData.append("new_password", newPassword);
        formData.append("confirm_password", confirmPassword);

        const result = await changePasswordAction(formData);

        if (result?.status === "error") {
            setMessage({ status: "error", text: result.text });
        } else if (result?.status === "success") {
            setMessage({ status: "success", text: result.text });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }

        setIsSubmitting(false);
    };

    // Realtime validation logic
    const validateCurrent = (val: string) => val.length < 6;
    const validateNew = (val: string) => val.length < 6;
    const validateConfirm = (val: string) =>
        val.length < 6 || val !== newPassword;

    const handleCurrentChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCurrentPassword(val);
        setErrors((prev) => ({ ...prev, current: validateCurrent(val) }));
    };

    const handleNewChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNewPassword(val);
        setErrors((prev) => ({
            ...prev,
            new: validateNew(val),
            match: confirmPassword !== "" && val !== confirmPassword,
        }));
    };

    const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setConfirmPassword(val);
        setErrors((prev) => ({
            ...prev,
            confirm: validateConfirm(val),
            match: val !== newPassword,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-2xl font-sm font-semibold">Edit Password</div>
            <ul className="flex flex-col mt-2">
                <li className="text-xs text-red-500 flex gap-1 items-center">
                    <CircleFilIcon classname="fill-neutral-950/80 w-1 h-1" />{" "}
                    Password minimal 6 karakter
                </li>
            </ul>

            {message && <PopUpMessage {...message} />}

            <div className="flex flex-col gap-4 mt-8">
                <div className="text-sm flex flex-col gap-2">
                    <LabeledInput
                        title="Password Saat Ini"
                        name="current_password"
                        alertText="Minimal 6 karakter"
                        value={currentPassword}
                        onChange={handleCurrentChange}
                        showError={errors.current}
                    />
                </div>
                <div className="text-sm flex flex-col gap-2">
                    <LabeledInput
                        title="Password Baru"
                        name="new_password"
                        alertText="Minimal 6 karakter"
                        value={newPassword}
                        onChange={handleNewChange}
                        showError={errors.new}
                    />
                </div>
                <div className="text-sm flex flex-col gap-2">
                    <LabeledInput
                        title="Konfirmasi Password Baru"
                        name="confirm_password"
                        alertText={
                            errors.match
                                ? "Password tidak cocok dengan password baru"
                                : "Minimal 6 karakter"
                        }
                        value={confirmPassword}
                        onChange={handleConfirmChange}
                        showError={errors.confirm || errors.match}
                    />
                </div>
            </div>

            <DialogFooter className="mt-8">
                <DialogClose asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className="border-secondary hover:bg-primary/70 hover:text-primary-foreground"
                    >
                        Batal
                    </Button>
                </DialogClose>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Mengubah..." : "Simpan"}
                </Button>
            </DialogFooter>
        </form>
    );
}
