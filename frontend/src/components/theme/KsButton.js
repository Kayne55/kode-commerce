import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/ks-button.scss';

export default function KsButton(props) {
  return (
    <div className={'ks-btn ks-btn-' + props.variant}>
      <Link to={props.link}>
        {props.name} <i className="ks-btn-icon fas fa-arrow-right"></i>
      </Link>
    </div>
  );
}
