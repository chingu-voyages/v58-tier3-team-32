"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { countryNames } from "@/data/countryNames";
import { countryCoordinates } from "@/data/countryCoords";
import { ApiMember, MapMember} from "@/types/membermodel";

type MapViewProps = {
  filters?: {
    gender?: string[];
    country?: string[];
    yearJoined?: string[];
    roleType?: string[];
    voyageRole?: string[];
    soloTier?: string[];
    voyageTier?: string[];
    voyageNo?: string[];
  };
};

type GroupedCountry = {
  country?: string;
  countryCode: string;
  lat: number;
  lng: number;
  count: number;
};


// Dynamic imports
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function MapView({ filters = {} }: MapViewProps) {
  const [members, setMembers] = useState<MapMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MapMember[]>([]);

  // Fix Leaflet default icons
  useEffect(() => {
    async function fixLeafletIcons() {
      const L = (await import("leaflet")).default;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      });
    }

    fixLeafletIcons();
  }, []);

// Fetch members from API (live Prisma data)
useEffect(() => {
  async function fetchMembers() {
    try {
      const res = await fetch("/api/members");
      const json = await res.json();

      // API returns { data: [...] }
      const rawData = json.data as ApiMember[];

      const mapped: MapMember[] = rawData.map((m) => {
   const coords = countryCoordinates[m.countryCode as keyof typeof countryCoordinates] ?? [0, 0];
  return {
    id: m.id,
    name: m.role
      ? m.role.replace(/([A-Z])/g, " $1").trim() // prettier role name
      : "Anonymous Member",
    country: countryNames[m.countryCode] ?? m.countryCode,
      lat: coords[0],
      lng: coords[1],
      gender: m.gender,
      yearJoined: String(m.yearJoined),
    };
  })
  .filter(Boolean) as MapMember[];


      setMembers(mapped);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  }

  fetchMembers();
}, []);


  // Apply filters whenever members or filters change
useEffect(() => {
  const filtered = members.filter((m) => {
    if (filters.gender && filters.gender.length > 0 && m.gender && !filters.gender.includes(m.gender)) return false;
    if (filters.country && filters.country.length > 0 && m.country && !filters.country.includes(m.country)) return false;
    if (filters.yearJoined && filters.yearJoined.length > 0 && m.yearJoined && !filters.yearJoined.includes(m.yearJoined)) return false;
    return true;
  });
  setFilteredMembers(filtered);
}, [members, filters]);

// --- NEW: Group members by country ---
  const groupedByCountry = Object.values(
  filteredMembers.reduce<Record<string, GroupedCountry>>((acc, member) => {
    const key = member.countryCode; // now typesafe

      if (!acc[key]) {
        acc[key] = {
          country: member.country,
          countryCode: member.countryCode,
          lat: member.lat,
          lng: member.lng,
          count: 0,
        };
      }

      acc[key].count += 1;
      return acc;
    }, {})
  );



  return (
    
      <div className="w-full h-[80vh] relative z-0">
        <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ width: "100%", height: "100%" }}
      className="z-0"
    >
      <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
            noWrap={true} // prevents repeating tiles
          />
{/* COUNTRY PIN MARKERS */}
{groupedByCountry.map((c) => (
  <Marker
    key={c.countryCode}
    position={[c.lat, c.lng]} 
  >
    <Popup>
      <strong>{c.country}</strong><br />
      Members: {c.count}
    </Popup>
  </Marker>
))}

      </MapContainer>
    </div>
  );
}