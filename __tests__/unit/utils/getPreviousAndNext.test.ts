import { getPreviousAndNext } from '@/utils/getPreviousAndNext'
import { mockTimelineEras } from '../../mocks/timelineEras'

describe('getPreviousAndNext', () => {
	const selectedEra = (index: number) => {
		const era = mockTimelineEras[index].era
		return getPreviousAndNext(mockTimelineEras, era)
	}

	it('should show null for previous and previousLabel in the first era', () => {
		const era = selectedEra(0)
		expect(era.previous).toBe(null)
	})

	it('should show null for previous and previousLabel in the last era', () => {
		const era = selectedEra(2)
		expect(era.next).toBe(null)
	})

	it('should show previous, previousLabel, next and nextLabel data for a middle era', () => {
		const era = selectedEra(1)
		expect(era).toEqual({
			previous: '1958-1970',
			previousLabel: '1958 - 1970',
			next: '1991-2005',
			nextLabel: '1991 - 2005',
		})
	})

	it('should return null for all values with an invalid era', () => {
		const era = getPreviousAndNext(mockTimelineEras, '2026-2050')
		expect(era).toEqual({
			previous: null,
			previousLabel: null,
			next: null,
			nextLabel: null,
		})
	})
})
