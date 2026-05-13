import { getTimelineData } from '@/lib/timeline'
import { mockTimelineEras } from '../mocks/timelineEras'
import { getEras } from '@/utils/getEras'

jest.mock('@/lib/timeline', () => ({
	getTimelineData: jest.fn(),
}))

describe('Timeline Era API logic', () => {
	beforeEach(() => {
		;(getTimelineData as jest.Mock).mockResolvedValue({
			eras: mockTimelineEras,
		})
	})

	it('should return all eras', async () => {
		const data = await getTimelineData()
		const eras = getEras(data)

		expect(eras).toHaveLength(mockTimelineEras.length)
	})

	it('should return eras with title and description', async () => {
		const data = await getTimelineData()
		const eras = getEras(data)

		expect(eras[0]).toEqual({
			title: mockTimelineEras[0].era,
			description: mockTimelineEras[0].eraDescription,
		})
	})

	it('should return an empty array when there are no eras', async () => {
		;(getTimelineData as jest.Mock).mockResolvedValue({ eras: [] })
		const data = await getTimelineData()
		const eras = getEras(data)

		expect(eras).toHaveLength(0)
	})
})
