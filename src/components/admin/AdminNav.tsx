import Link from "next/link";

const LINKS = [
  { key: "admissions", href: "/admin/admissions", label: "Admissions" },
  { key: "availability", href: "/admin/availability", label: "Places available" },
  { key: "news", href: "/admin/news", label: "News & Events" },
  { key: "gallery", href: "/admin/gallery", label: "Gallery" },
];

export default function AdminNav({ active }: { active: string }) {
  return (
    <nav aria-label="Admin sections" className="mb-8 flex flex-wrap gap-2">
      {LINKS.map((l) => (
        <Link
          key={l.key}
          href={l.href}
          aria-current={active === l.key ? "page" : undefined}
          className="rounded-full border-2 px-4 py-2 text-sm font-semibold"
          style={
            active === l.key
              ? { background: "#6e0000", borderColor: "#6e0000", color: "#fff" }
              : { borderColor: "#6e0000", color: "#6e0000" }
          }
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}