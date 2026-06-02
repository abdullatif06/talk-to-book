// TalkToBook landing — comparison table (vs Booking.com / HalalBooking).
// Visualizes the competitive edge from the blueprint's market analysis.
"use client";

import { useLanding } from "@/lib/i18n";
import { CheckIcon, CrossIcon } from "./Icons";

function Cell({ on }: { on: boolean }) {
  return on ? (
    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-price/12 text-price">
      <CheckIcon className="h-4 w-4" />
    </span>
  ) : (
    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-ink/5 text-ink-soft/50">
      <CrossIcon className="h-4 w-4" />
    </span>
  );
}

export default function Comparison() {
  const { copy } = useLanding();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-10 text-center font-display text-3xl text-ink">
          {copy.compareTitle}
        </h2>

        <div className="overflow-hidden rounded-2xl border border-line shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-panel text-ink">
                <th className="px-4 py-4 text-start font-semibold"> </th>
                <th className="px-3 py-4 text-center font-bold text-primary">
                  {copy.compareCols.us}
                </th>
                <th className="px-3 py-4 text-center font-medium text-ink-soft">
                  {copy.compareCols.booking}
                </th>
                <th className="px-3 py-4 text-center font-medium text-ink-soft">
                  {copy.compareCols.halalbooking}
                </th>
              </tr>
            </thead>
            <tbody>
              {copy.comparison.map((row, i) => (
                <tr key={i} className="border-t border-line">
                  <td className="px-4 py-3.5 text-start font-medium text-ink">
                    {row.feature}
                  </td>
                  <td className="bg-primary/[0.03] px-3 py-3.5">
                    <Cell on={row.us} />
                  </td>
                  <td className="px-3 py-3.5">
                    <Cell on={row.booking} />
                  </td>
                  <td className="px-3 py-3.5">
                    <Cell on={row.halalbooking} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
