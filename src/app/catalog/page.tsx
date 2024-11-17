import ClientCatalog from "./ClientCatalog";
import { getTovars } from "../lib/api/getTovars";

export default async function catalog() {
  const data = await getTovars();  // Точка с запятой добавлена

  return (
    <div>
      <ClientCatalog data={data} />
    </div>
  );  // Точка с запятой добавлена
}
 