import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTaskDetails } from "../services/TasksApi";
import type { EpicTask } from "../schema/types";

export const fetchTaskDetails = createAsyncThunk(
  "tasks/taskDetails",
  async ({ projectId, taskId }: { projectId: string; taskId: string }) => {
    const response = await getTaskDetails({ projectId, taskId });
    return response;
  },
);

interface InitialStateType {
  data: null | EpicTask;
  status: "idle" | "loading" | "success" | "error";
  selectedTaskId: string | null;
  loading: boolean;
  isError: boolean;
}

const initialState: InitialStateType = {
  data: null,
  selectedTaskId: null,
  status: "idle",
  loading: false,
  isError: false,
};

const taskDetailsSlice = createSlice({
  name: "taskDetails",
  initialState,
  reducers: {
    openModel: (state, action) => {
      state.selectedTaskId = action.payload.id;
      state.data = null;
      state.status = "idle";
      state.loading = false;
      state.isError = false;
    },
    closeModel: (state) => {
      state.data = null;
      state.selectedTaskId = null;
      state.status = "idle";
      state.loading = false;
      state.isError = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTaskDetails.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(fetchTaskDetails.fulfilled, (state, action) => {
      state.data = action.payload[0];
      // state.selectedTaskId = action.payload?.taskId;
      state.status = "success";
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(fetchTaskDetails.rejected, (state) => {
      state.data = null;
      // state.selectedTaskId = null;
      state.status = "error";
      state.loading = false;
      state.isError = true;
    });
  },
});

export const { openModel, closeModel } = taskDetailsSlice.actions;

export default taskDetailsSlice.reducer;
