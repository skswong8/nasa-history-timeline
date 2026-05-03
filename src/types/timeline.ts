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
	link: TimelineLink
}

export interface TimelineEra {
	title: string
	description: string
}

export interface TimelineData {
	eras: TimelineEras[]
}

export interface EraNavigation {
	previous: string
	previousLabel: string
	previousIndex: number | null
	next: string
	nextLabel: string
	nextIndex: number | null
}

export interface TimelineEras {
	era: string
	eraDescription: string
	items: TimelineItem[]
}

export interface TimelineEraResponse extends TimelineEras {
	navigation: EraNavigation
}
