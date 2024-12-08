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

interface CartItem {   
	price: number;
	quantity: number;
}

export default function ClientWrapper({
	children
}: {
	children: React.ReactNode;
}) {
  const [actives, setActives] = useState(false); 
	const [active, setActive] = useState(false);
	const [anchorRef, setAnchorRef] = useState<HTMLElement | null>(null);
	const [isClient, setIsClient] = useState(false); // Флаг для отслеживания клиентской стороны
	const dispatch = useDispatch();

  const pathname = usePathname();    

  const { isAuthenticated, user, isLoading, accessToken } = useSelector((state: RootState) => state.auth);
 
 
  const isAdminPage = isClient && pathname.startsWith('/admin'); 

  let tokenRefreshTimeout: NodeJS.Timeout | null = null;

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
		// Убедитесь, что код выполняется только на клиенте
		setIsClient(true);
	}, []);
   
 
  
	useEffect(() => {
		if (isClient) {
			// Теперь localStorage доступен только на клиенте
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

	return (
		<> 
		{!isAdminPage && <TopHeader setActive={setActive} setActives={setActives} setAnchorRef={setAnchorRef} />}
    {!isAdminPage && <Header />}  
			{children}   
      {!isAdminPage && <Footer />} 
      {!isAdminPage && <BottomBar />} 
			<Modal setActive={setActive} active={active} anchorRef={anchorRef} />
      <Modals setActives={setActives} active={actives}  />
		</> 
	); 
} 
