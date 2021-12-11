import { useContext } from 'react';

import menu from '../../../constants/menu.json';

import CardContext from '../../../context/CardContext';
import CartItem from './CartItem';

const CartList = () => {
  const { value, addItem, removeItem } = useContext(CardContext);
  const valueKeys = Object.keys(value);
  const cartItems = valueKeys.reduce((items, key) => {
    if(value[key]) {
      const currentDish = menu.find(dish => +dish.id === +key);
      items.push(
        <CartItem
          key={`cart-${currentDish.id}`}
          currentDish={currentDish}
          amount={value[key]}
          addItem={addItem}
          removeItem={removeItem}
        />
      );
    };
    return items;
  }, []);
  
  return (
    <div>
      {cartItems}
    </div>
  );
};

export default CartList;
