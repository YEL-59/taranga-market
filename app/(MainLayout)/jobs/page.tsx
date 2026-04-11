import Jobs from "@/features/jobs/Jobs";
import { Suspense } from "react";

export default function JobsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Jobs />
        </Suspense>
    );
}
