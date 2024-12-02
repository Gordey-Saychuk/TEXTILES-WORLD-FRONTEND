'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './tracking.module.css';

interface Order {
  id: number;
  total_price: number;
  name: string;
  address: string;
  payment_status: string;
  order_status: string;
  products: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  created_at: string;
}

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]); // Explicitly type orders as an array of Order
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  
  // session_id can be null if it's not available in localStorage
  const session_id: string | null = typeof window !== 'undefined' ? localStorage.getItem('session_id') : null;

  useEffect(() => {
    if (!session_id) {
      console.log('No session ID found');
      setIsLoading(false);
      return;
    }
    console.log(session_id);

    // Explicitly type sessionId as a string
    const getGuestOrders = async (sessionId: string) => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}orders/session/${sessionId}`);
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders. Please try again later.');
        console.error('Error fetching guest orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getGuestOrders(session_id);
  }, [session_id]);

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.loader}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Orders</h1>
      {orders.length > 0 ? (
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <li key={order.id} className={styles.orderItem}>
              <div className={styles.orderHeader}>
                <span>Order #{order.id}</span>
                <span>${order.total_price}</span>
              </div>
              <div className={styles.orderDetails}>
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Payment Status:</strong> {order.payment_status}</p>
                <p><strong>Order Status:</strong> {order.order_status}</p>
                <p><strong>Products:</strong></p>
                <ul className={styles.productList}>
                  {order.products.map((product) => (
                    <li key={product.id}>
                      {product.name} - ${product.price} x {product.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <p className={styles.createdAt}>
                Created at: {new Date(order.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
}
 