"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Profile } from "@/types/profile";

export function AdminDashboard({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [form, setForm] = useState(profile);
  const [status, setStatus] = useState("");
  const [photoStamp, setPhotoStamp] = useState(Date.now());

  const skillText = useMemo(
    () =>
      form.skillGroups
        .map((group) => `${group.label}: ${group.items.join(", ")}`)
        .join("\n"),
    [form.skillGroups],
  );

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function parseSkills(value: string) {
    const skillGroups = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, rest = ""] = line.split(":");
        return {
          label: label.trim(),
          items: rest
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        };
      });
    update("skillGroups", skillGroups);
  }

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    setStatus("Saving...");
    const response = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(response.ok ? "Profile saved." : "Save failed.");
    if (response.ok) router.refresh();
  }

  async function upload(kind: "photo" | "resume", file?: File) {
    if (!file) return;
    setStatus(`Uploading ${kind}...`);
    const data = new FormData();
    data.set("kind", kind);
    data.set("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    if (!response.ok) {
      setStatus("Upload failed.");
      return;
    }
    const payload = (await response.json()) as Profile;
    setForm(payload);
    setPhotoStamp(Date.now());
    setStatus(`${kind} updated.`);
    router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mono text-xs uppercase tracking-[0.24em] text-accent">Control room</p>
          <h1 className="display mt-2 text-4xl font-extrabold">Edit studio</h1>
        </div>
        <div className="flex gap-3">
          <a href="/" className="rounded-full border border-line px-4 py-2 text-sm">
            View site
          </a>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-line px-4 py-2 text-sm"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <div className="overflow-hidden rounded-[24px] border border-line">
            <img
              src={`/api/media/photo?t=${photoStamp}`}
              alt="Current profile"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <label className="block rounded-2xl border border-dashed border-line p-4 text-sm">
            Replace photo
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="mt-3 block w-full text-xs"
              onChange={(event) => upload("photo", event.target.files?.[0])}
            />
          </label>
          <label className="block rounded-2xl border border-dashed border-line p-4 text-sm">
            Upload resume PDF
            <input
              type="file"
              accept="application/pdf"
              className="mt-3 block w-full text-xs"
              onChange={(event) => upload("resume", event.target.files?.[0])}
            />
          </label>
          <a href="/api/resume" className="block rounded-full bg-[#f2efe8] px-4 py-3 text-center text-sm font-semibold text-[#0c0d0f]">
            Download current resume
          </a>
        </aside>

        <form onSubmit={saveProfile} className="space-y-5 rounded-[28px] border border-line bg-bg-elevated p-6 md:p-8">
          <Field label="Display name" value={form.displayName} onChange={(value) => update("displayName", value)} />
          <Field label="Full name" value={form.fullName} onChange={(value) => update("fullName", value)} />
          <Field label="Headline" value={form.headline} onChange={(value) => update("headline", value)} />
          <Field label="Availability" value={form.availability} onChange={(value) => update("availability", value)} />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Email" value={form.email} onChange={(value) => update("email", value)} />
            <Field label="Phone" value={form.phone} onChange={(value) => update("phone", value)} />
            <Field label="Location" value={form.location} onChange={(value) => update("location", value)} />
            <Field label="GitHub username" value={form.githubUsername} onChange={(value) => update("githubUsername", value)} />
            <Field label="GitHub URL" value={form.github} onChange={(value) => update("github", value)} />
            <Field label="LinkedIn URL" value={form.linkedin} onChange={(value) => update("linkedin", value)} />
          </div>
          <label className="block">
            <span className="mono text-[11px] uppercase tracking-[0.2em] text-muted">About</span>
            <textarea
              value={form.about}
              onChange={(event) => update("about", event.target.value)}
              rows={6}
              className="mt-2 w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Skills (one group per line, Label: a, b, c)
            </span>
            <textarea
              defaultValue={skillText}
              onBlur={(event) => parseSkills(event.target.value)}
              rows={6}
              className="mt-2 w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mono text-[11px] uppercase tracking-[0.2em] text-muted">Resume source</span>
            <select
              value={form.resumeMode}
              onChange={(event) => update("resumeMode", event.target.value as Profile["resumeMode"])}
              className="mt-2 w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
            >
              <option value="generated">Interview-optimized generated PDF</option>
              <option value="uploaded">Uploaded PDF</option>
            </select>
          </label>
          <div className="flex items-center gap-4">
            <button type="submit" className="rounded-full bg-[#f2efe8] px-6 py-3 font-semibold text-[#0c0d0f]">
              Save profile
            </button>
            {status ? <p className="text-sm text-muted">{status}</p> : null}
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mono text-[11px] uppercase tracking-[0.2em] text-muted">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
      />
    </label>
  );
}
