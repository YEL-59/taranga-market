export const propertyData = [
    {
        id: 1,
        title: "Modern 3BR Apartment in Almadies",
        type: "Property",
        price: "15,000 XOF",
        numericPrice: 15000,
        location: "Almadies, Dakar, Senegal",
        city: "Dakar",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        thumbs: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=400&auto=format&fit=crop"
        ],
        meta: {
            bedrooms: 3,
            bathrooms: 2,
            size: "120 m²",
            wifi: "Included",
            furnished: "Yes",
            floor: "2nd"
        },
        seller: {
            name: "Immo Sénégal Prestige",
            since: "Member since April 20, 2020",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop"
        },
        description: "This property is well located and offers a comfortable living space suitable for individuals or families. It features practical room layouts, good natural light, and essential amenities for everyday living. The property is in good condition and ready for viewing. Interested tenants or buyers can contact the owner or agent directly by phone or WhatsApp to arrange a visit or get more details."
    },
    {
        id: 2,
        title: "Luxury Villa with Swimming Pool",
        type: "Property",
        price: "450,000 XOF/month",
        numericPrice: 450000,
        location: "Mbour, Saly",
        city: "Mbour",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
        thumbs: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=400&auto=format&fit=crop"
        ],
        meta: {
            bedrooms: 5,
            bathrooms: 4,
            size: "350 m²",
            wifi: "Fiber optic",
            furnished: "Luxury",
            floor: "Full Villa"
        },
        seller: {
            name: "Saly Real Estate",
            since: "Member since Jan 2022",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
        },
        description: "Stunning 5-bedroom villa in the heart of Saly. Perfectly designed for luxury living with a private pool and manicured garden."
    },
    {
        id: 3,
        title: "Cozy Studio in Plateau",
        type: "Property",
        price: "5,000 XOF/night",
        numericPrice: 5000,
        location: "Plateau, Dakar",
        city: "Dakar",
        image: "https://images.unsplash.com/photo-1536376074432-bf12177d4f4f?q=80&w=1200&auto=format&fit=crop",
        thumbs: [
            "https://images.unsplash.com/photo-1536376074432-bf12177d4f4f?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=400&auto=format&fit=crop"
        ],
        meta: {
            bedrooms: 1,
            bathrooms: 1,
            size: "35 m²",
            wifi: "Included",
            furnished: "Yes",
            floor: "4th"
        },
        seller: {
            name: "Dakar Stays",
            since: "Member since June 2021",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
        },
        description: "Perfect for business travelers. A fully furnished studio in the city center with all utilities included."
    }
];

export const propertyFilterOptions = {
    cities: ["Dakar", "Mbour", "Thies", "Saint-Louis", "Ziguinchor"],
    propertyTypes: ["For Rent", "For Sale"],
    bedrooms: ["1", "2", "3", "4", "5+"],
    amenities: ["WiFi", "Pool", "Parking", "Furnished", "AC"]
};
