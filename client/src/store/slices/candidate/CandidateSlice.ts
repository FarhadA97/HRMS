import { createSlice } from "@reduxjs/toolkit";
import { ICandidate } from "../../../config";
import { getCandidates } from "./CandidateActions";
import { addCandidateNote, deleteCandidateNote, editCandidateNote } from "./CandidateNoteActions";

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
    builder.addCase(addCandidateNote.fulfilled, (state, action) => {
      const index = state.candidates.findIndex((item) =>   item._id === action.payload.candidate._id)
      state.candidates.splice(index,1,action.payload.candidate)
    });
    builder.addCase(deleteCandidateNote.fulfilled, (state, action) => {
      const index = state.candidates.findIndex((item) =>  item._id === action.payload.candidate._id)  
      state.candidates.splice(index,1,action.payload.candidate)
    });
    builder.addCase(editCandidateNote.fulfilled, (state, action) => {
      const index = state.candidates.findIndex((item) =>  item._id === action.payload.candidate._id)
      state.candidates.splice(index,1,action.payload.candidate)
    });
  },
});

export const candidateActions = candidateSlice.actions;
export default candidateSlice.reducer;
