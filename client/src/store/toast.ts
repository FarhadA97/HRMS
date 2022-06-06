import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToastProps } from "../components/UI/Toast";


export enum Title{
    SUCCESS = "Success",
    ERROR = "Error",
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
                case 'Success':
                  toastProperties = {
                    id: state.toastProp.length+1,
                    title: Title.SUCCESS,
                    description: action.payload.message,
                    backgroundColor: '#5cb85c'
                  }
                  break;
                case 'Error':
                  toastProperties = {
                    id: state.toastProp.length+1,
                    title: Title.ERROR,
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