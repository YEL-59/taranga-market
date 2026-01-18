import Phones from "@/features/phones/Phones";
import { Suspense } from "react";

export default function ProductsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Phones />
        </Suspense>
    );
}
