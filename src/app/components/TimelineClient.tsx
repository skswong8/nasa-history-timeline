'use client';

import { useState } from 'react';
import { TimelineEra } from '@/types/timeline';
import Eras from './Eras';
import ArchiveList from './TimelineGrid';

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

	return (
		<main>
			<div className="container mx-auto p-4 mb-60">
				<div className="flex flex-col items-center gap-6 text-center mb-16">
					<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">NASA History Timeline</h1>
					<p className="lg:mx-32">{ eraDescription }</p>
				</div>
				<Eras eras={ eras } selectedEra={ selectedEra } setSelectedEra={ setSelectedEra } />
				<ArchiveList selectedEra={ selectedEra } setEraDescription={ setEraDescription } />
			</div>
		</main>
	)
}
