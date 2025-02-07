import { AppliedFilters } from '@/app/catalog/hits/ClientCatalogProps';
import axios from 'axios';

export async function getTovars() {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
		);
		return response.data.results;
	} catch (error) {
		console.error(error);
	}
}

export async function getTovarsCatalog(
  page = 1,
  pageSize = 3, 
  categoryId?: number,
  sortId?: string,
  filters: Partial<AppliedFilters> = {} // Частичные данные
): Promise<any> {
  try {
    const params: Record<string, string | number | null> = { 
      page, 
      page_size: pageSize 
    };

    if (categoryId !== undefined) {
      params.category = categoryId;
    }

    if (sortId) {
      params.ordering = sortId;
    }

    // Добавление фильтров
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = value;
      }
    });

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
      { params }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch products');
  }
}


export async function getHitsCatalog(
  page = 1,
  pageSize = 3,
  categoryId?: number,
  sortId?: string,
  filters: Partial<AppliedFilters> = {} // Используем частичные данные фильтров
): Promise<any> {
  try {
    const params: Record<string, string | number | null> = { 
      page, 
      page_size: pageSize 
    };

    if (categoryId !== undefined) {
      params.category = categoryId;
    }

    if (sortId) {
      // Передача сортировки как "ordering"
      params.ordering = sortId;
    }

    // Добавляем фильтры в параметры
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = value;
      }
    });

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?slice=2`,
      { params }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch products');
  }
}
 


export async function getNaboryCatalog(
  page = 1,
  pageSize = 3,
  categoryId?: number,
  sortId?: string,
  filters: Partial<AppliedFilters> = {} // Используем Partial для необязательных фильтров
): Promise<any> {
  try {
    const params: Record<string, string | number | null> = { 
      page, 
      page_size: pageSize 
    };

    if (categoryId !== undefined) {
      params.category = categoryId;
    }

    if (sortId) {
      // Передача сортировки как "ordering"
      params.ordering = sortId;
    }

    // Добавляем фильтры в параметры
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = value;
      }
    });

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/category/1`,
      { params }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch products');
  }
}
 


export async function getPledsCatalog(
  page = 1,
  pageSize = 3,
  categoryId?: number,
  sortId?: string,
  filters: Partial<AppliedFilters> = {} // Используем Partial для необязательных фильтров
): Promise<any> {
  try {
    const params: Record<string, string | number | null> = { 
      page, 
      page_size: pageSize 
    };

    if (categoryId !== undefined) {
      params.category = categoryId;
    }

    if (sortId) {
      // Передача сортировки как "ordering"
      params.ordering = sortId;
    }

    // Добавляем фильтры в параметры
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = value;
      }
    });

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/category/2`,
      { params }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch products');
  }
}
 


export async function getSaleCatalog(
  page = 1,
  pageSize = 3,
  categoryId?: number,
  sortId?: string,
  filters: Partial<AppliedFilters> = {} // Используем Partial для необязательных фильтров
): Promise<any> {  // Указан тип возвращаемого значения - можно уточнить, если известно, что именно возвращается
  try {
    const params: Record<string, string | number | null> = { 
      page, 
      page_size: pageSize 
    };

    if (categoryId !== undefined) {
      params.category = categoryId;
    }

    if (sortId) {
      // Передача сортировки как "ordering"
      params.ordering = sortId;
    }

    // Добавление фильтров в параметры
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = value;
      }
    });

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?slice=1`,  
      { params }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch products');
  }
}
 



export async function getHits() { 
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/slice/3` 
		);
		return response.data.results;
	} catch (error) {
		console.error(error);
	} 
}
 
export async function getPleds() {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/category/2`
		);
		return response.data.results;
	} catch (error) {
		console.error(error);
	}
}


export async function getNaboryPostelnogo() {
	try { 
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/category/1`
		);
		return response.data.results;
	} catch (error) {
		console.error(error);
	}
}


