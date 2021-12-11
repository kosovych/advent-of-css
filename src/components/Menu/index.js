import Card from '../shared/Card';
import Dish from './Dish';

import './index.css';
import menu from '../../constants/menu.json';

const getColor = index => {
  const item = index % 4;
  switch (true) {
    case item === 0:
      return 'rgba(122, 179, 243, 0.2)';

    case item === 1:
      return 'rgba(233, 121, 178, 0.2)';

    case item === 2:
      return 'rgba(215, 215, 249, 0.2)';

    case item === 3:
      return 'rgba(120, 247, 187, 0.2)';
  
    default:
      return 'rgba(122, 179, 243, 0.2)';
  }
}

const Menu = () => {
  const menuList = (
  <ul className="menu-list">
    {menu.map((dish, index) => <Dish dish={dish} bg={getColor(index)} key={dish.id} />)}
  </ul>
  );
  return (
    <Card
      title="To Go Menu"
      body={menuList}
    />
  );
};

export default Menu;
