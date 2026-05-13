import { NextResponse } from 'next/server'
import { TimelineData } from '@/types/timeline'
import { getTimelineData } from '@/lib/timeline'
import { getEras } from '@/utils/getEras'

export async function GET() {
	const data: TimelineData = await getTimelineData()

	const eras = getEras(data)

	return NextResponse.json(eras)
}
