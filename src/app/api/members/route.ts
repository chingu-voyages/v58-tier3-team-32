import { getMembers } from "@/db/members";
import { NextRequest, NextResponse } from "next/server";

const nonNullableFields = ["gender", "countryCode", "yearJoined"];
const integerFields = ["yearJoined", "soloProjectTier"];
const minPageSize = 10;
const maxPageSize = 100;

export async function GET(request: NextRequest) {
  // Query Parameters (e.g. `/api/members?gender=Male`)
  const searchParams = request.nextUrl.searchParams;

  const map = searchParams.get("map") !== null;
  const page = parseInt(searchParams.get("page") ?? "1") || 1;
  let pageSize = parseInt(searchParams.get("pageSize") ?? "10") || 10;
  const gender = searchParams.get("gender")?.toUpperCase();
  const countryCode = searchParams.get("countryCode")?.toUpperCase();
  const yearJoined = searchParams.get("yearJoined");
  const roleType = searchParams.get("roleType")?.toUpperCase();
  const role = searchParams.get("role")?.toUpperCase();
  const soloProjectTier = searchParams.get("soloProjectTier");
  const voyageTier = searchParams.get("voyageTier") || undefined;
  const voyage = searchParams.get("voyage") || undefined;

  // Filter Query Parameters (Non-Voyage)
  const filterParams: Record<string, string | number | null | undefined> = {
    gender,
    countryCode,
    yearJoined,
    roleType,
    role,
    soloProjectTier,
  };
  for (const field in filterParams) {
    if (filterParams[field] === null) {
      // Set empty (null) fields to undefined to ignore filter
      filterParams[field] = undefined;
    } else if (filterParams[field] === "") {
      // Set empty string fields to null to look for null values
      filterParams[field] = null;
      if (nonNullableFields.includes(field)) {
        // Ignore field filter if field is non-nullable (instead of throwing error)
        filterParams[field] = undefined;
      }
    } else if (integerFields.includes(field)) {
      filterParams[field] = parseInt(filterParams[field] as string) ?? null;
    }
  }

  // Filter Query Parameters (Voyage)
  const voyageFilterParams = {
    name: voyage,
    tier: voyageTier,
  };

  // Adjust page size to between min and max
  if (pageSize > maxPageSize) {
    pageSize = maxPageSize;
  } else if (pageSize < minPageSize) {
    pageSize = minPageSize;
  }

  try {
    const members = await getMembers(
      page,
      pageSize,
      filterParams,
      voyageFilterParams,
      map
    );
    return NextResponse.json({
      data: members,
      filterParams: { ...filterParams, voyage, voyageTier },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
