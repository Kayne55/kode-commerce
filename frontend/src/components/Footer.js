import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import '../scss/main.scss';
import '../scss/ks-footer.scss';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="ks-footer">
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className="ks-section-heading ks-footer-heading">
              <div className="ks-brand">
                motostop<span className="ks-text-primary">.</span>
              </div>
              <div className="ks-footer-subscribe flex-grow-1 justify-content-end">
                <div className="ks-footer-subscribe-form">
                  <h3>Subscribe For Updates</h3>
                  <Form>
                    <Form.Group>
                      <InputGroup>
                        <FormControl
                          type="email"
                          placeholder="Your email address..."
                        ></FormControl>
                        <Button className="ks-btn ks-btn-primary-light">
                          Send it
                          <i className="fas fa-arrow-right ks-btn-icon"></i>
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col md={4} lg={2}>
            <ul className="ks-footer-menu">
              <li>
                <Link to="">Login</Link>
              </li>
              <li>
                <Link to="">My Account</Link>
              </li>
              <li>
                <Link to="">Orders</Link>
              </li>
              <li>
                <Link to="">Shipping</Link>
              </li>
            </ul>
          </Col>
          <Col md={4} lg={2}>
            <ul className="ks-footer-menu">
              <li>
                <Link to="">Frequent Questions</Link>
              </li>
              <li>
                <Link to="">Returns Policy</Link>
              </li>
              <li>
                <Link to="">Sizing Guides</Link>
              </li>
              <li>
                <Link to="">Order Tracking</Link>
              </li>
            </ul>
          </Col>
          <Col md={4} lg={2}>
            <ul className="ks-footer-menu">
              <li>
                <Link to="">About Us</Link>
              </li>
              <li>
                <Link to="">Contact Us</Link>
              </li>
              <li>
                <Link to="">Careers</Link>
              </li>
            </ul>
          </Col>
          <Col md={6} lg={3} style={{ marginTop: '15px' }}>
            <p>
              <b>Drop us a line:</b>
              <br />
              <a href="tel: +27217654321">+27-21-765-4321</a>
            </p>
            <p>
              <b>Send an Electronic Mail:</b>
              <br />
              <a href="mailto: info@motostop.com">info@motostop.com</a>
            </p>
            <p>
              <b>Pull in:</b>
              <br />
              123 Fourth Avenue, Cape Town, South Africa, Earth, 8001
            </p>
          </Col>
          <Col md={6} lg={3} className="ks-footer-social-container">
            <div className="ks-footer-social">
              <div className="ks-section-heading">
                <hr className="ks-hr-primary" />
                <h3>Follow Us</h3>
              </div>
              <h4 className="ks-section-subheading text-end ks-text-primary">
                You stalker
              </h4>
            </div>
            <div className="ks-footer-social-icons">
              <ul>
                <li>
                  <i className="fab fa-instagram"></i>
                </li>
                <li>
                  <i className="fab fa-facebook-square"></i>
                </li>
                <li>
                  <i className="fab fa-youtube"></i>
                </li>
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <small>
              &copy; {new Date().getFullYear()} Motostop. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
