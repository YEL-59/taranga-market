"use client";

import { useEffect, useState } from "react";
import { getMySubscriptionService } from "@/services/listing";

export const useMySubscription = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [subscription, setSubscription] = useState<any>(null);
    const [hasSubscription, setHasSubscription] = useState(false);

    const fetchSubscription = async () => {
        setIsLoading(true);
        try {
            const result = await getMySubscriptionService();
            if (result.success && result.data) {
                console.log("Subscription API Response:", result.data);
                
                // Extract possible subscription formats
                const subObj = result.data.subscription;
                const subArr = Array.isArray(result.data.subscriptions) ? result.data.subscriptions : [];
                
                // If it's a list, find the best active plan
                let currentPlan = subObj;
                if (!currentPlan && subArr.length > 0) {
                    const activePlans = subArr.filter((s: any) => s.status === "active" || s.is_active === true);
                    currentPlan = activePlans.sort((a: any, b: any) => {
                        const aIsFree = a.plan?.slug === "free" || a.plan?.monthly_price === 0 || a.plan_name === "Free" || a.is_free === true;
                        const bIsFree = b.plan?.slug === "free" || b.plan?.monthly_price === 0 || b.plan_name === "Free" || b.is_free === true;
                        
                        if (aIsFree && !bIsFree) return 1;
                        if (!aIsFree && bIsFree) return -1;
                        return b.id - a.id;
                    })[0] || subArr[0];
                }
                
                const hasSub = result.data.has_subscription ?? result.data.has_subscriptions ?? (currentPlan !== null);
                
                setSubscription(currentPlan);
                setHasSubscription(hasSub);
            } else {
                setError(result.message || "Failed to fetch subscription");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscription();
    }, []);

    return {
        subscription,
        hasSubscription,
        isLoading,
        error,
        refresh: fetchSubscription
    };
};
