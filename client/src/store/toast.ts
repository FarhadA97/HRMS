import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToastProps } from "../components/UI/Toast";


export enum Title{
    SUCCESS = "success",
    FAIL = "fail",
}

declare interface IPayload{
    type: string;
    message:string;
}

let toastProperties:IToastProps;

const initialToastState: {toastProp: IToastProps[] | []} = {
    toastProp: []
}

const toastSlice = createSlice({
    name: 'toast',
    initialState:  initialToastState,
    reducers:{
        showToast(state,action: PayloadAction<IPayload>){
            console.log('showtoast ran')
            switch(action.payload.type) {
                case 'success':
                  toastProperties = {
                    id: state.toastProp.length+1,
                    title: Title.SUCCESS,
                    description: action.payload.message,
                    backgroundColor: '#5cb85c'
                  }
                  break;
                case 'fail':
                  toastProperties = {
                    id: state.toastProp.length+1,
                    title: Title.FAIL,
                    description: action.payload.message,
                    backgroundColor: '#d9534f'
                  }
                  break;
                default:
                  break ;
              }
            
            state.toastProp = [...state.toastProp,toastProperties];
        },
        removeToast(state,action: PayloadAction<IToastProps[]>){
            state.toastProp = action.payload;
        }   
    }
})

export const toastActions = toastSlice.actions;
export default toastSlice.reducer;