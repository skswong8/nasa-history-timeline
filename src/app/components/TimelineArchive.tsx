'use client'

import { useEffect, useState } from 'react'
import { fetchEra } from '../services/api'
import { TimelineItem, EraNavigation } from '@/types/timeline'
import TimelineGrid from './TimelineGrid'
import TimelineCarousel from './TimelineCarousel'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { DESKTOP_WIDTH } from '@/lib/constants'

interface ArchiveProps {
	timelineRef: React.RefObject<HTMLButtonElement | null>
	selectedEra: string
	setEraDescription: (value: string) => void
	setSelectedEra: (value: string) => void
	setCardCountLive: (value: string) => void
	setErasLive: (value: string) => void
	activeIndex: number
	setActiveIndex: (value: number) => void
	selectedSnap: number
	setSelectedSnap: (value: number) => void
	onEraChange: (index: number) => void
}

/**
 * Fetch items and render grid or carousel component.
 * @param timelineRef The timeline ref.
 * @param selectedEra Selected era.
 * @param setEraDescription State setter to update the era description.
 * @param setSelectedEra State setter to update the selected era.
 * @returns A list of timeline cards.
 */
export default function TimelineArchive({
	timelineRef,
	selectedEra,
	setEraDescription,
	setCardCountLive,
	setErasLive,
	...rest
}: ArchiveProps) {
	const [data, setData] = useState([])
	const [navigation, setNavigation] = useState<EraNavigation | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const seenYears = new Set<number>()
	const windowWidth = useWindowWidth()
	const isDesktop = windowWidth !== null && windowWidth >= DESKTOP_WIDTH

	/**
	 * Computes a flag for each timeline item indicating whether its year
	 * should be displayed, used to render a year label above the first
	 * card of each year group.
	 *
	 * @param data Array of timeline items.
	 * @returns A new array of timeline items extended with a `showYear` boolean,
	 * which is `true` only for the first item of each unique year.
	 */
	const items = data.map((item: TimelineItem) => {
		const showYear = !seenYears.has(item.year)
		seenYears.add(item.year)

		return {
			...item,
			showYear,
		}
	})

	useEffect(() => {
		fetchEra(selectedEra)
			.then((response) => {
				setData(response.items)
				setNavigation(response.navigation)
				setEraDescription(response.eraDescription)
				timelineRef.current?.scrollIntoView({ behavior: 'smooth' })
				setErasLive(
					`Now showing era ${selectedEra}. There are ${response.items.length} cards`,
				)
			})
			.catch((err) => {
				setError(err.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [
		selectedEra,
		setEraDescription,
		timelineRef,
		setCardCountLive,
		setErasLive,
	])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Something went wrong: {error}</div>

	return (
		<div>
			{isDesktop ? (
				<TimelineGrid items={items} navigation={navigation} {...rest} />
			) : (
				<TimelineCarousel
					items={items}
					navigation={navigation}
					setCardCountLive={setCardCountLive}
					{...rest}
				/>
			)}
		</div>
	)
}
