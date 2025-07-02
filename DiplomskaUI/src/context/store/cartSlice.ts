import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: string;
    image: string;
    title: string;
    description: string;
}

interface CartState {
    item: CartItem | null; // Only one item allowed
}

const initialState: CartState = {
    item: null, // Cart starts empty
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.item = action.payload; // Always replace with the new item
        },
        removeItem: (state) => {
            state.item = null; // Clear cart
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
