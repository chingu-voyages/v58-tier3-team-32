"use client";

import { PageWrapper } from "../component/layouts/PageWrapper";
import ColorSample from "./components/ColorSample";
import { HeadlineXL, Subheading1, Subheading2, Headline, Body1, Body2, Caption, Label } from "../component/typography";
import { Button } from "@/components/ui/button";
import ChevronDown from "@/app/design-system/components/icons/ChevronDown";
import GitHub from "@/app/design-system/components/icons/GitHub";

export default function DesignSystemPage() {
  const colors = [
    { name: "Main", color: "#D5F7BC" },
    { name: "Border", color: "#54360F" },
    { name: "Background", color: "#FFFFFF" },
    { name: "Text", color: "#000000" },
  ];

  return (
    <PageWrapper>
      <main className="ds-container">
        <div className=" bg-gray-50 p-10">
          <Headline className="mb-6">Design Palette</Headline>
          <section>
            <Subheading2 className="mb-3 pb-3 border-b-2 border-neutral-400">
              These are the core brand colors used in Chinguverse for layout,
              borders, and text.
            </Subheading2>

            {/* Color Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {colors.map((c) => (
                <div
                  key={c.name}
                  className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-lg transition-all"
                >
                  <div
                    className="w-16 h-16 rounded-md mb-4 border"
                    style={{ backgroundColor: c.color }}
                  />
                  <Subheading1>{c.name}</Subheading1>
                  <p className="text-sm text-gray-600 mb-2">{c.color}</p>

                  <ColorSample color={`bg-[${c.color}]`} value={c.color} />
                </div>
              ))}
            </div>
          </section>
        </div>
        <section>
          <Subheading2 className="mb-3 pb-3 border-b-2 border-neutral-400">
            Typography
          </Subheading2>
          <div className="max-w-3xl flex flex-col gap-4">
            <HeadlineXL>Headline XL</HeadlineXL>
            <Headline>Headline</Headline>
            <Subheading1>Subheading 1</Subheading1>
            <Subheading2>Subheading 2</Subheading2>
            <Body1>
              Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Body1>
            <Body2>
              Body 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Body2>
            <Caption>Caption - Lorem ipsum dolor sit amet.</Caption>
            <Label>Label - Lorem ipsum dolor sit amet.</Label>
          </div>
        </section>
        <section>
          <Subheading2 className="mt-8 mb-3 pb-3 border-b-2 border-neutral-400">
            Components
          </Subheading2>
          <Body1 className="mb-3 font-bold">Button Variants</Body1>
          <div className="flex flex-wrap gap-4 mb-6">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
          <Body1 className="mb-3 font-bold">Button Size Variants</Body1>
          <div className="flex flex-wrap gap-4 mb-6">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
          <Body1 className="mb-3 font-bold">Link</Body1>
          <p>This is a sample of a link: <a href="#" className="link">Example Link</a></p>

          <Body1 className="mb-3 font-bold mt-6">Reusable Icons</Body1>
          <p className="inline-flex items-center gap-1"><ChevronDown size={16} />This is a size 16 icon</p><br />
          <p className="inline-flex items-center gap-1"><ChevronDown />This is a default icon (size 20)</p><br />
          <p className="inline-flex items-center gap-1"><ChevronDown size={24} />This is a size 24 icon</p><br />
          <p className="inline-flex items-center gap-1">
            <GitHub />
            This is a responsive GitHub icon
          </p>
        </section>
      </main>
    </PageWrapper>
  );
}
