import { render } from "@testing-library/react";
import Login from "../app/(auth-pages)/sign-in/page";
import "@testing-library/jest-dom";

describe("Pengujian Kasus Uji WB-1", () => {
    it("harus menampilkan judul halaman", async () => {
        const searchParams = Promise.resolve({ message: "" });
        const { getByText } = render(await Login({ searchParams }));

        expect(getByText(/login/i)).toBeInTheDocument();
    });

    it("harus menampilkan input email", async () => {
        const searchParams = Promise.resolve({ message: "" });
        const { getByPlaceholderText } = render(await Login({ searchParams }));

        const emailInput = getByPlaceholderText(/you@example.com/i);
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute("name", "email");
    });

    it("harus menampilkan input password", async () => {
        const searchParams = Promise.resolve({ message: "" });
        const { getByPlaceholderText } = render(await Login({ searchParams }));

        const passwordInput = getByPlaceholderText(/your password/i);
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute("type", "password");
        expect(passwordInput).toHaveAttribute("name", "password");
    });

    it("harus menampilkan tombol Sign In", async () => {
        const searchParams = Promise.resolve({ message: "" });
        const { getByRole } = render(await Login({ searchParams }));

        const submitButton = getByRole("button", { name: /sign in/i });
        expect(submitButton).toBeInTheDocument();
    });

    it("harus menampilkan link ke halaman registrasi", async () => {
        const searchParams = Promise.resolve({ message: "" });
        const { getByText } = render(await Login({ searchParams }));

        const signUpLink = getByText(/buat akun/i);
        expect(signUpLink).toBeInTheDocument();
        expect(signUpLink).toHaveProperty("href");
        expect(signUpLink.getAttribute("href")).toBe("/sign-up");
    });

    it("tidak menampilkan alert dialog jika tidak ada pesan", async () => {
        const searchParams = Promise.resolve({ message: "" });
        const { queryByRole } = render(await Login({ searchParams }));

        const alertDialog = queryByRole("dialog");
        expect(alertDialog).not.toBeInTheDocument();
    });
});
