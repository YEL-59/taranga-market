"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const NEXT_PUBLIC_BASE_API = "https://raymondred.thesyndicates.team/api";

export type AuthResponse<T = any> = {
    success: boolean;
    message: string;
    data?: T;
};

export const loginService = async (data: any): Promise<AuthResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (responseData.success && responseData.data) {
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
            cookieStore.set("role", responseData.data.user.role, {
                path: "/",
            });
            return responseData;
        }

        // Normalize quirk: success: true but data: null means a business failure
        if (responseData.success && !responseData.data) {
            return {
                success: false,
                message: responseData.message || "Invalid credentials"
            };
        }

        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const registerService = async (data: any): Promise<AuthResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (responseData.success) {
            if (responseData.data) {
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
                cookieStore.set("role", responseData.data.user.role, {
                    path: "/",
                });
            }
            return responseData;
        }

        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const sendOtpService = async (email: string, purpose?: string): Promise<AuthResponse> => {
    try {
        const url = new URL(`https://raymondred.thesyndicates.team/api/send-otp`);
        url.searchParams.append("email", email);
        if (purpose) {
            url.searchParams.append("purpose", purpose);
        }

        const response = await fetch(url.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, purpose }),
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const verifyOtpService = async (otp: string, email: string, purpose?: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp, email, purpose }),
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const resetPasswordService = async (data: any): Promise<AuthResponse> => {
    try {
        const response = await fetch(
            `https://raymondred.thesyndicates.team/api/reset-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
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

        const response = await fetch(`https://raymondred.thesyndicates.team/api/profileinfo`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const responseData = await response.json();

        if (responseData.success && responseData.data?.user) {
            // Keep the user and role cookies fresh with the latest data
            cookieStore.set("user", JSON.stringify(responseData.data.user), {
                path: "/",
            });
            cookieStore.set("role", responseData.data.user.role, {
                path: "/",
            });
        }

        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const logoutService = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (token) {
            try {
                await fetch(`https://raymondred.thesyndicates.team/api/logout`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
            } catch (apiError) {
                console.error("External logout API error:", apiError);
            }
        }

        cookieStore.delete("token");
        cookieStore.delete("user");
        cookieStore.delete("role");
        return { success: true, message: "Logged out successfully" };
    } catch (error) {
        const cookieStore = await cookies();
        cookieStore.delete("token");
        cookieStore.delete("user");
        cookieStore.delete("role");
        return { success: true, message: "Logged out locally" };
    }
};

export const updateProfileService = async (data: any): Promise<AuthResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`https://raymondred.thesyndicates.team/api/update-profileinfo`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (responseData.success && responseData.data) {
            // Update the user cookie with new data
            cookieStore.set("user", JSON.stringify(responseData.data), {
                path: "/",
            });
            if (responseData.data.role) {
                cookieStore.set("role", responseData.data.role, {
                    path: "/",
                });
            }
        }

        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const changeProfilePhotoService = async (formData: FormData): Promise<AuthResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`https://raymondred.thesyndicates.team/api/change-profile-photo`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: formData,
        });

        const textResponse = await response.text();
        let responseData;
        try {
            responseData = JSON.parse(textResponse);
        } catch (e) {
            return { success: false, message: `Server Error: ${response.status}. Expected JSON but got HTML.` };
        }

        if (responseData.success && responseData.data) {
            cookieStore.set("user", JSON.stringify(responseData.data), {
                path: "/",
            });
        }

        if (!response.ok) {
            return { success: false, message: responseData.message || "Failed to update photo." }
        }

        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const removeProfilePhotoService = async (): Promise<AuthResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`https://raymondred.thesyndicates.team/api/remove-profile-photo`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const responseData = await response.json();

        if (responseData.success && responseData.data) {
            cookieStore.set("user", JSON.stringify(responseData.data), {
                path: "/",
            });
        }

        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const changePasswordService = async (data: any): Promise<AuthResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`https://raymondred.thesyndicates.team/api/change-password`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};
