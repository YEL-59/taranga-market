"use server";

import { cookies } from "next/headers";

const NEXT_PUBLIC_BASE_API = "https://raymondred.thesyndicates.team/api";

export type AuthResponse<T = any> = {
    success: boolean;
    message: string;
    data?: T;
};

export const loginService = async (data: any): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (responseData.success) {
            const cookieStore = await cookies();
            cookieStore.set("token", responseData.data.token, {
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            cookieStore.set("user", JSON.stringify(responseData.data.user), {
                path: "/",
            });
        }

        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const registerService = async (data: any): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (responseData.success) {
            const cookieStore = await cookies();
            cookieStore.set("token", responseData.data.token, {
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            cookieStore.set("user", JSON.stringify(responseData.data.user), {
                path: "/",
            });
        }

        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const sendOtpService = async (email: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/send-otp?email=${email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const verifyOtpService = async (otp: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp }),
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const resetPasswordService = async (data: any): Promise<AuthResponse> => {
    const { email, new_password, new_password_confirmation } = data;
    try {
        const response = await fetch(
            `${NEXT_PUBLIC_BASE_API}/reset-password?email=${email}&new_password=${new_password}&new_password_confirmation=${new_password_confirmation}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    new_password,
                    new_password_confirmation,
                }),
            }
        );

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const getProfileInfoService = async (): Promise<AuthResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/profileinfo`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const logoutService = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (token) {
            await fetch(`${NEXT_PUBLIC_BASE_API}/logout`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
        }

        cookieStore.delete("token");
        cookieStore.delete("user");
        return { success: true, message: "Logout successful" };
    } catch (error) {
        const cookieStore = await cookies();
        cookieStore.delete("token");
        cookieStore.delete("user");
        return { success: true, message: "Logged out locally" };
    }
};
