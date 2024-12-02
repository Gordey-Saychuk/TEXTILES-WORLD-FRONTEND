'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './tracking.module.css'; 

export default function Page() { 
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  const session_id = typeof window !== 'undefined' ? localStorage.getItem('session_id') : null;
 
  useEffect(() => {
    if (!session_id) {
      console.log('No session ID found');
      setIsLoading(false);
      return;
    } 
    console.log(session_id);
    const getGuestOrders = async (sessionId) => {
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
 