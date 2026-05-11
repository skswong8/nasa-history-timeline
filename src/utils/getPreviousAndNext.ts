import { TimelineEras, EraNavigation } from "@/types/timeline"

/**
 * Get previous and next era navigation items.
 *
 * @param eras Full array of timeline eras.
 * @param currentEra The era string to navigate from e.g. "1958-1970".
 * @returns Previous and next era index, slugs and labels, null if at either boundary.
 */
export function getPreviousAndNext(
	eras: TimelineEras[],
	currentEra: string,
): EraNavigation {
	const currentIndex = eras.findIndex((era) => era.era === currentEra)

	const previous = eras[currentIndex - 1] ?? null
	const next = eras[currentIndex + 1] ?? null

	return {
		previous: previous?.era ?? null,
		previousLabel: previous?.era.replace(/-/g, ' - ') ?? null,
		next: next?.era ?? null,
		nextLabel: next?.era.replace(/-/g, ' - ') ?? null,
	}
}
