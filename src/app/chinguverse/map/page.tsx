import MapPageClient from "./MapPageClient";
import { PageWrapper } from "@/app/component/layouts/PageWrapper";

export const metadata = {
  title: "Chingu Map",
  description: "See where Chingus are located around the world",
};

export default function MapPage() {
  return (
    <PageWrapper>
      <MapPageClient />
    </PageWrapper>
  );
}
