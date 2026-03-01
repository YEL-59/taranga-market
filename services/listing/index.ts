"use server";

import { cookies } from "next/headers";

const NEXT_PUBLIC_BASE_API = "https://raymondred.thesyndicates.team/api";

export type ListingResponse<T = any> = {
    success: boolean;
    message: string;
    data?: T;
};

export const createListingService = async (formData: FormData): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/listing-create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const getCategoriesService = async (): Promise<ListingResponse> => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/category`, {
            method: "GET",
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch categories" };
    }
};

export const getSubCategoriesService = async (categoryId: string): Promise<ListingResponse> => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/subcategory?id=${categoryId}`, {
            method: "GET",
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch subcategories" };
    }
};
export const getMyListingsService = async (page: number = 1): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/listing?page=${page}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const getListingDetailsService = async (id: number): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/listing-show/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const responseData = await response.json();
        return { success: true, message: "Listing details fetched", data: responseData };
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const deleteListingService = async (id: number): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/listing-destroy/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const getDashboardSummaryService = async (): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/dashboard-Summary`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};
export const getRecentListingsService = async (page: number = 1): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`${NEXT_PUBLIC_BASE_API}/recent-listing?page=${page}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};
