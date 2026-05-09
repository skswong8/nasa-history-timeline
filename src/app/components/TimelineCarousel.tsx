'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'
import { useEffect, useState, useCallback } from 'react'
import { TimelineItemWithYear, EraNavigation } from '@/types/timeline'
import TimelineCard from './TimelineCard'
import TimelineNavigationCards from './TimelineNavigationCards'

interface CarouselProps {
	items: TimelineItemWithYear[]
	navigation: EraNavigation | null
	setSelectedEra: (value: string) => void
	setCardCountLive: (value: string) => void
	activeIndex: number
	setActiveIndex: (value: number) => void
	selectedSnap: number
	setSelectedSnap: (value: number) => void
	onEraChange: (index: number) => void
}

/**
 * Renders the timeline carousel and navigation for mobile.
 *
 * @param items - The timeline items to display as carousel slides.
 * @param navigation - The previous and next era navigation data.
 * @param setSelectedEra - State setter to update the active era.
 * @param setCardCountLive - State setter to update the accessible live region with the current card count.
 * @returns A carousel of timeline cards with previous and next slide controls.
 */
export default function TimelineCarousel({
	items,
	navigation,
	setSelectedEra,
	setCardCountLive,
	...rest
}: CarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ containScroll: false })
	const [selectedSnap, setSelectedSnap] = useState(0)
	const [snapCount, setSnapCount] = useState(0)

	/**
	 * Sync selectedSnap and snapCount state with the current Embla scroll position.
	 * Also updates the accessible live region with the current card position.
	 */
	const updateScrollSnapState = useCallback(
		(api: EmblaCarouselType) => {
			const snap = api.selectedScrollSnap()
			const count = api.scrollSnapList().length - 1

			setSelectedSnap(snap)
			setSnapCount(count)
			setCardCountLive(
				`Showing card ${snap >= count ? snap : snap + 1} of ${count}`,
			)
		},
		[setCardCountLive],
	)

	/**
	 * Bind Embla scroll events on mount and when the API becomes available.
	 * Re-runs if emblaApi or updateScrollSnapState changes.
	 */
	useEffect(() => {
		if (!emblaApi) return

		setTimeout(() => updateScrollSnapState(emblaApi), 0)
		emblaApi.on('select', updateScrollSnapState)
		emblaApi.on('reInit', updateScrollSnapState)

		return () => {
			emblaApi.off('select', updateScrollSnapState)
			emblaApi.off('reInit', updateScrollSnapState)
		}
	}, [emblaApi, updateScrollSnapState])

	/**
	 * Reset the carousel to the first slide whenever the items list changes,
	 * i.e. when the user switches era.
	 */
	useEffect(() => {
		if (!emblaApi) return

		emblaApi.scrollTo(0, true)
	}, [emblaApi, items])

	const isFirst = selectedSnap === 0
	const isLast = selectedSnap >= snapCount
	const cardLabel = isLast
		? `${selectedSnap}/${snapCount}`
		: `${selectedSnap + 1}/${snapCount}`

	return (
		<div className="relative w-screen left-1/2 right-1/2 mx-[-50vw] overflow-hidden">
			<div className="absolute top-[calc(50%-40px)] left-4 z-[99]">
				<button
					className="cursor-pointer disabled:opacity-25"
					disabled={isFirst}
					onClick={() => emblaApi?.scrollPrev()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
						<path d="M13.7 8.3a1 1 0 0 0-1.4 0l-3 3a1 1 0 0 0 0 1.4l3 3a1 1 0 0 0 1.4-1.4L11.4 12l2.3-2.3a1 1 0 0 0 0-1.4z" />
					</svg>
					<span className="sr-only">Previous Card</span>
				</button>
			</div>

			<div ref={emblaRef} className="embla overflow-hidden">
				<div className="embla__container flex gap-8">
					{items.map((item, index) => (
						<TimelineCard key={index} era={item} showYear={item.showYear} />
					))}
					{navigation && (
						<div className="mt-[2.5rem]">
							<TimelineNavigationCards
								className="embla__slide"
								navigation={navigation}
								setSelectedEra={setSelectedEra}
								{...rest}
							/>
						</div>
					)}
				</div>

				<div className="flex justify-center mt-8">
					<span className="bg-gray-800 py-1 px-2 rounded-xl text-sm">
						{cardLabel}
					</span>
				</div>
			</div>

			<div className="absolute top-[calc(50%-40px)] right-4 z-[99]">
				<button
					className="cursor-pointer disabled:opacity-25"
					disabled={isLast}
					onClick={() => emblaApi?.scrollNext()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<g transform="rotate(180 12 12)">
							<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
							<path d="M13.7 8.3a1 1 0 0 0-1.4 0l-3 3a1 1 0 0 0 0 1.4l3 3a1 1 0 0 0 1.4-1.4L11.4 12l2.3-2.3a1 1 0 0 0 0-1.4z" />
						</g>
					</svg>
					<span className="sr-only">Next Card</span>
				</button>
			</div>
		</div>
	)
}
