'use client';

import { useEffect, useState } from 'react';
import { fetchEra } from '../services/api';
import { TimelineItem, EraNavigation } from '@/types/timeline';
import TimelineCard from './TimelineCard';
import TimelineNavigationCards from './TimelineNavigationCards';

interface ErasProp {
	timelineRef: React.RefObject<HTMLButtonElement|null>
	selectedEra: string
	setEraDescription: (value: string) => void
	setSelectedEra: (value: string) => void
}

/**
 * Renders the timeline cards.
 * @param selectedEra Selected era.
 * @param setEraDescription State setter to update the era description.
 * @returns A list of timeline cards.
 */
export default function TimelineGrid( { timelineRef, selectedEra, setEraDescription, setSelectedEra }: ErasProp ) {
	const [data, setData] = useState([]);
	const [navigation, setNavigation] = useState<EraNavigation | null>(null)
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const seenYears = new Set<number>()

/**
 * Computes a flag for each timeline item indicating whether its year
 * should be displayed, used to render a year label above the first
 * card of each year group.
 *
 * @param data Array of timeline items.
 * @returns A new array of timeline items extended with a `showYear` boolean,
 * which is `true` only for the first item of each unique year.
 */
	const cardsWithYearFlag = data.map( ( item: TimelineItem ) => {
		const showYear = ! seenYears.has( item.year );
		seenYears.add( item.year );

		return {
			...item,
			showYear
		}
	})

	useEffect(() => {
		fetchEra(selectedEra)
			.then((response) => {
				setData(response.items);
				setNavigation(response.navigation);
				setEraDescription(response.eraDescription);
				timelineRef.current?.scrollIntoView({ behavior: 'smooth' });
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [selectedEra, setEraDescription, timelineRef]);

	return (
		<div>
				{ loading && <div>Loading...</div> }
				{ error && <div>Something went wrong: {error}</div> }
				{ !loading && !error &&
					<>
						<div className="grid grid-cols-3 gap-x-8 gap-y-16 mb-16">
							{ cardsWithYearFlag.map((item, index) => (
								<TimelineCard key={ index } era={ item } showYear={ item.showYear } />
							)) }
						</div>
						{ navigation && <TimelineNavigationCards navigation={ navigation } setSelectedEra={ setSelectedEra } /> }
					</>
				}
		</div>
	)
}
