import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProjectById } from "@/features/projects/services/ProjectsApi";
import type { ProjectType } from "../schema/types";

export const fetchProjectById = createAsyncThunk(
  "project/fetchProjectById",
  async (id: string) => {
    const response = await getProjectById(id);
    return response.json();
  },
);

interface InitialStateType {
  data: ProjectType | null;
  status: "idle" | "loading" | "success" | "error";
  loading: boolean;
  isError: boolean;
  error: string | null;
}
const initialState: InitialStateType = {
  data: null,
  status: "idle",
  loading: false,
  isError: false,
  error: null,
};
const ProjectDetailsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProjectById.pending, (state) => {
      state.data = null;
      state.loading = true;
      state.status = "loading";
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchProjectById.fulfilled, (state, action) => {
      state.data = action.payload[0];
      state.loading = false;
      state.status = "success";
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchProjectById.rejected, (state) => {
      state.loading = false;
      state.status = "error";
      state.isError = true;
      state.error = "error";
    });
  },
});

// export const {}
export default ProjectDetailsSlice.reducer;
