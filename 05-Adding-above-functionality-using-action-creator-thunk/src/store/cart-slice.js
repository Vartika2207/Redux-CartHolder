import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        items: [], 
        totalQuantity: 0,
    },
    reducers: {
        // below are functions which this part of our state can handle
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id );
            state.totalQuantity++;
            if(!existingItem) {
                // we must not manipulate state as here we are doing push in state but with redux toolkit ensure it doesn't manipulate existing state
                state.items.push({
                    id: newItem.id, 
                    price: newItem.price, 
                    quantity: 1, 
                    totalPrice: newItem.price,
                    name: newItem.title,
                });
            } else {
                existingItem.quantity++; //existingItem.quantity = existingItem.quantity++; 
                existingItem.totalPrice += newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload; 
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;

            if(existingItem.quantity === 1) {
                // if === true, item will be filtered out
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
    }
});

// creating thunk
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
                body: JSON.stringify(cart),
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


export const cartActions = cartSlice.actions;

export default cartSlice;