import { GrainOverlay } from "@/components/common/GrainOverlay";
import { LoginForm } from "@/components/features/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="grid-bg relative flex min-h-dvh items-center justify-center px-5">
      <GrainOverlay />
      <LoginForm />
    </div>
  );
}
