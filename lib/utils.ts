// Tiny className combiner used by UI components. We keep it dependency-free
// (no clsx/tailwind-merge needed for our usage): filters falsy values and joins.
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
