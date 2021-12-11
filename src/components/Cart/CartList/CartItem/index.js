import './index.css';
import { ReactComponent as Icon } from '../../../../img/chevron.svg';

const CartItem = ({currentDish, amount, addItem, removeItem}) => (
  <section className="cart-item">
    <div className="cart-item__img">
      <img src={`/img/${currentDish.image}`} alt={currentDish.title} />
      <span
        className="cart-item__img-amount"
        style={{ padding: amount > 9 ? '0 4px' : '0' }}
      >
        {amount}
      </span>
    </div>
    <div className="cart-item__content">
      <h3 className="cart-item__title">{currentDish.title}</h3>
      <p className="cart-item__price">${currentDish.price}</p>
      <div className="cart-item__total">
        <div className="cart-item__actions">
          <button
            onClick={() => removeItem(currentDish.id)}
            className="cart-item__btn"
            aria-label="More"
          >
            <Icon />
          </button>
          <span className="cart-item__actions-amount">{amount}</span>
          <button
            onClick={() => addItem(currentDish.id)}
            className="cart-item__btn cart-item__btn--more"
            aria-label="Less"
          >
            <Icon />
          </button>
        </div>
        <p className="cart-item__total-price">
          ${+((amount * currentDish.price * 100) / 100).toFixed(2)}
        </p>
      </div>
    </div>
  </section>
);

export default CartItem;
