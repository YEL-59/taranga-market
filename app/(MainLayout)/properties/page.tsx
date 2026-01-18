import Properties from "@/features/properties/Properties";
import { Suspense } from "react";

export default function PropertiesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Properties />
        </Suspense>
    );
}