"use client";

import { useState } from "react";
import MapView from "./Mapview";
import SearchComponent from "@/components/ui/SearchComponent";
import { Divider } from "@/app/component/divider";
import { HeadlineXL, Body1 } from "@/app/component/typography";
import { defaultSearchFilters } from "@/constants/searchDefaults";
import { Pin } from '@/types/pin';

export default function MapPageClient() {
  const [filters, setFilters] = useState(defaultSearchFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultSearchFilters);
  const [pins, setPins] = useState<Pin[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="h-full">
      <main className="p-2 space-y-6">
        <HeadlineXL>Member Demographics Map</HeadlineXL>
        <Body1>
          Our interactive map displays Chingu members around the world. Each
          marker represents a member, and you can click on it to see details
          such as role, tier, and timezone. Use the filters to narrow down by
          attributes like country, role type, or gender. The map makes it easy
          to spot global trends and explore the diverse Chingu community
          visually.
        </Body1>
        {/* Search Filters */}
        <Divider />
        <SearchComponent
          filters={filters}
          setFilters={setFilters}
          onSearch={(searchFilters = filters) => {
            setAppliedFilters(searchFilters);
          }}
          results={pins}
          isLoading={isLoading}
        />
        <Divider />
        {/* Map */}
        <div className="h-[80vh]">
          <MapView
            filters={appliedFilters}
            setPins={setPins}
            setIsLoading={setIsLoading}
          />
        </div>
      </main>
    </div>
  );
}
