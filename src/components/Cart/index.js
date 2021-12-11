import React, { useContext, useEffect, useRef } from 'react';

import './index.css';

import CardContext from '../../context/CardContext';
import Card from '../shared/Card';
import CartList from './CartList';
import CartTotal from './CartTotal';

const Cart = () => {
  const { value, addItem, removeItem, setCartRef } = useContext(CardContext);
  const ref = useRef(null);
  const isEmpty = Object.values(value).every(el => el === 0);
  useEffect(() => {
    setCartRef(ref);
  }, []);
  return (
    <div ref={ref} className="cart__wrapper">
      <Card
        title="Your Cart"
        body={
          isEmpty ? (
            <p className="cart__empty">Your cart is empty.</p>
          ) : (
            <>
              <CartList value={value} addItem={addItem} removeItem={removeItem} />
              <CartTotal />
            </>
          )
        }
      />
    </div>
  )
};

export default Cart;
