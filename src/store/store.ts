import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/auth/authSlice/authSlice";
import projectstReducer from "@/features/projects/slice/projectSlice";
import ProjectDetailsReducer from "@/features/editProject/slice/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectstReducer,
    ProjectDetails: ProjectDetailsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
