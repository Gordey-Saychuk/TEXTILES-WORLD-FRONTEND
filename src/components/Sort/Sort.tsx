import React, { useState } from 'react'
import  styles  from "./Sort.module.css";  
  
export default function Sort() {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(['WEWQ', 'sadsa']);

  function clickSort() {   
    setIsOpen((prev) => !prev);
  }  
 
  return (   
    <div className={styles.sorts}>  
       <div onClick={clickSort}>Сортировка по</div>

      {isOpen ? <div>  
     
        <ul className={styles.module}> 
        {list.map((e) => (
          <li>{e}</li>
        ))} 
        </ul>
      </div> : null}
       
    </div>
  )
}
