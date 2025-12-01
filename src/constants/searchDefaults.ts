// Provides the default state for all search filter fields to initialise and clear filters.
import { SearchFilters } from "@/types/searchFilter";

export const defaultSearchFilters: SearchFilters = {
  gender: null,
  country: null,
  yearJoined: null,
  role: null,
  roleType: null,
  soloProjectTier: null,
  voyageTier: null,
  voyageNo: null,
};