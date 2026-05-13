'use client'

import Image from 'next/image'
import { TimelineItem } from '@/types/timeline'
import '@/styles/timeline-card.scss'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { DESKTOP_WIDTH } from '@/lib/constants'

interface CardProps {
	era: TimelineItem
	showYear: boolean
}

/**
 * Renders the timeline cards.
 * @param selectedEra Selected era.
 * @param setEraDescription State setter to update the era description.
 * @returns A list of timeline cards.
 */
export default function TimelineCard({ era, showYear }: CardProps) {
	const { year, title, description, tag, image } = era
	const windowWidth = useWindowWidth()
	const isDesktop = windowWidth !== null && windowWidth >= DESKTOP_WIDTH

	return (
		<div
			className={`timeline-card flex-[0_0_340px] ${isDesktop ? '' : 'embla__slide list-divider list-divider--narrow'}`}
			data-has-link={era?.link?.url ? 'true' : 'false'}
			data-show-year={showYear}
			data-year={year}
		>
			<div className="timeline-card__wrapper">
				<div className="timeline-card__year h-[24px] relative mb-4">
					<span className="rounded-full bg-white text-black inline-block px-[6px] py-[2px] relative z-[1]" data-testid="card-year">
						{year}
					</span>
				</div>
				<div className="timeline-card__container h-[440px]">
					<div className=" timeline-card__content-container relative h-[calc(100%-30px)] lg:h-full">
						<div className="flex flex-col justify-end h-full relative timeline-card__content">
							<h2 className="timeline-card__title px-4 text-lg font-bold mb-2 relative indent-[20px]">
								{title}
							</h2>
							{tag && (
								<div className="timeline-card__tag order-first mr-auto mb-auto text-white px-2 py-1 text-sm shadow-xl">
									{tag}
								</div>
							)}
							<div className="timeline-card__body px-4 pb-4">{description}</div>
							<div
								aria-hidden="true"
								className="text-white text-5xl font-black absolute -bottom-[4px] right-[2px] opacity-10 timeline-card__display-year"
							>
								{year}
							</div>
						</div>
						<div className="h-full w-full absolute -z-10 top-0 left-0 timeline-card__media">
							<Image
								className="h-full object-cover"
								src={`/${image.src}`}
								alt={image.alt}
								fill
								sizes="500px"
								placeholder="blur"
								blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
							/>
						</div>
					</div>
					{era?.link?.url && (
						<div className="flex justify-end timeline-button">
							<a
								className="px-2 py-1 text-black shadow-xl text-sm transition duration-250"
								data-link-type={era?.link?.isExternal ? 'external' : 'internal'}
								href={era?.link.url}
								rel="noreferrer"
								target={era?.link?.isExternal ? '_blank' : '_self'}
							>
								<span className="timeline-button__label">
									Learn More <span className="sr-only">- {title}</span>
								</span>
								{era?.link?.isExternal && (
									<span className="sr-only">Opens in a new tab</span>
								)}
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
