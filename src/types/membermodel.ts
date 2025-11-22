// Raw JSON type
export type RawMember = {
  Timestamp: string;
  Gender: string;
  "Country Code": string;
  Timezone: string;
  Goal: string;
  "Goal-Other": string;
  Source: string;
  "Source-Other": string;
  "Country name (from Country)": string;
  "Solo Project Tier": string;
  "Role Type": string;
  "Voyage Role": string;
  "Voyage (from Voyage Signups)": string;
  "Voyage Tier": string;
};

// Map-ready type for Leaflet
export type MapMember = {
  id: number;
  name: string;
  country?: string;
  lat: number;
  lng: number;

  // Extra fields for filtering/search
  gender?: string;
  yearJoined?: string;
  // Add more fields here if needed in future (like roleType, goal, etc.)
};
