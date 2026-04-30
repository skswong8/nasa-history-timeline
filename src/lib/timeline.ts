import { promises as fs } from 'fs';
import path from 'path';

export async function getTimelineData() {
	const filePath = path.join(process.cwd(), 'src/data', 'nasa-timeline.json');
	return JSON.parse(await fs.readFile(filePath, 'utf-8'));
}
