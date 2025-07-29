import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { FastOrdersResponse } from '../../api/generated/model/fast-orders-response.ts'
import { Order } from '../../api/index.ts'

interface FastOrderState {
    fastOrders: FastOrdersResponse;
    loading: boolean;
    error: string | null;
}

export const fetchFastOrders = createAsyncThunk(
    "orders/fetchFastOrders",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await Order.getFastOrders(userId);

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message ?? "Failed to fetch fast orders");
        }
    }
);

const initialState: FastOrderState = {
    fastOrders: {},
    loading: false,
    error: null,
};

const fastOrdersSlice = createSlice({
    name: "fastOrders",
    initialState,
    reducers: {
        clearFastOrders: (state) => {
            state.fastOrders = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFastOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFastOrders.fulfilled, (state, action: PayloadAction<FastOrdersResponse>) => {
                state.loading = false;
                state.fastOrders = action.payload;
            })
            .addCase(fetchFastOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearFastOrders } = fastOrdersSlice.actions;
export default fastOrdersSlice.reducer;
