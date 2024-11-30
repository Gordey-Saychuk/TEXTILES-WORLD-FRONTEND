import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  old_price: number;
}

interface CounterState {
  totalPrice: number;
  totalOldPrice: number;
  totalQuantity: number;
  itemsCart: CartItem[]; 
}

const getInitialCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const calculateTotals = (itemsCart: CartItem[]) => {
  let totalPrice = 0;
  let totalOldPrice = 0;
  let totalQuantity = 0;

  itemsCart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalOldPrice += item.old_price * item.quantity;
    totalQuantity += item.quantity;
  });

  return { totalPrice, totalOldPrice, totalQuantity };
};

const initialState: CounterState = {
  itemsCart: getInitialCart(),
  ...calculateTotals(getInitialCart()),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItem = state.itemsCart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.itemsCart.push({ ...action.payload, quantity: 1 });
      }

      const totals = calculateTotals(state.itemsCart);
      state.totalPrice = totals.totalPrice;
      state.totalOldPrice = totals.totalOldPrice;
      state.totalQuantity = totals.totalQuantity;

      localStorage.setItem("cart", JSON.stringify(state.itemsCart));
    },
    removeItem(state, action) {
      state.itemsCart = state.itemsCart.filter(
        (item) => item.id !== action.payload.id
      );

      const totals = calculateTotals(state.itemsCart);
      state.totalPrice = totals.totalPrice;
      state.totalOldPrice = totals.totalOldPrice;
      state.totalQuantity = totals.totalQuantity;

      localStorage.setItem("cart", JSON.stringify(state.itemsCart));
    },
    setInitialCartData(state, action) {
      state.itemsCart = action.payload.itemsCart;
      const totals = calculateTotals(state.itemsCart);
      state.totalPrice = totals.totalPrice;
      state.totalOldPrice = totals.totalOldPrice;
      state.totalQuantity = totals.totalQuantity;
    },
  },
});

export const { addItem, removeItem, setInitialCartData } = cartSlice.actions;
export default cartSlice.reducer;
 