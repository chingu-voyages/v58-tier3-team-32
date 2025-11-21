"use client";

import { useState } from "react";
import MapView from "./Mapview";
import SearchComponent from "@/components/ui/SearchComponent";
import { PageWrapper } from "@/app/component/layouts/PageWrapper";
import { Divider } from "@/app/component/divider";

export default function MapPageClient() {
  const [filters, setFilters] = useState({
    gender: "",
    country: "",
    yearJoined: "",
    roleType: "",
    voyageRole:"",
    soloTier: "",
    voyageTier:"",
    voyageNo: ""
  });

  return (
    <PageWrapper>
    <main className="p-2 space-y-6">
      <h1 className="text-2xl font-bold mb-2">Chingu Map</h1>
      <p className="text-gray-600">Explore Chingus around the world.</p>

      {/* Search / Filters */}
     
      <Divider />
      <SearchComponent filters={filters} setFilters={setFilters} />
      <Divider />
      {/* Map */}
      <div className="h-[80vh]">
        <MapView filters={filters} />
      </div>
    </main>
    </PageWrapper>
  );
}
