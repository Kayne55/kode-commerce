import data from './data';

function App() {
  return (
    <div>
      <header>
        <a href="/">Kode Store</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="kode-products">
          {data.products.map((product) => (
            <div className="kode-product" key={product.slug}>
              <div className="kode-product-img">
                <a href={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </a>
              </div>
              <div className="kode-product-info">
                <a href={`/product/${product.slug}`}>
                  <h3>{product.name}</h3>
                </a>
                <p>{product.price}</p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
