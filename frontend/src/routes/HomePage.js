import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import data from '../data';

function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="kode-products">
        {products.map((product) => (
          <div className="kode-product" key={product.slug}>
            <div className="kode-product-img">
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
            </div>
            <div className="kode-product-info">
              <Link to={`/product/${product.slug}`}>
                <h3>{product.name}</h3>
              </Link>
              <p className="kode-product-price">R{product.price}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
