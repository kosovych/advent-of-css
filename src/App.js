import { useState } from 'react';

import './App.css';

import Cart from './components/Cart';
import Menu from './components/Menu';

import CardContext, { value } from './context/CardContext';

function App() {
  const [state, setState] = useState(value);
  const [cartRef, setCartRef] = useState(null);

  const addItem = (id) => setState({...state, [id]: state[id] + 1});

  const removeItem = (id) => {
    const newValue = state[id] - 1;
    setState({...state, [id]: newValue <= 0 ? 0 : newValue });
  }

  const setCartRefHandler = (ref) => setCartRef(ref);

  return (
    <CardContext.Provider value={{ value: state, addItem, removeItem, cartRef, setCartRef: setCartRefHandler }}>
      <div className="app">
        <div className="app__inner">
          <Menu />
          <Cart />
        </div>
      </div>
    </CardContext.Provider>
  );
}

export default App;
