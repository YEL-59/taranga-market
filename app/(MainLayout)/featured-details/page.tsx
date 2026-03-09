import FeaturedDetails from "@/features/home/featured/FeaturedDetails";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function FeaturedDetailsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-10 w-10 animate-spin text-[#2A8E8E]" />
            </div>
        }>
            <FeaturedDetails />
        </Suspense>
    );
}
