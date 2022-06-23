import { createSlice } from "@reduxjs/toolkit";
import { login } from "./AuthActions";



declare interface IUser {
  name: string;
  email: string;
  _id: string;
}

export interface IPayload {
  user: IUser;
  token: string;
}

export interface AuthState {
  authData: IUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  errors: any;
}

const initialAuthState: AuthState = {
  authData: JSON.parse(localStorage.getItem('user')!),
  isLoggedIn: localStorage.getItem('user') ? true : false,
  loading: false,
  errors: null,
};



const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      localStorage.clear();
      state.authData = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending,(state) => {
      state.loading = true;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.authData = action.payload.user;
      state.isLoggedIn = true;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.errors = action.payload;
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
