import { NextRequest, NextResponse } from 'next/server'
import { TimelineData } from '@/types/timeline'
import { getTimelineData } from '@/lib/timeline'
import { getPreviousAndNext } from '@/utils/getPreviousAndNext'

export async function GET(request: NextRequest) {
	const data: TimelineData = await getTimelineData()
	const searchParams = request.nextUrl.searchParams
	const query = searchParams.get('era')

	if (!query) {
		return NextResponse.json(data)
	}

	const eraIndex = data.eras.findIndex((era) => era.era === query)
	const era = data.eras[eraIndex]

	if (!era) {
		return NextResponse.json({ error: 'Era not found' }, { status: 404 })
	}

	const navigation = getPreviousAndNext(data.eras, query)

	return NextResponse.json({ ...era, navigation })
}
