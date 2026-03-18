"use client";

import { useEffect, useState, useCallback } from "react";
import { getFeaturedProductDetailsService } from "@/services/listing";

export const useFeaturedProductDetails = (id?: string | number, initialData: any = null) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [productDetails, setProductDetails] = useState<any>(initialData);

    const fetchDetails = useCallback(async (productId: string | number) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getFeaturedProductDetailsService(productId);
            if (result.success && result.data) {
                setProductDetails(result.data);
            } else {
                setError(result.message || "Failed to fetch product details");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred while fetching product details");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // Only fetch if we don't have details and we HAVE an id
        if (id && !productDetails) {
            fetchDetails(id);
        }
    }, [id, fetchDetails, productDetails]);

    return {
        productDetails,
        isLoading,
        error,
        fetchDetails
    };
};
