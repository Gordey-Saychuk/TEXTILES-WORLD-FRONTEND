import styles from "./page.module.css";
import TopHeader from "../components/TopHeader/TopHeader";
import Header from "../components/Header/Header";
import SliderSwction from "../components/SliderSwction/SliderSwction";
import SliderTwo from "../components/SliderTwo/SliderTwo";
import Section from "@/components/Section/Section";
import Title from "@/components/Title/Title"; 
import { getTovars, getHits, getPleds } from "../app/lib/api/getTovars";
import CardSlider from "@/components/CardSlider/CardSlider";


export default async function Home() {   
  
  const data = await getTovars(); 
  const hits = await getHits(); 
  const pleds = await getPleds(); 

  return (    
    <>
       <TopHeader />  
      <div className={styles.page}>    
 
    <Header /> 
    <div className={styles.slider}> 
    <SliderSwction />
    <SliderTwo />   
    </div>  
    <Section sliderComponent={<CardSlider data={data} />}>
          <Title>Хиты продаж</Title> 
        </Section> 

        <Section sliderComponent={<CardSlider data={hits} />}>
          <Title>Комплекты постельного</Title>  
        </Section>  

        <Section sliderComponent={<CardSlider data={pleds} />}>
          <Title>Пледы</Title>  
        </Section>  
     
    </div>
    </>
  );
}
