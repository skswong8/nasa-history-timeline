'use client';

import { useState } from 'react';
import { TimelineEra } from '@/types/timeline';
import Eras from './Eras';
import ArchiveList from './ArchiveList';

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
			<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
				<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
					<h1>NASA History Timeline</h1>
					<p>{ eraDescription }</p>
				</div>
			</div>
			<Eras eras={ eras } setSelectedEra={ setSelectedEra } />
			<ArchiveList selectedEra={ selectedEra } setEraDescription={ setEraDescription } />
		</main>
	)
}
