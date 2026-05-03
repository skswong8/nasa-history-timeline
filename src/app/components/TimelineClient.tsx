'use client';

import { useState, useEffect, useRef } from 'react';
import { TimelineEra } from '@/types/timeline';
import Eras from './Eras';
import TimelineGrid from './TimelineGrid';

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

	return (
		<main id="main">
			<div className="timeline container mx-auto p-4 mb-60" ref={ timelineRef }>
				<div className="flex flex-col items-center gap-6 text-center mb-16">
					<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">NASA History Timeline</h1>
					<p className="lg:mx-32">{ eraDescription }</p>
				</div>
				<Eras eras={ eras } selectedEra={ selectedEra } setSelectedEra={ setSelectedEra } />
				<TimelineGrid timelineRef={ timelineRef } selectedEra={ selectedEra } setSelectedEra={ setSelectedEra } setEraDescription={ setEraDescription } />
			</div>
		</main>
	)
}
