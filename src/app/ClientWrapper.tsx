"use client";

import { useState, useEffect } from "react";
import TopHeader from "../components/TopHeader/TopHeader"; 
import Header from "../components/Header/Header";
import Modal from "@/components/Modal/Modal";
import { BottomBar } from "@/components/BottomBar/BottomBar";
import { useDispatch } from "react-redux";
import { setInitialCartData } from "./GlobalRedux/cartSlice";
import Footer from "@/components/Footer/Footer";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [anchorRef, setAnchorRef] = useState<HTMLElement | null>(null);
  const [isClient, setIsClient] = useState(false); // Add a client-side check
  const dispatch = useDispatch();
 

  useEffect(() => {
    setIsClient(true); // Ensures this runs only on the client-side

    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        const totalPrice = cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const totalQuantity = cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        dispatch(setInitialCartData({ itemsCart: cartItems, totalPrice, totalQuantity }));
      }
    }
  }, [dispatch]);
 
   
   

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
 