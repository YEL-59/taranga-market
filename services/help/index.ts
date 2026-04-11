"use server";

export type HelpArticle = {
    id: number;
    icon: string | null;
    title: string;
    subtitle: string;
    description: string;
    is_popular: boolean;
    status: string;
    created_at: string;
    updated_at: string;
};

export type HelpResponse = {
    success: boolean;
    message: string;
    data: {
        articles: HelpArticle[];
        popular_articles: HelpArticle[];
    };
};

export const getHelpService = async (): Promise<HelpResponse> => {
    try {
        const response = await fetch(`https://raymondred.thesyndicates.team/api/help`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error("Fetch help error:", error);
        return { 
            success: false, 
            message: error.message || "Failed to fetch help articles",
            data: { articles: [], popular_articles: [] }
        };
    }
};
