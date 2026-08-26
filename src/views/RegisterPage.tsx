"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "@/lib/router";
import AuthShell from "../components/auth/AuthShell";
import { useAuth } from "../context/AuthContext";
import { checkRegisterEmail, registerUser } from "../services/authService";
import type { RegisterPayload } from "../types/auth";
import {
    getCountryOptions,
    getDialCodeForCountry,
    getDialCodeOptions,
    getStateOptions,
    isValidEmailAddress,
    isValidPostalCode,
} from "../utils/location";
import { useTranslation } from "react-i18next";

type RegisterPhase = "email-check" | "details";


const initialForm: RegisterPayload = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryCode: "",
    address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: true,
        addressType: "home",
    },
};

export default function RegisterPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setOtpEmail } = useAuth();
    const [phase, setPhase] = useState<RegisterPhase>("email-check");
    const [emailCheckValue, setEmailCheckValue] = useState("");
    const [emailCheckError, setEmailCheckError] = useState("");
    const [emailCheckUserExists, setEmailCheckUserExists] = useState(false);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [form, setForm] = useState<RegisterPayload>(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [postalCodeError, setPostalCodeError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState(false);
    // Once the customer picks a dialling code themselves we stop prefilling it
    // from the address country — a customer can ship abroad on a home number.
    const [isCountryCodeTouched, setIsCountryCodeTouched] = useState(false);
    const countryOptions = useMemo(() => getCountryOptions(), []);
    const dialCodeOptions = useMemo(() => getDialCodeOptions(), []);
    const stateOptions = useMemo(
        () => getStateOptions(form.address.country),
        [form.address.country],
    );

    const isRegisterFormValid = useMemo(() => {
        const hasRequiredFields =
            form.username.trim() !== "" &&
            form.email.trim() !== "" &&
            form.password.trim() !== "" &&
            form.confirmPassword.trim() !== "" &&
            form.firstName.trim() !== "" &&
            form.lastName.trim() !== "" &&
            form.phoneNumber.trim() !== "" &&
            form.countryCode.trim() !== "" &&
            form.address.country.trim() !== "" &&
            form.address.state.trim() !== "" &&
            form.address.street.trim() !== "" &&
            form.address.postalCode.trim() !== "";

        if (!hasRequiredFields) {
            return false;
        }

        if (!isValidEmailAddress(form.email)) {
            return false;
        }

        if (!isValidPostalCode(form.address.postalCode, form.address.country)) {
            return false;
        }

        return form.password === form.confirmPassword;
    }, [form]);
    const emailErrorMessage = useMemo(() => {
        if (!form.email.trim()) {
            return "";
        }

        return isValidEmailAddress(form.email)
            ? ""
            : t("auth.validEmailError");
    }, [form.email, t]);
    const postalCodeLiveErrorMessage = useMemo(() => {
        if (!form.address.postalCode.trim()) {
            return "";
        }

        return isValidPostalCode(form.address.postalCode, form.address.country)
            ? ""
            : t("auth.validPostalCodeError");
    }, [form.address.country, form.address.postalCode, t]);
    const passwordMismatchMessage = useMemo(() => {
        if (!form.confirmPassword.trim()) {
            return "";
        }

        return form.password === form.confirmPassword
            ? ""
            : t("auth.passwordMatchError");
    }, [form.confirmPassword, form.password, t]);
    const requiredFieldsMessage = useMemo(() => {
        const hasAnyInput =
            form.username.trim() ||
            form.email.trim() ||
            form.password.trim() ||
            form.confirmPassword.trim() ||
            form.firstName.trim() ||
            form.lastName.trim() ||
            form.phoneNumber.trim() ||
            form.countryCode.trim() ||
            form.address.country.trim() ||
            form.address.state.trim() ||
            form.address.city.trim() ||
            form.address.street.trim() ||
            form.address.postalCode.trim();

        if (!hasAnyInput || isRegisterFormValid) {
            return "";
        }

        return t("auth.fillRequiredFields");
    }, [form, isRegisterFormValid, t]);

    function getRegisterErrorMessage(error: unknown): string {
        if (!axios.isAxiosError(error)) {
            return "Registration failed. Check the details and try again.";
        }

        const responseData = error.response?.data;

        if (
            responseData &&
            typeof responseData === "object" &&
            !Array.isArray(responseData)
        ) {
            const errorRecord =
                "error" in responseData
                    ? (responseData as Record<string, unknown>).error
                    : null;

            if (
                errorRecord &&
                typeof errorRecord === "object" &&
                !Array.isArray(errorRecord)
            ) {
                const backendMessage = (errorRecord as Record<string, unknown>)
                    .message;

                if (
                    typeof backendMessage === "string" &&
                    backendMessage.trim()
                ) {
                    return backendMessage;
                }
            }

            const message = (responseData as Record<string, unknown>).message;

            if (typeof message === "string" && message.trim()) {
                return message;
            }
        }

        return t("auth.registrationFailed");
    }

    function updateField<Key extends keyof RegisterPayload>(
        key: Key,
        value: RegisterPayload[Key],
    ) {
        setForm((currentValue) => ({
            ...currentValue,
            [key]: value,
        }));
    }

    function updateAddressField<Key extends keyof RegisterPayload["address"]>(
        key: Key,
        value: RegisterPayload["address"][Key],
    ) {
        setForm((currentValue) => ({
            ...currentValue,
            address: {
                ...currentValue.address,
                [key]: value,
            },
        }));
    }

    async function handleEmailCheck(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedEmail = emailCheckValue.trim();

        if (!isValidEmailAddress(trimmedEmail)) {
            setEmailCheckError(t("auth.validEmailError"));
            return;
        }

        setIsCheckingEmail(true);
        setEmailCheckError("");
        setEmailCheckUserExists(false);

        try {
            const result = await checkRegisterEmail(trimmedEmail);

            switch (result.code) {
                case "EMAIL_AVAILABLE": {
                    setForm((current) => ({ ...current, email: trimmedEmail }));
                    setPhase("details");
                    break;
                }
                case "OTP_ALREADY_SENT":
                case "OTP_RESENT": {
                    if (result.message) {
                        toast.success(result.message);
                    }
                    setOtpEmail(trimmedEmail);
                    navigate("/verify-otp", { replace: true });
                    break;
                }
                case "USER_EXISTS": {
                    setEmailCheckUserExists(true);
                    setEmailCheckError(
                        result.message ||
                            t("auth.emailRegistered"),
                    );
                    break;
                }
                case "EMAIL_SENT_FAILED":
                case "CHECK_EMAIL_ERROR":
                default: {
                    toast.error(
                        result.message ||
                            t("auth.somethingWentWrong"),
                    );
                    break;
                }
            }
        } catch (caughtError) {
            let fallbackMessage = "";

            if (axios.isAxiosError(caughtError)) {
                const responseData = caughtError.response?.data as
                    | {
                          message?: string;
                          error?: { message?: string };
                      }
                    | undefined;

                fallbackMessage =
                    responseData?.error?.message ?? responseData?.message ?? "";
            }

            toast.error(
                fallbackMessage ||
                    t("auth.unableToVerifyEmail"),
            );
        } finally {
            setIsCheckingEmail(false);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setPostalCodeError("");

        if (!isValidEmailAddress(form.email)) {
            setError(t("auth.validEmailError"));
            return;
        }

        if (!isValidPostalCode(form.address.postalCode, form.address.country)) {
            setPostalCodeError(t("auth.validPostalCodeError"));
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError(t("auth.passwordMatchError"));
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const stateName =
                stateOptions.find(
                    (option) => option.code === form.address.state,
                )?.name ?? form.address.state;
            const payload: RegisterPayload = {
                ...form,
                address: {
                    ...form.address,
                    city: form.address.city.trim() || stateName,
                },
            };
            const response = await registerUser(payload);
            setOtpEmail(response.email);
            navigate("/verify-otp", { replace: true });
        } catch (error) {
            setError(getRegisterErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    }

    if (phase === "email-check") {
        return (
            <AuthShell
                title={t("auth.registerTitle")}
                description={t("auth.registerDescEmail")}
                eyebrow={t("auth.newMember")}
                asideTitle={t("auth.registerAsideTitleEmail")}
                asideBody={t("auth.registerAsideBodyEmail")}
            >
                <form className="space-y-5" onSubmit={handleEmailCheck}>
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                            {t("auth.emailLabel")}
                        </span>
                        <input
                            type="email"
                            required
                            value={emailCheckValue}
                            onChange={(event) => {
                                setEmailCheckValue(event.target.value);

                                if (emailCheckError) {
                                    setEmailCheckError("");
                                }

                                if (emailCheckUserExists) {
                                    setEmailCheckUserExists(false);
                                }
                            }}
                            placeholder={t("auth.emailPlaceholder")}
                            className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
                        />
                        {emailCheckError ? (
                            <p className="mt-2 text-xs text-rose-700">
                                {emailCheckError}
                                {emailCheckUserExists ? (
                                    <>
                                        {" "}
                                        <Link
                                            to="/login"
                                            className="font-bold underline underline-offset-4"
                                        >
                                            {t("auth.signInHere")}
                                        </Link>
                                    </>
                                ) : null}
                            </p>
                        ) : null}
                    </label>

                    <button
                        type="submit"
                        disabled={isCheckingEmail || !emailCheckValue.trim()}
                        className="w-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
                    >
                        {isCheckingEmail ? t("auth.checking") : t("auth.continue")}
                    </button>

                    <p className="text-center text-sm text-zinc-500">
                        {t("auth.alreadyHaveAccount").replace("Sign in", "")}
                        <Link
                            to="/login"
                            className="font-bold text-[#b63f80] underline underline-offset-4"
                        >
                            {t("auth.signInLink")}
                        </Link>
                    </p>
                </form>
            </AuthShell>
        );
    }

    return (
        <AuthShell
            title={t("auth.registerTitle")}
            description={t("auth.registerDescDetails")}
            eyebrow={t("auth.newMember")}
            asideTitle={t("auth.registerAsideTitleDetails")}
            asideBody={t("auth.registerAsideBodyDetails")}
        >
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                            {t("auth.username")}
                        </span>
                        <input
                            type="text"
                            required
                            value={form.username}
                            onChange={(event) =>
                                updateField("username", event.target.value)
                            }
                            className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
                        />
                    </label>
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                            {t("auth.emailLabel")}
                        </span>
                        <input
                            type="email"
                            required
                            readOnly
                            disabled
                            value={form.email}
                            className="h-14 w-full border border-[#ddcdc0] bg-[#f5ede5] px-4 text-zinc-700 outline-none"
                        />
                        <p className="mt-2 text-xs text-zinc-500">
                            {t("auth.emailVerifiedDetails")}
                        </p>
                        {emailErrorMessage ? (
                            <p className="mt-2 text-xs text-rose-700">
                                {emailErrorMessage}
                            </p>
                        ) : null}
                    </label>
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                            {t("auth.firstName")}
                        </span>
                        <input
                            type="text"
                            required
                            value={form.firstName}
                            onChange={(event) =>
                                updateField("firstName", event.target.value)
                            }
                            className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
                        />
                    </label>
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                            {t("auth.lastName")}
                        </span>
                        <input
                            type="text"
                            required
                            value={form.lastName}
                            onChange={(event) =>
                                updateField("lastName", event.target.value)
                            }
                            className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
                        />
                    </label>
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                            {t("auth.passwordLabel")}
                        </span>
                        <div className="relative">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                required
                                value={form.password}
                                onChange={(event) =>
                                    updateField("password", event.target.value)
                                }
                                className="h-14 w-full border border-[#ddcdc0] px-4 pr-14 outline-none transition focus:border-[#17110d]"
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
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                            {t("auth.confirmPassword")}
                        </span>
                        <div className="relative">
                            <input
                                type={
                                    isConfirmPasswordVisible
                                        ? "text"
                                        : "password"
                                }
                                required
                                value={form.confirmPassword}
                                onChange={(event) =>
                                    updateField(
                                        "confirmPassword",
                                        event.target.value,
                                    )
                                }
                                className="h-14 w-full border border-[#ddcdc0] px-4 pr-14 outline-none transition focus:border-[#17110d]"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setIsConfirmPasswordVisible(
                                        (currentValue) => !currentValue,
                                    )
                                }
                                aria-label={
                                    isConfirmPasswordVisible
                                        ? t("auth.hideConfirmPassword")
                                        : t("auth.showConfirmPassword")
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-[#b63f80]"
                            >
                                {isConfirmPasswordVisible ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {passwordMismatchMessage ? (
                            <p className="mt-2 text-xs text-rose-700">
                                {passwordMismatchMessage}
                            </p>
                        ) : null}
                    </label>
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                            {t("auth.countryCode")}
                        </span>
                        <select
                            required
                            value={form.countryCode}
                            onChange={(event) => {
                                setIsCountryCodeTouched(true);
                                updateField("countryCode", event.target.value);
                            }}
                            className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
                        >
                            <option value="">{t("auth.countryCode")}</option>
                            {dialCodeOptions.map((option) => (
                                <option
                                    key={option.countryCode}
                                    value={option.dialCode}
                                >
                                    {option.name} ({option.dialCode})
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                            {t("auth.phoneNumber")}
                        </span>
                        <input
                            type="tel"
                            required
                            value={form.phoneNumber}
                            onChange={(event) =>
                                updateField("phoneNumber", event.target.value)
                            }
                            className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
                        />
                    </label>
                </div>

                <div className="border border-[#eadfd4] bg-[#fffdfa] p-5">
                    <h3 className="text-lg font-bold text-[#17110d]">
                        {t("auth.address")}
                    </h3>
                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                                {t("auth.country")}
                            </span>
                            <select
                                required
                                value={form.address.country}
                                onChange={(event) => {
                                    const selectedCountry = event.target.value;
                                    const derivedDialCode =
                                        getDialCodeForCountry(selectedCountry);

                                    setForm((currentValue) => ({
                                        ...currentValue,
                                        countryCode:
                                            isCountryCodeTouched || !derivedDialCode
                                                ? currentValue.countryCode
                                                : derivedDialCode,
                                        address: {
                                            ...currentValue.address,
                                            country: selectedCountry,
                                            state: "",
                                            city: "",
                                        },
                                    }));
                                }}
                                className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
                            >
                                <option value="">{t("checkout.selectCountry")}</option>
                                {countryOptions.map((country) => (
                                    <option
                                        key={country.code}
                                        value={country.code}
                                    >
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                                {t("auth.state")}
                            </span>
                            <select
                                required
                                value={form.address.state}
                                onChange={(event) => {
                                    updateAddressField("state", event.target.value);
                                    updateAddressField("city", "");
                                }}
                                className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
                            >
                                <option value="">{t("checkout.selectState")}</option>
                                {stateOptions.map((state) => (
                                    <option key={state.code} value={state.code}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="block sm:col-span-2">
                            <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                                {t("auth.street")}
                            </span>
                            <input
                                type="text"
                                required
                                value={form.address.street}
                                onChange={(event) =>
                                    updateAddressField(
                                        "street",
                                        event.target.value,
                                    )
                                }
                                className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
                            />
                        </label>
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                                {t("auth.city")}
                            </span>
                            <input
                                type="text"
                                value={form.address.city}
                                onChange={(event) => updateAddressField("city", event.target.value)}
                                placeholder={t("auth.city")}
                                className="h-14 w-full border border-[#ddcdc0] bg-white px-4 outline-none transition focus:border-[#17110d]"
                            />
                        </label>
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#17110d]">
                                {t("auth.postalCode")}
                            </span>
                            <input
                                type="text"
                                required
                                value={form.address.postalCode}
                                onChange={(event) => {
                                    if (postalCodeError) {
                                        setPostalCodeError("");
                                    }

                                    updateAddressField(
                                        "postalCode",
                                        event.target.value,
                                    );
                                }}
                                className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
                            />
                            {postalCodeError || postalCodeLiveErrorMessage ? (
                                <p className="mt-2 text-xs text-rose-700">
                                    {postalCodeError ||
                                        postalCodeLiveErrorMessage}
                                </p>
                            ) : null}
                        </label>
                    </div>
                </div>

                {error ? (
                    <p className="bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                    </p>
                ) : null}
                {!error && requiredFieldsMessage ? (
                    <p className="bg-amber-50 px-4 py-3 text-sm text-amber-700">
                        {requiredFieldsMessage}
                    </p>
                ) : null}

                <button
                    type="submit"
                    disabled={isSubmitting || !isRegisterFormValid}
                    className="w-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
                >
                    {isSubmitting ? t("auth.creatingAccount") : t("auth.register")}
                </button>

                <p className="text-center text-sm text-zinc-500">
                    {t("auth.alreadyHaveAccount").replace("Sign in", "")}
                    <Link
                        to="/login"
                        className="font-bold text-[#b63f80] underline underline-offset-4"
                    >
                        {t("auth.signInLink")}
                    </Link>
                </p>
            </form>
        </AuthShell>
    );
}
