import TimelineClient from './components/TimelineClient';

/**
 * Home SSR entrypoint.
 * Fetches eras.
 * @returns CSR entrypoint.
 */
export default async function Home() {
	const fetchEras = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/timeline/eras`);
	const eras = await fetchEras.json();

	return <TimelineClient eras={ eras } />
}
