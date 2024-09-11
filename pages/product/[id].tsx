import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductCarousel from '../../components/productCarousel';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  images: string[];
  inStock: boolean;
}

const ProductPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof id === 'string') {
        try {
          const response = await axios.get(`https://dummyjson.com/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <ProductCarousel images={product.images} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
    </div>
  );
};

export default ProductPage;