export const serviceData = [
    {
        id: 201,
        title: "Plumbing & Emergency Repair Service",
        type: "Service",
        price: "15,000 XOF",
        numericPrice: 15000,
        location: "Dakar, Senegal",
        city: "Dakar",
        image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1200&auto=format&fit=crop",
        thumbs: [
            "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1595467793444-046645396655?q=80&w=400&auto=format&fit=crop"
        ],
        meta: {
            category: "Plumbing",
            experience: "5 Years",
            availability: "24/7",
            rating: "4.8"
        },
        seller: {
            name: "Amadou Diallo",
            since: "Member since April 20, 2020",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
        },
        description: "This plumbing service provides reliable solutions for residential and commercial needs, including repairs, installations, and routine maintenance. The service focuses on timely response, clear communication, and quality workmanship. Jobs are handled with care and attention to detail to ensure long-lasting results. Customers can contact the provider directly by phone or WhatsApp to discuss their requirements and schedule a service."
    },
    {
        id: 202,
        title: "Professional House Cleaning",
        type: "Service",
        price: "25,000 XOF",
        numericPrice: 25000,
        location: "Plateau, Dakar",
        city: "Dakar",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6954?q=80&w=1200&auto=format&fit=crop",
        thumbs: [
            "https://images.unsplash.com/photo-1581578731548-c64695cc6954?q=80&w=400&auto=format&fit=crop"
        ],
        meta: {
            category: "Cleaning",
            experience: "3 Years",
            availability: "Mon-Sat",
            rating: "4.9"
        },
        seller: {
            name: "Dakar Cleaners",
            since: "Member since June 2021",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop"
        },
        description: "Deep cleaning for apartments and offices. We use eco-friendly products and provide all necessary equipment."
    },
    {
        id: 203,
        title: "Electrical Installation & Wiring",
        type: "Service",
        price: "20,000 XOF",
        numericPrice: 20000,
        location: "Thies",
        city: "Thies",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
        thumbs: [
            "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop"
        ],
        meta: {
            category: "Electrical",
            experience: "10 Years",
            availability: "Emergency",
            rating: "5.0"
        },
        seller: {
            name: "Moussa Electric",
            since: "Member since Jan 2019",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=100&auto=format&fit=crop"
        },
        description: "Certified electrician for all your electrical needs. New installations, fault finding, and maintenance."
    }
];

export const serviceFilterOptions = {
    cities: ["Dakar", "Thies", "Saint-Louis", "Mbour", "Kaolack", "Ziguinchor"],
    categories: ["Plumbing", "Cleaning", "Electrical", "Carpentry", "Painting", "Repair", "Gardening"]
};
