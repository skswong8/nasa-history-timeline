import { NextResponse } from 'next/server';
import { TimelineData } from '@/types/timeline';
import { getTimelineData } from '@/lib/timeline';

export async function GET() {
	const data: TimelineData = await getTimelineData();

	const eras = data.eras.map(era => ({
		title: era.era,
		description: era.eraDescription
	}));

	return NextResponse.json(eras);
}
