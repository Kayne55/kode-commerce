import React, { useEffect, useReducer } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, Navigation } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import '../scss/ks-swiper.scss';
import Product from './Product';
import axios from 'axios';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function FeaturedProducts() {
  const [{ products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products/featured');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
      }}
      navigation
      className="ks-product-swiper"
      keyboard={true}
      modules={[Pagination, Keyboard, Navigation]}
      breakpoints={{
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <Product product={product}></Product>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
