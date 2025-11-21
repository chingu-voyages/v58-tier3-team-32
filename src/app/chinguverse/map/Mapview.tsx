"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

import { PageWrapper } from "@/app/component/layouts/PageWrapper";
import rawMembers from "@/data/members.json";
import { countryCoords } from "@/data/countryCoords";
import { MapMember, RawMember } from "@/types/membermodel";

type MapViewProps = {
  filters?: {
    gender?: string;
    country?: string;
    yearJoined?: string;
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
    const DUMMY_DATA = true; // switch to false when API is ready

    async function fetchMembers() {
      let rawData: RawMember[];

      if (DUMMY_DATA) {
        rawData = rawMembers as RawMember[];
        await new Promise((res) => setTimeout(res, 800));
      } else {
        const res = await fetch("/api/members");
        const data = await res.json();
        rawData = (data?.members ?? []) as RawMember[];
      }

      const mapped: MapMember[] = rawData.map((m, index) => {
        const coords = countryCoords[m["Country Code"]]; // remove when backend is live

        return {
          id: index + 1,
          name: m["Voyage Role"] || "Unknown",
          country: m["Country name (from Country)"],
          lat: coords?.latitude ?? 0,
          lng: coords?.longitude ?? 0,
          gender: m.Gender, // extra fields for filtering
          yearJoined: m.Timestamp.slice(0, 4),
        } as MapMember & { gender: string; yearJoined: string };
      });

      setMembers(mapped);
    }

    fetchMembers();
  }, []);

  // Apply filters whenever members or filters change
  useEffect(() => {
    const filtered = members.filter((m) => {
      if (filters.gender && m.gender !== filters.gender) return false;
      if (filters.country && m.country !== filters.country) return false;
      if (filters.yearJoined && m.yearJoined !== filters.yearJoined) return false;
      return true;
    });
    setFilteredMembers(filtered);
  }, [members, filters]);

  return (
    <PageWrapper>
      <div className="w-full h-[80vh]">
        <MapContainer center={[20, 0]} zoom={2} style={{ width: "100%", height: "100%" }}>
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
    </PageWrapper>
  );
}
