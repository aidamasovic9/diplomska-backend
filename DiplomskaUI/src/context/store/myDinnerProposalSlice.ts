import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DinnerProposal} from '../../api/index.ts'
import {GroupDinnerProposalResponse} from "../../../src/api/generated";

interface MyDinnerProposalState {
    myDinnerProposal: GroupDinnerProposalResponse | null;
    loading: boolean;
    error: string | null;
}

export const fetchMyDinnerProposal = createAsyncThunk(
    "dinnerProposal/fetchMyDinnerProposal",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await DinnerProposal.getMyDinnerProposal(userId);

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message ?? "Failed to fetch fast orders");
        }
    }
);


const initialState: MyDinnerProposalState = {
    myDinnerProposal: null,
    loading: false,
    error: null,
};

const myDinnerProposalSlice = createSlice({
    name: "myDinnerProposal",
    initialState,
    reducers: {
        clearDinnerProposal: (state) => {
            state.myDinnerProposal = {};
        },
        addDinnerProposal: (state, action: PayloadAction<GroupDinnerProposalResponse>) => {
            state.myDinnerProposal = action.payload;
        },
        removeDinnerProposal: (state) => {
            if (state.myDinnerProposal) {
                state.myDinnerProposal = {};
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyDinnerProposal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyDinnerProposal.fulfilled, (state, action: PayloadAction<GroupDinnerProposalResponse>) => {
                state.loading = false;
                state.myDinnerProposal = action.payload;
            })
            .addCase(fetchMyDinnerProposal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addDinnerProposal, clearDinnerProposal, removeDinnerProposal } = myDinnerProposalSlice.actions;
export default myDinnerProposalSlice.reducer;
