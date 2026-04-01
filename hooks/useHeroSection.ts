"use client";

import { useEffect, useState } from "react";
import { getHeroSectionService } from "@/services/listing";

export const useHeroSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [heroData, setHeroData] = useState<any>(null);

    useEffect(() => {
        const fetchHero = async () => {
            setIsLoading(true);
            try {
                const result = await getHeroSectionService();
                if (result.success && result.data) {
                    setHeroData(result.data);
                } else {
                    setError(result.message || "Failed to fetch hero section");
                }
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching hero section");
            } finally {
                setIsLoading(false);
            }
        };

        fetchHero();
    }, []);

    return {
        heroData,
        isLoading,
        error,
    };
};
