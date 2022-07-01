import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { User } from "../config";
import { Title, toastActions } from "./toast";

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
  authData: null,
  isLoggedIn: false,
  loading: false,
  errors: null,
};

export const login = createAsyncThunk<IPayload, { data: User; url: string; navigate: NavigateFunction }>(
  "auth/login",
  async ({ data, url, navigate }, thunkAPI) => {
    try {
      const response = await axios.post(url, data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      thunkAPI.dispatch(
        toastActions.showToast({
          type: Title.SUCCESS,
          message: "User Logged in",
          autoClose: 300,
        })
      );
      navigate('/');
      return response.data;
    } catch (err) {
      const hasErrResponse = (
        err as { response: { [key: string]: { message: string } } }
      ).response;
      if (!hasErrResponse) {
        throw err;
      }
      thunkAPI.dispatch(
        toastActions.showToast({
          type: Title.ERROR,
          message: hasErrResponse.data.message,
          autoClose: 9000
        })
      );
      return thunkAPI.rejectWithValue(hasErrResponse);
    }
  }
);

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
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
