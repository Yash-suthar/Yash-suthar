import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/features/admin/AdminDashboard";
import { GrainOverlay } from "@/components/common/GrainOverlay";
import { getProfile } from "@/services/profile";
import { isAdminSession } from "@/utils/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminSession())) {
    redirect("/admin/login");
  }

  const profile = await getProfile();

  return (
    <div className="relative min-h-dvh">
      <GrainOverlay />
      <AdminDashboard profile={profile} />
    </div>
  );
}
