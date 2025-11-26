import { countryNames } from "@/data/countryNames";
import { Member } from "@/types/member";

export type MemberWithCountryName = Member & {
    countryName: string
}

export function getCountryName(code?: string) {
    if (!code) return "";
    return countryNames[code.toUpperCase()] || code;
}

export function formatMemberCountry(member: Member): MemberWithCountryName {
    return {
        ...member,
        countryName: getCountryName(member.countryCode),
    }
}