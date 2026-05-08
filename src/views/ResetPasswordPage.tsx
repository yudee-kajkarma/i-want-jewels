"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "@/lib/router";
import AuthShell from "../components/auth/AuthShell";
import { resetPassword, sendOtp } from "../services/authService";

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function handleSendOtp() {
        if (!email.trim()) {
            setError("Enter your email first.");
            return;
        }

        setIsSendingOtp(true);
        setError("");
        setMessage("");

        try {
            const response = await sendOtp({ email: email.trim() });
            setMessage(response.message || "OTP sent to your email.");
        } catch {
            setError("Unable to send OTP right now. Please try again.");
        } finally {
            setIsSendingOtp(false);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email.trim() || !otp.trim() || !newPassword.trim()) {
            setError("Email, OTP, and new password are required.");
            return;
        }

        setIsSubmitting(true);
        setError("");
        setMessage("");

        try {
            const response = await resetPassword({
                email: email.trim(),
                otp: otp.trim(),
                newPassword,
            });
            setMessage(
                response.message ||
                    "Password reset successful. You can sign in now.",
            );
            navigate("/login", { replace: true });
        } catch {
            setError(
                "Password reset failed. Check email, OTP, and password, then try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthShell
            title="Reset Password"
            description="Send OTP and set a new password"
            eyebrow="Account Recovery"
            asideTitle="Recover access with email OTP."
            asideBody="This flow uses your API endpoints: request an OTP for the email, then submit email, otp, and newPassword to reset the account password."
        >
            <form className="space-y-5" onSubmit={handleSubmit}>
                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                        Email Address
                    </span>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 text-base outline-none transition focus:border-[#17110d]"
                            placeholder="Enter your email"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                void handleSendOtp();
                            }}
                            disabled={isSendingOtp || isSubmitting}
                            className="shrink-0 rounded-full border border-[#b63f80] px-4 text-xs font-bold tracking-[0.08em] text-[#b63f80] transition hover:bg-[#fff3fa] disabled:opacity-60"
                        >
                            {isSendingOtp ? "SENDING..." : "SEND OTP"}
                        </button>
                    </div>
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                        OTP Code
                    </span>
                    <input
                        type="text"
                        required
                        value={otp}
                        onChange={(event) => setOtp(event.target.value)}
                        maxLength={6}
                        className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 text-base outline-none transition focus:border-[#17110d]"
                        placeholder="Enter OTP"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                        New Password
                    </span>
                    <div className="relative">
                        <input
                            type={isPasswordVisible ? "text" : "password"}
                            required
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(event.target.value)
                            }
                            className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 pr-14 text-base outline-none transition focus:border-[#17110d]"
                            placeholder="Enter new password"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setIsPasswordVisible(
                                    (currentValue) => !currentValue,
                                )
                            }
                            aria-label={
                                isPasswordVisible
                                    ? "Hide password"
                                    : "Show password"
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-[#b63f80]"
                        >
                            {isPasswordVisible ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </label>

                {error ? (
                    <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                    </p>
                ) : null}
                {message ? (
                    <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {message}
                    </p>
                ) : null}

                <button
                    type="submit"
                    disabled={isSubmitting || isSendingOtp}
                    className="w-full rounded-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
                >
                    {isSubmitting ? "RESETTING..." : "RESET PASSWORD"}
                </button>

                <p className="text-center text-sm text-zinc-500">
                    Back to sign in?{" "}
                    <Link
                        to="/login"
                        className="font-bold text-[#b63f80] underline underline-offset-4"
                    >
                        Login here
                    </Link>
                </p>
            </form>
        </AuthShell>
    );
}
