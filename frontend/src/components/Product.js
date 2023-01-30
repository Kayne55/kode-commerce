import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useContext } from 'react';
import { Store } from '../Store';
import '../scss/ks-product-card.scss';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, this product is out of stock!');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const addToWishlistHandler = () => {};

  return (
    <Card key={product.slug} className="mb-3 ks-product-card">
      <Link to={`/product/${product.slug}`}>
        <div className="ks-product-card-img">
          <img
            className="card-img-top"
            src={product.image}
            alt={product.name}
          />
        </div>
      </Link>
      <Card.Body>
        <Card.Title className="ks-product-card-title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </Card.Title>
        {product.numReviews === 0 ? (
          <span>No rating</span>
        ) : (
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
            caption=" "
          />
        )}
        <Card.Text className="text-end">
          <strong>R{product.price}</strong>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="ks-product-card-footer">
        {product.countInStock === 0 ? (
          <button disabled>Out of Stock</button>
        ) : (
          <button
            className="ks-product-card-btn-ac"
            onClick={() => addToCartHandler(product)}
          >
            <i className="fas fa-cart-plus"></i> Add to Cart
          </button>
        )}

        <button
          className="ks-product-card-btn-wl"
          onClick={() => addToWishlistHandler(product)}
        >
          <i className="far fa-heart ks-text-red"></i> Wishlist
        </button>
      </Card.Footer>
    </Card>
  );
}

export default Product;
