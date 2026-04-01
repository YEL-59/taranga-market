"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-[40px] shadow-[0_25px_100px_-15px_rgba(27,125,129,0.15)] border border-slate-50 overflow-hidden text-center"
            >
                {/* Visual Header */}
                <div className="bg-[#1b7d81] h-48 flex items-center justify-center relative">
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -right-10 -bottom-10 w-40 h-40 bg-white rounded-full"
                        />
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.05, 0.15, 0.05]
                            }}
                            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                            className="absolute -left-10 -top-10 w-60 h-60 bg-white rounded-full"
                        />
                    </div>
                    
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative z-10 w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-[#1b7d81]"
                    >
                        <CheckCircle2 className="w-14 h-14" strokeWidth={2.5} />
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-10 pt-12 space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-center mb-2">
                           <span className="bg-[#1b7d81]/10 text-[#1b7d81] hover:bg-[#1b7d81]/15 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] border-0">
                               Transaction Approved
                           </span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payment <span className="text-[#1b7d81]">Successful!</span></h1>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Thank you for your purchase! Your subscription/boost is now active and your account has been updated successfully.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center text-center">
                            <Layers className="w-5 h-5 text-slate-400 mb-2" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                            <span className="text-xs font-bold text-slate-900 uppercase">Active</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center text-center">
                            <Sparkles className="w-5 h-5 text-amber-400 mb-2" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</span>
                            <span className="text-xs font-bold text-slate-900 uppercase">Premium</span>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <Link href="/dashboard" passHref>
                            <Button className="w-full h-14 rounded-2xl bg-[#1b7d81] hover:bg-[#16666a] text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-[#1b7d81]/20">
                                Go to Dashboard
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/" passHref>
                            <Button variant="ghost" className="w-full h-12 rounded-xl text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest text-[10px]">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
