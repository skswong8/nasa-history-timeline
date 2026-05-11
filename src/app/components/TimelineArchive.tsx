'use client'

import { useEffect, useState } from 'react'
import { fetchEra } from '../services/api'
import { EraNavigation } from '@/types/timeline'
import TimelineGrid from './TimelineGrid'
import TimelineCarousel from './TimelineCarousel'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { DESKTOP_WIDTH } from '@/lib/constants'
import { cardsWithYearFlag } from '@/utils/cardsWithYearFlag'

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
	const windowWidth = useWindowWidth()
	const isDesktop = windowWidth !== null && windowWidth >= DESKTOP_WIDTH

	const items = cardsWithYearFlag(data)

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
