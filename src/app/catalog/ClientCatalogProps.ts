  import { Product } from "@/types/index";

  export interface ClientCatalogProps {
    initialData: Product[];
    totalPages: number;
    currentPage: number;
  } 
  