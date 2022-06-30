import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { candidateURL, INotes } from "../../../config";
import { candidateNoteActionsTypes } from "./ActionTypes";
import { toastActions, Title } from "../toast/ToastSlice";
import { getCandidates } from "./CandidateActions";


export const addCandidateNote = createAsyncThunk<{message:string}, { id: string, note: INotes }>(
    candidateNoteActionsTypes.ADD_NOTE,
    async ({ id, note }, thunkAPI) => {
      try {
        const response = await axios.post(`${candidateURL}/notes/${id}`, {note});
        thunkAPI.dispatch(getCandidates());
        thunkAPI.dispatch(
          toastActions.showToast({
            type: Title.SUCCESS,
            message: "Note Added",
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

  export const deleteCandidateNote = createAsyncThunk<{message:string}, { id: string, noteId: string }>(
    candidateNoteActionsTypes.DELETE_NOTE,
    async ({ id, noteId }, thunkAPI) => {
      try {
        const response = await axios.delete(`${candidateURL}/notes/${id}`, {data: {noteId}});
        thunkAPI.dispatch(getCandidates());
        thunkAPI.dispatch(
          toastActions.showToast({
            type: Title.SUCCESS,
            message: "Note Deleted",
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

  export const editCandidateNote = createAsyncThunk<{message:string}, { id: string, editedNotes: INotes[] }>(
    candidateNoteActionsTypes.EDIT_NOTE,
    async ({ id, editedNotes }, thunkAPI) => {
      try {
        const response = await axios.put(`${candidateURL}/notes/${id}`, editedNotes);
        thunkAPI.dispatch(getCandidates());
        thunkAPI.dispatch(
          toastActions.showToast({
            type: Title.SUCCESS,
            message: "Note Edited",
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