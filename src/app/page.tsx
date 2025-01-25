import { getNaboryPostelnogo, getHits, getPleds } from '../app/lib/api/getTovars';
import ClientHome from './ClientHome';

export default async function Home() {
	const NaboryPostelnogo = await getNaboryPostelnogo();
	const hits = await getHits(); 
	const pleds = await getPleds();
 
	return <ClientHome NaboryPostelnogo={NaboryPostelnogo} hits={hits} pleds={pleds} />;
}
