'use client';

import { useState, useRef } from 'react';
import { TimelineEra } from '@/types/timeline';
import TimelineErasMobile from './TimelineErasMobile';
import TimelineErasDesktop from './TimelineErasDesktop';
import TimelineArchive from './TimelineArchive';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { DESKTOP_WIDTH } from '@/lib/constants';

interface TimelineClientProps {
	eras: TimelineEra[]
}

/**
 * CSR entrypoint to set state and render components.
 * @param eras Array of timeline eras.
 * @returns Timeline markup.
 */
export default function TimelineClient({ eras }: TimelineClientProps) {
	const [selectedEra, setSelectedEra] = useState<string>(eras[0].title);
	const [eraDescription, setEraDescription] = useState<string>(eras[0].description);
	const timelineRef = useRef(null);
	const [erasLive, setErasLive] = useState('');
	const [cardCountLive, setCardCountLive] = useState('');
	const windowWidth = useWindowWidth();
	const isDesktop = windowWidth !== null && windowWidth >= DESKTOP_WIDTH;
	const [selectedSnap, setSelectedSnap] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);
	const [progressWidth, setProgressWidth] = useState('0px');

	return (
		<main id="main">
			<div className="timeline container mx-auto p-4 mb-60" ref={ timelineRef }>
				<div className="flex flex-col items-center gap-6 text-center mb-16">
					<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">NASA History Timeline</h1>
					<p className="lg:mx-32">{ eraDescription }</p>
				</div>
				{ isDesktop ?
					<TimelineErasDesktop eras={ eras } selectedEra={ selectedEra } setSelectedEra={ setSelectedEra } selectedSnap={ selectedSnap } activeIndex={ activeIndex } setActiveIndex={ setActiveIndex } progressWidth={ progressWidth } setProgressWidth={ setProgressWidth } />
				: <TimelineErasMobile eras={ eras } selectedEra={ selectedEra } setSelectedEra={ setSelectedEra } selectedSnap={ selectedSnap} setSelectedSnap={ setSelectedSnap } /> }

				<TimelineArchive timelineRef={ timelineRef } selectedEra={ selectedEra } setSelectedEra={ setSelectedEra } setEraDescription={ setEraDescription } setCardCountLive={ setCardCountLive } setErasLive={ setErasLive } activeIndex={ activeIndex } setActiveIndex={ setActiveIndex } />
			</div>
			<span aria-live="assertive" className="sr-only">{ erasLive }</span>
			<span aria-live="assertive" className="sr-only">{ cardCountLive }</span>
		</main>
	)
}
