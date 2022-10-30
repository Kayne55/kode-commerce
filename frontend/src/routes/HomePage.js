import { Link } from 'react-router-dom';
import data from '../data';

function HomePage() {
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="kode-products">
        {data.products.map((product) => (
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
              <p>{product.price}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
