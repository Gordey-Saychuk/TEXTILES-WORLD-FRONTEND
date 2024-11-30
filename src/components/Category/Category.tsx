import { useEffect, useState } from "react"
import {getCategory} from "../../app/lib/api/category"

 
export default function Category({changeCategory}) { 
  const [category, setCategory] = useState([]); 
   
  
  useEffect(() => { 
    async function fetchCategories() {
      try{
        const data = await getCategory();
        setCategory(data); 
      }catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
 
  },[]) 
  
  return (
    <div>
      {category.length === 0 ? (
        <p>Категории не найдены</p>
      ) : (
        <ul>
          {category.map((el) => (
            <li onClick={() => changeCategory(el.id)} key={el.id}>
              {el.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
   
}
