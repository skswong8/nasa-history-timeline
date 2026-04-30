'use client';

import { useEffect, useState } from 'react';
import { fetchEra } from '../services/api';
import { TimelineItem } from '@/types/timeline';

interface ErasProp {
	selectedEra: string
	setEraDescription: (value: string) => void
}

/**
 * Renders the timeline cards.
 * @param selectedEra Selected era.
 * @param setEraDescription State setter to update the era description.
 * @returns A list of timeline cards.
 */
export default function ArchiveList( { selectedEra, setEraDescription }: ErasProp ) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchEra(selectedEra)
			.then((response) => {
				setData(response.items);
				setEraDescription(response.eraDescription);
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [setEraDescription, selectedEra]);

	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
				{ loading && <div>Loading...</div> }
				{ error && <div>Something went wrong: {error}</div> }
				{ !loading && !error &&
					<ul>
						{ data.map((era: TimelineItem, index: number) => (
							<li key={index}>{era.title}</li>
						)) }
					</ul>
				}
			</div>
		</div>
	)
}
