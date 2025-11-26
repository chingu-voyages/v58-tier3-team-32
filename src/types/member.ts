export type Gender = "MALE" | "FEMALE" | "PREFERNOTTOSAY" | "NONBINARY" | "TRANS"
export type MemberGoal =
  | "ACCELERATELEARNING"
  | "GAINEXPERIENCE"
  | "NETWORKWITHSHAREDGOALS"
  | "GETOUTOFTUTORIALPURGATORY"
  | "OTHER"
export type MemberSource =
  | "PERSONALNETWORK"
  | "GOOGLESEARCH"
  | "THEJOBHACKERS"
  | "FREECODECAMPFORUM"
  | "MEDIUM"
  | "DEVTO"
  | "YOUTUBE"
  | "LINKEDIN"
  | "TWITTER"
  | "SCRIMBA"
  | "FLUTTEREXPLAINED"
  | "DEV"
  | "OTHER"
export type MemberRole = "DEVELOPER" | "PRODUCTOWNER" | "SCRUMMASTER" | "UIUXDESIGNER" | "DATASCIENTIST"
export type MemberRoleType = "WEB" | "PYTHON"
export type SoloProjectTier = 1 | 2 | 3 | "None"
export type VoyageTier = "Tier 1" | "Tier 2" | "Tier 3"

export type Voyage = {
  name: string
  tier: VoyageTier
}


export type Member = {
  id: string
  yearJoined: 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025
  gender: Gender
  timezone: number
  countryCode: string
  goal?: MemberGoal
  source?: MemberSource
  soloProjectTier?: SoloProjectTier | null
  role?: MemberRole
  roleType?: MemberRoleType
  voyages: Voyage[]
  // timestamp?: Date | null
}
