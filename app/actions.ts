"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { error } from "console";

export const signUpAction = async (formData: FormData) => {
    const password = formData.get("password")?.toString();
    const confirm_password = formData.get("confirm_password")?.toString();

    if (!password || !confirm_password) {
        return encodedRedirect(
            "error",
            "/sign-up",
            "Password and confirm password are required"
        );
    }

    if (password !== confirm_password) {
        return encodedRedirect(
            "error",
            "/sign-up",
            "Password and confirm password do not match"
        );
    }

    const email = formData.get("email")?.toString();
    const fullname = formData.get("fullname")?.toString();

    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    if (!email || !password) {
        return encodedRedirect(
            "error",
            "/sign-up",
            "Email and password are required"
        );
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
                fullname,
                role: "user",
            },
        },
    });

    if (error) {
        console.error(error.code + " " + error.message);
        return encodedRedirect("error", "/sign-up", error.message);
    } else {
        return encodedRedirect(
            "success",
            "/sign-up",
            "Thanks for signing up! Please login to continue."
        );
    }
};
export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return encodedRedirect("error", "/sign-in", error.message);
    }

    // 🔁 Redirect sesuai role
    // Ambil role dari user_metadata
    const user = data.user;
    const role = user?.user_metadata?.role; // Ambil role dari user_metadata

    // Pastikan role sudah ada di user_metadata
    if (!role) {
        return encodedRedirect(
            "error",
            "/sign-in",
            "Role tidak ditemukan di user metadata."
        );
    }

    // Redirect berdasarkan role
    if (role === "admin") {
        return redirect("/admin");
    }

    return redirect("/beranda");
};

export const forgotPasswordAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const callbackUrl = formData.get("callbackUrl")?.toString();

    if (!email) {
        return encodedRedirect(
            "error",
            "/forgot-password",
            "Email is required"
        );
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/beranda/reset-password`,
    });

    if (error) {
        console.error(error.message);
        return encodedRedirect(
            "error",
            "/forgot-password",
            "Could not reset password"
        );
    }

    if (callbackUrl) {
        return redirect(callbackUrl);
    }

    return encodedRedirect(
        "success",
        "/forgot-password",
        "Check your email for a link to reset your password."
    );
};

export const changePasswordAction = async (formData: FormData) => {
    const supabase = await createClient();

    const current_password = formData.get("current_password") as string;
    const confirm_password = formData.get("confirm_password") as string;
    const new_password = formData.get("new_password") as string;

    if (!current_password || !confirm_password || !new_password) {
        return encodedRedirect(
            "error",
            "/beranda",
            "Semua input tidak boleh kosong"
        );
    }

    if (new_password !== confirm_password) {
        return encodedRedirect(
            "error",
            "/beranda",
            "Password dan Konfirmasi Password tidak sama"
        );
    }

    // Retrieve the authenticated user
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return encodedRedirect(
            "error",
            "/beranda",
            "Gagal mendapatkan data pengguna yang terautentikasi"
        );
    }

    // Call the custom RPC function to verify the current password
    const { data: isPasswordValid, error: rpcError } = await supabase.rpc(
        "verify_user_password",
        {
            password: current_password,
        }
    );

    if (rpcError || !isPasswordValid) {
        return encodedRedirect(
            "error",
            "/beranda",
            "Password saat ini tidak valid"
        );
    }

    // Update the user's password
    const { error: updateError } = await supabase.auth.updateUser({
        password: new_password,
    });

    if (updateError) {
        return encodedRedirect(
            "error",
            "/beranda",
            "Gagal memperbarui password"
        );
    }

    return encodedRedirect(
        "success",
        "/beranda",
        "Password berhasil diperbarui"
    );
};

export const resetPasswordAction = async (formData: FormData) => {
    const supabase = await createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
        encodedRedirect(
            "error",
            "/beranda/reset-password",
            "Password dan Konfir password diperlukan"
        );
    }

    if (password !== confirmPassword) {
        encodedRedirect(
            "error",
            "/beranda/reset-password",
            "Passwords tidak cocok"
        );
    }

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        encodedRedirect(
            "error",
            "/beranda/reset-password",
            "Password update failed"
        );
    }

    encodedRedirect("success", "/beranda/reset-password", "Password updated");
};

export const signOutAction = async () => {
    const supabase = await createClient();

    /**
     * @TODO  : Handle if admin or not logout ✅
     */
    const { data } = await supabase.auth.getUser();
    await supabase.auth.signOut();

    if (data.user?.user_metadata.role === "admin") {
        return redirect("/admin");
    }

    return redirect("/sign-in");
};

export async function updateNotification({ taskId }: { taskId: string }) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("notifications")
        .update({ is_sent: true })
        .eq("task_id", taskId);

    return redirect("/beranda");
}
