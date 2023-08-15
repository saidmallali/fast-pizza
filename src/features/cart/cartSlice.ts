import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../entities/Cart";
import { RootState } from "../../store";

const initialState: {
  cart: Cart[];
} = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem

      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload == pizzaId
      state.cart = state.cart.filter((crt) => crt.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      //payload = pizzaId
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

//we can use reselect librerai in case if the apllication is to big
export const getTotaleCartPrice = (state: RootState) =>
  state.cart.cart.reduce((acc, currentV) => acc + currentV.totalPrice, 0);

export const getTotaleCartItems = (state: RootState) =>
  state.cart.cart.reduce((acc, cv) => acc + cv.quantity, 0);

export const getCart = (state: RootState) => state.cart.cart;

export const getCurrentQuantityById =
  (id: number | undefined) => (state: RootState) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity;

export const getPizzaItemById =
  (id: number | undefined) => (state: RootState) =>
    state.cart.cart.find((item) => item.pizzaId === id);
