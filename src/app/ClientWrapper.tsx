"use client";

import { useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Header from "../components/Header/Header";
import Modal from "@/components/Modal/Modal";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false); // Для модального окна
  const [anchorRef, setAnchorRef] = useState<HTMLElement | null>(null); // Ссылка на элемент

  return (
    <> 
      <TopHeader setActive={setActive} setAnchorRef={setAnchorRef} />
      <Header />
      {children}
      <Modal setActive={setActive} active={active} anchorRef={anchorRef} />
    </>
  );
}
 