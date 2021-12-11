import { useContext, useRef } from 'react';
import classNames from 'classnames';

import './index.css';

import CardContext from '../../../context/CardContext';

const Dish = ({dish, bg}) => {
  const { addItem, value, cartRef } = useContext(CardContext);
  const isOnCard = Boolean(value[dish.id]);
  const imgEl = useRef(null);
  const handleAdd = () => {
    const img = imgEl.current;
    const imgClone = img.cloneNode();
    const { x, top, height, width } = img.getBoundingClientRect();
    const { top: cartTop, height: cartHeight, left: cartLeft, width: cartWidth } = cartRef.current.getBoundingClientRect();
    console.log(cartRef.current.getBoundingClientRect());
    cartRef.current.getBoundingClientRect()
    const toX = (cartLeft + cartWidth / 2 - width / 2);
    const toY = (cartTop + cartHeight / 2 -  height / 2);
    imgClone.style.setProperty('--toX', toX + 'px');
    imgClone.style.setProperty('--toY', toY + 'px');
    imgClone.style.position = 'fixed';
    imgClone.classList.add('dish__img--clone');
    imgClone.style.left = `${x}px`;
    imgClone.style.top = `${top}px`;
    imgClone.addEventListener('animationend', () => {
        imgClone.remove();
        addItem(dish.id);
      }
    );
    document.body.appendChild(imgClone);
  }
  return (
    <li
      className="dish" key={dish.id}
      style={{ backgroundColor: bg }}
    >
      <h3 className="dish__title">{dish.title}</h3>
      <img
        ref={imgEl}
        className="dish__img"
        src={`/img/${dish.image}`}
        alt={dish.title}
      />
      <p className="dish__price">${dish.price}</p>
      <button
        className={classNames('dish__btn', { 'dish__btn--inCard': isOnCard })}
        onClick={handleAdd}
      >
        {isOnCard ? (
          <span className="dish__btn-inner">
            <svg
              width="22"
              height="17"
              viewBox="0 0 22 17"
              fill="none"  
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.877104 6.28555C1.65815 5.50451 2.92448 5.50451 3.70553 6.28555L7.94817 10.5282L17.8477 0.6287C18.6287 -0.152349 19.895 -0.152348 20.6761 0.6287C21.4571 1.40975 21.4571 2.67608 20.6761 3.45713L7.94817 16.185L0.877104 9.11398C0.0960556 8.33293 0.0960556 7.0666 0.877104 6.28555Z"
                fill="white"
              />
            </svg>
            <span>In Cart</span>
          </span>
        ) : 'Add to Cart'}
      </button>
    </li>
  );
}

export default Dish;
