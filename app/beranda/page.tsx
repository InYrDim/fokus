import AddingTask from "@/components/adding-task";
import DashboardAction from "@/components/dashboard-action";
import { FormMessage, Message } from "@/components/form-message";
import NotificationsContainer from "@/components/notification-container";
import TaskItem, { TaskItemProps } from "@/components/task-item";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function getUpcomingTask(supabase: any, userId: string) {
    const today = new Date();
    const utcYear = today.getUTCFullYear();
    const utcMonth = today.getUTCMonth();
    const utcDate = today.getUTCDate();

    const startOfDay = new Date(Date.UTC(utcYear, utcMonth, utcDate, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(utcYear, utcMonth, utcDate, 23, 59, 59));

    const { data: notifications, error } = await supabase
        .from("notifications")
        .select(
            `
    id,
    notify_at,
    is_sent,
    task:tasks (
      id,
      title,
      description,
      due_date,
      status
    )
  `
        )
        .eq("user_id", userId)
        .eq("is_sent", false)
        // .gte("notify_at", startOfDay.toISOString())
        // .lte("notify_at", endOfDay.toISOString())
        .order("notify_at", { ascending: true });

    return notifications;
}

export default async function Beranda(props: {
    searchParams: Promise<Message>;
}) {
    const searchParams = await props.searchParams;

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const userId = user.id;

    /**
     * @TODO fetch tasks, then map to TaskItem
     * @TODO fetch notifications
     */

    const tasks = await supabase.from("tasks").select().eq("user_id", userId);

    if (tasks.error) {
        console.log("error");
        return redirect("/sign-in");
    }

    const notifications = await getUpcomingTask(supabase, userId);

    return (
        <>
            <FormMessage message={searchParams} />
            <div className="bg-secondary p-5 w-full">
                {/* metadata */}
                <header className="text-neutral-50 mt-3 pb-7 flex justify-between">
                    <h2 className="text-2xl flex-1">
                        Halo, {user.user_metadata.fullname}
                    </h2>

                    {/* actions: notification & detail */}
                    <DashboardAction
                        user={user}
                        notifications={{
                            count: notifications.length,
                            elm: (
                                <NotificationsContainer
                                    notifications={notifications}
                                />
                            ),
                        }}
                    />
                </header>

                {/* tasks */}
                <div className="flex flex-col gap-2">
                    {tasks.data?.map((task) => (
                        <TaskItem
                            key={task.id}
                            taskName={task.title}
                            taskDescription={task.description}
                            taskId={task.id}
                            taskDueDate={task.due_date}
                            taskStatus={task.status}
                        />
                    ))}
                </div>
            </div>

            <AddingTask />
        </>
    );
}
