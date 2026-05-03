import { NextRequest, NextResponse } from 'next/server';
import { TimelineData, TimelineEras, EraNavigation } from '@/types/timeline';
import { getTimelineData } from '@/lib/timeline';

/**
 * Get previous and next era navigation items.
 *
 * @param eras Full array of timeline eras.
 * @param currentEra The era string to navigate from e.g. "1958-1970".
 * @returns Previous and next era index, slugs and labels, null if at either boundary.
 */
const getPreviousAndNext = ( eras: TimelineEras[], currentEra: string ): EraNavigation => {
	const currentIndex = eras.findIndex( era => era.era === currentEra );

	const previous = eras[currentIndex - 1] ?? null;
	const next = eras[currentIndex + 1] ?? null;

	return {
		previous: previous?.era ?? null,
		previousLabel: previous?.era.replace(/-/g, " - ") ?? null,
		previousIndex: currentIndex - 1 >= 0 ? currentIndex - 1 : null,
		next: next?.era ?? null,
		nextLabel: next?.era.replace(/-/g, " - ") ?? null,
		nextIndex: currentIndex + 1 < eras.length ? currentIndex + 1 : null,
	}
}

export async function GET( request: NextRequest ) {
	const data: TimelineData = await getTimelineData();
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get('era');

	if ( ! query ) {
		return NextResponse.json( data );
	}

	const eraIndex = data.eras.findIndex( era => era.era === query );
	const era = data.eras[ eraIndex ];

	if ( ! era ) {
		return NextResponse.json( { error: 'Era not found' }, { status: 404 } );
	}

	const navigation = getPreviousAndNext( data.eras, query );

	return NextResponse.json( { ...era, navigation } );
}
