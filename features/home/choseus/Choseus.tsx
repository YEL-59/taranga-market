import React from 'react';
import { MapPin, Briefcase, MessageCircle } from 'lucide-react';

const ChoseUs = () => {
    const reasons = [
        {
            icon: <MapPin className="w-6 h-6 text-[#F97316]" />,
            title: "100% Local",
            description: "A platform designed for the Senegalese market, adapted to our reality."
        },
        {
            icon: <Briefcase className="w-6 h-6 text-[#F97316]" />,
            title: "Verified Professionals",
            description: "We verify the identity of service providers for your safety."
        },
        {
            icon: <MessageCircle className="w-6 h-6 text-[#F97316]" />,
            title: "Direct Contact",
            description: "Chat directly on WhatsApp with sellers without intermediaries."
        }
    ];

    return (
        <section className="w-full py-20 bg-[#E6F9F9]/50">
            <div className="container mx-auto px-4">
                <h2 className="text-[32px] font-extrabold text-gray-900 text-center mb-16 tracking-tight">
                    Why Choose Teranga Market ?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto">
                    {reasons.map((reason, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                                {reason.icon}
                            </div>
                            <h3 className="text-[19px] font-bold text-gray-900 mb-3">
                                {reason.title}
                            </h3>
                            <p className="text-gray-500 text-[14.5px] leading-relaxed max-w-[280px]">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ChoseUs;
