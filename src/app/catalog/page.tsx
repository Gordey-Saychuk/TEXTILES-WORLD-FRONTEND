import ClientCatalog from "./ClientCatalog";
import { getTovarsCatalog } from "../lib/api/getTovars";


export default async function Catalog({ searchParams }: { searchParams: { page?: string; categoryId?: string } }) {
 
  const resolvedSearchParams = await searchParams; // Ожидаем разрешения промиса
  const categoryId = searchParams.categoryId
    ? parseInt(searchParams.categoryId, 10)
    : undefined;  


  const currentPage = parseInt(resolvedSearchParams.page || "1", 10); // Используем разрешённые параметры
  const response = await getTovarsCatalog(currentPage, 4, categoryId);
  const data = response.results || [];
  const totalPages = Math.ceil(response.count / 4); 

 
  return (   
    <div> 
      <ClientCatalog initialData={data} totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
 