import { HeadlineXL, Subheading1, Body1 } from "@/app/component/typography";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Hero() {
  return (
    <section aria-label="Hero">
      <HeadlineXL className="my-6 text-center">
        Welcome to ChinguVerse
      </HeadlineXL>
      <Body1 className="mb-6 px-8 md:px-16 lg:px-20 text-justify">
        Explore where Chingu members live and discover insights about their
        roles, tiers, and skills. This interactive web application allows you to
        visualize the global Chingu community and quickly navigate to members
        based on role, tier, or location. Start exploring the map or browse the
        member list to learn more about your fellow Chingus!
      </Body1>
      <div className="mx-4 md:mx-8 relative h-[60vw] sm:h-[40vw] md:h-[30vw] my-4 border-2 border-[var(--border)]">
        <Image
          src="/images/hero.png"
          alt="ChinguVerse application screenshot"
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="100vw"
        />
      </div>
      <div className="flex justify-center gap-16 md:gap-32 lg:gap-48 my-8">
        <Button asChild variant="default">
          <Link href="/chinguverse/map" aria-label="Go to Map page">
            Map
          </Link>
        </Button>
        <Button asChild variant="default">
          <Link href="/chinguverse/list" aria-label="Go to List page">
            List
          </Link>
        </Button>
      </div>
      <Subheading1 className="mb-6 text-center">About Chingu</Subheading1>
      <Body1 className="text-justify px-8 md:px-16 lg:px-20 mb-4">
        <a
          className="link"
          href="https://www.chingu.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chingu
        </a>{" "}
        is a global community of developers, designers, and other tech
        enthusiasts who collaborate on real-world projects to build skills and
        experience. Members join voyages to work on projects together, learn new
        technologies, and gain experience with version control, team workflows,
        and modern web development stacks. This project — the Chingu Member
        Demographics Map — is designed to help the team explore and visualize
        the global Chingu community while practicing collaboration, coding, and
        design skills.
      </Body1>
    </section>
  );
}
