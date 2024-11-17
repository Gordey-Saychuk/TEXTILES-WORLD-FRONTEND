import axios from 'axios';

export async function getTovars() {
  try { 
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
    return response.data.results; 
  } catch (error) { 
    console.error(error);  
    throw new Error('Failed to fetch tovars');
  }
}
 
export async function getHits() { 
  try { 
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/category/1`);
    return response.data; 
  } catch (error) { 
    console.error(error);  
    throw new Error('Failed to fetch tovars');
  }
}


export async function getPleds() {    
  try { 
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/category/2`);
    return response.data; 
  } catch (error) {
    console.error(error);  
    throw new Error('Failed to fetch tovars');
  }
}
