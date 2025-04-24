"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export const deleteTaskAction = async (formData: FormData) => {
    console.log("deleteTaskAction");

    const supabase = await createClient();
    // const user = await supabase.auth.getUser();

    const task_id = formData.get("task_id") as string;

    // delete on table tasks
    const deletes = await supabase.from("tasks").delete().eq("id", task_id);

    if (!deletes.error) {
        return redirect("/beranda");
    }
};

export const addTaskAction = async (formData: FormData) => {
    console.log("addTaskAction");

    const supabase = await createClient();

    const { data: user } = await supabase.auth.getUser();
    const id = user?.user?.id;

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const { error, data } = await supabase.from("tasks").insert({
        user_id: id,
        title,
        description,
    });

    console.log(error);

    if (!error) {
        return redirect("/beranda");
    }
};

export const updateTaskAction = async (formData: FormData) => {
    console.log("updateTaskAction");

    const supabase = await createClient();

    const task_id = formData.get("task_id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const { error } = await supabase
        .from("tasks")
        .update({
            title,
            description,
        })
        .eq("id", task_id);

    if (!error) {
        return redirect("/beranda");
    }
};
