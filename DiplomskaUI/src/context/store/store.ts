import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import restaurantReducer from "./restaurantSlice";
import fastOrdersReducer from "./fastOrdersSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        restaurants: restaurantReducer,
        fastOrders: fastOrdersReducer,
    },
});

// Export store and types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
