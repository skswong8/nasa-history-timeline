import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { TimelineData } from '@/types/timeline'

export async function GET() {
	const filePath = path.join(process.cwd(), 'src/data', 'nasa-timeline.json');
	const file = await fs.readFile(filePath, 'utf-8');
	const data: TimelineData = JSON.parse(file);

	const eras = data.eras.map(era => era.era);
	return NextResponse.json(eras);
}
