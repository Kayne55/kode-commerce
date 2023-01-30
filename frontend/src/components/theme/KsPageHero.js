import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import '../../scss/ks-page-hero.scss';
import '../../scss/ks-button.scss';
import KsButton from './KsButton.js';

export default function PageHero(props) {
  return (
    <section
      className="ks-hero"
      style={{
        backgroundImage: 'url(' + props.bg + ')',
        minHeight: props.height + 'vh',
      }}
    >
      <Container fluid className="ks-container-full">
        <Row>
          <Col md={12}>
            <div className="ks-hero-heading ks-section-heading-left">
              <h1>{props.title}</h1>
              <div className="ks-hero-heading-divider"></div>
            </div>
          </Col>
          <Col md={6}>
            <h2 className="ks-hero-subheading">{props.subtitle}</h2>
            <KsButton
              variant="primary-light"
              name={props.ctatext}
              link={props.ctalink}
            />
          </Col>
          <Col md={6}>
            <p>{props.bodytext}</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
