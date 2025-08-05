import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import restaurantReducer from "./restaurantSlice";
import fastOrdersReducer from "./fastOrdersSlice";
import orderReducer from "./orderSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        restaurants: restaurantReducer,
        fastOrders: fastOrdersReducer,
        order: orderReducer,
    },
});

// Export store and types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
