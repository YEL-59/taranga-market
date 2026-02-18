"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    loginService,
    registerService,
    sendOtpService,
    verifyOtpService,
    resetPasswordService,
    logoutService,
    getProfileInfoService,
    AuthResponse,
} from "@/services/auth";

export const useAuth = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const result = await getProfileInfoService();
            if (result.success) {
                setUser(result.data.user);
            }
        };

        fetchProfile();
    }, []);

    const login = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await loginService(data);
            if (result.success) {
                setUser(result.data.user);
                router.push("/");
                router.refresh();
            } else {
                setError(result.message);
            }
            return result;
        } catch (err: any) {
            setError(err.message || "Login failed");
            return { success: false, message: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await registerService(data);
            if (result.success) {
                setUser(result.data.user);
                router.push("/");
                router.refresh();
            } else {
                setError(result.message);
            }
            return result;
        } catch (err: any) {
            setError(err.message || "Registration failed");
            return { success: false, message: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const sendOtp = async (email: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await sendOtpService(email);
            if (result.success) {
                // Handle success (e.g., redirect to verify-otp page)
            } else {
                setError(result.message);
            }
            return result;
        } catch (err: any) {
            setError(err.message || "Failed to send OTP");
            return { success: false, message: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOtp = async (otp: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await verifyOtpService(otp);
            if (result.success) {
                // Handle success (e.g., redirect to reset password page)
            } else {
                setError(result.message);
            }
            return result;
        } catch (err: any) {
            setError(err.message || "OTP verification failed");
            return { success: false, message: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await resetPasswordService(data);
            if (result.success) {
                router.push("/login");
            } else {
                setError(result.message);
            }
            return result;
        } catch (err: any) {
            setError(err.message || "Password reset failed");
            return { success: false, message: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        const result = await logoutService();
        setUser(null);
        router.push("/login");
        router.refresh();
        return result;
    };

    const getProfile = async () => {
        const result = await getProfileInfoService();
        if (result.success) {
            setUser(result.data.user);
        }
        return result;
    };

    return {
        login,
        register,
        sendOtp,
        verifyOtp,
        resetPassword,
        logout,
        getProfile,
        user,
        isLoading,
        error,
    };
};
