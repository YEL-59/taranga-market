"use client";

import { useEffect, useState } from "react";
import { getRecentProductsService } from "@/services/listing";

export const useRecentProducts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [recentProducts, setRecentProducts] = useState<any[]>([]);

    useEffect(() => {
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
    }, []);

    return {
        recentProducts,
        isLoading,
        error,
    };
};
