import Services from "@/features/services/Services";
import { Suspense } from "react";

export default function ServicesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Services />
        </Suspense>
    );
}
