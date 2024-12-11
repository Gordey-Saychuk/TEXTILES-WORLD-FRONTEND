import React from 'react';
import ProductPageClient from './ProductPageClient';
import { Product } from '@/types/index';

interface ProductPageProps {
  params: { 
    url: string; 
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { url } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${url}`, {
    cache: 'no-store', 
  });

  if (!response.ok) {
    return <div>Товар не найден</div>;
  }

  const product: Product = await response.json(); 

  return <ProductPageClient url={url} product={product} />;
}
