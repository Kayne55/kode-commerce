import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: true, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: 'R0 to R1000',
    value: '0-1000',
  },
  {
    name: 'R1001 to R2500',
    value: '1001-2500',
  },
  {
    name: 'R2501 to R5000',
    value: '2501-5000',
  },
  {
    name: 'R5001 to R10000',
    value: '5001-10000',
  },
  {
    name: 'R10001 to R25000',
    value: '10001-25000',
  },
  {
    name: 'R25001 to R50000',
    value: '25001-50000',
  },
];

export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },
  {
    name: '3stars & up',
    rating: 3,
  },
  {
    name: '2stars & up',
    rating: 2,
  },
  {
    name: '1stars & up',
    rating: 1,
  },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // get the URL Params: example: /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'latest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? '' : '/search?'
    }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <Card className="kode-search-filters">
            <Card.Body>
              <h3>Department</h3>
              <div>
                <ul>
                  <li>
                    <Link
                      className={'all' === category ? 'fw-bold' : ''}
                      to={getFilterUrl({ category: 'all' })}
                    >
                      Any
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === category ? 'fw-bold' : ''}
                        to={getFilterUrl({ category: c })}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Price</h3>
                <ul>
                  <li>
                    <Link
                      className={'all' === price ? 'fw-bold' : ''}
                      to={getFilterUrl({ price: 'all' })}
                    >
                      Any
                    </Link>
                  </li>
                  {prices.map((p) => (
                    <li key={p.value}>
                      <Link
                        className={p.value === price ? 'fw-bold' : ''}
                        to={getFilterUrl({ price: p.value })}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Avg. Customer Rating</h3>
                <ul>
                  {ratings.map((r) => (
                    <li key={r.name}>
                      <Link
                        className={
                          `${r.rating}` === `${rating}` ? 'fw-bold' : ''
                        }
                        to={getFilterUrl({ rating: r.rating })}
                      >
                        <Rating caption={' & up'} rating={r.rating}></Rating>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      className={'all' === rating ? 'fw-bold' : ''}
                      to={getFilterUrl({ rating: 'all' })}
                    >
                      <Rating caption={' & up'} rating={0}></Rating>
                    </Link>
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? 'No' : countProducts} Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Price ' + price}
                    {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    rating !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        <i className="fas fa fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{' '}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="latest">Latest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Rating</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Products Found</MessageBox>
              )}

              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: '/search',
                      search: getFilterUrl({ page: x + 1 }, true),
                    }}
                  >
                    <Button
                      className={
                        Number(page) === x + 1
                          ? 'btn btn-primary btn-sm me-md-1'
                          : 'btn btn-secondary btn-sm me-md-1'
                      }
                      variant="primary"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
