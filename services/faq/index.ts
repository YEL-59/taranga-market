"use server";

const NEXT_PUBLIC_BASE_API = "https://raymondred.thesyndicates.team/api";

export interface FAQItem {
    id: number;
    category_id: number;
    question: string;
    answer: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface FAQCategory {
    category_id: number;
    category_name: string;
    items: FAQItem[];
}

export interface FAQResponse {
    success: boolean;
    message: string;
    data: {
        categories: FAQCategory[];
    };
}

export const getFaqsService = async (search?: string): Promise<FAQResponse> => {
    try {
        const url = search 
            ? `${NEXT_PUBLIC_BASE_API}/faq?search=${encodeURIComponent(search)}`
            : `${NEXT_PUBLIC_BASE_API}/faq`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            return { 
                success: false, 
                message: `Failed to fetch faqs: ${response.status}`,
                data: { categories: [] }
            };
        }

        return await response.json();
    } catch (error: any) {
        return { 
            success: false, 
            message: error.message || "Failed to fetch faqs",
            data: { categories: [] }
        };
    }
};
