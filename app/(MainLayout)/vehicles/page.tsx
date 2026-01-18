import Vehicle from "@/features/vehicles/Vehicle";
import { Suspense } from "react";

export default function VehiclesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Vehicle />
        </Suspense>
    );
}
