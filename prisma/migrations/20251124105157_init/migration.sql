-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'PREFERNOTTOSAY', 'NONBINARY', 'TRANS');

-- CreateEnum
CREATE TYPE "MemberGoal" AS ENUM ('ACCELERATELEARNING', 'GAINEXPERIENCE', 'NETWORKWITHSHAREDGOALS', 'GETOUTOFTUTORIALPURGATORY', 'OTHER');

-- CreateEnum
CREATE TYPE "MemberSource" AS ENUM ('PERSONALNETWORK', 'GOOGLESEARCH', 'THEJOBHACKERS', 'FREECODECAMPFORUM', 'MEDIUM', 'DEVTO', 'YOUTUBE', 'LINKEDIN', 'TWITTER', 'SCRIMBA', 'FLUTTEREXPLAINED', 'DEV', 'OTHER');

-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('DEVELOPER', 'PRODUCTOWNER', 'SCRUMMASTER', 'UIUXDESIGNER', 'DATASCIENTIST');

-- CreateEnum
CREATE TYPE "MemberRoleType" AS ENUM ('WEB', 'PYTHON');

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "yearJoined" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "timezone" DOUBLE PRECISION NOT NULL,
    "countryCode" TEXT NOT NULL,
    "goal" "MemberGoal",
    "source" "MemberSource",
    "soloProjectTier" INTEGER,
    "role" "MemberRole",
    "roleType" "MemberRoleType",

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voyage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tier" TEXT NOT NULL,

    CONSTRAINT "Voyage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemberToVoyage" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MemberToVoyage_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voyage_name_tier_key" ON "Voyage"("name", "tier");

-- CreateIndex
CREATE INDEX "_MemberToVoyage_B_index" ON "_MemberToVoyage"("B");

-- AddForeignKey
ALTER TABLE "_MemberToVoyage" ADD CONSTRAINT "_MemberToVoyage_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToVoyage" ADD CONSTRAINT "_MemberToVoyage_B_fkey" FOREIGN KEY ("B") REFERENCES "Voyage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
