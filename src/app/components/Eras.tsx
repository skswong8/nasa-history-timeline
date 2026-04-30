'use client';

import { TimelineEra } from '@/types/timeline';

interface ErasProp {
	eras: TimelineEra[]
	setSelectedEra: (value: string) => void
}

/**
 * Renders the era navigation buttons.
 * @param eras Array of timeline eras.
 * @param setSelectedEra State setter to update the currently selected era.
 * @returns A list of era buttons.
 */
export default function Eras( { eras, setSelectedEra }: ErasProp ) {
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
					<ul>
					{ eras.map((era: TimelineEra, index: number) => (
						<button
							className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
							key={ index }
							onClick={ () => {
								setSelectedEra(era.title);
							} }
						>
							<span className="">{ era.title }</span>
						</button>
					)) }
				</ul>
			</div>
		</div>
	)
}
