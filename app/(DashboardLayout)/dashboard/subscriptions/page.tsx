"use client";

import React from "react";
import {
  Check,
  ShieldCheck,
  Zap,
  BarChart3,
  Infinity,
  Crown,
  BadgeCheck,
  Headphones,
  ArrowRight,
  Loader2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSubscriptionPlans } from "@/hooks/useSubscriptionPlans";
import { motion } from "framer-motion";

export default function SubscriptionsPage() {
  const { subscriptionPlans, isLoading, error } = useSubscriptionPlans();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-[#1b7d81] mb-4" />
        <p className="text-slate-500 font-medium font-[Inter]">
          Loading subscription plans...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] container mx-auto px-4">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center max-w-md border border-red-100 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-2">
            Error Loading Plans
          </h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl h-11 px-8 font-bold"
          >
            Retry Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge className="bg-[#1b7d81]/10 text-[#1b7d81] hover:bg-[#1b7d81]/15 rounded-full px-6 py-1.5 text-xs font-bold uppercase tracking-[0.2em] border-0">
          Pricing Plans
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          Choose the Perfect <span className="text-[#1b7d81]">Plan</span> for
          Your Growth
        </h1>
        <p className="text-slate-500 text-lg font-medium leading-relaxed">
          Scale your business with our tailored subscription tiers. From casual
          sellers to power merchants, we have the right features for you.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {subscriptionPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <Card
              className={`relative h-full flex flex-col overflow-hidden border-2 transition-all duration-300 ${
                index === 1
                  ? "border-[#1b7d81] shadow-[0_20px_50px_rgba(27,125,129,0.1)] ring-4 ring-[#1b7d81]/5"
                  : "border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md"
              } rounded-[40px]`}
            >
              {/* Popular Tag */}
              {index === 1 && (
                <div className="absolute top-0 right-12 translate-y-[-50%]">
                  <div className="bg-[#1b7d81] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 mt-12">
                    <Star className="w-3 h-3 fill-current" />
                    Recommended
                  </div>
                </div>
              )}

              <CardHeader className="p-10 pb-6 text-center">
                <CardTitle className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-tight">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  {plan.duration_days} Days Access
                </CardDescription>

                <div className="mt-8 flex items-baseline justify-center gap-1">
                  <span className="text-6xl font-bold text-slate-900 tracking-tighter">
                    {parseFloat(plan.price) === 0 ? "Free" : `$${plan.price}`}
                  </span>
                  {parseFloat(plan.price) > 0 && (
                    <span className="text-slate-400 font-bold text-lg uppercase">
                      /mo
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-10 pt-0 flex-1 space-y-8">
                <div className="h-px bg-slate-50 w-full"></div>

                <ul className="space-y-5">
                  <li className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-slate-600 font-bold flex items-center gap-2">
                      {plan.listing_limit === 0 ? (
                        <Infinity className="w-4 h-4 text-[#1b7d81]" />
                      ) : (
                        plan.listing_limit
                      )}
                      {plan.listing_limit === 0 ? "Unlimited" : ""} Listings
                    </span>
                  </li>
                  <li className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-slate-600 font-bold">
                      {plan.free_boosts_per_month} Free Boosts / Month
                    </span>
                  </li>

                  {plan.boost_discount_percent > 0 && (
                    <li className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-slate-900 font-extrabold">
                        {plan.boost_discount_percent}% Discount on All Boosts
                      </span>
                    </li>
                  )}

                  {plan.has_analytics && (
                    <li className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                        <BarChart3 className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                      <span className="text-slate-600 font-bold text-sm">
                        Advanced Performance Analytics
                      </span>
                    </li>
                  )}

                  {plan.has_verification_badge && (
                    <li className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                        <BadgeCheck className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                      <span className="text-slate-600 font-bold text-sm">
                        Verified Seller Badge
                      </span>
                    </li>
                  )}

                  {plan.has_priority_support && (
                    <li className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                        <Headphones className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                      <span className="text-slate-600 font-bold text-sm">
                        24/7 Priority VIP Support
                      </span>
                    </li>
                  )}
                </ul>
              </CardContent>

              <CardFooter className="p-10 pt-0">
                <Button
                  className={`w-full h-16 rounded-[24px] font-bold text-sm uppercase tracking-widest transition-all duration-300 ${
                    index === 1
                      ? "bg-[#1b7d81] hover:bg-[#16666a] text-white shadow-xl shadow-[#1b7d81]/25 hover:translate-y-[-2px]"
                      : "bg-slate-900 hover:bg-black text-white"
                  }`}
                >
                  {parseFloat(plan.price) === 0 ? "Get Started" : "Upgrade Now"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom Info Section */}
      <div className="max-w-5xl mx-auto pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="flex flex-col items-center text-center space-y-3 p-6">
          <div className="w-14 h-14 rounded-2xl bg-[#1b7d81]/5 flex items-center justify-center text-[#1b7d81]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
            Secure Payments
          </h4>
          <p className="text-slate-500 text-xs font-medium leading-relaxed">
            Top-tier encryption ensures your transaction is always private and
            protected.
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-3 p-6">
          <div className="w-14 h-14 rounded-2xl bg-[#4f6eed]/5 flex items-center justify-center text-[#4f6eed]">
            <Layers className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
            Flexible Tiers
          </h4>
          <p className="text-slate-500 text-xs font-medium leading-relaxed">
            Switch between plans anytime as your inventory or business needs
            change.
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-3 p-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Crown className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
            Elite Growth
          </h4>
          <p className="text-slate-500 text-xs font-medium leading-relaxed">
            Built-in tools to help power sellers dominate their local
            marketplace category.
          </p>
        </div>
      </div>
    </div>
  );
}

// Extra icons needed for bottom info
function Layers({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
