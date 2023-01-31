import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return { ...state, loadingUpload: false, errorUpload: '' };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

export default function AddProduct() {
  const navigate = useNavigate();

  const [{ loading, loadingUpload }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const addProductHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      await axios.post(
        `/api/products`,
        {
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          isFeatured,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Product created successfully!');
      navigate('/admin/products');
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  const uploadFileHandler = async (e, galleryImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);

    if (file !== undefined) {
      try {
        dispatch({ type: 'UPLOAD_REQUEST' });
        const { data } = await axios.post('/api/upload', bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        dispatch({ type: 'UPLOAD_SUCCESS' });
        if (galleryImages) {
          setImages([...images, data.secure_url]);
        } else {
          setImage(data.secure_url);
        }
        // toast.success('Images uploaded successfully!');
      } catch (err) {
        toast.error(getError(err));
        dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      }
    }
  };

  const deleteFileHandler = async (fileName) => {
    setImages(images.filter((x) => x !== fileName));
    toast.success('Image removed. Click "Update" to apply changes.');
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Add New Product</title>
      </Helmet>
      <h1 className="mb-3">Add New Product</h1>
      <Form onSubmit={addProductHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="slug">
          <Form.Label>Product Slug</Form.Label>
          <Form.Control
            value={slug}
            type="text"
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imageFile">
          <Form.Label>Featured Image</Form.Label>
          <Form.Control type="file" onChange={uploadFileHandler} />
          {loadingUpload && (
            <Spinner animation="border" variant="primary" size="sm" />
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            value={image}
            type="text"
            onChange={(e) => setImage(e.target.value)}
            required
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imageGallery">
          <Form.Label>Image Gallery</Form.Label>
          {images.length === 0 && <MessageBox>No Images</MessageBox>}
          <ListGroup variant="flush">
            {images.map((x) => (
              <ListGroup.Item key={x}>
                {x}
                <Button variant="light" onClick={() => deleteFileHandler(x)}>
                  <i className="fa fa-times-circle"></i>
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="uploadGalleryImages">
          <Form.Label>Upload Gallery Images</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => uploadFileHandler(e, true)}
          />
          {loadingUpload && (
            <Spinner animation="border" variant="primary" size="sm" />
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            value={category}
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            value={brand}
            type="text"
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="countInStock">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            value={countInStock}
            type="number"
            onChange={(e) => setCountInStock(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            value={description}
            as="textarea"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="isFeatured">
          <Form.Check
            value={isFeatured}
            type="checkbox"
            label="Featured Product"
            onChange={(e) => setIsFeatured(e.target.checked)}
            checked={isFeatured}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={loading} type="submit">
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}{' '}
            Add Product
          </Button>
        </div>
      </Form>
    </Container>
  );
}
