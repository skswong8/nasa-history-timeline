'use client';

import { TimelineItemWithYear, EraNavigation } from '@/types/timeline';
import TimelineCard from './TimelineCard';
import TimelineNavigationCards from './TimelineNavigationCards';

interface GridProps {
	items: TimelineItemWithYear[]
	navigation: EraNavigation|null
	setSelectedEra: (value: string) => void
	activeIndex: number
	setActiveIndex: (value: number) => void
	selectedSnap: number
	setSelectedSnap: (value: number) => void
	onEraChange: (index: number) => void
}

/**
 * Renders the timeline grid and navigation for desktop.
 * @param items The items to show.
 * @param navigation The navigational data.
 * @param setSelectedEra State setter to update the selected era.
 * @returns A grid of timeline cards and navigation.
 */
export default function TimelineGrid( { items, navigation, ...rest }: GridProps ) {
	return (
		<>
			<div className="grid grid-cols-3 gap-x-8 gap-y-16 mb-16">
				{ items.map((item, index) => (
					<TimelineCard key={ index } era={ item } showYear={ item.showYear } />
				)) }
			</div>
			{ navigation && <div>
				<TimelineNavigationCards navigation={ navigation } { ...rest } />
			</div> }
		</>
	)
}

