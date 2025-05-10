// __tests__/notification.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import NotificationsContainer from "@/components/notification-container";
import { NotificationsContainerProps } from "@/components/notification-container";

import "@testing-library/jest-dom";

jest.mock("../app/actions", () => ({
    updateNotification: jest.fn().mockResolvedValue(undefined),
}));

describe("Pengujian Kasus Uji WB-2", () => {
    const mockNotifications: NotificationsContainerProps[] = [
        {
            is_sent: false,
            task: {
                id: "task-1",
                title: "Tugas 1",
                status: "todo",
                due_date: new Date().toISOString(),
                description: "Deskripsi tugas 1",
            },
        },
    ];

    it("harus menampilkan notifikasi jika ada data", () => {
        render(<NotificationsContainer notifications={mockNotifications} />);

        expect(screen.getByText("Tugas 1")).toBeInTheDocument();
    });

    it("harus memanggil updateNotification saat tombol diklik", async () => {
        const updateNotificationMock =
            jest.requireMock("../app/actions").updateNotification;

        render(<NotificationsContainer notifications={mockNotifications} />);

        const checkButton = screen.getByRole("button");
        fireEvent.click(checkButton);

        expect(updateNotificationMock).toHaveBeenCalledWith({
            taskId: "task-1",
        });
    });

    it("tidak boleh menampilkan notifikasi jika kosong", () => {
        render(<NotificationsContainer notifications={[]} />);
        expect(screen.getByText(/Pengingat tugas kosong/i)).toBeInTheDocument();
    });
});
