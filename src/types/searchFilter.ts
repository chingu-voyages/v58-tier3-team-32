// Type definitions for the search filters and filter labels

export type SearchFilters = {
  gender: string | null
  country: string | null
  yearJoined: string | null
  role: string | null
  roleType: string | null
  soloProjectTier: string | null
  voyageTier: string | null
  voyageNo: string | null
}

export type SearchFilterLabel =
  | "Gender"
  | "Country"
  | "Year Joined"
  | "Role"
  | "Role Type"
  | "Solo Project Tier"
  | "Voyage Tier"
  | "Voyage #";