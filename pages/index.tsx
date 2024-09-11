import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/productCard';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const IndexPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            thumbnail={product.thumbnail}
          />
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
      <style jsx>{`
        .product-list {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 16px;
        }
        .pagination button {
          margin: 0 4px;
          padding: 8px 16px;
          border: none;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
          border-radius: 4px;
        }
        .pagination button.active {
          background-color: #005bb5;
        }
        .pagination button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;