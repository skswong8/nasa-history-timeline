'use client';

interface ErasProp {
	eras: string[]
}

export default function Eras( { eras }: ErasProp ) {
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
					<ul>
					{ eras.map((era: string, index: number) => (
						<li key={index}>{era}</li>
					)) }
				</ul>
			</div>
		</div>
	)
}
