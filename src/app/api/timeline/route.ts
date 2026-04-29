import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { TimelineData } from '@/types/timeline'

export async function GET( request: NextRequest ) {
	const filePath = path.join(process.cwd(), 'src/data', 'nasa-timeline.json');
	const file = await fs.readFile(filePath, 'utf-8');
	const data: TimelineData = JSON.parse(file);

	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get('era'); // e.g. `/api/timeline?era=1958-1970`

	if ( ! query ) {
		return NextResponse.json(data);
	}

	const era = data.eras.find(era => era.era === query);
	return NextResponse.json(era);
}
