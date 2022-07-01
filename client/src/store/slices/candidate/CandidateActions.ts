import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { candidateURL, ICandidate } from "../../../config";
import { candidateActionsTypes } from "./ActionTypes";
import { toastActions, Title } from "../toast/ToastSlice";
import { NavigateFunction } from "react-router-dom";

export const getCandidates = createAsyncThunk<ICandidate[]>(
  candidateActionsTypes.GET_CANDIDATES,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(candidateURL);
      return response.data;
    } catch (err) {
      const hasErrResponse = (
        err as { response: { [key: string]: { message: string } } }
      ).response;

      if (!hasErrResponse) {
        throw err;
      }
      return thunkAPI.rejectWithValue(hasErrResponse);
    }
  }
);

export const addCandidate = createAsyncThunk<ICandidate, { data: ICandidate, navigate: NavigateFunction }>(
  candidateActionsTypes.ADD_CANDIDATE,
  async ({ data, navigate }, thunkAPI) => {
    try {
      const response = await axios.post(candidateURL, data);
      thunkAPI.dispatch(getCandidates());
      thunkAPI.dispatch(
        toastActions.showToast({
          type: Title.SUCCESS,
          message: "Candidate Added",
        })
      );
      navigate("/candidates")
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
        })
      );
      return thunkAPI.rejectWithValue(hasErrResponse);
    }
  }
);

export const editCandidate = createAsyncThunk<
  { message: string },
  { data: ICandidate, id: string, navigate: NavigateFunction }
>(candidateActionsTypes.EDIT_CANDIDATE, async ({ data, id, navigate }, thunkAPI) => {
  try {
    const response = await axios.put(`${candidateURL}${id}`, data);
    thunkAPI.dispatch(getCandidates());
    thunkAPI.dispatch(
      toastActions.showToast({
        type: Title.SUCCESS,
        message: "Record Updated!",
      })
    );
    navigate("/candidates")
    return response.data;
  } catch (err) {
    const hasErrResponse = (
      err as { response: { [key: string]: { message: string } } }
    ).response;
    if (!hasErrResponse) {
      throw err;
    }
    console.log(hasErrResponse.data.message);
    thunkAPI.dispatch(
      toastActions.showToast({
        type: Title.ERROR,
        message: hasErrResponse.data.message,
      })
    );
    return thunkAPI.rejectWithValue(hasErrResponse);
  }
});

export const deleteCandidate = createAsyncThunk<
  { message: string },
  { id: string }
>(candidateActionsTypes.DELETE_CANDIDATE, async ({ id }, thunkAPI) => {
  try {
    const response = await axios.delete(`${candidateURL}${id}`);
    thunkAPI.dispatch(getCandidates());
    thunkAPI.dispatch(
      toastActions.showToast({
        type: Title.SUCCESS,
        message: "Record Deleted",
      })
    );
    return response.data;
  } catch (err) {
    const hasErrResponse = (
      err as { response: { [key: string]: { message: string } } }
    ).response;
    if (!hasErrResponse) {
      throw err;
    }
    console.log(hasErrResponse.data.message);
    thunkAPI.dispatch(
      toastActions.showToast({
        type: Title.ERROR,
        message: hasErrResponse.data.message,
      })
    );
    return thunkAPI.rejectWithValue(hasErrResponse);
  }
});
