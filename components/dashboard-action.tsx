"use client";

import { UserIcon, NotificationIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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

import EditPassword from "@/components/change-password";

import { User } from "@supabase/supabase-js";

interface DashboardActionProps {
    user: User;
    notifications: {
        count: number;
        elm: React.ReactNode;
    };
}

export default function DashboardAction({
    user,
    notifications,
}: DashboardActionProps) {
    return (
        <div className="flex gap-4">
            <Popover>
                <PopoverTrigger>
                    <div className="relative">
                        <NotificationIcon size={24} />

                        {notifications.count > 0 && (
                            <div className="absolute right-0 top-0 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-sm p-0">
                    {notifications.elm}
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger>
                    <UserIcon size={24} />
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                    <div className="flex flex-col gap-4">
                        <div className="text-xl font-sm font-semibold">
                            Profil
                        </div>
                        <div>
                            <p>
                                {user.user_metadata.fullname
                                    ? user.user_metadata.fullname
                                    : "Pengguna"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Ubah Password</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle></DialogTitle>
                                </DialogHeader>

                                <EditPassword />
                            </DialogContent>
                        </Dialog>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
