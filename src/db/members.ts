import { prisma } from "@/db";

export async function getMembers(
  page: number = 1,
  pageSize: number = 10,
  filterParams: Record<string, string | number | null | undefined> = {},
  voyageFilterParams: Record<string, string | null | undefined> = {},
  map: boolean = false
) {
  let voyages;
  if (
    voyageFilterParams.name !== undefined ||
    voyageFilterParams.tier !== undefined
  ) {
    voyages = { some: { ...voyageFilterParams } };
  }

  if (map) {
    return prisma.member.groupBy({
      where: { ...filterParams, voyages },
      by: "countryCode",
      _count: true,
    });
  }

  return prisma.member.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: { ...filterParams, voyages },
    include: {
      voyages: {
        omit: {
          id: true,
        },
      },
    },
  });
}
