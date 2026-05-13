import { TimelineItem } from '@/types/timeline'

export const mockTimelineItems: TimelineItem[] = [
	{
		year: 1962,
		title: 'John Glenn Orbits Earth',
		description:
			'John Glenn becomes the first American to orbit Earth on Friendship 7.',
		tag: 'Human Spaceflight',
		image: {
			src: 'john-glenn-friendship7.jpg',
			alt: 'John Glenn inside the Friendship 7 Mercury capsule before his three-orbit flight around Earth',
		},
	},
	{
		year: 1962,
		title: 'Project Gemini Begins',
		description:
			'Gemini program starts, developing critical techniques for Apollo Moon landings.',
		tag: 'Program',
		image: {
			src: 'project-gemini.jpg',
			alt: 'Gemini spacecraft and astronauts during an extravehicular activity in orbit above Earth',
		},
	},
	{
		year: 1963,
		title: 'Apollo 8 Moon Orbit',
		description:
			'Apollo 8 becomes the first crewed spacecraft to orbit the Moon and capture Earthrise.',
		tag: 'Moon Mission',
		image: {
			src: 'apollo-8-earthrise.jpg',
			alt: 'The iconic Earthrise photograph showing Earth rising above the lunar horizon, taken by Apollo 8 astronauts',
		},
		link: {
			url: 'https://www.nasa.gov/missions/apollo-8-christmas-at-the-moon/',
			isExternal: true,
		},
	},
	{
		year: 1969,
		title: 'Apollo 11 Moon Landing',
		description:
			'Neil Armstrong and Buzz Aldrin become the first humans to walk on the Moon.',
		tag: 'Moon Mission',
		image: {
			src: 'apollo-11-moon-landing.jpg',
			alt: 'Buzz Aldrin stands on the lunar surface during the Apollo 11 moonwalk, with the Eagle lander and equipment visible behind him',
		},
		link: {
			url: 'https://www.nasa.gov/mission/apollo-11/',
			isExternal: true,
		},
	},
	{
		year: 1969,
		title: 'Apollo 12 Second Landing',
		description:
			'Second successful crewed Moon landing, with precise touchdown near Surveyor 3.',
		tag: 'Moon Mission',
		image: {
			src: 'apollo-12-moon-landing.jpg',
			alt: 'Apollo 12 astronaut on the lunar surface near the Surveyor 3 spacecraft during the second crewed Moon landing',
		},
	},
]
