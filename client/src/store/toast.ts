import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToastProps } from "../components/UI/Toast";
import { Type } from "../config/index";

export enum Title {
  SUCCESS = "Success",
  ERROR = "Error",
}

declare interface IPayload {
  type: string;
  message: string;
}

let toastProperties: IToastProps;

const initialToastState: { toastProp: IToastProps[] | [] } = {
  toastProp: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState: initialToastState,
  reducers: {
    showToast(state, action: PayloadAction<IPayload>) {
      switch (action.payload.type) {
        case Type.SUCCESS:
          toastProperties = {
            id: state.toastProp.length + 1,
            title: Title.SUCCESS,
            description: action.payload.message,
            backgroundColor: "#5cb85c",
          };
          break;
        case Type.ERROR:
          toastProperties = {
            id: state.toastProp.length + 1,
            title: Title.ERROR,
            description: action.payload.message,
            backgroundColor: "#d9534f",
          };
          break;
        default:
          break;
      }

      state.toastProp = [...state.toastProp, toastProperties];
    },
    removeToast(state, action: PayloadAction<number>) {
      state.toastProp = state.toastProp.filter((e) => e.id !== action.payload);
    },
  },
});

export const toastActions = toastSlice.actions;
export default toastSlice.reducer;
