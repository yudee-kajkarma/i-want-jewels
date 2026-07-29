"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "@/lib/router";
import AuthShell from "../components/auth/AuthShell";
import { resetPassword, sendOtp } from "../services/authService";
import { useTranslation } from "react-i18next";

export default function ResetPasswordPage() {
    const { t } = useTranslation();
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
            setError(t("auth.enterEmailFirst"));
            return;
        }

        setIsSendingOtp(true);
        setError("");
        setMessage("");

        try {
            const response = await sendOtp({ email: email.trim() });
            setMessage(response.message || t("auth.otpSent"));
        } catch {
            setError(t("auth.otpSendError"));
        } finally {
            setIsSendingOtp(false);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email.trim() || !otp.trim() || !newPassword.trim()) {
            setError(t("auth.resetPasswordRequired"));
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
                    t("auth.passwordResetSuccess"),
            );
            navigate("/login", { replace: true });
        } catch {
            setError(
                t("auth.passwordResetFailed"),
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthShell
            title={t("auth.resetPasswordTitle")}
            description={t("auth.resetPasswordDesc")}
            eyebrow={t("auth.accountRecovery")}
            asideTitle={t("auth.resetPasswordAsideTitle")}
            asideBody={t("auth.resetPasswordAsideBody")}
        >
            <form className="space-y-5" onSubmit={handleSubmit}>
                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                        {t("auth.emailLabel")}
                    </span>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="h-14 w-full border border-[#ddcdc0] px-4 text-base outline-none transition focus:border-[#17110d]"
                            placeholder={t("auth.enterEmailPlaceholder")}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                void handleSendOtp();
                            }}
                            disabled={isSendingOtp || isSubmitting}
                            className="shrink-0 border border-[#b63f80] px-4 text-xs font-bold tracking-[0.08em] text-[#b63f80] transition hover:bg-[#fff3fa] disabled:opacity-60"
                        >
                            {isSendingOtp ? t("auth.sendingOtp") : t("auth.sendOtpBtn")}
                        </button>
                    </div>
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                        {t("auth.otpCode")}
                    </span>
                    <input
                        type="text"
                        required
                        value={otp}
                        onChange={(event) => setOtp(event.target.value)}
                        maxLength={6}
                        className="h-14 w-full border border-[#ddcdc0] px-4 text-base outline-none transition focus:border-[#17110d]"
                        placeholder={t("auth.enterOtp")}
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                        {t("profile.newPasswordLabel")}
                    </span>
                    <div className="relative">
                        <input
                            type={isPasswordVisible ? "text" : "password"}
                            required
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(event.target.value)
                            }
                            className="h-14 w-full border border-[#ddcdc0] px-4 pr-14 text-base outline-none transition focus:border-[#17110d]"
                            placeholder={t("auth.enterNewPassword")}
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
                                    ? t("auth.hidePassword")
                                    : t("auth.showPassword")
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
                    <p className="bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                    </p>
                ) : null}
                {message ? (
                    <p className="bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {message}
                    </p>
                ) : null}

                <button
                    type="submit"
                    disabled={isSubmitting || isSendingOtp}
                    className="w-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
                >
                    {isSubmitting ? t("auth.resetting") : t("auth.resetPasswordBtn")}
                </button>

                <p className="text-center text-sm text-zinc-500">
                    {t("auth.backToSignIn").replace("?", "")}?{" "}
                    <Link
                        to="/login"
                        className="font-bold text-[#b63f80] underline underline-offset-4"
                    >
                        {t("auth.loginHere")}
                    </Link>
                </p>
            </form>
        </AuthShell>
    );
}
