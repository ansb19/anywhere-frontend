// store/slices/authSlice.ts
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Partial<User>>) {
        // 기존 사용자 상태와 병합
        state.user = { ...state.user, ...action.payload } as WritableDraft<User>;
        state.isAuthenticated = true;
      },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
