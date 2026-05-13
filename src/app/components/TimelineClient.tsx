'use client'

import { useState, useRef } from 'react'
import { TimelineNavigation } from '@/types/timeline'
import TimelineErasMobile, { TimelineErasMobileRef } from './TimelineErasMobile'
import TimelineErasDesktop from './TimelineErasDesktop'
import TimelineArchive from './TimelineArchive'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { DESKTOP_WIDTH } from '@/lib/constants'

interface TimelineClientProps {
	eras: TimelineNavigation[]
}

/**
 * CSR entrypoint to set state and render components.
 * @param eras Array of timeline eras.
 * @returns Timeline markup.
 */
export default function TimelineClient({ eras }: TimelineClientProps) {
	const [selectedEra, setSelectedEra] = useState<string>(eras[0].title)
	const [eraDescription, setEraDescription] = useState<string>(
		eras[0].description,
	)
	const [erasLive, setErasLive] = useState('')
	const [cardCountLive, setCardCountLive] = useState('')
	const [selectedSnap, setSelectedSnap] = useState(0)
	const [activeIndex, setActiveIndex] = useState(0)
	const [progressWidth, setProgressWidth] = useState('0px')

	const timelineRef = useRef(null)
	const erasMobileRef = useRef<TimelineErasMobileRef>(null)
	const windowWidth = useWindowWidth()
	const isDesktop = windowWidth !== null && windowWidth >= DESKTOP_WIDTH

	return (
		<main id="main">
			<div
				className="timeline lg:container mx-auto p-4 mb-60"
				ref={timelineRef}
			>
				<div className="flex flex-col items-center gap-6 text-center mb-16">
					<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
						NASA History Timeline
					</h1>
					<p className="lg:mx-32">{eraDescription}</p>
				</div>
				{isDesktop ? (
					<TimelineErasDesktop
						eras={eras}
						selectedEra={selectedEra}
						setSelectedEra={setSelectedEra}
						selectedSnap={selectedSnap}
						activeIndex={activeIndex}
						setActiveIndex={setActiveIndex}
						progressWidth={progressWidth}
						setProgressWidth={setProgressWidth}
					/>
				) : (
					<TimelineErasMobile
						ref={erasMobileRef}
						eras={eras}
						selectedEra={selectedEra}
						setSelectedEra={setSelectedEra}
						selectedSnap={selectedSnap}
						setSelectedSnap={setSelectedSnap}
						activeIndex={activeIndex}
						setActiveIndex={setActiveIndex}
					/>
				)}

				<TimelineArchive
					timelineRef={timelineRef}
					selectedEra={selectedEra}
					setSelectedEra={setSelectedEra}
					setEraDescription={setEraDescription}
					setCardCountLive={setCardCountLive}
					setErasLive={setErasLive}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
					selectedSnap={selectedSnap}
					setSelectedSnap={setSelectedSnap}
					onEraChange={(index) => erasMobileRef.current?.scrollToThumb(index)}
				/>
			</div>
			<span aria-live="assertive" className="sr-only">
				{erasLive}
			</span>
			<span aria-live="assertive" className="sr-only">
				{cardCountLive}
			</span>
		</main>
	)
}
