export const fetchEra = async ( selectedEra: string ) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/timeline?era=${ selectedEra }`);
	if ( ! response.ok ) throw new Error( 'Failed to fetch' );

	return response.json();
};
