import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
    try {
        let response = NextResponse.next({
            request: { headers: request.headers },
        });

        // init Supabase SSR client
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll: () => request.cookies.getAll(),
                    setAll: (cookiesToSet) => {
                        cookiesToSet.forEach(({ name, value }) =>
                            request.cookies.set(name, value)
                        );
                        response = NextResponse.next({ request });
                        cookiesToSet.forEach(({ name, value, options }) =>
                            response.cookies.set(name, value, options)
                        );
                    },
                },
            }
        );

        /**
         * @TODO : Handle route
         * - belum login:
         * tidak bisa akses /admin/dashboard tapi bisa akses /admin   (untuk login)
         * tidak bisa akses /beranda
         *
         * - jika sudah login
         * !role: admin,
         * bisa akses /admin/dashboard,
         * jika mengakses /admin | /beranda | /sign-in | /sign-up maka diredirect ke /admin/dashboard
         *
         *
         * !role: user biasa
         * bisa akses /beranda, tidak bisa akses /admin maupun /admin/dashboard
         * * jika mengakses /admin | /beranda | /sign-in | /sign-up maka diredirect ke /beranda
         */

        // ambil user session
        const { data } = await supabase.auth.getUser();
        const user = data?.user;
        const isLoggedIn = !!user;
        const role = user?.user_metadata?.role ?? "user";
        const path = request.nextUrl.pathname;

        // ————————————————
        // 1) BELUM LOGIN
        // ————————————————
        if (!isLoggedIn) {
            // Admin login page masih boleh diakses
            if (path === "/admin" || path === "/admin/sign-in") {
                return response;
            }
            // User login/register masih boleh
            if (path === "/sign-in" || path === "/sign-up") {
                return response;
            }
            // Semua yang lain:
            // - /admin/dashboard → redirect ke /admin
            // - /beranda → redirect ke /sign-in
            if (path.startsWith("/admin/dashboard")) {
                return NextResponse.redirect(new URL("/admin", request.url));
            }
            if (path === "/beranda") {
                return NextResponse.redirect(new URL("/sign-in", request.url));
            }
            // root atau halaman lain → biarkan atau redirect ke sign-in
            return response;
        }

        // ————————————————
        // 2) SUDAH LOGIN — ADMIN
        // ————————————————
        if (role === "admin") {
            // Boleh akses dashboard
            if (path.startsWith("/admin/dashboard")) {
                return response;
            }
            // Jika admin buka halaman login/admin root/user pages → kirim ke dashboard
            if (
                path === "/admin" ||
                path === "/admin/sign-in" ||
                path === "/sign-in" ||
                path === "/sign-up" ||
                path === "/beranda"
            ) {
                return NextResponse.redirect(
                    new URL("/admin/dashboard", request.url)
                );
            }
            // Halaman admin lain (misal /admin/settings) juga boleh
            if (path.startsWith("/admin/")) {
                return response;
            }
            // Halaman non-admin lain (misal /profile) → biarkan (atau redirect sesuai kebutuhan)
            return response;
        }

        // ————————————————
        // 3) SUDAH LOGIN — USER BIASA
        // ————————————————
        // Boleh akses beranda
        if (path === "/beranda") {
            return response;
        }
        // Jangan izinkan akses admin atau login/register ulang
        if (
            path === "/admin" ||
            path.startsWith("/admin/") ||
            path === "/sign-in" ||
            path === "/sign-up"
        ) {
            return NextResponse.redirect(new URL("/beranda", request.url));
        }

        // Halaman lain untuk user biasa (misal /tasks, /settings) → biarkan
        return response;
    } catch (e) {
        console.error("Middleware error:", e);
        return NextResponse.next({ request: { headers: request.headers } });
    }
};

// eksport sebagai middleware
export default updateSession;
