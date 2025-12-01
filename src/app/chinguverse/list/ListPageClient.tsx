"use client";
import { useRef, useState } from "react";
import { HeadlineXL, Body1 } from "@/app/component/typography";
import { Divider } from "@/app/component/divider";
import ListTable from "./ListTable";
import { useMembers } from "./useMembers";
import SearchComponent from "@/components/ui/SearchComponent";
import { defaultSearchFilters } from "@/constants/searchDefaults";
import { SearchFilters } from "@/types/searchFilter";

export default function ListPageClient() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [filters, setFilters] = useState(defaultSearchFilters);
  const [appliedFilters, setAppliedFilters] = useState<SearchFilters | undefined>(undefined);
  const { members, isLoading, loaderRef, error } = useMembers(scrollRef, appliedFilters);
  if (error) {
    return <div>Error loading members: {error}</div>;
  }
  return (
    <main>
      <HeadlineXL className="mb-6">Chingu Member Directory</HeadlineXL>
      <Body1 className="mb-6">
        Browse Chingu members in a searchable list. Quickly filter by role,
        tier, country, or other attributes to explore patterns in the community.
        Each entry provides a quick summary of the member’s role, tier, and
        location. Perfect for analyzing member distribution across the globe.
      </Body1>
      <Divider />
      <SearchComponent
        filters={filters}
        setFilters={setFilters}
        onSearch={(searchFilters = filters) => {
          setAppliedFilters(searchFilters);
        }}
        results={members}
        isLoading={isLoading} />
      <Divider />
      <ListTable members={members} isLoading={isLoading} loaderRef={loaderRef} scrollRef={scrollRef} />
    </main>
  );
}
