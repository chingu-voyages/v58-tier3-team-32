"use client";

import React, { useState, useEffect, useRef } from "react";
import ChevronDown from "@/app/design-system/components/icons/ChevronDown";
import { Button } from "./button";
import { Label } from "@/app/component/typography";
import { SearchFilters, SearchFilterLabel } from "@/types/searchFilter";
import { defaultSearchFilters } from "@/constants/searchDefaults";
import {
  genderOptions,
  countryOptions,
  yearJoinedOptions,
  roleOptions,
  roleTypeOptions,
  soloProjectTierOptions,
  voyageTierOptions,
  voyageNoOptions,
} from "@/constants/options";
import NoResultsModal from "./NoResultsModal";

export type SearchProps = {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onSearch: (filters?: SearchFilters) => void;
  results?: unknown[]; // to accept Pin and MemberWithCountryName for now
  isLoading?: boolean;
};

const labelToKeyMap: Record<SearchFilterLabel, keyof SearchFilters> = {
  Gender: "gender",
  Country: "country",
  "Year Joined": "yearJoined",
  Role: "role",
  "Role Type": "roleType",
  "Solo Project Tier": "soloProjectTier",
  "Voyage Tier": "voyageTier",
  "Voyage #": "voyageNo",
};

export default function SearchComponent({
  filters,
  setFilters,
  onSearch,
  results,
  isLoading,
}: SearchProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [searchKeyBuffer, setSearchKeyBuffer] = useState("");
  const bufferTimeout = useRef<NodeJS.Timeout | null>(null);
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null);

  const options = {
    Gender: genderOptions,
    Country: countryOptions,
    "Year Joined": yearJoinedOptions,
    Role: roleOptions,
    "Role Type": roleTypeOptions,
    "Solo Project Tier": soloProjectTierOptions,
    "Voyage Tier": voyageTierOptions,
    "Voyage #": voyageNoOptions,
  } as const;

  const handleSelect = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
    setOpenDropdown(null);
  };

  const handleClear = () => {
    setFilters({ ...defaultSearchFilters });
    setSearchInitiated(true);
    setShowNoResults(false);
    onSearch({ ...defaultSearchFilters });
  };

  const handleSearchClick = () => {
    setSearchInitiated(true);
    setShowNoResults(false);
    onSearch();
  };

  const handleTypeSearch = (
    e: React.KeyboardEvent<HTMLDivElement>,
    label: keyof typeof options
  ) => {
    const list = options[label];

    const char = e.key.toLowerCase();

    if (!/^[a-z0-9]$/i.test(char)) return;

    if (bufferTimeout.current) clearTimeout(bufferTimeout.current);
    bufferTimeout.current = setTimeout(() => setSearchKeyBuffer(""), 500);

    const newBuffer = searchKeyBuffer + char;
    setSearchKeyBuffer(newBuffer);

    const match = list.find((opt) =>
      opt.label.toLowerCase().startsWith(newBuffer)
    );

    if (!match) return;
    setHighlightedValue(match.value);

    const element = document.getElementById(`opt-${label}-${match.value}`);
    if (element) element.scrollIntoView({ block: "nearest" });
  };

  useEffect(() => {
    if (searchInitiated && !isLoading && results && results.length === 0) {
      setShowNoResults(true);
    } else {
      setShowNoResults(false);
    }
  }, [results, isLoading, searchInitiated]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
        setShowNoResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (openDropdown && dropdownRef.current) {
      dropdownRef.current.focus();
    }
  }, [openDropdown]);

  return (
    <div className="w-full relative" ref={containerRef}>
      <NoResultsModal
        visible={showNoResults}
        onClose={() => setShowNoResults(false)}
      />
      <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center relative ">
        {Object.keys(options).map((label) => {
          const typedLabel = label as keyof typeof options;
          const key = labelToKeyMap[typedLabel];
          const selectedLabel =
            filters[key] != null
              ? options[typedLabel].find((opt) => opt.value === filters[key])
                  ?.label ?? ""
              : "";

          return (
            <div key={label} className="relative">
              {/* Dropdown Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(
                    openDropdown === typedLabel ? null : typedLabel
                  );
                }}
                className="flex items-center gap-1 text-gray-700 hover:text-black"
              >
                <Label>
                  <span>{typedLabel}</span>
                  {selectedLabel && (
                    <span className="block">({selectedLabel})</span>
                  )}
                </Label>
                <ChevronDown />
              </button>

              {openDropdown === typedLabel && (
                <div
                  ref={dropdownRef}
                  tabIndex={0}
                  onKeyDown={(e) => handleTypeSearch(e, typedLabel)}
                  className="absolute top-full left-0 bg-white shadow-md border rounded-md p-2 z-50 min-w-[150px] max-h-60 overflow-auto"
                >
                  {options[typedLabel].map((opt) => (
                    <div
                      id={`opt-${typedLabel}-${opt.value}`}
                      key={opt.value}
                      className={`p-2 cursor-pointer rounded hover:bg-gray-100 ${
                        filters[key] === opt.value ? "bg-gray-200" : ""
                      }${highlightedValue === opt.value ? "bg-[#D5F7BC]" : ""}`}
                      onClick={() => handleSelect(key, opt.value)}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Centered Buttons Row */}
      <div className="w-full flex justify-around md:justify-center md:gap-40 mt-8">
        <Button size="lg" variant="secondary" onClick={handleClear}>
          Clear
        </Button>
        <Button size="lg" onClick={handleSearchClick}>
          Search
        </Button>
      </div>
    </div>
  );
}
