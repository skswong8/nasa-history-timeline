'use client';

import { EraNavigation } from '@/types/timeline';

interface NavigationProps {
	navigation: EraNavigation
	setSelectedEra: (value: string) => void
}

/**
 * Renders the timeline navigation cards.
 * @param navigation The navigation data.
 * @param setSelectedEra State setter to update era.
 * @returns Previous and Next navigation cards.
 */
export default function TimelineNavigationCards( { navigation, setSelectedEra }: NavigationProps ) {
	const { previous, next, previousIndex, nextIndex, previousLabel, nextLabel } = navigation;

	const buttonClasses = 'relative flex justify-between items-center cursor-pointer text-lg text-white bg-black hover:bg-gray-950 p-4 rounded-xl border-1 w-full transition duration-250';

	return (
		<div className="grid grid-cols-3 justify-center gap-8">
			<button
				className={ `${ buttonClasses } ${ previous === null ? 'hidden' : '' }` }
				data-era={ previous }
				onClick={ () => {
					setSelectedEra(previous);
				} }
			>
				<span className="flex flex-col text-right">
					<span aria-hidden="true" className="timeline-card__label">
						Previous
					</span>
					<span className="sr-only">Previous Era</span>
					<span className="order-[-1]">
						{ typeof previousLabel !== 'undefined' && previousLabel !== null ? previousLabel : '' }
					</span>
				</span>
				<svg className="order-[-1] w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
			    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.293 1.707 1.707 7.293a1 1 0 0 0 0 1.414l5.586 5.586A1 1 0 0 0 9 13.586V2.414a1 1 0 0 0-1.707-.707Z"/>
				</svg>
			</button>
			<button
				className={ `${ buttonClasses } col-start-3 ${ next === null ? 'hidden' : '' }` }
				data-era={ next }
				onClick={ () => {
					setSelectedEra(next);
				} }
			>
				<span className="flex flex-col text-left">
					<span aria-hidden="true" className="timeline-card__label">
						Next
					</span>
					<span className="sr-only">Next Era</span>
					<span className="order-[-1]">
						{ typeof nextLabel !== 'undefined' && nextLabel !== null ? nextLabel : '' }
					</span>
				</span>
				<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
					<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z"/>
				</svg>
			</button>
		</div>
	);
};
