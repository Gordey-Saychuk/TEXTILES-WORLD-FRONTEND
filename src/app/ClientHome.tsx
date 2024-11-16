"use client";

import { useState } from "react";
import styles from "./page.module.css";
import TopHeader from "../components/TopHeader/TopHeader";
import Header from "../components/Header/Header";
import SliderSwction from "../components/SliderSwction/SliderSwction";
import SliderTwo from "../components/SliderTwo/SliderTwo";
import Section from "@/components/Section/Section";
import Title from "@/components/Title/Title";
import CardSlider from "@/components/CardSlider/CardSlider";
import Modal from "@/components/Modal/Modal";

export default function ClientHome({ data, hits, pleds }) {
  const [active, setActive] = useState(true); 
  const [anchorRef, setAnchorRef] = useState(null);

  return (
    <>
      <TopHeader setActive={setActive} setAnchorRef={setAnchorRef} />
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

        {/* Модальное окно */}
        <Modal active={active} anchorRef={anchorRef} />
      </div>
    </>
  );
}
 