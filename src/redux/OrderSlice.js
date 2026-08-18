import { createSlice } from "@reduxjs/toolkit";

let OrdersSlice = createSlice({
  name: "orders",
  initialState: [], // Initial state is an empty array
  reducers: {
    addOrder: (state, action) => {   
      state.push(action.payload); // Add the new order to the state array
    },   
  },
});

export let { addOrder } = OrdersSlice.actions;
export default OrdersSlice.reducer;