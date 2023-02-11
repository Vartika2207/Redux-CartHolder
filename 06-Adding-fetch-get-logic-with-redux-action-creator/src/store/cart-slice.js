import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        items: [], 
        totalQuantity: 0,
    },
    reducers: {

        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },

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


export const cartActions = cartSlice.actions;

export default cartSlice;