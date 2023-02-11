import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


export const fetchCartData = () => {
    return ( async (dispatch) => {
        const fetchData = async () => {
            const url = 'https://react-http-43b44-default-rtdb.firebaseio.com/cart.json';
            const response = await fetch(url);

            if(!response.ok) {
                throw new Error('Failed to fetch cart data');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [], // to avoid fetching empty array (i.e. null) when cart is empty
                totalQuantity: cartData.totalQuantity,
            }));

        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: 'error',
                  title: 'Error',
                  message: 'Fetching cart data failed!',
                })
            );
        }
    });
};

export const sendCartData = (cart) => {
    return ( async (dispatch) => {
        // dispatch action needed to perform
        dispatch(
            uiActions.showNotification({
              status: 'pending',
              title: 'Sending...',
              message: 'Sending cart data!',
            })
          );

        const sendRequest = async () => {
            const url = 'https://react-http-43b44-default-rtdb.firebaseio.com/cart.json';
            const response = await fetch(url, { 
                method: 'PUT', 
                body: JSON.stringify(cart), // put whole cart properties like items, totalQualtity, changed on DB
            });

            if(!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        };  

        try {
            // await bcz sendRequest is a async function returning a promise
            await sendRequest();

            dispatch(
                uiActions.showNotification({
                  status: 'success',
                  title: 'Success!',
                  message: 'Sent cart data successfully!',
            })
          );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: 'error',
                  title: 'Error',
                  message: 'Sending cart data failed!',
                })
              );
        };
    });  
};
