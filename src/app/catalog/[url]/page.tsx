import React from 'react';
import ProductPageClient from './ProductPageClient';
import { Product } from '@/types/index';
import { getHits } from '@/app/lib/api/getTovars';

interface ProductPageProps {
  params: Promise<{
    url: string; 
  }>;
} 


export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;  
  const { url} = resolvedParams; 

  const hits = await getHits();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${url}`, {
    cache: 'no-store', 
  });

  if (!response.ok) {
    return <div>Товар не найден</div>;
  }

  const product: Product = await response.json(); 



  return <ProductPageClient hits={hits} url={url} product={product} />;
}
 