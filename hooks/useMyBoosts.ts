"use client";

import { useEffect, useState } from "react";
import { getMyBoostsService } from "@/services/listing";

export const useMyBoosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [boosts, setBoosts] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>(null);

    const fetchBoosts = async () => {
        setIsLoading(true);
        try {
            const result = await getMyBoostsService();
            if (result.success && result.data) {
                setBoosts(result.data.boosts || []);
                setPagination(result.data.pagination || null);
            } else {
                setError(result.message || "Failed to fetch boosts");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBoosts();
    }, []);

    return {
        boosts,
        pagination,
        isLoading,
        error,
        refresh: fetchBoosts
    };
};
