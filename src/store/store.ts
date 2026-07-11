import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/auth/authSlice/authSlice";
import projectstReducer from "@/features/projects/slice/projectSlice";
import taskDetailsReducer from "@/features/projects/slice/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectstReducer,
    taskDetails: taskDetailsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
