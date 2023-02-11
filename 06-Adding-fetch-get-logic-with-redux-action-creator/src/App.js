import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';
// import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {

  // to get access to showNotification in ui-slice
  const dispatch = useDispatch();

  // below passed function receives redux state automatically, drill into the key in the store and then extract which propert to use
  const showCart = useSelector(state => state.ui.cartIsVisible);

  // useSelector to get hold og overall cart
  const cart = useSelector((state) => state.cart);


  // getting notification property form ui-slice
  const notification = useSelector(state => state.ui.notification);

  // for fetching list from database, will only run initially once 
  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch]);


  // allow us to sideeffect, and to run when dependencies changes
  useEffect(() => {

    if(isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));

    // NOT NEEDED, HANDLED IN cart-slice
    // const sendCartData = async () => {

      // dispatch(
      //   uiActions.showNotification({
      //     status: 'pending',
      //     title: 'Sending...',
      //     message: 'Sending cart data!',
      //   })
      // );

      // const url = 'https://react-http-43b44-default-rtdb.firebaseio.com/cart.json';
      // const response = await fetch(url, { 
      //   method: 'PUT', 
      //   body: JSON.stringify(cart),
      // });

      // if(!response.ok) {
      //   throw new Error('Sending cart data failed.');
      // }

      // dispatch(
      //   uiActions.showNotification({
      //     status: 'success',
      //     title: 'Success!',
      //     message: 'Sent cart data successfully!',
      //   })
      // );
    // };

    // if(isInitial) {
    //   isInitial = false;
    //   return;
    // }

    // sendCartData().catch(error => {
      // dispatch(
      //     uiActions.showNotification({
      //       status: 'error',
      //       title: 'Error',
      //       message: 'Sending cart data failed!',
      //     })
      //   );
    // });
  
  
  },[cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification 
          status={notification.status} 
          title={notification.title} 
          message={notification.message}
        />
      )}
      <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
