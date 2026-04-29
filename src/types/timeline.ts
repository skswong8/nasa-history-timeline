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
	era: string
	eraDescription: string
	items: TimelineItem[]
}

export interface TimelineData {
	eras: TimelineEra[]
}
