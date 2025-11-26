import ListPageClient from "./ListPageClient";
import { PageWrapper } from "@/app/component/layouts/PageWrapper";

export const metadata = {
  title: "Chingu List",
  description: "See Chingu members data in a list format",
};

export default function ListPage() {
  return (
    <PageWrapper>
      <ListPageClient />
    </PageWrapper>
  );
}
