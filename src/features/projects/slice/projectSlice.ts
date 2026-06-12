import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProjects } from "../services/ProjectsApi";

export const fetchALlProjects = createAsyncThunk(
  "project/fethcProject",
  async ({ page = 1 }: { page?: number }) => {
    const response = await getProjects({ page });
    return response;
  },
);

interface InitialStateType {
  data: [];
  status: "idle" | "loading" | "success" | "error";
  loading: boolean;
  IsError: boolean;
  error: string | null;
  pagination: string;
}
const initialState: InitialStateType = {
  data: [],
  status: "idle",
  loading: false,
  IsError: false,
  error: null,
  pagination: "0-9/0",
};
const projectstSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchALlProjects.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.status = "loading";
      state.IsError = false;
      state.error = null;
    });
    builder.addCase(fetchALlProjects.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.status = "success";
      state.IsError = false;
      state.error = null;
    });
    builder.addCase(fetchALlProjects.rejected, (state) => {
      state.loading = false;
      state.status = "error";
      state.IsError = true;
      state.error = "error";
    });
  },
});

// export const {}
export default projectstSlice.reducer;
