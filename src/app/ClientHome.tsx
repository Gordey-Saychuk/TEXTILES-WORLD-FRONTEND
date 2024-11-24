"use client";
 
import {  useState } from "react";
import styles from "./page.module.css";
import SliderSwction from "../components/SliderSwction/SliderSwction";
import SliderTwo from "../components/SliderTwo/SliderTwo";
import Section from "@/components/Section/Section";
import Title from "@/components/Title/Title";
import CardSlider from "@/components/CardSlider/CardSlider";
import Modal from "@/components/Modal/Modal";

import { ClientHomeProps } from '../components/Section/SectionProps';

export default function ClientHome({ data, hits, pleds }: ClientHomeProps) {
  const [active, setActive] = useState(false);
  const [anchorRef] = useState<HTMLElement | null>(null);
 

  
 
  return (
    <div className={styles.page}> 
      <div className={styles.slider}>
        <SliderSwction />
        <SliderTwo />
      </div>
      <Section sliderComponent={<CardSlider data={data} />} > 
        <Title link={true}>Хиты продаж</Title>
      </Section> 
      <Section sliderComponent={<CardSlider data={hits} />} > 
        <Title link={true}>Комплекты постельного</Title>
      </Section>
      <Section sliderComponent={<CardSlider data={pleds} />} >
        <Title link={true}>Пледы</Title>
      </Section> 

      {/* Модальное окно */}
      <Modal setActive={setActive} active={active} anchorRef={anchorRef} />
    </div>
  );
}
 