"use client";

import React, { useState } from "react";
import ChevronDown from "./icons/ChevronDown";
import { PageWrapper } from "@/app/component/layouts/PageWrapper";
import { Button } from "./button";

export type SearchFilters = {
  gender: string;
  country: string;
  yearJoined: string;
  roleType: string;
  voyageRole: string;
  soloTier: string;
  voyageTier:string;
  voyageNo: string;
  
};

export type SearchProps = {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
};

export default function SearchComponent({ filters, setFilters }: SearchProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const options = {
    Gender: ["Male", "Female"],
    Country: ["USA", "Canada", "UK", "Nigeria"],
    "Year Joined": ["2020", "2021", "2022", "2023"],
    "Role Type": ["Web", "UI/UX", "Phython"],
    "Voyage Role": ["Scrum Master", "Developer", "Designer"],
    "Solo Tier": [],
    "Voyage Tier":["Tier 1", "Tier 2", "Tier 3"],
    "Voyage No": ["V56", "V57", "V58"],

  } as const;

  const labelToKeyMap = {
    Gender: "gender",
    Country: "country",
    "Year Joined": "yearJoined",
  } as const;

  const handleSelect = (label: keyof typeof labelToKeyMap, value: string) => {
    const key = labelToKeyMap[label];

    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    setOpenDropdown(null); // close menu
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
    // add your search logic here
  };

  const handleClear = () => {
    setFilters({
      gender: "",
      country: "",
      yearJoined: "",
      roleType: "",
      voyageRole: "",
      soloTier: "",
      voyageTier: "",
      voyageNo: "",
    });
  };


  return (
  <PageWrapper>
    {/* Filters Row */}
    <div className="w-full flex flex-wrap gap-10 mb-4 relative">
      {Object.keys(options).map((label) => {
        const typedLabel = label as keyof typeof options;

        return (
          <div key={label} className="relative">
            {/* Header Button */}
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === label ? null : label)
              }
              className="flex items-center gap-1 text-gray-700 hover:text-black"
            >
              <span>
                {label}:{" "}
                {filters[
                  labelToKeyMap[label as keyof typeof labelToKeyMap]
                ] || ""}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown */}
            {openDropdown === label && (
              <div className="absolute top-8 left-0 bg-white shadow-md border rounded-md p-2 z-[9999] min-w-[150px]">
                {options[typedLabel].map((option) => (
                  <div
                    key={option}
                    onClick={() =>
                      handleSelect(
                        label as keyof typeof labelToKeyMap,
                        option
                      )
                    }
                    className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* Centered Buttons Row */}
    <div className="w-full flex justify-center gap-50 mt-8">
      <Button size="lg" onClick={handleSearch}>Search</Button>

      <Button size="lg" variant="secondary" onClick={handleClear}>
        Clear
      </Button>
    </div>
  </PageWrapper>
);
}