// Builds a backend-ready query string from the current search filter options.

import { SearchFilters } from "../types/searchFilter";

// Map frontend filter keys to backend query parameter keys 
// (only for those that are using different names)
const filterKeyMap: Record<string, string> = {
    country: "countryCode",
    voyageNo: "voyage",
};
export function buildQueryString(filters: SearchFilters): string {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "") {
            const backendKey = filterKeyMap[key] || key;
            params.append(backendKey, value);
        }
    });

    const queryString = params.toString();
    return queryString ? `&${queryString}` : "";
}