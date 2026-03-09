"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { addFavoriteService, getFavoritesService, removeFavoriteService } from '@/services/listing';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface FavoritesContextType {
    favorites: any[];
    toggleFavorite: (item: any) => Promise<void>;
    isFavorite: (id: number | string) => boolean;
    isLoading: boolean;
    isCustomer: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    const fetchFavorites = useCallback(async () => {
        // Only fetch if user is logged in and is a customer
        if (!user || user.role !== 'customer') {
            setFavorites([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const result = await getFavoritesService();
            if (result.success && result.data) {
                const mappedFavorites = result.data.map((fav: any) => ({
                    ...fav.listing,
                    favorite_id: fav.id
                }));
                setFavorites(mappedFavorites);
            }
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const toggleFavorite = async (item: any) => {
        if (!user) {
            toast.error("Please login to add favorites");
            return;
        }

        if (user.role !== 'customer') {
            toast.error("Only customers can add items to favorites");
            return;
        }

        const id = item.id || item.listing_id;
        const exists = favorites.find(f => f.id === id);

        try {
            if (exists) {
                const result = await removeFavoriteService(id);
                if (result.success) {
                    setFavorites(prev => prev.filter(f => f.id !== id));
                    toast.success("Removed from favorites");
                } else {
                    toast.error(result.message || "Failed to remove from favorites");
                }
            } else {
                const result = await addFavoriteService(id);
                if (result.success) {
                    setFavorites(prev => [...prev, item]);
                    toast.success("Added to favorites");
                } else {
                    toast.error(result.message || "Failed to add to favorites");
                }
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        }
    };

    const isFavorite = (id: number | string) => {
        return favorites.some(f => f.id === Number(id) || f.id === id);
    };

    const isCustomer = user?.role === 'customer';

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, isLoading, isCustomer }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
