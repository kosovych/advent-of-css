import { useContext } from 'react';

import './index.css';

import menu from '../../../constants/menu.json';

import CardContext from '../../../context/CardContext';

const CartTotal = () => {
  const { value } = useContext(CardContext);
  const totalDishesPrice = Object.keys(value).reduce((total, key) => {
    const currentDish = menu.find(dish => +dish.id === +key);
    const price = +((value[key] * currentDish.price * 100) / 100).toFixed(2);
    total = +(((price + total) * 100) / 100).toFixed(2);
    return total;
  }, 0);
  const tax = (totalDishesPrice * 0.05).toFixed(2);
  const total = (+tax + totalDishesPrice).toFixed(2);

  return (
    <div className="cart-total">
      <p className="cart-total__row">
        <span className="cart-total__row-title">Subtotal:</span>
        <span className="cart-total__value">
          ${totalDishesPrice}
        </span>
      </p>
      <p className="cart-total__row">
        <span className="cart-total__row-title">Tax:</span>
        <span className="cart-total__value">
          ${tax}
        </span>
      </p>
      <p className="cart-total__row">
        <span className="cart-total__row-title">Total:</span>
        <span className="cart-total__value cart-total__value--main">
          ${total}
        </span>
      </p>
    </div>
  )
};

export default CartTotal;
