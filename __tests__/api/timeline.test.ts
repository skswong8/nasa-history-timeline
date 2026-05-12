import { getTimelineData } from '@/lib/timeline'
import { getPreviousAndNext } from '@/utils/getPreviousAndNext'
import { mockTimelineEras } from '../mocks/timelineEras'

jest.mock('@/lib/timeline', () => ({
	getTimelineData: jest.fn()
}))

describe('Timeline API logic', () => {
	beforeEach(() => {
		(getTimelineData as jest.Mock).mockResolvedValue({ eras: mockTimelineEras })
	})

	it('should return all era data', async () => {
		const data = await getTimelineData()

		expect(data.eras).toHaveLength(mockTimelineEras.length)
	})

	it('should return correct era for query', async () => {
		const data = await getTimelineData()
		const era = data.eras.find((e: { era: string }) => e.era === '1958-1970')

		expect(era).toBeDefined()
		expect(era.era).toBe('1958-1970')
	})

	it('should return undefined for invalid era', async () => {
		const data = await getTimelineData()
		const era = data.eras.find((e: { era: string }) => e.era === 'invalid')

		expect(era).toBeUndefined()
	})

	it('should return null navigation for first era', async () => {
		const navigation = getPreviousAndNext(mockTimelineEras, '1958-1970')

		expect(navigation.previous).toBeNull()
	})

	it('should return null navigation for last era', async () => {
		const navigation = getPreviousAndNext(mockTimelineEras, '1991-2005')

		expect(navigation.next).toBeNull()
	})

	it('should return null navigation for invalid era', async () => {
		const navigation = getPreviousAndNext(mockTimelineEras, 'invalid')

		expect(navigation.previous).toBeNull()
		expect(navigation.next).toBeNull()
	})
})
