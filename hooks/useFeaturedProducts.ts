"use client";

import { useEffect, useState } from "react";
import { getFeaturedProductsService } from "@/services/listing";

export const useFeaturedProducts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            setIsLoading(true);
            try {
                const result = await getFeaturedProductsService();
                if (result.success && result.data) {
                    setFeaturedProducts(result.data);
                } else {
                    setError(result.message || "Failed to fetch featured products");
                }
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching featured products");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return {
        featuredProducts,
        isLoading,
        error,
    };
};
