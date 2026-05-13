export interface TimelineImage {
	src: string
	alt: string
}

export interface TimelineLink {
	url: string
	isExternal: boolean
}

export interface TimelineItem {
	year: number
	title: string
	description: string
	tag: string
	image: TimelineImage
	link?: TimelineLink
}

export interface TimelineItemWithYear extends TimelineItem {
	showYear: boolean
}

export interface TimelineNavigation {
	title: string
	description: string
}

export interface TimelineData {
	eras: TimelineEras[]
}

export interface EraNavigation {
	previous: string | null
	previousLabel: string | null
	next: string | null
	nextLabel: string | null
}

export interface TimelineEras {
	era: string
	eraDescription: string
	items: TimelineItem[]
}

export interface TimelineEraResponse extends TimelineEras {
	navigation: EraNavigation
}
