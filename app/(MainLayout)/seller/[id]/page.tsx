import { getSellerProfileService } from "@/services/listing";
import SellerDetails from "@/features/seller/SellerDetails";
import { notFound } from "next/navigation";

export default async function SellerPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const res = await getSellerProfileService(resolvedParams.id);

    if (!res.success || !res.data) {
        return notFound();
    }

    return (
        <div className="bg-[#FAFAFA] min-h-screen">
            <SellerDetails data={res.data} />
        </div>
    );
}
