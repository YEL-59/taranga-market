"use client";

import React from "react";
import { Rocket, Zap, Clock, Shield, Check, Loader2 } from "lucide-react";
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
import { useBoostPlans } from "@/hooks/useBoostPlans";

export default function BoostingPage() {
  const { boostPlans, isLoading, error } = useBoostPlans();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-[#1b7d81] mb-4" />
        <p className="text-slate-500 font-medium font-[Inter]">
          Loading boost plans...
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
    <div className="space-y-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#1b7d81] uppercase tracking-[0.3em] mb-1">
          <Zap className="w-4 h-4" />
          <span>Premium Service</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
          Boost Your Listing
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl font-medium">
          Get more visibility, leads, and faster sales by placing your listings
          in front of more potential buyers.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {boostPlans.map((plan, index) => (
          <Card
            key={plan.id}
            className="relative overflow-hidden border-slate-100 hover:border-[#1b7d81]/30 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(27,125,129,0.08)] rounded-[32px] group"
          >
            {/* Decorative Background Icon */}
            <Rocket className="absolute -right-8 -bottom-8 w-40 h-40 text-[#1b7d81]/5 rotate-[-15deg] group-hover:scale-110 group-hover:rotate-0 transition-all duration-700" />

            <CardHeader className="p-8 pb-4">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 rounded-2xl bg-[#1b7d81]/5 text-[#1b7d81]">
                  <Rocket className="w-7 h-7" />
                </div>
                {index === 1 && (
                  <Badge className="bg-[#4f6eed] text-white rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest border-0">
                    Best Value
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
                {plan.name}
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">
                Maximize your reach with ours {plan.duration_days}-day premium
                boost package.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8 pt-0 space-y-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">
                  {parseFloat(plan.price) === 0 ? "FREE" : `${plan.price} CFA`}
                </span>
                {parseFloat(plan.price) > 0 && (
                  <span className="text-slate-400 font-bold text-sm uppercase">
                    /pkg
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    {plan.duration_days} Days Total Duration
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    {plan.homepage_priority_hours} Hours Homepage Priority
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    Premium Badge Included
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    Smart Listing Sorting
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-8 pt-0">
              <Button className="w-full h-14 rounded-2xl bg-[#1b7d81] hover:bg-[#16666a] text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-[#1b7d81]/20 group-hover:translate-y-[-2px] transition-all active:scale-[0.98]">
                Select Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 flex gap-6">
          <div className="w-12 h-12 rounded-2xl bg-[#1b7d81]/10 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-[#1b7d81]" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-lg mb-2">
              Duration & Validity
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Selected boost plans start immediately upon activation and stay
              active for the total duration specified in the plan.
            </p>
          </div>
        </div>
        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 flex gap-6">
          <div className="w-12 h-12 rounded-2xl bg-[#4f6eed]/10 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-[#4f6eed]" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-lg mb-2">
              Secure Activation
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Your listing's performance is monitored in real-time. If it
              doesn't get views, we re-prioritize it within its duration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
