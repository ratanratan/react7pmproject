

import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./CartSlice"
import OrdersReducers from "./OrderSlice"
import cuponReducer from "./CuponSlice";

const store = configureStore({
    reducer: {
        cart : cartReducers,
        orders: OrdersReducers,
        cuponDetails: cuponReducer,
    }
});

export default store;