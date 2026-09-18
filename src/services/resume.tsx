import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/components/features/resume/ResumeDocument";
import type { Profile } from "@/types/profile";

export async function renderResumePdf(profile: Profile) {
  return renderToBuffer(<ResumeDocument profile={profile} />);
}
