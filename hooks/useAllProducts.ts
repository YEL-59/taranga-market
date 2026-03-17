"use client";

import { useEffect, useState, useCallback } from "react";
import { getAllProductsService } from "@/services/listing";

export const useAllProducts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0
    });

    const fetchProducts = useCallback(async (page: number = 1, isLoadMore: boolean = false) => {
        if (isLoadMore) setIsLoadingMore(true);
        else setIsLoading(true);

        try {
            const result = await getAllProductsService(page);
            if (result.success && result.data) {
                if (isLoadMore) {
                    setProducts(prev => [...prev, ...result.data.data]);
                } else {
                    setProducts(result.data.data);
                }
                setPagination({
                    current_page: result.data.current_page,
                    last_page: result.data.last_page,
                    total: result.data.total
                });
            } else {
                setError(result.message || "Failed to fetch products");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred while fetching products");
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts(1);
    }, [fetchProducts]);

    const loadMore = () => {
        if (pagination.current_page < pagination.last_page && !isLoadingMore) {
            fetchProducts(pagination.current_page + 1, true);
        }
    };

    return {
        products,
        isLoading,
        isLoadingMore,
        error,
        pagination,
        loadMore,
        hasMore: pagination.current_page < pagination.last_page
    };
};
