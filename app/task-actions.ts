"use server";
import { createClient } from "@/utils/supabase/server";
import {
    combineDateAndTime,
    isEmptyString,
    messageHandler,
} from "@/utils/utils";
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

    // check if empty:
    if (isEmptyString({ val: title })) {
        return messageHandler({
            status: "error",
            text: "Judul Tidak Boleh Kosong",
        });
    }

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
interface Body {
    title: string;
    description: string;
    due_date?: string | null; // Optional due_date property
}
export const updateTaskAction = async (formData: FormData) => {
    console.log("updateTaskAction");

    const supabase = await createClient();

    const task_id = formData.get("task_id") as string;
    const title = formData.get("title") as string;

    // check if empty:
    if (isEmptyString({ val: title })) {
        return messageHandler({
            status: "error",
            text: "Judul Tidak Boleh Kosong",
        });
    }

    const description = formData.get("description") as string;

    const date = formData.get("date") as string;
    const time = formData.get("time") as string;

    console.log(date);
    console.log(time);

    const isoDatetime = combineDateAndTime(date, time);
    console.log("iso time: ", isoDatetime);

    const body: Body = {
        title,
        description,
        due_date: null,
    };
    if (isoDatetime) {
        body.due_date = isoDatetime;
    }
    const { error } = await supabase
        .from("tasks")
        .update(body)
        .eq("id", task_id);

    console.log(error);

    if (!error) {
        return redirect("/beranda");
    }
};
