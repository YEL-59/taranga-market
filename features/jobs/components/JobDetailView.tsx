"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, MessageCircle, AlertTriangle, ArrowLeft, Briefcase, Clock, GraduationCap, DollarSign, Globe, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JobDetailViewProps {
    item: any;
    onBack: () => void;
}

const JobDetailView: React.FC<JobDetailViewProps> = ({ item, onBack }) => {
    const image = item.featured_image ? (item.featured_image.startsWith('http') ? item.featured_image : `https://raymondred.thesyndicates.team/${item.featured_image}`) : item.image || '';
    const city = item.location || item.city || 'Senegal';
    const priceStr = item.price ? (item.price.toString().includes('CFA') ? item.price : `${Number(item.price).toLocaleString()} CFA`) : 'Salary on request';
    
    // safe fallbacks
    const meta = item.meta || { 
        jobType: 'Full-time', 
        experienceLevel: 'Mid Senior', 
        employmentType: 'Permanent', 
        remote: 'Hybrid', 
        salaryRange: priceStr, 
        education: 'Bachelor Degree',
        industry: 'Technology',
        skills: ['Communication', 'Teamwork']
    };
    const seller = item.seller || { name: 'Verified Employer', since: 'Member since 2024', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop' };

    return (
        <div className="w-full py-8 animate-in fade-in duration-500">
            <button onClick={onBack} className="flex items-center gap-2 text-[#2A8E8E] font-semibold mb-8 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to listings</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Header Image */}
                    <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                        {image && <Image src={image} alt={item.title || "Job Image"} fill className="object-cover" />}
                    </div>

                    {/* Content Section */}
                    <Card className="rounded-2xl border-gray-100 shadow-sm p-6 lg:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-extrabold text-[#1B2232] mb-3 leading-tight">{item.title}</h1>
                                <div className="flex items-center gap-2 text-gray-400 text-[14px]">
                                    <MapPin className="w-4 h-4" />
                                    <span>{city}</span>
                                </div>
                            </div>
                            <span className="text-2xl lg:text-3xl font-bold text-[#F97316] whitespace-nowrap">{priceStr}</span>
                        </div>

                        {/* Job Parameters Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                                <Briefcase className="w-5 h-5 text-[#1D7E87]" />
                                <span className="text-[11px] font-bold text-gray-400 uppercase">Job Type</span>
                                <span className="text-[13px] font-bold text-gray-700">{meta.jobType}</span>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                                <Award className="w-5 h-5 text-[#1D7E87]" />
                                <span className="text-[11px] font-bold text-gray-400 uppercase">Experience</span>
                                <span className="text-[13px] font-bold text-gray-700">{meta.experienceLevel}</span>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                                <Clock className="w-5 h-5 text-[#1D7E87]" />
                                <span className="text-[11px] font-bold text-gray-400 uppercase">Employment</span>
                                <span className="text-[13px] font-bold text-gray-700">{meta.employmentType}</span>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                                <Globe className="w-5 h-5 text-[#1D7E87]" />
                                <span className="text-[11px] font-bold text-gray-400 uppercase">Remote</span>
                                <span className="text-[13px] font-bold text-gray-700">{meta.remote}</span>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                                <DollarSign className="w-5 h-5 text-[#1D7E87]" />
                                <span className="text-[11px] font-bold text-gray-400 uppercase">Salary Range</span>
                                <span className="text-[13px] font-bold text-gray-700">{meta.salaryRange}</span>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                                <GraduationCap className="w-5 h-5 text-[#1D7E87]" />
                                <span className="text-[11px] font-bold text-gray-400 uppercase">Education</span>
                                <span className="text-[13px] font-bold text-gray-700">{meta.education}</span>
                            </div>
                        </div>

                        {/* Industry & Skills */}
                        <div className="space-y-6 mb-10">
                            <div>
                                <h3 className="text-[16px] font-bold text-[#1B2232] mb-3">Industry</h3>
                                <Badge variant="secondary" className="px-4 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
                                    {meta.industry}
                                </Badge>
                            </div>
                            <div>
                                <h3 className="text-[16px] font-bold text-[#1B2232] mb-3">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {meta.skills.map((skill: string) => (
                                        <Badge key={skill} className="px-4 py-1.5 rounded-lg bg-[#EBF1FF] text-[#2563EB] hover:bg-[#E1E9FF] border-0">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-[#1B2232]">Description</h3>
                            <div className="text-gray-500 text-[15px] leading-relaxed">
                                {item.description}
                                <button className="ml-2 text-[#1D7E87] font-bold hover:underline">Read More</button>
                            </div>
                        </div>
                    </Card>

                    {/* Safety Tips Section */}
                    <Card className="rounded-2xl border-gray-100 bg-gray-50/50 p-6 lg:p-8">
                        <h3 className="text-xl font-bold text-[#1B2232] mb-8">Safety tips</h3>
                        <ul className="space-y-5">
                            {[
                                'Do not pay for any recruitment services.',
                                'Verify the company and the person you are communicating with.',
                                'Meeting for interviews should be in professional environments.',
                                'Do not provide sensitive personal information until an official offer is made.',
                                'Only accept offers after thorough verification.'
                            ].map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-4 text-gray-500 text-[14px]">
                                    <div className="w-2 h-2 rounded-full bg-[#2A8E8E] mt-1.5 shrink-0" />
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Sidebar Section */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="rounded-2xl border-gray-100 shadow-sm p-6 lg:p-8 sticky top-24">
                        <div className="flex items-center gap-5 mb-10">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
                                {seller.image && <Image src={seller.image} alt={seller.name} fill className="object-cover" />}
                            </div>
                            <div>
                                <h3 className="text-[18px] font-extrabold text-[#1B2232]">{seller.name}</h3>
                                <p className="text-gray-400 text-[13px]">{seller.since}</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <h4 className="text-[16px] font-bold text-[#1B2232]">Contact the employer</h4>
                            <div className="flex items-center gap-4 bg-[#EBF1FF] rounded-2xl p-4 text-[#2563EB] border border-[#2563EB]/10 transition-colors hover:bg-[#E1E9FF]">
                                <Phone className="w-5 h-5" />
                                <span className="font-extrabold text-[16px]">544 *******</span>
                            </div>
                            <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-[#10B981]/20 transition-all hover:scale-[1.02]">
                                <MessageCircle className="w-6 h-6" />
                                <span className="text-[16px]">WhatsApp</span>
                            </Button>
                            <button className="w-full flex items-center justify-center gap-3 text-white bg-[#1B2232] hover:bg-black font-bold h-14 rounded-2xl transition-all shadow-lg hover:scale-[1.02]">
                                <AlertTriangle className="w-5 h-5 text-orange-400" />
                                <span className="text-[16px]">Report this Job</span>
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default JobDetailView;
