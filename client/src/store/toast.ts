import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToastProps } from "../components/UI/ToastItem";
import { Type } from "../config/index";

export enum Title {
  SUCCESS = "Success",
  ERROR = "Error",
}

declare interface IPayload {
  type: string;
  message: string;
  autoClose? : boolean | number;
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
            id: Math.random(),
            title: Title.SUCCESS,
            description: action.payload.message,
            backgroundColor: "#5cb85c",
            autoClose: action.payload.autoClose ? action.payload.autoClose : true,
          };
          break;
        case Type.ERROR:
          toastProperties = {
            id: Math.random(),
            title: Title.ERROR,
            description: action.payload.message,
            backgroundColor: "#d9534f",
            autoClose: action.payload.autoClose ? action.payload.autoClose : true,
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
