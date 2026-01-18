"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
    favorites: any[];
    toggleFavorite: (item: any) => void;
    isFavorite: (id: number | string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse favorites from localStorage", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (item: any) => {
        setFavorites(prev => {
            const exists = prev.find(f => f.id === item.id);
            if (exists) {
                return prev.filter(f => f.id !== item.id);
            }
            // Ensure we store enough info to render the card
            return [...prev, item];
        });
    };

    const isFavorite = (id: number | string) => {
        return favorites.some(f => f.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
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
