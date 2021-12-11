import { createContext } from 'react';

import menu from '../../constants/menu.json'

export const value = menu.reduce((accumulator, dish) => {
  const { id } = dish;
  return {...accumulator, [id]: 0 };
}, {});

const CardContext = createContext({
  value,
  cartRef: null,
  setCartRef: () => {},
  addItem: () => {},
  removeItem: () => {},
});

export default CardContext;
