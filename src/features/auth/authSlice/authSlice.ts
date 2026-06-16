import { getCurrentUser } from "@/features/user/services/userApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { UserType } from "../schema/types";

export const fetchCuurentUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await getCurrentUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
interface AuthState {
  data: UserType | null;
  status: "idle" | "loading" | "success" | "error";
  loading: boolean;
  IsError: boolean;
  error: string | null;
}
const initialState: AuthState = {
  data: null,
  status: "idle",
  loading: false,
  IsError: false,
  error: null,
};
const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.loading = action.payload.loading;
      state.IsError = action.payload.IsError;
      state.error = action.payload.error;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCuurentUser.pending, (state) => {
      state.status = "loading";
      state.loading = true;
      state.IsError = false;
    });
    builder.addCase(fetchCuurentUser.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCuurentUser.rejected, (state) => {
      state.status = "error";
      state.loading = false;
      state.IsError = true;
      state.error = "error";
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
