// Provides option arrays (label-value pairs) for select inputs and filters.
// Includes: gender, country, year joined, role, role type, solo project tier, voyage tier, and voyage number.

import { countryNames } from "@/data/countryNames";

export const genderOptions = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Non-binary", value: "NONBINARY" },
    { label: "Trans", value: "TRANS" },
    { label: "Prefer not to say", value: "PREFERNOTTOSAY" },
];

// Country options sorted alphabetically by country name (not code)
export const countryOptions = Object.entries(countryNames).map(([code, name]) => ({
    label: name,
    value: code,
})).sort((a, b) => a.label.localeCompare(b.label));

// Years Joined (desc: current year -> 2019)
const currentYear = new Date().getFullYear();
export const yearJoinedOptions = Array.from({ length: currentYear - 2018 }, (_, i) => {
    const year = 2019 + i;
    return { label: String(year), value: String(year) };
}).reverse();

export const roleOptions = [
    { label: "Developer", value: "DEVELOPER" },
    { label: "Product Owner", value: "PRODUCTOWNER" },
    { label: "Scrum Master", value: "SCRUMMASTER" },
    { label: "UI/UX Designer", value: "UIUXDESIGNER" },
    { label: "Data Scientist", value: "DATASCIENTIST" },
];

export const roleTypeOptions = [
    { label: "Web", value: "WEB" },
    { label: "Python", value: "PYTHON" },
];

// to match style with API
export const soloProjectTierOptions = [
    { label: "Tier 1", value: "1" },
    { label: "Tier 2", value: "2" },
    { label: "Tier 3", value: "3" },
];

// to match style with API
export const voyageTierOptions = [
    { label: "Tier 1", value: "Tier 1" },
    { label: "Tier 2", value: "Tier 2" },
    { label: "Tier 3", value: "Tier 3" },
];

// Voyage numbers (desc: V58-V1)
export const voyageNoOptions = Array.from({ length: 58 }, (_, i) => {
    const num = i + 1;
    return { label: `V${num}`, value: `V${num}` };
}).reverse();
