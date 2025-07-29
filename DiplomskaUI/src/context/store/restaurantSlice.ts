import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RestaurantResponse } from '../../api/generated/model/restaurant-response'
import { Restaurant } from '../../api/index.ts'

interface RestaurantState {
    restaurants: RestaurantResponse[];
    loading: boolean;
    error: string | null;
}

export const fetchRestaurants = createAsyncThunk(
    "restaurants/fetchRestaurants",
    async (city: string, { rejectWithValue }) => {
        try {
            const response = await Restaurant.getRestaurants(city);

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message ?? "Failed to fetch restaurants");
        }
    }
);

const initialState: RestaurantState = {
    restaurants: [],
    loading: false,
    error: null,
};

const restaurantSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        clearRestaurants: (state) => {
            state.restaurants = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRestaurants.fulfilled, (state, action: PayloadAction<RestaurantResponse[]>) => {
                state.loading = false;
                state.restaurants = action.payload;
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
