import { TimelineItem, TimelineItemWithYear } from '@/types/timeline'

/**
 * Computes a flag for each timeline item indicating whether its year
 * should be displayed, used to render a year label above the first
 * card of each year group.
 *
 * @param items Array of timeline items to process.
 * @returns A new array of timeline items extended with a `showYear` boolean,
 * which is `true` only for the first item of each unique year.
 */
export function cardsWithYearFlag(
	items: TimelineItem[],
): TimelineItemWithYear[] {
	const seenYears = new Set<number>()

	return items.map((item) => {
		const showYear = !seenYears.has(item.year)
		seenYears.add(item.year)
		return { ...item, showYear }
	})
}
