import { Product } from '@/types/index';

export interface ClientCatalogProps {
	initialData: Product[];
	totalPages: number;
	currentPage: number;
}


export interface FiltersData {
  price_range: { min_price: number; max_price: number };
  colors: string[];
  brands: string[]; 
  materials: string[];
  category: string[];
  date_ranges: string[]; 
}

export interface AppliedFilters {
  price_min: number;
  price_max: number;
  color: string;
  brand: string | null;
  material: string;
}
