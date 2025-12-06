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
  const [appliedFilters, setAppliedFilters] = useState<
    SearchFilters | undefined
  >(undefined);
  const [sortOption, setSortoption] = useState("");
  const { members, isLoading, loaderRef, error } = useMembers(
    scrollRef,
    appliedFilters
  );

  if (error) {
    return <div>Error loading members: {error}</div>;
  }
  const sortedMembers = [...members];
  if (sortOption === "country-asc") {
    sortedMembers.sort((a, b) => a.countryName.localeCompare(b.countryName));
  }

  if (sortOption === "country-desc") {
    sortedMembers.sort((a, b) => b.countryName.localeCompare(a.countryName));
  }

  return (
    <main>
      <HeadlineXL className="my-4 text-center">
        Chingu Member Directory
      </HeadlineXL>
      <Body1 className="mb-6 text-justify px-8 md:px-12 lg:px-16">
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
        isLoading={isLoading}
      />

      <Divider />
      <div className="flex justify-end my-4">
        <select
          value={sortOption}
          onChange={(e) => setSortoption(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort Members By</option>
          <option value="country-asc">Country (A–Z)</option>
          <option value="country-desc">Country (Z–A)</option>
        </select>
      </div>
      <ListTable
        members={sortedMembers}
        isLoading={isLoading}
        loaderRef={loaderRef}
        scrollRef={scrollRef}
      />
    </main>
  );
}
