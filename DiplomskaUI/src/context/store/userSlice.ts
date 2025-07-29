import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserResponse } from '../../api/generated/model/user-response'
import { User } from '../../api/index.ts'

interface UserState {
    users: UserResponse[];
    loading: boolean;
    error: string | null;
}

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await User.getUsers();
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message ?? "Failed to fetch users");
        }
    }
);

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUsers: (state) => {
            state.users = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserResponse[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
