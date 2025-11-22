"use client";

import React, { useState } from "react";
import ChevronDown from "@/app/design-system/components/icons/ChevronDown";
import { PageWrapper } from "@/app/component/layouts/PageWrapper";
import { Button } from "./button";
import { Label } from "@/app/component/typography";

export type SearchFilters = {
  gender: string[];
  country: string[];
  yearJoined: string[];
  roleType: string[];
  voyageRole: string[];
  soloTier: string[];
  voyageTier: string[];
  voyageNo: string[];
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
  "Role Type": "roleType",
  "Voyage Role": "voyageRole",
  "Solo Tier": "soloTier",
  "Voyage Tier": "voyageTier",
  "Voyage No": "voyageNo",
  } as const;

 const handleSelect = (label: keyof typeof labelToKeyMap, value: string) => {
  const key = labelToKeyMap[label];

  setFilters((prev) => {
    const prevArray = prev[key]; // now an array
    if (prevArray.includes(value)) {
      // remove if already selected
      return { ...prev, [key]: prevArray.filter((v) => v !== value) };
    } else {
      // add new value
      return { ...prev, [key]: [...prevArray, value] };
    }
  });

  setOpenDropdown(null); // close dropdown after selection
};


  const handleSearch = async () => {
  console.log("SEARCH TRIGGERED");
  console.table(filters);

  // TODO: Enable when backend API is ready
  // const query = new URLSearchParams(filters as any).toString();
  // const res = await fetch(`/api/members?${query}`);
  // const data = await res.json();
  // setTeamMembers(data);
};

  
const handleClear = () => {
   
    setFilters({
      gender: [],
      country: [],
      yearJoined: [],
      roleType: [],
      voyageRole: [],
      soloTier: [],
      voyageTier: [],
      voyageNo: [],
    });
  };


return (
<PageWrapper>
{/* Filters Row */}
<div className="w-full flex justify-center gap-8 mb-4 relative">
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
<Label>
    {label.toUpperCase()}:{" "}
    {filters[labelToKeyMap[label as keyof typeof labelToKeyMap]].length > 0
      ? `(${filters[labelToKeyMap[label as keyof typeof labelToKeyMap]].length})`
      : ""}
  </Label>
<ChevronDown className="w-4 h-4" />
</button>

{/* Dropdown with Checkboxes */}
{openDropdown === label && (
<div className="absolute top-8 left-0 bg-white shadow-md border rounded-md p-2 z-[9999] min-w-[150px]">
{options[typedLabel].map((option) => {
const key = labelToKeyMap[label as keyof typeof labelToKeyMap];
const isChecked = filters[key].includes(option);

return (
<label
  key={option}
  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded"
>
  <input
    type="checkbox"
    checked={isChecked}
    onChange={() =>
      handleSelect(
        label as keyof typeof labelToKeyMap,
        option
      )
    }
    className="w-4 h-4 cursor-pointer"
  />
  <span>{option}</span>
</label>
);
})}
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