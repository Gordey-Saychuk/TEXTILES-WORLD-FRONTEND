import ClientCatalog from "./ClientCatalog";
import { getTovarsCatalog } from "../lib/api/getTovars";

export default async function Catalog({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = parseInt(searchParams.page || "1", 10); // Получаем текущую страницу из URL
  const response = await getTovarsCatalog(currentPage, 4); // Загружаем данные
  const data = response.results || [];
  const totalPages = Math.ceil(response.count / 4); // Общее количество страниц

  return ( 
    <div>
      <ClientCatalog initialData={data} totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
 