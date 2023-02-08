import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartIsVisible: false },
    // map of mathods that represent all diff actions
    reducers: {
        toggle(state) {
            // this state is old-state, not manipulating existing state but toolkit create new state
            state.cartIsVisible = !state.cartIsVisible;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;







