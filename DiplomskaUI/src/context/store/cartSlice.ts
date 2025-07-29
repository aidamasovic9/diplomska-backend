import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MealResponse } from '../../api/generated/model/meal-response.ts';

interface CartState {
    item: MealResponse | null; // Only one item allowed
}

const initialState: CartState = {
    item: null, // Cart starts empty
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<MealResponse>) => {
            state.item = action.payload; // Always replace with the new item
        },
        removeItem: (state) => {
            state.item = null; // Clear cart
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
