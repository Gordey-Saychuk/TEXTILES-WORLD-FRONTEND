import axios from "axios";


export async function getCategory() {
  try{

    const  response  = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`);
    return response.data;
  }
  catch(error){
    console.error('Failed to fetch getCategory:', error);
    return [];
  }
     
}