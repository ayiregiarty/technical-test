import { FC } from 'react';
import Link from 'next/link';
import '../styles/globals.css';

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const ProductCard: FC<ProductCardProps> = ({ id, title, description, price, thumbnail }) => {
  return (
    <div className="product-card">
      <img src={thumbnail} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>${price}</p>
      <Link href={`/product/${id}`}>
        <p>View Details</p>  {/* Use passHref to make this valid */}
      </Link>
    </div>
  );
};

export default ProductCard;
