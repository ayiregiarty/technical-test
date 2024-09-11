import { FC } from 'react';

interface ProductCarouselProps {
  images: string[];
}

const ProductCarousel: FC<ProductCarouselProps> = ({ images }) => {
  return (
    <div className="carousel">
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Product image ${index + 1}`} />
      ))}
    </div>
  );
};

export default ProductCarousel;
