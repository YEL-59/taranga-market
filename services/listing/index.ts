"use server";

import { cookies } from "next/headers";

const NEXT_PUBLIC_BASE_API = "https://raymondred.thesyndicates.team/api";

export const getSubscriptionPlansService = async (): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const rawToken = cookieStore.get("token")?.value;

        if (!rawToken) {
            return { success: false, message: "No authentication token found. Please log in." };
        }

        // Clean token in case it's wrapped in quotes
        const token = rawToken.replace(/^"(.*)"$/, '$1');

        const response = await fetch(`https://raymondred.thesyndicates.team/api/subscription-plans`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            return { success: false, message: `Failed to fetch subscription plans: ${response.status}` };
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch subscription plans" };
    }
};

export const requestBoostService = async (listingId: number, boostPlanId: number, paymentMethod?: string): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const rawToken = cookieStore.get("token")?.value;
        if (!rawToken) {
            return { success: false, message: "No authentication token found. Please log in." };
        }
        const token = rawToken.replace(/^"(.*)"$/, '$1');

        const response = await fetch(`https://raymondred.thesyndicates.team/api/request-boost`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: JSON.stringify({ 
                listing_id: listingId, 
                boost_plan_id: boostPlanId,
                payment_method: paymentMethod
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            try {
                const errorData = JSON.parse(text);
                return { success: false, message: errorData.message || `Request failed with status ${response.status}` };
            } catch {
                return { success: false, message: `Server error: ${response.status}. Please try again later.` };
            }
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to request boost" };
    }
};

export const getBoostPlansService = async (): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const rawToken = cookieStore.get("token")?.value;
        if (!rawToken) {
            return { success: false, message: "No authentication token found. Please log in." };
        }
        const token = rawToken.replace(/^"(.*)"$/, '$1');

        const response = await fetch(`https://raymondred.thesyndicates.team/api/boost-plans`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            return { success: false, message: `Failed to fetch plans: ${response.status}` };
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch boost plans" };
    }
};

export const getBoostPlansByCategoryService = async (categoryId: number): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const rawToken = cookieStore.get("token")?.value;
        if (!rawToken) {
            return { success: false, message: "No authentication token found. Please log in." };
        }
        const token = rawToken.replace(/^"(.*)"$/, '$1');

        const response = await fetch(`https://raymondred.thesyndicates.team/api/boost-plans/category/${categoryId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            return { success: false, message: `Failed to fetch category boost plans: ${response.status}` };
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch boost plans" };
    }
};

export const getMyBoostsService = async (): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const rawToken = cookieStore.get("token")?.value;
        if (!rawToken) {
            return { success: false, message: "No authentication token found." };
        }
        const token = rawToken.replace(/^"(.*)"$/, '$1');

        const response = await fetch(`https://raymondred.thesyndicates.team/api/my-boosts`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            cache: "no-store"
        });

        if (!response.ok) {
            return { success: false, message: `Failed to fetch your boosts: ${response.status}` };
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch active boosts" };
    }
};

export const getBoostStatsService = async (listingId: number): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const rawToken = cookieStore.get("token")?.value;
        if (!rawToken) {
            return { success: false, message: "No authentication token found." };
        }
        const token = rawToken.replace(/^"(.*)"$/, '$1');

        const response = await fetch(`https://raymondred.thesyndicates.team/api/boost-analytics/${listingId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            return { success: false, message: `Failed to fetch boost stats: ${response.status}` };
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch boost stats" };
    }
};

export const requestSubscriptionService = async (planId: number, billingCycle: string = "monthly", paymentMethod?: string): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const rawToken = cookieStore.get("token")?.value;

        if (!rawToken) {
            return { success: false, message: "No authentication token found." };
        }

        // Clean token
        const token = rawToken.replace(/^"(.*)"$/, '$1');

        const response = await fetch(`https://raymondred.thesyndicates.team/api/request-subscription`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: JSON.stringify({ 
                subscription_plan_id: planId, 
                billing_cycle: billingCycle,
                payment_method: paymentMethod
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, message: errorData.message || `Request failed: ${response.status}` };
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to request subscription" };
    }
};

export const getMySubscriptionService = async (): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const rawToken = cookieStore.get("token")?.value;
        if (!rawToken) {
            return { success: false, message: "No authentication token found." };
        }
        const token = rawToken.replace(/^"(.*)"$/, '$1');

        const response = await fetch(`https://raymondred.thesyndicates.team/api/my-subscription`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            cache: "no-store"
        });

        if (!response.ok) {
            return { success: false, message: `Failed to fetch subscription: ${response.status}` };
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch current subscription" };
    }
};

export const getSubscriptionHistoryService = async (page: number = 1): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No authentication token found." };
        }

        const response = await fetch(`https://raymondred.thesyndicates.team/api/subscription-history?page=${page}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            return { success: false, message: `Failed to fetch history: ${response.status}` };
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch subscription history" };
    }
};

export type ListingResponse<T = any> = {
    success: boolean;
    message: string;
    data?: T;
    [key: string]: any;
};

export const createListingService = async (formData: FormData): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`https://raymondred.thesyndicates.team/api/listing-create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: formData,
        });

        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const getHeroSectionService = async (): Promise<ListingResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/get-hero-section`, {
            method: "GET",
        });

        if (!response.ok) {
            return { success: false, message: `Failed to fetch hero section: ${response.status}` };
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch hero section" };
    }
};


export const getProductsByCategoryService = async (categoryId: number) => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/get-product-data/by-category/${categoryId}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            },
            next: { revalidate: 60, tags: ['categories', `category-${categoryId}`] }
        });

        if (!response.ok) {
            return { success: false, message: "Failed to fetch category data." };
        }

        const data = await response.json();
        return data; // returning the standard response
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const getSlidersService = async () => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/get-slider`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            },
            next: { revalidate: 60, tags: ['sliders'] }
        });

        if (!response.ok) {
            return { success: false, message: "Failed to fetch sliders data." };
        }

        const data = await response.json();
        return data; 
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const searchListingsService = async (title: string, city: string = "", state: string = ""): Promise<ListingResponse> => {
    try {
        const params = new URLSearchParams();
        if (title) params.set("title", title);
        if (city) params.set("city", city);
        if (state) params.set("state", state);

        const response = await fetch(`https://raymondred.thesyndicates.team/api/search?${params.toString()}`, {
            method: "GET",
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch search results" };
    }
};


export const getCategoriesService = async (): Promise<ListingResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/category`, {
            method: "GET",
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch categories" };
    }
};

export const getSubCategoriesService = async (categoryId: string): Promise<ListingResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/subcategory?id=${categoryId}`, {
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

        const response = await fetch(`https://raymondred.thesyndicates.team/api/listing?page=${page}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
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

        const response = await fetch(`https://raymondred.thesyndicates.team/api/listing-show/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
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

        const response = await fetch(`https://raymondred.thesyndicates.team/api/listing-destroy/${id}`, {
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

        const response = await fetch(`https://raymondred.thesyndicates.team/api/dashboard-Summary`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};
export const getRecentProductsService = async (): Promise<ListingResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/feature-product/recent`, {
            method: "GET",
        });

        if (!response.ok) {
            return { success: false, message: `Failed to fetch recent products: ${response.status}` };
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch recent products" };
    }
};

export const getAllProductsService = async (page: number = 1): Promise<ListingResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/all-product?page=${page}`, {
            method: "GET",
        });

        if (!response.ok) {
            return { success: false, message: `Failed to fetch products: ${response.status}` };
        }

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch products" };
    }
};

export const getRecentListingsService = async (page: number = 1): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`https://raymondred.thesyndicates.team/api/recent-listing?page=${page}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};

export const getFeaturedProductsService = async (): Promise<ListingResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/feature-product`, {
            method: "GET",
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch featured products" };
    }
};

export const getFeaturedProductDetailsService = async (id: number | string): Promise<ListingResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/feature-product/show/${id}`, {
            method: "GET",
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch featured product details" };
    }
};

export const addFavoriteService = async (listingId: number | string): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`https://raymondred.thesyndicates.team/api/add-favourite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: JSON.stringify({ listing_id: listingId }),
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to add to favorites" };
    }
};

export const getFavoritesService = async (): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`https://raymondred.thesyndicates.team/api/get-favourite`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch favorites" };
    }
};

export const removeFavoriteService = async (listingId: number | string): Promise<ListingResponse> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const response = await fetch(`https://raymondred.thesyndicates.team/api/destroy-favourite`, {
            method: "POST", // User said "body: listing_id" and usually destroy or delete with body is POST or DELETE. Response example shows body: listing_id.
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: JSON.stringify({ listing_id: listingId }),
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to remove from favorites" };
    }
};

export const getSellerProfileService = async (id: number | string): Promise<ListingResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/seller/${id}`, {
            method: "GET",
        });

        return await response.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch seller profile" };
    }
};

export const contactListingSellerService = async (listingId: number | string, data: any): Promise<ListingResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/listing/${listingId}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Some endpoints return standard success/message JSON. We handle that.
        const responseData = await response.json().catch(() => ({}));
        
        if (!response.ok) {
            return { success: false, message: responseData.message || `Failed to send message: ${response.status}` };
        }

        return { success: true, message: responseData.message || "Message sent successfully!", data: responseData.data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to send message" };
    }
};
