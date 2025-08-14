import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserResponse } from '../../api/generated/model/user-response'
import { User } from '../../api/index.ts'

interface FavoriteUsersState {
    favoriteUsers: UserResponse[];
    loading: boolean;
    error: string | null;
}

export const fetchFavoriteUsers = createAsyncThunk(
    "user/fetchFavoriteUsers",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await User.getFavoriteUsers(userId);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message ?? "Failed to fetch users");
        }
    }
);

const initialState: FavoriteUsersState = {
    favoriteUsers: [],
    loading: false,
    error: null,
};

const favoriteUsersSlice = createSlice({
    name: "favoriteUser",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavoriteUsers.fulfilled, (state, action: PayloadAction<UserResponse[]>) => {
                state.loading = false;
                state.favoriteUsers = action.payload;
            })
            .addCase(fetchFavoriteUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default favoriteUsersSlice.reducer;
