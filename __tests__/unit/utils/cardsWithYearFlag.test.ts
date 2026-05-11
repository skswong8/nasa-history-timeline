import { cardsWithYearFlag } from '@/utils/cardsWithYearFlag'
import { mockTimelineItems } from '../../mocks/timelineItems'

describe('cardsWithYearFlag', () => {
	const items = cardsWithYearFlag(mockTimelineItems)

  it('should set showYear to true for the first item of a year', () => {
		expect(items[0].showYear).toBe(true)
	})

  it('should set showYear to false for the second item of a year', () => {
		expect(items[1].showYear).toBe(false)
	})

  it('should set showYear to true for the next item, first item of a year', () => {
		expect(items[2].showYear).toBe(true)
	})

  it('should set showYear to true for the next item, first item of a year', () => {
		expect(items[3].showYear).toBe(true)
	})

  it('should set showYear to false for the second item of a year', () => {
		expect(items[4].showYear).toBe(false)
	})

  it('should set showYear to true for every item in array', () => {
		const indices = [0, 2, 3]
		const uniqueItems = indices.map(i => items[i])
		expect(uniqueItems.every(item => item.showYear)).toBe(true)
	})

  it('should preserve original data', () => {
		expect(items[0].title).toBe(mockTimelineItems[0].title)
	})

  it('should return an empty array', () => {
		const emptyItems = cardsWithYearFlag([])
		expect(emptyItems).toHaveLength(0)
	})
})
