import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DinnerProposal} from '../../api/index.ts'
import {GroupDinnerProposalResponse} from "../../../src/api/generated";

interface DinnerProposalState {
    dinnerProposals: GroupDinnerProposalResponse[];
    loading: boolean;
    error: string | null;
}

export const fetchDinnerProposals = createAsyncThunk(
    "dinnerProposal/fetchDinnerProposals",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await DinnerProposal.getDinnerProposal(userId);

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message ?? "Failed to fetch fast orders");
        }
    }
);

const initialState: DinnerProposalState = {
    dinnerProposals: [],
    loading: false,
    error: null,
};

const dinnerProposalSlice = createSlice({
    name: "dinnerProposals",
    initialState,
    reducers: {
        clearDinnerProposal: (state) => {
            state.dinnerProposals = [];
        },
        addDinnerProposal: (state, action: PayloadAction<GroupDinnerProposalResponse>) => {
            state.dinnerProposals = [
                ...(state.dinnerProposals ?? []),
                action.payload,
            ];
        },
        removeDinnerProposal: (state, action: PayloadAction<string>) => {
            if (state.dinnerProposals) {
                state.dinnerProposals = state.dinnerProposals.filter(proposal => proposal.id !== action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDinnerProposals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDinnerProposals.fulfilled, (state, action: PayloadAction<GroupDinnerProposalResponse[]>) => {
                state.loading = false;
                state.dinnerProposals = action.payload;
            })
            .addCase(fetchDinnerProposals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addDinnerProposal, clearDinnerProposal, removeDinnerProposal } = dinnerProposalSlice.actions;
export default dinnerProposalSlice.reducer;
