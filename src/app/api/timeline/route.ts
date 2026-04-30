import { NextRequest, NextResponse } from 'next/server';
import { TimelineData } from '@/types/timeline';
import { getTimelineData } from '@/lib/timeline';

export async function GET( request: NextRequest ) {
	const data: TimelineData = await getTimelineData();
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get('era'); // e.g. `/api/timeline?era=1958-1970`

	if ( ! query ) {
		return NextResponse.json(data);
	}

	const era = data.eras.find(era => era.era === query);
	return NextResponse.json(era);
}
