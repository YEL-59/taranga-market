"use client";

import React from 'react';
import Link from 'next/link';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function PaymentCancelPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-[40px] shadow-[0_25px_100px_-15px_rgba(0,0,0,0.08)] border border-slate-50 overflow-hidden text-center"
            >
                {/* Visual Header */}
                <div className="bg-slate-900 h-48 flex items-center justify-center relative">
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div 
                            animate={{ 
                                x: [-20, 20, -20],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"
                        />
                    </div>
                    
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative z-10 w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-red-500"
                    >
                        <XCircle className="w-14 h-14" strokeWidth={2.5} />
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-10 pt-12 space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-center mb-2">
                           <span className="bg-slate-100 text-slate-500 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] border-0">
                               Session Cancelled
                           </span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payment <span className="text-red-500">Cancelled</span></h1>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            We noticed you didn't complete your payment. No charges were made to your account. You can try again whenever you're ready.
                        </p>
                    </div>

                    <div className="space-y-3 pt-6">
                        <Link href="/dashboard/subscriptions" passHref>
                            <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-xs">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Try Again
                            </Button>
                        </Link>
                        <Link href="/help" passHref>
                            <Button variant="ghost" className="w-full h-12 rounded-xl text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest text-[10px]">
                                <HelpCircle className="w-4 h-4 mr-2" />
                                Need Help?
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
