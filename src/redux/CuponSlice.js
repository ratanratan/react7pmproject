import { createSlice } from "@reduxjs/toolkit";
import { coupons } from "../data/cupons";

const cuponSlice = createSlice({
  name: "cupon",
  initialState: {
    code: "",
    discount: 0,
    applied: false,
    message: "",
  },
    reducers: {
        applyCupon: (state, action) => {
        //reading the client entered cupon code and converting it to uppercase for case-insensitive comparison
      const finalCuponCode = action.payload.toUpperCase();
      
      // Check if the entered coupon code exists in the coupons object
      if (finalCuponCode in coupons) {
        state.code = finalCuponCode;
        state.discount = coupons[finalCuponCode];
        state.applied = true;
        state.message = `Coupon "${finalCuponCode}" applied! You got ${coupons[finalCuponCode]}% off.`;
      } else {
        state.message = `Invalid coupon code.`;
      }
    },
    resetCoupon: (state) => {
      state.code = "";
      state.discount = 0;
      state.applied = false;
      state.message = "";
    },
  },
});

export const { applyCupon, resetCoupon } = cuponSlice.actions;

export default cuponSlice.reducer;