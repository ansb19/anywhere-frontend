import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import placeReducer from "./slices/placeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    place: placeReducer,
  },
});

// 타입 설정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;