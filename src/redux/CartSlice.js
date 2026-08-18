import { createSlice } from "@reduxjs/toolkit";

let cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      let item = state.find((s) => (s.id == action.payload.id));
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      let item = state.find((s) => (s.id == action.payload.id));
      if(item){
           const index = state.findIndex((s) => s.id === action.payload.id); 
           state.splice(index,1);
      }
    },

    decCart: (state,action) =>{
        let item = state.find((s) => (s.id == action.payload.id));

        if(item){
            if(item.quantity>1){
                item.quantity -= 1; 
            }
            else{
               const index = state.findIndex((s) => s.id === action.payload.id); 
               state.splice(index,1);
            }
        }
    },
    incCart: (state,action) =>{
        let item = state.find((s) => (s.id == action.payload.id));

        if(item){
            if(item.quantity<6){
                item.quantity += 1; 
            }
            else{
              alert("The Quantity exceeded....")
            }
        }
    },
    clearCart: () => {
      return [];
    }
  }
});

export const { addToCart,decCart,removeFromCart, incCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
