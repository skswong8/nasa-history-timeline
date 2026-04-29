import Image from 'next/image'

export default async function Home() {
	const fetchEras = await fetch(`${process.env.SITE_URL}/api/timeline/eras`);
	const eras = await fetchEras.json();

	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<header>
				<Image
					className="dark:invert"
					src="/next.svg"
					alt="Next.js logo"
					width={100}
					height={20}
					priority
				/>
			</header>
			<main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
				<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
					 <ul>
						{eras.map((era: string, index: number) => (
							<li key={index}>{era}</li>
						))}
					</ul>
				</div>
			</main>
		</div>
	)
}
