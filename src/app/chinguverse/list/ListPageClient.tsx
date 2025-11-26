"use client";
import { useRef } from "react";
import { HeadlineXL, Body1 } from "@/app/component/typography";
import { Divider } from "@/app/component/divider";
import ListTable from "./ListTable";
import { useMembers } from "./useMembers";

export default function ListPageClient() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { members, isLoading, loaderRef, error } = useMembers(scrollRef);

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
      <div className="h-36 flex items-center justify-center">
        <HeadlineXL>---Filters component placeholder---</HeadlineXL>
      </div>
      <Divider />
      <ListTable members={members} isLoading={isLoading} loaderRef={loaderRef} scrollRef={scrollRef} />
    </main>
  );
}
