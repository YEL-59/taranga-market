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
    updateProfileService,
    changeProfilePhotoService,
    removeProfilePhotoService,
    changePasswordService,
    AuthResponse,
} from "@/services/auth";
import { toast } from "sonner";

export const useAuth = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const result = await getProfileInfoService();
            if (result.success && result.data) {
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
            if (result.success && result.data) {
                setUser(result.data.user);
                toast.success(result.message || "Login successful");
                router.push("/");
                router.refresh();
            } else {
                setError(result.message || "Invalid credentials or missing data");
                toast.error(result.message || "Invalid credentials or missing data");
            }
            return result;
        } catch (err: any) {
            const msg = err.message || "Login failed";
            setError(msg);
            toast.error(msg);
            return { success: false, message: msg };
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
                if (result.data?.user) {
                    setUser(result.data.user);
                }
                toast.success(result.message || "Registration successful. Please verify your email.");
                router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&mode=register`);
            } else {
                setError(result.message || "Registration failed or missing data");
                toast.error(result.message || "Registration failed or missing data");
            }
            return result;
        } catch (err: any) {
            const msg = err.message || "Registration failed";
            setError(msg);
            toast.error(msg);
            return { success: false, message: msg };
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
                toast.success(result.message || "OTP sent successfully");
                // Handle success (e.g., redirect to verify-otp page)
            } else {
                setError(result.message);
                toast.error(result.message);
            }
            return result;
        } catch (err: any) {
            const msg = err.message || "Failed to send OTP";
            setError(msg);
            toast.error(msg);
            return { success: false, message: msg };
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOtp = async (otp: string, email: string, purpose?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await verifyOtpService(otp, email, purpose);
            if (result.success) {
                toast.success(result.message || "OTP verified successfully");
            } else {
                setError(result.message);
                toast.error(result.message);
            }
            return result;
        } catch (err: any) {
            const msg = err.message || "OTP verification failed";
            setError(msg);
            toast.error(msg);
            return { success: false, message: msg };
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
                toast.success(result.message || "Password reset successful");
                router.push("/login");
            } else {
                setError(result.message);
                toast.error(result.message);
            }
            return result;
        } catch (err: any) {
            const msg = err.message || "Password reset failed";
            setError(msg);
            toast.error(msg);
            return { success: false, message: msg };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        const result = await logoutService();
        setUser(null);
        toast.success(result.message || "Logged out successfully");
        router.push("/login");
        router.refresh();
        return result;
    };

    const getProfile = async () => {
        setIsLoading(true);
        try {
            const result = await getProfileInfoService();
            if (result.success && result.data) {
                setUser(result.data.user);
            }
            return result;
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await updateProfileService(data);
            if (result.success) {
                setUser(result.data);
                toast.success(result.message || "Profile updated successfully");
            } else {
                setError(result.message);
                toast.error(result.message);
            }
            return result;
        } catch (err: any) {
            const msg = err.message || "Profile update failed";
            setError(msg);
            toast.error(msg);
            return { success: false, message: msg };
        } finally {
            setIsLoading(false);
        }
    };

    const changeProfilePhoto = async (formData: FormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await changeProfilePhotoService(formData);
            if (result.success) {
                setUser(result.data);
                toast.success(result.message || "Profile photo updated");
            } else {
                setError(result.message);
                toast.error(result.message);
            }
            return result;
        } catch (err: any) {
            const msg = err.message || "Photo upload failed";
            setError(msg);
            toast.error(msg);
            return { success: false, message: msg };
        } finally {
            setIsLoading(false);
        }
    };

    const removeProfilePhoto = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await removeProfilePhotoService();
            if (result.success) {
                setUser(result.data);
                toast.success(result.message || "Profile photo removed");
            } else {
                setError(result.message);
                toast.error(result.message);
            }
            return result;
        } catch (err: any) {
            const msg = err.message || "Failed to remove photo";
            setError(msg);
            toast.error(msg);
            return { success: false, message: msg };
        } finally {
            setIsLoading(false);
        }
    };

    const changePassword = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await changePasswordService(data);
            if (result.success) {
                toast.success(result.message || "Password changed successfully");
            } else {
                setError(result.message);
                toast.error(result.message);
            }
            return result;
        } catch (err: any) {
            const msg = err.message || "Failed to change password";
            setError(msg);
            toast.error(msg);
            return { success: false, message: msg };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        register,
        sendOtp,
        verifyOtp,
        resetPassword,
        logout,
        getProfile,
        updateProfile,
        changeProfilePhoto,
        removeProfilePhoto,
        changePassword,
        user,
        isLoading,
        error,
    };
};
