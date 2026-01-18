export const jobData = [
    {
        id: 301,
        title: "Senior Software Developer - Full Stack",
        type: "Job",
        price: "1,500,000 CFA / month",
        numericPrice: 1500000,
        location: "Dakar, Senegal",
        city: "Dakar",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        postedAt: "2 days ago",
        meta: {
            jobType: "Full-time",
            experienceLevel: "Senior",
            employmentType: "Permanent",
            remote: "No",
            salaryRange: "1,200,000 - 1,800,000 CFA",
            education: "Bachelor's Degree",
            industry: "Technology",
            skills: ["React", "Node.js", "TypeScript", "AWS"]
        },
        seller: {
            name: "Amadou Diallo",
            since: "Member since April 20, 2020",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
        },
        description: "We are looking for a motivated candidate to join our team. The role involves performing daily tasks related to [specific field or department], collaborating with team members, and ensuring high-quality results. Applicants should have the necessary skills and experience as outlined, and be ready to start as soon as possible. Interested candidates can contact the employer directly by phone or WhatsApp to learn more or submit their application."
    },
    {
        id: 302,
        title: "Graphic Designer - Creative Agency",
        type: "Job",
        price: "450,000 CFA / month",
        numericPrice: 450000,
        location: "Plateau, Dakar",
        city: "Dakar",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop",
        postedAt: "1 day ago",
        meta: {
            jobType: "Full-time",
            experienceLevel: "Mid-level",
            employmentType: "Permanent",
            remote: "Hybrid",
            salaryRange: "400,000 - 550,000 CFA",
            education: "Diploma",
            industry: "Design",
            skills: ["Photoshop", "Illustrator", "Figma"]
        },
        seller: {
            name: "Creative Hub",
            since: "Member since Jan 2021",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop"
        },
        description: "Join our creative team! We need a designer who can handle both print and digital media. You will work on exciting projects for local and international brands."
    },
    {
        id: 303,
        title: "Sales Representative - FMCG",
        type: "Job",
        price: "250,000 CFA + Commission",
        numericPrice: 250000,
        location: "Thies, Senegal",
        city: "Thies",
        image: "https://images.unsplash.com/photo-1556740734-793838202353?q=80&w=1200&auto=format&fit=crop",
        postedAt: "3 days ago",
        meta: {
            jobType: "Full-time",
            experienceLevel: "Junior",
            employmentType: "Contract",
            remote: "No",
            salaryRange: "200,000 - 300,000 CFA",
            education: "High School",
            industry: "Sales",
            skills: ["Communication", "Negotiation", "CRM"]
        },
        seller: {
            name: "Distrib Senegal",
            since: "Member since June 2022",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop"
        },
        description: "Looking for energetic sales representatives to expand our market reach in the Thies region. Previous experience in FMCG is a plus."
    }
];

export const jobFilterOptions = {
    cities: ["Dakar", "Thies", "Saint-Louis", "Mbour", "Kaolack", "Ziguinchor"],
    jobTypes: ["Full Time", "Part Time", "Contract", "Freelance"],
    experienceLevels: ["Entry Level", "Junior", "Mid-level", "Senior", "Expert"],
    employmentTypes: ["Internship", "Permanent", "Temporary"],
    industries: ["Technology", "Design", "Sales", "Marketing", "Finance", "Healthcare"],
    remoteOptions: ["Yes", "No", "Hybrid"]
};
