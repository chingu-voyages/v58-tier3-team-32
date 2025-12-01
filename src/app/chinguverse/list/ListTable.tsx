"use client";
import { MemberWithCountryName } from "@/lib/country";
import {
  genderOptions,
  roleOptions,
  roleTypeOptions,
} from "@/constants/options";
import { getLabelByValue } from "@/lib/formatLabels";

type MemberProps = {
  members: MemberWithCountryName[];
  isLoading: boolean;
  loaderRef: React.RefObject<HTMLDivElement | null>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
};

export default function ListTable({
  members,
  isLoading,
  loaderRef,
  scrollRef,
}: MemberProps) {
  return (
    <section className="my-8">
      <div className="border-2 border-[var(--border)] rounded-lg overflow-hidden">
        <div ref={scrollRef} className="overflow-auto h-[60vh]">
          <table className="min-w-full table-fixed border-separate text-center" aria-busy={isLoading}>
            <caption className="sr-only">Members list</caption>
            <thead>
              <tr>
                {/* <th>Applied Date</th> */}
                <th scope="col" className="sticky top-0 z-10 bg-[var(--background)] border-b-2 border-[var(--border)] p-2">Gender</th>
                <th scope="col" className="sticky top-0 z-10 bg-[var(--background)] border-b-2 border-[var(--border)] p-2">Country</th>
                <th scope="col" className="sticky top-0 z-10 bg-[var(--background)] border-b-2 border-[var(--border)] p-2 whitespace-nowrap">Year Joined</th>
                <th scope="col" className="sticky top-0 z-10 bg-[var(--background)] border-b-2 border-[var(--border)] p-2 whitespace-nowrap">Role</th>
                <th scope="col" className="sticky top-0 z-10 bg-[var(--background)] border-b-2 border-[var(--border)] p-2 whitespace-nowrap">Role Type</th>
                <th scope="col" className="sticky top-0 z-10 bg-[var(--background)] border-b-2 border-[var(--border)] p-2 whitespace-nowrap">Solo Project Tier</th>
                <th scope="col" className="sticky top-0 z-10 bg-[var(--background)] border-b-2 border-[var(--border)] p-2 whitespace-nowrap">Voyage Tier</th>
                <th scope="col" className="sticky top-0 z-10 bg-[var(--background)] border-b-2 border-[var(--border)] p-2 whitespace-nowrap">Voyage #</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  {/* <td>{m.appliedDate}</td> */}
                  <td className="border-b border-[var(--border)] p-1">{getLabelByValue(genderOptions, m.gender)}</td>
                  <td className="border-b border-[var(--border)] p-1">{m.countryName}</td>
                  <td className="border-b border-[var(--border)] p-1">{m.yearJoined}</td>
                  <td className="border-b border-[var(--border)] p-1">{getLabelByValue(roleOptions, m.role) || "-"}</td>
                  <td className="border-b border-[var(--border)] p-1">{getLabelByValue(roleTypeOptions, m.roleType) || "-"}</td>
                  <td className="border-b border-[var(--border)] p-1">
                    {m.soloProjectTier === "None" || !m.soloProjectTier
                      ? "-"
                      : m.soloProjectTier}
                  </td>
                  <td className="border-b border-[var(--border)] p-1">
                    {Array.from(new Set(m.voyages.map((v) => v.tier)))
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </td>
                  <td className="border-b border-[var(--border)] p-1">
                    {Array.from(new Set(m.voyages.map((v) => v.name)))
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </td>
                </tr>
              ))}
              {isLoading && (
                <tr>
                  <td className="px-10 text-left" colSpan={8} aria-live="polite">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
          <div ref={loaderRef} data-loader className="h-8"></div>
        </div>
      </div>
    </section>
  );
}
