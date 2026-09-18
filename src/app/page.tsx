import { AboutSection } from "@/components/features/about/AboutSection";
import { ExperienceSection } from "@/components/features/about/ExperienceSection";
import { ContactSection } from "@/components/features/contact/ContactSection";
import { HeroSection } from "@/components/features/hero/HeroSection";
import { SkillsMarquee } from "@/components/features/skills/SkillsMarquee";
import { WorkSection } from "@/components/features/work/WorkSection";
import { GrainOverlay } from "@/components/common/GrainOverlay";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { getProfile } from "@/services/profile";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await getProfile();

  return (
    <div id="top" className="relative z-10">
      <GrainOverlay />
      <SiteHeader />
      <main>
        <HeroSection profile={profile} />
        <SkillsMarquee profile={profile} />
        <AboutSection profile={profile} />
        <ExperienceSection profile={profile} />
        <WorkSection profile={profile} />
        <ContactSection profile={profile} />
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}
