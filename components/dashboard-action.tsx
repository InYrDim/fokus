"use client";

import { UserIcon, NotificationIcon } from "@/components/icons";

export default function DashboardAction() {
    return (
        <div className="flex gap-4">
            <button
                onClick={() => {
                    alert("notification");
                }}
            >
                <NotificationIcon size={24} />
            </button>
            <button
                onClick={() => {
                    alert("profile");
                }}
            >
                <UserIcon size={24} />
            </button>
        </div>
    );
}
