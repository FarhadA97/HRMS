import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { candidateURL, ICandidate } from "../../config";
import { toastActions, Title } from "./toast";


export interface candidateState {
  candidates: ICandidate[] | [];
  loading: boolean;
  errors: any;
}

const initialCandidateState: candidateState = {
  candidates: [],
  loading: false,
  errors: null,
};

export const getCandidates = createAsyncThunk<ICandidate[]>(
    "candidate/get",
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
        console.log(hasErrResponse);
        return thunkAPI.rejectWithValue(hasErrResponse);
      }
    }
  );


export const addCandidate = createAsyncThunk<ICandidate, { data: ICandidate }>(
    "candidate/add",
    async ({ data }, thunkAPI) => {
      try {
        const response = await axios.post(candidateURL, data);
        thunkAPI.dispatch(getCandidates());
        thunkAPI.dispatch(
          toastActions.showToast({
            type: Title.SUCCESS,
            message: "Candidate Added",
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
    }
  );

const candidateSlice = createSlice({
  name: "candidate",
  initialState: initialCandidateState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCandidates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCandidates.fulfilled, (state, action) => {
      state.candidates = action.payload;
      state.loading = false;
    });
    builder.addCase(getCandidates.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export const candidateActions = candidateSlice.actions;
export default candidateSlice.reducer;
