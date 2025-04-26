import { createClient } from "@/utils/supabase/client";
import { encodedRedirect, messageHandler } from "@/utils/utils";

export async function changePasswordAction(formData: FormData) {
    const supabase = createClient();

    const current_password = formData.get("current_password") as string;
    const confirm_password = formData.get("confirm_password") as string;
    const new_password = formData.get("new_password") as string;

    if (!current_password || !confirm_password || !new_password) {
        return messageHandler({
            status: "error",
            text: "Semua input tidak boleh kosong",
        });
    }

    if (new_password !== confirm_password) {
        return messageHandler({
            status: "error",
            text: "Password dan Konfirmasi Password tidak sama",
        });
    }

    // Retrieve the authenticated user
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return messageHandler({
            status: "error",
            text: "User tidak ditemukan",
        });
    }

    // Call the custom RPC function to verify the current password
    const { data: isPasswordValid, error: rpcError } = await supabase.rpc(
        "verify_user_password",
        {
            password: current_password,
        }
    );

    if (rpcError || !isPasswordValid) {
        return messageHandler({
            status: "error",
            text: "Password saat ini tidak valid",
        });
    }

    // Update the user's password
    const { error: updateError } = await supabase.auth.updateUser({
        password: new_password,
    });

    if (updateError) {
        switch (updateError.code) {
            case "same_password":
                return messageHandler({
                    status: "error",
                    text: "Password baru tidak boleh sama dengan password lama",
                });
                break;
            default:
                return messageHandler({
                    status: "error",
                    text: updateError.message,
                });
        }
    }

    return messageHandler({
        status: "success",
        text: "Password berhasil diubah",
    });
}

export async function updateNotification({ taskId }: { taskId: string }) {
    const supabase = createClient();

    const { error } = await supabase
        .from("notifications")
        .update({ is_sent: true })
        .eq("task_id", taskId);

    if (error) {
        return messageHandler({
            status: "error",
            text: "Gagal memperbaharui status notifikasi",
        });
    }

    return messageHandler({
        status: "success",
        text: "Notifikasi berhasil di update",
    });
}
