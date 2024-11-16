import { getTovars, getHits, getPleds } from "../app/lib/api/getTovars";
import ClientHome from "./ClientHome";

export default async function Home() {
  const data = await getTovars();
  const hits = await getHits();
  const pleds = await getPleds();

  return (
    <ClientHome data={data} hits={hits} pleds={pleds} />
  );
}
