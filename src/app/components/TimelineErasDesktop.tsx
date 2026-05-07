'use client';

import { TimelineEra } from '@/types/timeline';
import '@/styles/timeline-filters.scss';

interface ErasProp {
	eras: TimelineEra[]
	selectedEra: string
	setSelectedEra: (value: string) => void
}

/**
 * Renders the era navigation buttons.
 * @param eras Array of timeline eras.
 * @param setSelectedEra State setter to update the currently selected era.
 * @returns A list of era buttons.
 */
export default function TimelineErasDesktop( { eras, selectedEra, setSelectedEra }: ErasProp ) {

	return (
		<>
		<div>
			<div>
				<div>
					<button disabled>
						<span className="sr-only">
							Previous Era
						</span>
					</button>
				</div>
				<span className="sr-only">
					Filter Eras:
				</span>
				<ol className="flex flex-1 items-center justify-center gap-8 mb-8">
					{ eras.map((era: TimelineEra, index: number) => (
						<button
							className={ `cursor-pointer text-white border-2 bg-black hover:bg-gray-800 transition duration-250 px-4 py-2 rounded-3xl ${ selectedEra === era.title ? 'timeline-filter__item--active' : '' }` }
							data-era={ era.title }
							key={ index }
							onClick={ () => {
								setSelectedEra(era.title);
							} }
						>
							<span className="">{ era.title.replace(/-/g, " - ") }</span>
						</button>
					)) }
				</ol>
				<div>
					<button>
						<span className="sr-only">
							Next Era
						</span>
					</button>
				</div>
			</div>
		</div>
		</>
	)
}
