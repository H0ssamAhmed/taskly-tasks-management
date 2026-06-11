import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProjects } from "../services/ProjectsApi";

export const fetchALlProjects = createAsyncThunk(
  "project/fethcProject",
  async () => {
    const res = await getProjects();
    return res;
  },
);

interface InitialStateType {
  data: [] | null;
  status: "idle" | "loading" | "success" | "error";
  loading: boolean;
  IsError: boolean;
  error: string | null;
}
const initialState: InitialStateType = {
  data: null,
  status: "idle",
  loading: false,
  IsError: false,
  error: null,
};
const projectstSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchALlProjects.pending, (state) => {
      state.data = null;
      state.loading = true;
      state.status = "loading";
      state.IsError = false;
      state.error = null;
    });
    builder.addCase(fetchALlProjects.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.status = "success";
      state.IsError = false;
      state.error = null;
    });
    builder.addCase(fetchALlProjects.rejected, (state) => {
      state.loading = false;
      state.status = "error";
      state.IsError = false;
      state.error = "error";
    });
  },
});

// export const {}
export default projectstSlice.reducer;
