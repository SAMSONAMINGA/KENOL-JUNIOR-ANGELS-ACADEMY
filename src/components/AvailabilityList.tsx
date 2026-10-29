import { getAvailability, availText, type AvailStatus } from "@/lib/availability";
import { levelLabel, type LevelCode } from "@/lib/levels";

const PILL: Record<AvailStatus, { bg: string; fg: string }> = {
  OPEN: { bg: "#e3f1e3", fg: "#1f5a1f" },
  LIMITED: { bg: "#fbe9d0", fg: "#7a2e00" },
  FULL: { bg: "#eee3d3", fg: "#4a3636" },
};

/**
 * "PP1 ........ Places available" rows for the given grades.
 * The wording is always in the pill, so colour is never the only signal.
 * Renders nothing until staff have set availability at least once.
 */
export default async function AvailabilityList({
  codes,
  tone = "light",
  showUpdated = false,
}: {
  codes: LevelCode[];
  tone?: "light" | "dark";
  showUpdated?: boolean;
}) {
  const { byLevel, updatedAt } = await getAvailability();
  const items = codes.filter((c) => byLevel[c]);
  if (!updatedAt || items.length === 0) return null;

  const labelColor = tone === "dark" ? "#ffffff" : "#2a0d0d";
  const mutedColor = tone === "dark" ? "rgba(255,255,255,0.75)" : "#6b5a46";

  return (
    <div>
      <ul className="space-y-2">
        {items.map((code) => {
          const a = byLevel[code];
          const pill = PILL[a.status];
          return (
            <li key={code} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="font-semibold" style={{ color: labelColor }}>{levelLabel(code)}</span>
              <span className="text-right">
                <span className="rounded-full px-3 py-1 text-sm font-semibold" style={{ background: pill.bg, color: pill.fg }}>
                  {availText(a)}
                </span>
                {a.note && <span className="mt-1 block text-xs" style={{ color: mutedColor }}>{a.note}</span>}
              </span>
            </li>
          );
        })}
      </ul>
      {showUpdated && (
        <p className="mt-3 text-xs" style={{ color: mutedColor }}>
          Last updated{" "}
          {updatedAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Nairobi" })}
        </p>
      )}
    </div>
  );
}