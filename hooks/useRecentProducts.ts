"use client";

import { useEffect, useState } from "react";
import { getRecentProductsService } from "@/services/listing";

export const useRecentProducts = (initialData: any[] = []) => {
    const [isLoading, setIsLoading] = useState(initialData.length === 0);
    const [error, setError] = useState<string | null>(null);
    const [recentProducts, setRecentProducts] = useState<any[]>(initialData);

    useEffect(() => {
        if (recentProducts.length > 0) return;

        const fetchRecentProducts = async () => {
            setIsLoading(true);
            try {
                const result = await getRecentProductsService();
                if (result.success && result.data) {
                    setRecentProducts(result.data);
                } else {
                    setError(result.message || "Failed to fetch recent products");
                }
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching recent products");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecentProducts();
    }, [recentProducts.length]);

    return {
        recentProducts,
        isLoading,
        error,
    };
};
