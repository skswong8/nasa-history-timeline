'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, forwardRef, useImperativeHandle } from 'react';
import { TimelineEra } from '@/types/timeline';
import '@/styles/timeline-filters.scss';

interface ErasProp {
	eras: TimelineEra[]
	selectedEra: string
	setSelectedEra: (value: string) => void
	selectedSnap: number
	setSelectedSnap: (value: number) => void
}

export interface TimelineErasMobileRef {
	scrollToThumb: (index: number) => void
}

/**
 * Renders the era navigation buttons for mobile.
 * @param eras Array of timeline eras.
 * @param selectedEra Selected era.
 * @param setSelectedEra State setter to update the currently selected era.
 * @returns A list of era buttons.
 */
const TimelineErasMobile = forwardRef<TimelineErasMobileRef, ErasProp>(({ eras, selectedEra, selectedSnap, setSelectedSnap, setSelectedEra }, ref) => {
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: false,
		watchDrag: false,
	});

	const snapCount = eras.length - 1;

	const onThumbClick = useCallback((index: number) => {
		if (!emblaThumbsApi) return;
		emblaThumbsApi.scrollTo(index);
	}, [emblaThumbsApi]);

	useImperativeHandle(ref, () => ({
		scrollToThumb: (index: number) => {
			emblaThumbsApi?.scrollTo(index);
		}
	}), [emblaThumbsApi]);

	return (
		<div>
			<div className="flex relative">
				<div className="absolute left-[-2rem] top-[-5px] z-99 w-[80px] h-[50px] flex align-center justify-center bg-[linear-gradient(to_left,rgba(10,10,10,0)_0%,rgba(10,10,10,1)_50%)]">
					<button
						className="cursor-pointer disabled:opacity-25"
						disabled={ selectedSnap + 1 <= 1 }
						onClick={() => {
							const prevIndex = selectedSnap - 1;
							const prevEra = eras[prevIndex]?.title;
							if ( ! prevEra ) return;
							setSelectedSnap( prevIndex );
							setSelectedEra( prevEra );
							onThumbClick( prevIndex );
						}}
					>
						<svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" fill="white">
							<path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero"/>
						</svg>
						<span className="sr-only">Previous Era</span>
					</button>
				</div>
				<span className="sr-only">Filter Eras:</span>

				<div ref={emblaThumbsRef} className="overflow-hidden">
					<ol className="embla__container flex gap-8 mb-8">
						{eras.map((era: TimelineEra, index: number) => (
							<li key={index} className="embla__slide flex-[0_0_auto]">
								<button
									className={`cursor-pointer text-white border-2 bg-black hover:bg-gray-800 transition duration-250 px-4 py-2 rounded-3xl ${selectedEra === era.title ? 'timeline-filter__item--active' : ''}`}
									onClick={() => {
										setSelectedEra( era.title );
										onThumbClick( index );
									}}
								>
									<span>{era.title.replace(/-/g, ' - ')}</span>
								</button>
							</li>
						))}
					</ol>
				</div>

				<div className="absolute right-[-2rem] top-[-5px] z-99 w-[80px] h-[50px] flex align-center justify-center bg-[linear-gradient(to_right,rgba(10,10,10,0)_0%,rgba(10,10,10,1)_50%)]">
					<button
						className="cursor-pointer disabled:opacity-25"
						disabled={ selectedSnap >= snapCount }
						onClick={() => {
							const nextIndex = selectedSnap + 1;
							const nextEra = eras[nextIndex]?.title;
							if ( ! nextEra ) return;
							setSelectedSnap( nextIndex );
							setSelectedEra( nextEra );
							onThumbClick( nextIndex );
						}}
					>
						<svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" fill="white">
							<path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero" transform="scale(-1, 1) translate(-24, 0)"/>
						</svg>
						<span className="sr-only">Next Era</span>
					</button>
				</div>
			</div>
		</div>
	)
})

TimelineErasMobile.displayName = 'TimelineErasMobile';
export default TimelineErasMobile;
