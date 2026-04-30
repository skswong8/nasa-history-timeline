'use client';

import { useState } from 'react'
import { TimelineEra } from '@/types/timeline'
import Eras from './Eras'

interface TimelineClientProps {
	eras: string[]
	era: TimelineEra
}

export default function TimelineClient({ eras, era }: TimelineClientProps) {
	const [selectedEra, setSelectedEra] = useState<string>(eras[0]);

	return (
		<main>
			<Eras eras={ eras } />
		</main>
	)
}
