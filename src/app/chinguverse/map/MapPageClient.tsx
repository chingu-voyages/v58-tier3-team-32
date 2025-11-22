"use client";

import { useState } from "react";
import MapView from "./Mapview";
import SearchComponent, {SearchFilters} from "@/components/ui/SearchComponent";
import { PageWrapper } from "@/app/component/layouts/PageWrapper";
import { Divider } from "@/app/component/divider";
import { HeadlineXL, Body1 } from "@/app/component/typography";

export default function MapPageClient() {
  const [filters, setFilters] = useState<SearchFilters>({
  gender: [],
  country: [],
  yearJoined: [],
  roleType: [],
  voyageRole: [],
  soloTier: [],
  voyageTier: [],
  voyageNo: [],
});


  return (
    <PageWrapper>
    <main className="p-2 space-y-6">
      <HeadlineXL>Member Demographics Map</HeadlineXL>
      <Body1>Our interactive map displays Chingu members around the world. Each marker represents a member, and you can click on it to see details such as role, tier, and timezone. Use the filters to narrow down by attributes like country, role type, or gender. The map makes it easy to spot global trends and explore the diverse Chingu community visually.</ Body1>

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
