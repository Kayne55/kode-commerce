import React from 'react';
import '../scss/main.scss';
import '../scss/ks-categories.scss';
import { Link } from 'react-router-dom';

export default function FeaturedCategory(props) {
  return (
    <div
      className="ks-cat-card"
      style={props.image && { backgroundImage: 'url(' + props.image + ')' }}
    >
      <Link to={props.url} className="ks-cat-card-inner">
        <h3>{props.title}</h3>
        <hr />
      </Link>
    </div>
  );
}
