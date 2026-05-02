import TimelineClient from './components/TimelineClient';
import Image from 'next/image';
import '@/styles/main.scss';

/**
 * Home SSR entrypoint.
 * Fetches eras.
 * @returns CSR entrypoint.
 */
export default async function Home() {
	const fetchEras = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/timeline/eras`);
	const eras = await fetchEras.json();

	return (
		<>
			<header>
				<div className="container mx-auto p-4">
					<Image
						src="/nasa-logo.svg"
						alt="NASA logo"
						width={ 80 }
						height={ 66 }
						priority
					/>
				</div>
			</header>
			<TimelineClient eras={ eras } />
		</>
	)
}
