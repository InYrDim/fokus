import AddingTask from "@/components/adding-task";
import DashboardAction from "@/components/dashboard-action";
import TaskItem from "@/components/task-item";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Beranda() {
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

    return (
        <>
            <div className="bg-secondary p-5 w-full">
                {/* metadata */}
                <header className="text-neutral-50 mt-3 pb-7 flex justify-between">
                    <h2 className="text-2xl flex-1">
                        Halo, {user.user_metadata.fullname}
                    </h2>

                    {/* actions: notification & detail */}
                    <DashboardAction />
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

            {/* <div className="flex-1 w-full flex flex-col gap-12">
                <div className="flex flex-col gap-2 items-start">
                    <h2 className="font-bold text-2xl mb-4">
                        Your user details
                    </h2>
                    <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto w-full">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>
            </div> */}
        </>
    );
}
