import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TimelineCard from '@/app/components/TimelineCard'
import { mockTimelineItems } from '../../mocks/timelineItems'

describe('TimelineCard', () => {
	const firstItem = mockTimelineItems[0]
	const itemWithLink = mockTimelineItems[2]

	it('renders the title', () => {
		render(<TimelineCard era={ firstItem } showYear={ true } />)

		const heading = screen.getByRole('heading', { level: 2 })

		expect(heading).toHaveTextContent(firstItem.title)
	})

	it('renders the year', () => {
		render(<TimelineCard era={ firstItem } showYear={ true } />)

		const year = screen.getByTestId('card-year')

		expect(year).toHaveTextContent(String(firstItem.year))
	})

	it('renders the description', () => {
		render(<TimelineCard era={ firstItem } showYear={ true } />)

		const description = screen.getByText(firstItem.description)

		expect(description).toBeInTheDocument()
	})

	it('renders the tag', () => {
		render(<TimelineCard era={ firstItem } showYear={ true } />)

		const tag = screen.getByText(firstItem.tag)

		expect(tag).toBeInTheDocument()
	})

	it('renders the image and has alt', () => {
		render(<TimelineCard era={ firstItem } showYear={ true } />)

		const image = screen.getByRole('img')
		const src = firstItem.image.src
		const alt = firstItem.image.alt

		expect(image).toHaveAttribute('src', expect.stringContaining(src))
		expect(image).toHaveAttribute('alt', alt)
	})

	it('does not render the link when absent', () => {
		render(<TimelineCard era={ firstItem } showYear={ true } />)

		const link = screen.queryByRole('link')

		expect(link).not.toBeInTheDocument()
	})

	it('renders the link when present', () => {
		render(<TimelineCard era={ itemWithLink } showYear={ true } />)

		const link = screen.getByRole('link', { name: /learn more/i })
		const url = firstItem?.link?.url

		expect(link).toHaveAttribute('href', url)
	})

	it('opens the link in a new tab when link is present', () => {
		render(<TimelineCard era={ itemWithLink } showYear={ true } />)

		const link = screen.getByRole('link', { name: /learn more/i })

		expect(link).toHaveAttribute('target', '_blank')
	})

	it('renders the year label when showYear is true', () => {
		render(<TimelineCard era={ firstItem } showYear={ true } />)

		const card = document.querySelector('[data-show-year="true"]')

		expect(card).toBeInTheDocument()
	})

	it('does not render the year label when showYear is false', () => {
		render(<TimelineCard era={ firstItem } showYear={ false } />)

		const card = document.querySelector('[data-show-year="false"]')

		expect(card).toBeInTheDocument()
	})
})
