import axios from "axios";

export async function getReviewsByProductId(productId: number) {
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}reviews/products/${productId}`);
    return response.data; 
  }   
  catch(error){
    console.error('Failed to fetch reviews:', error);
    return [];
  }
}