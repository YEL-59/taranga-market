"use client";

import { useEffect, useState } from "react";
import { getSubscriptionPlansService } from "@/services/listing";

export const useSubscriptionPlans = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([]);

    useEffect(() => {
        const fetchPlans = async () => {
            setIsLoading(true);
            try {
                const result = await getSubscriptionPlansService();
                if (result.success && result.data) {
                    setSubscriptionPlans(result.data);
                } else {
                    setError(result.message || "Failed to fetch subscription plans");
                }
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching subscription plans");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlans();
    }, []);

    return {
        subscriptionPlans,
        isLoading,
        error,
    };
};
