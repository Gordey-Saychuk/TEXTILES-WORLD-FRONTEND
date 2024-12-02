"use client";

import { useState, useEffect } from "react";
import TopHeader from "../components/TopHeader/TopHeader"; 
import Header from "../components/Header/Header";
import Modal from "@/components/Modal/Modal";
import { BottomBar } from "@/components/BottomBar/BottomBar";
import { useDispatch } from "react-redux";
import { setInitialCartData } from "./GlobalRedux/cartSlice";
import Footer from "@/components/Footer/Footer";

interface CartItem {
  price: number;
  quantity: number;
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [anchorRef, setAnchorRef] = useState<HTMLElement | null>(null);
  const [isClient, setIsClient] = useState(false); // Флаг для отслеживания клиентской стороны
  const dispatch = useDispatch();

  useEffect(() => {
    // Убедитесь, что код выполняется только на клиенте
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Теперь localStorage доступен только на клиенте
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const cartItems: CartItem[] = JSON.parse(storedCart);
        const totalPrice = cartItems.reduce(
          (sum: number, item: CartItem) => sum + item.price * item.quantity,
          0
        );
        const totalQuantity = cartItems.reduce(
          (sum: number, item: CartItem) => sum + item.quantity,
          0
        );
        dispatch(setInitialCartData({ itemsCart: cartItems, totalPrice, totalQuantity }));
      }
    }
  }, [dispatch, isClient]);

 

  return (
    <>
      <TopHeader setActive={setActive} setAnchorRef={setAnchorRef} />
      <Header />
      {children}
      <Footer />
      <BottomBar />
      <Modal setActive={setActive} active={active} anchorRef={anchorRef} />
    </>
  );
}
 