import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  // below passed function receives redux state automatically, drill into the key in the store and then extract which propert to use
  const showCart = useSelector(state => state.ui.cartIsVisible);

  // useSelector to get hold og overall cart
  const cart = useSelector((state) => state.cart);

  // allow us to sideeffect, and to run when dependencies changes
  useEffect(() => {
    const url = 'https://react-http-43b44-default-rtdb.firebaseio.com/cart.json';
    fetch(url, { 
      method: 'PUT', 
      body: JSON.stringify(cart),
    });
  },[cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
