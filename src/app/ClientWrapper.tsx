// pages/_app.tsx или ваш основной компонент обёртки
'use client';

import { useState, useEffect } from 'react';
import TopHeader from '../components/TopHeader/TopHeader';
import Header from '../components/Header/Header';
import Modal from '@/components/Modal/Modal';
import { BottomBar } from '@/components/BottomBar/BottomBar';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialCartData } from './GlobalRedux/cartSlice';
import Footer from '@/components/Footer/Footer';
import { getUser, loadTokens } from './GlobalRedux/authSlice';
import { usePathname } from 'next/navigation';
import Modals from '@/components/Modals/Modals';
import { RootState } from './GlobalRedux/store'; // Убедитесь, что импортируете RootState

interface CartItem {   
  price: number;
  quantity: number;
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [actives, setActives] = useState(false); 
  const [active, setActive] = useState(false);
  const [anchorRef, setAnchorRef] = useState<HTMLElement | null>(null);
  const [isClient, setIsClient] = useState(false); // Флаг для отслеживания клиентской стороны
  const [modalContent, setModalContent] = useState<React.ReactNode>(null); // Состояние для контента модала
  const dispatch = useDispatch();

  const pathname = usePathname();     

  const { isAuthenticated, user, accessToken } = useSelector((state: RootState) => state.auth);
 
  const isAdminPage = isClient && pathname.startsWith('/admin'); 

  useEffect(() => {
    if (isAuthenticated && !user && accessToken) {
      dispatch(getUser()).unwrap().catch((error) => {
        console.error('Ошибка получения пользователя:', error);
      });
    }
  }, [isAuthenticated, user, accessToken, dispatch]);
   
  useEffect(() => {
    dispatch(loadTokens());
  }, [dispatch]); 

  useEffect(() => {
    setIsClient(true);
  }, []);
   
  useEffect(() => {
    if (isClient) {
      const storedCart = localStorage.getItem('cart');
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
        dispatch(
          setInitialCartData({
            itemsCart: cartItems,
            totalPrice,
            totalQuantity
          })
        );
      }
    }
  }, [dispatch, isClient]);

  // Функция для открытия модала с определённым контентом
  const openModal = (content: React.ReactNode) => {
    console.log('Открытие модального окна с контентом:', content);
    setModalContent(content);
    setActives(true);
  };
   

  return ( 
    <>  
      {!isAdminPage && <TopHeader openModal={openModal} setActive={setActive} setAnchorRef={setAnchorRef} />}
      {!isAdminPage && <Header />}  
      {children}   
      {!isAdminPage && <Footer />} 
      {!isAdminPage && <BottomBar />}  
      <Modal setActive={setActive} active={active} anchorRef={anchorRef} />
      <Modals setActives={setActives} active={actives}>
        {modalContent}
      </Modals>
    </> 
  ); 
}  
