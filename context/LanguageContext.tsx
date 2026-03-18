"use client";

import React, { createContext, useContext, useState } from "react";

export type Language = "En" | "Fr";

// ─────────────────────────────────────────────────────────────────────────────
// Translations dictionary
// ─────────────────────────────────────────────────────────────────────────────
const translations = {
  En: {
    // Navbar
    nav_home: "Home",
    nav_all_items: "All Items",
    nav_login: "Login/Sign up",
    nav_profile: "Profile Info",
    nav_dashboard: "Provider Dashboard",
    nav_logout: "Logout",
    nav_language: "Language",
    nav_favorites: "Favorites",

    // Banner
    banner_heading: "A Simple Marketplace to Find and Contact Local Sellers",
    banner_subheading:
      "Discover thousands of listings from trusted local sellers across Bangladesh.",

    // Category
    category_title: "Explore by Category",
    cat_services: "Services",
    cat_job: "Job",
    cat_real_estate: "Real Estate",
    cat_products: "Products",
    cat_vehicles: "Vehicles",

    // Featured / Recent
    featured_title: "Featured Listings",
    recent_title: "Recent Listings",
    view_all: "View All",

    // ChoseUs
    chose_title: "Why Choose Teranga Market?",
    chose_local_title: "100% Local",
    chose_local_desc:
      "A platform designed for the Senegalese market, adapted to our reality.",
    chose_verified_title: "Verified Professionals",
    chose_verified_desc:
      "We verify the identity of service providers for your safety.",
    chose_contact_title: "Direct Contact",
    chose_contact_desc:
      "Chat directly on WhatsApp with sellers without intermediaries.",

    // Footer
    footer_tagline:
      "Your trusted marketplace for buying and selling vehicles, properties, electronics, services, and finding job opportunities across Bangladesh.",
    footer_browse: "Browse Categories",
    footer_quick: "Quick Links",
    footer_touch: "Get In Touch",
    footer_vehicles: "Vehicles",
    footer_properties: "Properties",
    footer_products: "Products & Electronics",
    footer_services: "Services",
    footer_jobs: "Jobs",
    footer_all_items: "All Items",
    footer_home: "Home",
    footer_favorites: "My Favorites",
    footer_about: "About Us",
    footer_contact: "Contact Us",
    footer_faq: "FAQs",
    footer_help: "Help Center",
    footer_business_hours: "Business Hours:",
    footer_hours: "Saturday - Thursday\n9:00 AM - 6:00 PM (GMT+6)",
    footer_copyright:
      "© 2025 Taranga Market. All rights reserved. Built with ❤️ for Bangladesh 🇧🇩",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_cookies: "Cookie Policy",
  },

  Fr: {
    // Navbar
    nav_home: "Accueil",
    nav_all_items: "Tous les articles",
    nav_login: "Connexion/Inscription",
    nav_profile: "Profil",
    nav_dashboard: "Tableau de bord fournisseur",
    nav_logout: "Déconnexion",
    nav_language: "Langue",
    nav_favorites: "Favoris",

    // Banner
    banner_heading:
      "Un marché simple pour trouver et contacter des vendeurs locaux",
    banner_subheading:
      "Découvrez des milliers d'annonces de vendeurs locaux de confiance à travers le Bangladesh.",

    // Category
    category_title: "Explorer par catégorie",
    cat_services: "Services",
    cat_job: "Emploi",
    cat_real_estate: "Immobilier",
    cat_products: "Produits",
    cat_vehicles: "Véhicules",

    // Featured / Recent
    featured_title: "Annonces en vedette",
    recent_title: "Annonces récentes",
    view_all: "Voir tout",

    // ChoseUs
    chose_title: "Pourquoi choisir Teranga Market ?",
    chose_local_title: "100% Local",
    chose_local_desc:
      "Une plateforme conçue pour le marché sénégalais, adaptée à notre réalité.",
    chose_verified_title: "Professionnels vérifiés",
    chose_verified_desc:
      "Nous vérifions l'identité des prestataires de services pour votre sécurité.",
    chose_contact_title: "Contact direct",
    chose_contact_desc:
      "Discutez directement sur WhatsApp avec les vendeurs sans intermédiaires.",

    // Footer
    footer_tagline:
      "Votre marché de confiance pour acheter et vendre des véhicules, propriétés, électroniques, services et trouver des opportunités d'emploi au Bangladesh.",
    footer_browse: "Parcourir les catégories",
    footer_quick: "Liens rapides",
    footer_touch: "Nous contacter",
    footer_vehicles: "Véhicules",
    footer_properties: "Propriétés",
    footer_products: "Produits et électroniques",
    footer_services: "Services",
    footer_jobs: "Emplois",
    footer_all_items: "Tous les articles",
    footer_home: "Accueil",
    footer_favorites: "Mes favoris",
    footer_about: "À propos",
    footer_contact: "Nous contacter",
    footer_faq: "FAQ",
    footer_help: "Centre d'aide",
    footer_business_hours: "Heures d'ouverture :",
    footer_hours: "Samedi - Jeudi\n9h00 - 18h00 (GMT+6)",
    footer_copyright:
      "© 2025 Taranga Market. Tous droits réservés. Fait avec ❤️ pour le Bangladesh 🇧🇩",
    footer_privacy: "Politique de confidentialité",
    footer_terms: "Conditions d'utilisation",
    footer_cookies: "Politique en matière de cookies",
  },
} as const;

export type TranslationKey = keyof typeof translations.En;

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("En");

  const t = (key: TranslationKey): string =>
    translations[language][key] as string;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
