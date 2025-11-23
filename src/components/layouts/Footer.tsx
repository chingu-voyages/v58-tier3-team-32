import Link from "next/link";
import { Body1 } from "@/app/component/typography";
import GitHub from "@/app/design-system/components/icons/GitHub";
import { teamMembers } from "@/data/teamMembers";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--primary)]">
      <div className="mx-auto px-4 sm:px-6 lg:px-24 py-6 flex flex-col gap-2 items-center text-center">
        <Body1>
          &copy; {new Date().getFullYear()} Chingu, Inc. This work is licensed
          under the GNU General Public License v3.0 or later.
        </Body1>
        <Body1>
          <span className="flex gap-2 items-center">
            <GitHub />
            <Link
              href="https://github.com/chingu-voyages/V58-tier3-team-32"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chingu V58 Team 32 GitHub Repository"
            >
              GitHub Project Repository
            </Link>
          </span>
        </Body1>
        <Body1>
          Team members:{" "}
          {teamMembers.map((member, index) => (
            <span key={index}>
              <Link
                href={member.href}
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {member.name}
              </Link>
              {index < teamMembers.length - 1 && ", "}
            </span>
          ))}
        </Body1>
      </div>
    </footer>
  );
}
