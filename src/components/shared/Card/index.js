import React from 'react';
import './index.css';

const Card = ({title, body, ...rest}) => (
  <section className="card" {...rest}>
    <h2 className="card__title">{title}</h2>
    <div className="card__body">{body}</div>
  </section>
);

export default Card;
