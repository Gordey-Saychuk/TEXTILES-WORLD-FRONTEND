import { useEffect, useState } from "react";
import { getCategory } from "../../app/lib/api/category";

// Define the prop types for the Category component
interface CategoryProps { 
  changeCategory: (id:  number) => void; // Adjust the type if the ID is a different type, e.g., number
} 

export default function Category({ changeCategory }: CategoryProps) {  
  const [category, setCategory] = useState<any[]>([]); // Adjust the type based on the structure of the category data
   
  useEffect(() => { 
    async function fetchCategories() {
      try {
        const data = await getCategory();
        setCategory(data); 
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []); 

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
 