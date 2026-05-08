import type {
    AuthSession,
    LoginPayload,
    RegisterPayload,
    UserRole,
    VerifyOtpPayload,
} from "../types/auth";
import apiClient, { authApiClient } from "./apiClient";

type ApiEnvelope<T> = {
    success: boolean;
    code: string;
    message: string;
    data?: T;
};

function getStringValue(record: Record<string, unknown>, key: string): string {
    const value = record[key];

    return typeof value === "string" ? value : "";
}

function getRecordValue(
    record: Record<string, unknown>,
    key: string,
): Record<string, unknown> | null {
    const value = record[key];

    if (value && typeof value === "object" && !Array.isArray(value)) {
        return value as Record<string, unknown>;
    }

    return null;
}

function getUserRole(value: unknown): UserRole {
    return value === "ADMIN" ? "ADMIN" : "USER";
}

function normalizeAuthSession(
    data: unknown,
    fallback: {
        email: string;
        username?: string;
        firstName?: string;
        lastName?: string;
    },
): AuthSession {
    const baseRecord =
        data && typeof data === "object" && !Array.isArray(data)
            ? (data as Record<string, unknown>)
            : {};
    const userRecord =
        getRecordValue(baseRecord, "user") ??
        getRecordValue(baseRecord, "data") ??
        baseRecord;

    const firstName =
        getStringValue(userRecord, "firstName") || fallback.firstName || "";
    const lastName =
        getStringValue(userRecord, "lastName") || fallback.lastName || "";
    const username =
        getStringValue(userRecord, "username") ||
        fallback.username ||
        [firstName, lastName].filter(Boolean).join(" ") ||
        fallback.email;
    const email = getStringValue(userRecord, "email") || fallback.email;
    const token =
        getStringValue(baseRecord, "token") ||
        getStringValue(baseRecord, "accessToken") ||
        getStringValue(baseRecord, "jwt");
    const isVerifiedValue = userRecord.isVerified;
    const role = getUserRole(userRecord.role);

    return {
        email,
        username,
        firstName,
        lastName,
        role,
        token: token || undefined,
        isVerified:
            typeof isVerifiedValue === "boolean" ? isVerifiedValue : true,
        raw: baseRecord,
    };
}

export async function loginUser(payload: LoginPayload): Promise<AuthSession> {
    const response = await apiClient.post<ApiEnvelope<unknown>>(
        "/users/login",
        payload,
    );

    return normalizeAuthSession(response.data.data, {
        email: payload.email,
    });
}

export type CheckEmailCode =
    | "EMAIL_AVAILABLE"
    | "OTP_ALREADY_SENT"
    | "OTP_RESENT"
    | "USER_EXISTS"
    | "EMAIL_SENT_FAILED"
    | "CHECK_EMAIL_ERROR";

export type CheckEmailResult = {
    success: boolean;
    code: CheckEmailCode;
    message: string;
};

export async function checkRegisterEmail(
    email: string,
): Promise<CheckEmailResult> {
    const response = await apiClient.post<{
        success?: boolean;
        code?: string;
        message?: string;
    }>("/users/register/check-email", { email });

    return {
        success: Boolean(response.data.success),
        code:
            (response.data.code as CheckEmailCode | undefined) ??
            "CHECK_EMAIL_ERROR",
        message: response.data.message ?? "",
    };
}

export async function registerUser(
    payload: RegisterPayload,
): Promise<{ email: string; message: string }> {
    const response = await apiClient.post<ApiEnvelope<unknown>>(
        "/users/register",
        payload,
    );

    return {
        email: payload.email,
        message: response.data.message,
    };
}

export async function verifyOtp(
    payload: VerifyOtpPayload,
): Promise<AuthSession> {
    const response = await apiClient.post<ApiEnvelope<unknown>>(
        "/users/verify-otp",
        payload,
    );

    return normalizeAuthSession(response.data.data, {
        email: payload.email,
    });
}

export async function sendOtp(payload: {
    email: string;
}): Promise<{ message: string }> {
    const response = await apiClient.post<ApiEnvelope<unknown>>(
        "/users/send-otp",
        payload,
    );

    return {
        message: response.data.message,
    };
}

export async function resetPassword(payload: {
    email: string;
    otp: string;
    newPassword: string;
}): Promise<{ message: string }> {
    const response = await apiClient.post<ApiEnvelope<unknown>>(
        "/users/reset-password",
        payload,
    );

    return {
        message: response.data.message,
    };
}

export async function logoutUser(): Promise<void> {
    await authApiClient.post("/users/logout");
}
