import Hero from "@/features/allitems/hero/Hero";
import Allitems from "@/features/allitems/allitemscard/Allitems";
import { Suspense } from "react";

export default function AllItemsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <Hero />
                <Allitems />
            </div>
        </Suspense>
    );
}
