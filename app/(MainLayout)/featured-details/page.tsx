import FeaturedDetails from "@/features/home/featured/FeaturedDetails";
import { getFeaturedProductDetailsService } from "@/services/listing";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

interface PageProps {
    searchParams: Promise<{ id?: string }>;
}

export default async function FeaturedDetailsPage({ searchParams }: PageProps) {
    const { id } = await searchParams;
    
    // Fetch data on the server for immediate display
    let initialData = null;
    if (id) {
        const result = await getFeaturedProductDetailsService(id);
        if (result.success) {
            initialData = result.data;
        }
    }

    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-10 w-10 animate-spin text-[#2A8E8E]" />
            </div>
        }>
            <FeaturedDetails initialData={initialData} />
        </Suspense>
    );
}
