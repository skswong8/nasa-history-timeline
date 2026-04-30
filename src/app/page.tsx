import TimelineClient from './components/TimelineClient';

export default async function Home() {
	const fetchEras = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/timeline/eras`);
	const fetchEra = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/timeline?era=1958-1970`);
	const eras = await fetchEras.json();
	const era = await fetchEra.json();

	return <TimelineClient eras={ eras } era={ era } />
}
