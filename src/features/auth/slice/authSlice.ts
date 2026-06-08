import { getCurrentUser } from "@/features/user/services/userApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCuurentUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await getCurrentUser();
  return response;
});

const userSlice = createSlice({
  name: "currentUser",
  initialState: { data: null, loading: false, error: false },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCuurentUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchCuurentUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCuurentUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
