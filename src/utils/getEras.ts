import { TimelineData, TimelineNavigation } from '@/types/timeline'

/**
 * Return a simple array of eras to SSR.
 *
 * @param data Array of timeline eras to process.
 * @returns A new array of timeline eras with title and description.
 */
export function getEras(data: TimelineData): TimelineNavigation[] {
	return data.eras.map((era) => ({
		title: era.era,
		description: era.eraDescription,
	}))
}
