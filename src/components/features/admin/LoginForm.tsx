"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setPending(false);
    if (!response.ok) {
      setError("Password did not match.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-5 rounded-[28px] border border-line bg-bg-elevated p-8">
      <p className="mono text-xs uppercase tracking-[0.24em] text-accent">Studio access</p>
      <h1 className="display text-4xl font-extrabold">Admin</h1>
      <p className="text-sm text-muted">Update photo, resume, and profile copy for the live site.</p>
      <label className="block">
        <span className="mono text-[11px] uppercase tracking-[0.2em] text-muted">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
          required
        />
      </label>
      {error ? <p className="text-sm text-heat">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#f2efe8] py-3 font-semibold text-[#0c0d0f] disabled:opacity-60"
      >
        {pending ? "Checking..." : "Enter studio"}
      </button>
    </form>
  );
}
