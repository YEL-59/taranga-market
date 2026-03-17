"use client";

import { useEffect, useState } from "react";
import { getBoostPlansService } from "@/services/listing";

export const useBoostPlans = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [boostPlans, setBoostPlans] = useState<any[]>([]);

    useEffect(() => {
        const fetchBoostPlans = async () => {
            setIsLoading(true);
            try {
                const result = await getBoostPlansService();
                if (result.success && result.data) {
                    setBoostPlans(result.data);
                } else {
                    setError(result.message || "Failed to fetch boost plans");
                }
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching boost plans");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBoostPlans();
    }, []);

    return {
        boostPlans,
        isLoading,
        error,
    };
};
