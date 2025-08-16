import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Order } from '../../api/index.ts'
import {OrderResponse} from "../../../src/api/generated";

interface OrderState {
    order: OrderResponse | null;
    loading: boolean;
    error: string | null;
}

export const fetchOrder = createAsyncThunk(
    "orders/fetchOrder",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await Order.getOrder(userId);

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message ?? "Failed to fetch fast orders");
        }
    }
);

const initialState: OrderState = {
    order: null,
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearOrder: (state) => {
            state.order = null;
        },
        addOrder: (state, action: PayloadAction<OrderResponse>) => {
            state.order = action.payload; // Always replace with the new item
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<OrderResponse>) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
