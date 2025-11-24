"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { countryNames } from "@/data/countryNames";
import { countryCoordinates } from "@/data/countryCoords";


type BackendCountryGroup = {
countryCode: string;
_count: number;
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

export default function MapView() {
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

const [groupedCountries, setGroupedCountries] = useState<
{
countryCode: string;
country: string;
lat: number;
lng: number;
count: number;
}[]
>([]);

// Fetch backend aggregated data
useEffect(() => {
async function fetchMapData() {
try {
const res = await fetch("/api/members?map");
const json = await res.json();

const rawData = json.data as BackendCountryGroup[];

const mapped = rawData.map((entry) => {
const coords =
countryCoordinates[
  entry.countryCode as keyof typeof countryCoordinates
] ?? [0, 0];

return {
countryCode: entry.countryCode,
country: countryNames[entry.countryCode] ?? entry.countryCode,
lat: coords[0],
lng: coords[1],
count: entry._count,
};
});

setGroupedCountries(mapped);
} catch (err) {
console.error("Failed to fetch grouped members:", err);
}
}

fetchMapData();
}, []);

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
noWrap={true}
/>

{/* COUNTRY PIN MARKERS */}
{groupedCountries.map((c) => (
<Marker key={c.countryCode} position={[c.lat, c.lng]}>
<Popup>
  <strong>{c.country}</strong>
  <br />
  Members: {c.count}
</Popup>
</Marker>
))}
</MapContainer>
</div>
);
}
