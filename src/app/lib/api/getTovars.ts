import axios from 'axios';

export async function getTovars() {
  try { 
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
    return response.data; 
  } catch (error) { 
    throw new Error('Failed to fetch tovars');
  }
}
 