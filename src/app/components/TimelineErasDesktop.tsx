'use client'

import { useRef, useEffect, useCallback } from 'react'
import { TimelineEra } from '@/types/timeline'
import '@/styles/timeline-filters.scss'

interface ErasProp {
	eras: TimelineEra[]
	selectedEra: string
	setSelectedEra: (value: string) => void
	selectedSnap: number
	activeIndex: number
	setActiveIndex: (value: number) => void
	progressWidth: string
	setProgressWidth: (value: string) => void
}

/**
 * Renders the era navigation buttons for desktop.
 * @param eras Array of timeline eras.
 * @param selectedEra Selected era.
 * @param setSelectedEra State setter to update the currently selected era.
 * @returns A list of era buttons.
 */
export default function TimelineErasDesktop({
	eras,
	selectedEra,
	setSelectedEra,
	activeIndex,
	setActiveIndex,
	progressWidth,
	setProgressWidth,
}: ErasProp) {
	const dotRefs = useRef<(HTMLDivElement | null)[]>([])

	/**
	 * Update progress width
	 */
	const updateProgressWidth = useCallback(() => {
		const firstDot = dotRefs.current[0]
		const activeDot = dotRefs.current[activeIndex]

		if (!firstDot || !activeDot) {
			setProgressWidth('0px')
			return
		}

		const activeRect = activeDot.getBoundingClientRect()

		// Width from left of screen to center of active dot
		const width = activeRect.left + activeRect.width / 2

		setProgressWidth(`${width}px`)
	}, [activeIndex, setProgressWidth])

	// Initial calculation + resize listener
	useEffect(() => {
		const timer = setTimeout(updateProgressWidth, 100)
		const handleResize = () => updateProgressWidth()

		window.addEventListener('resize', handleResize)
		return () => {
			clearTimeout(timer)
			window.removeEventListener('resize', handleResize)
		}
	}, [updateProgressWidth])

	// Recalculate when active index changes
	useEffect(() => {
		updateProgressWidth()
	}, [updateProgressWidth])

	return (
		<div>
			<div className="relative mb-8">
				<span className="sr-only">Filter Eras:</span>

				<ol className="flex flex-1 items-center justify-center gap-8 relative">
					{eras.map((era, index) => {
						const isActive = index === activeIndex

						return (
							<li key={index} className="flex flex-col items-center">
								<button
									className={`cursor-pointer text-white border-2 bg-black hover:bg-gray-800 transition duration-250 px-4 py-2 rounded-3xl ${selectedEra === era.title ? 'timeline-filter__item--active' : ''}`}
									onClick={() => {
										setSelectedEra(era.title)
										setActiveIndex(index)
									}}
								>
									<span>{era.title.replace(/-/g, ' - ')}</span>
								</button>

								<div
									ref={(el) => {
										dotRefs.current[index] = el
									}}
									onClick={() => setActiveIndex(index)}
									className={`mt-4 w-4 h-4 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center shadow-sm z-20 ${isActive ? 'bg-nasa-red' : 'bg-gray-600'}`}
								></div>
							</li>
						)
					})}
				</ol>

				<div className="relative w-screen left-1/2 right-1/2 mx-[-50vw] bg-nasa-blue h-[5px] top-[-11px]">
					<div
						className="relative top-0 left-0 h-full bg-nasa-red transition-all duration-700 ease-out flex items-center pr-2"
						style={{
							width: progressWidth,
						}}
					>
						<span className="text-4xl transition-transform duration-700 absolute right-[-14px] z-999 rotate-45">
							🚀
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
