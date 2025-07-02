import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import the reducer we will create

const store = configureStore({
    reducer: {
        cart: cartReducer, // Add cart reducer to store
    },
});

// Export store and types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
