'use client';

import React, { useState } from 'react';
import SubTitle from '../components/SubTitle/SubTitle';
import styles from "./index.module.css";
import Input from '@/components/Input/Input'; 
import axios from 'axios'; 

export default function Page() {     
  const [active, setActive] = useState('add');
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 1,
    old_price: 1, 
    sets: '',
    material: '',
    consist: '',
    manufacture: '', 
    brand: '', 
    color: '',
    url: '',
    popularity: 1, 
    category: 1, 
    slice: 1 
  });
  const [mainImage, setMainImage] = useState<File | null>(null); 
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

 

  function handleMainImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMainImage(e.target.files ? e.target.files[0] : null);
  }
  


  function handleAdditionalImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAdditionalImages(e.target.files ? Array.from(e.target.files) : []);
 
  }
  



  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }
   
   

  function handleClick(str: string) {
    setActive(str); 
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
  
    console.log('Отправляемые данные:', form);
  
    const formData = new FormData();
  
    // Добавляем данные формы
    Object.keys(form).forEach((key) => {
      const value = form[key as keyof typeof form];
      formData.append(key, typeof value === 'number' ? value.toString() : value);
    });
     
  
    // Добавляем главное фото
    if (mainImage) {
      formData.append('image_url', mainImage);
    }
  
    // Добавляем дополнительные фото
    additionalImages.forEach((file, index) => {
      if (index < 10) {
        formData.append(`image_url${index + 1}`, file);
      }
    });
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}addproducts/`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      console.log('Данные успешно отправлены:', response.data);
    } catch (error) {
      console.error('Ошибка отправки данных:', error);
    }
  }
  
   
  return (
    <div> 
      <SubTitle>Товары</SubTitle>   
      <div className={styles.buttonBox}>  

        {/* Кнопка для добавления товара */}
        <div onClick={() => handleClick('add')} className={styles.buttonCont}>
          <div className={styles.button}>Добавить товар</div> 
        </div> 

        {/* Кнопка для просмотра товаров */}
        <div onClick={() => handleClick('view')} className={styles.buttonCont}>
          <div className={styles.button}>Посмотреть товары</div>   
        </div>

      </div>
 
      {/* Условный рендеринг в зависимости от состояния */}
      <div className={styles.content}>
        {active === 'add' && (
          <form onSubmit={handleSubmit}>  
             
            <SubTitle>Добавление товара</SubTitle>  
            <div>  
            <SubTitle>Название</SubTitle>  
            <div className={styles.input}>    	<Input onChange={handleInputChange} name="name" value={form.name} placeholder="Название товара" /> </div>  
            <SubTitle>Описание</SubTitle>   
            <div className={styles.input}>    	<Input onChange={handleInputChange} name="description" value={form.description} placeholder="Описание" /> </div>   
            <SubTitle>Цена</SubTitle>    
            <div className={styles.input}>    	<Input onChange={handleInputChange} name="price" value={String(form.price)}  placeholder="Цена" /> </div>  

            <SubTitle>Старая цена</SubTitle>     
            <div className={styles.input}>    	<Input onChange={handleInputChange} name="old_price" value={String(form.old_price) } placeholder="Старая цена" /> </div>  

            <SubTitle>Комплект</SubTitle>       
            <div className={styles.input}>    	<Input onChange={handleInputChange} name="sets" value={form.sets} placeholder="Комплект" /> </div>  
 
            <SubTitle>Материал</SubTitle>      
            <div className={styles.input}>    	<Input onChange={handleInputChange} name="material" value={form.material} placeholder="Материал" /> </div>  
 
            <SubTitle>Состав</SubTitle>      
            <div className={styles.input}>    	<Input onChange={handleInputChange} name="consist" value={form.consist} placeholder="Состав" /> </div>  
 
            <SubTitle>Производитель</SubTitle>      
            <div className={styles.input}>    	<Input onChange={handleInputChange} name="manufacture" value={form.manufacture} placeholder="Производитель" /> </div>  
 
            <SubTitle>Бренд</SubTitle>      
            <div className={styles.input}>    	<Input onChange={handleInputChange} name="brand" value={form.brand} placeholder="Бренд" /> </div>  
 
            <SubTitle>Цвет</SubTitle>      
            <div className={styles.input}>    	<Input onChange={handleInputChange} name="color" value={form.color} placeholder="Цвет" /> </div>  

            <SubTitle>Ссылка</SubTitle>       
            <div className={styles.input}>    	<Input onChange={handleInputChange} name="url" value={form.url} placeholder="Ссылка" /> </div>  

            <SubTitle>Популярность</SubTitle>   
            <div className={styles.input}>
              <select  name="popularity" value={form.popularity} onChange={handleInputChange}  >  
                <option value="1">1</option>
                <option value="2">2</option> 
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option> 
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div> 
 
            <SubTitle>Категория</SubTitle>   
            <div className={styles.input}>
              <select name="category" value={form.category} onChange={handleInputChange}  >  
                <option value="1">1</option>
                <option value="2">2</option> 
                <option value="3">3</option>
           
              </select>
            </div> 

            <SubTitle>Раздел</SubTitle>   

            <div className={styles.input} >
              <select name="slice"  value={form.slice} onChange={handleInputChange}>  
                <option value="1">1</option>
                <option value="2">2</option>  
                <option value="3">3</option>
           
              </select>
            </div>  



            <SubTitle>Главное изображение</SubTitle>
              <input type="file" accept="image/*" onChange={handleMainImageChange} />

              <SubTitle>Дополнительные изображения</SubTitle>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
              /> 

          <button>asdsa</button>
            </div>     
          </form>   
        )}
        {active === 'view' && (
          <div>
            <h3>Просмотр товаров</h3>
            <p>Здесь отображается список товаров...</p>
          </div>
        )}
      </div>
    </div>
  );
}
  