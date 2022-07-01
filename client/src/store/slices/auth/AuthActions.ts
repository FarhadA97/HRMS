import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { User } from "../../../config";
import { Title, toastActions } from "../toast/ToastSlice";
import { authActionTypes } from "./ActionTypes";
import { IPayload } from "./AuthSlice";



export const login = createAsyncThunk<IPayload, { data: User, url: string, navigate: NavigateFunction }>(
    authActionTypes.LOGIN,
    async ({ data, url, navigate }, thunkAPI) => {
      try {
        const response = await axios.post(url, data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        thunkAPI.dispatch(
          toastActions.showToast({
            type: Title.SUCCESS,
            message: "User Logged in",
          })
        );
        navigate("/");
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
            autoClose: 9000,
          })
        );
        return thunkAPI.rejectWithValue(hasErrResponse);
      }
    }
  );