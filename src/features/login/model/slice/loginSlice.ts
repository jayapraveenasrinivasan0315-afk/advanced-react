import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { login } from "../services/login/login";
import type { LoginFormSchema } from "../types/loginFormSchema";

export const initialState: LoginFormSchema = {
  phone: "",
  password: "",
  isLoading: false,
  error: undefined,
};

export const loginSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetForm: (state) => {
      state.phone = "";
      state.password = "";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
