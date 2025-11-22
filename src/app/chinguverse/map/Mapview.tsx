"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import rawMembers from "@/data/members.json";
import { countryCoords } from "@/data/countryCoords";
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

  // Fix Leaflet default icons on client
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

  // Fetch members (dummy or API)
  useEffect(() => {
    const DUMMY_DATA = false; // switch to false when API is ready

    async function fetchMembers() {
      let rawData: ApiMember[];

      if (DUMMY_DATA) {
        rawData = rawMembers as unknown as ApiMember[];

        await new Promise((res) => setTimeout(res, 800));
      } else {
        const res = await fetch("/api/members");
        const data = await res.json();
        rawData = (data?.members ?? []) as ApiMember[];
      }

      const mapped: MapMember[] = rawData.map((m) => {
  const coords = countryCoords[m.countryCode];

  return {
    id: m.id,
    name: m.role || "Unknown",
    country: m.countryCode,
    lat: coords?.latitude ?? 0,
    lng: coords?.longitude ?? 0,
    gender: m.gender,
    yearJoined: String(m.yearJoined),
  };
});


      setMembers(mapped);
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
          />

          {filteredMembers.map((m) => (
            <Marker key={m.id} position={[m.lat, m.lng]}>
              <Popup>
                <strong>{m.name}</strong> <br />
                {m.country} <br />
                {m.gender} <br />
                Joined: {m.yearJoined}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

  );
}
