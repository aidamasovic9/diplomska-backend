import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import restaurantReducer from "./restaurantSlice";
import fastOrdersReducer from "./fastOrdersSlice";
import orderReducer from "./orderSlice";
import favoriteUsersReducer from './favoriteUsersSlice';
import dinnerProposalReducer from './dinnerProposalSlice';
import myDinnerProposalReducer from './myDinnerProposalSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        restaurants: restaurantReducer,
        fastOrders: fastOrdersReducer,
        order: orderReducer,
        favoriteUsers: favoriteUsersReducer,
        dinnerProposals: dinnerProposalReducer,
        myDinnerProposal: myDinnerProposalReducer,
    },
});

// Export store and types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
