import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './routes/HomePage';
import ProductPage from './routes/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from './Store';
import CartPage from './routes/CartPage';
import SigninPage from './routes/SigninPage';
import ShippingAddressPage from './routes/ShippingAddressPage';
import SignupPage from './routes/SignupPage';
import PaymentMethodPage from './routes/PaymentMethodPage';
import PlaceOrderPage from './routes/PlaceOrderPage';
import OrderPage from './routes/OrderPage';
import OrderHistoryPage from './routes/OrderHistoryPage';
import ProfilePage from './routes/ProfilePage';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchPage from './routes/SearchPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './routes/DashboardPage';
import AdminRoute from './components/AdminRoute';
import ProductListPage from './routes/ProductListPage';
import ProductEditPage from './routes/ProductEditPage';
import ProductAddPage from './routes/ProductAddPage';
import OrderListPage from './routes/OrderListPage';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSideBarIsOpen] = useState(false);
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
  }, []);
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSideBarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>Kode Store</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="success">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="/#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <main className="mt-3">
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/payment" element={<PaymentMethodPage />} />
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/addproduct"
                element={
                  <AdminRoute>
                    <ProductAddPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListPage />
                  </AdminRoute>
                }
              />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <div>
          <Offcanvas
            show={sidebarIsOpen}
            onHide={() => setSideBarIsOpen(false)}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Categories</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                {/* <Nav.Item>
                  <h4>Categories</h4>
                </Nav.Item> */}
                <Nav.Item>
                  {categories.map((category) => (
                    <Nav.Item key={category}>
                      <LinkContainer
                        to={{
                          pathname: '/search',
                          search: `category=${category}`,
                        }}
                        onClick={() => setSideBarIsOpen(false)}
                      >
                        <Nav.Link>{category}</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                  ))}
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <footer>
          <div className="text-center">
            <p>Copyright 2022 Kode Store. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
