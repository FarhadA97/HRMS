import { createSlice, PayloadAction } from "@reduxjs/toolkit";

declare interface IUser{
    name: string;
    email: string;
    _id: string;

}

declare interface IPayload{
    user: IUser;
    token: string;
}

export interface AuthState {
    authData: IUser | null;
    isLoggedIn: boolean;
}



const initialAuthState: AuthState = {
    authData: null,
    isLoggedIn: false
  };




const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state,action: PayloadAction<IPayload> ){
            localStorage.setItem('user',JSON.stringify(action.payload.user));
            localStorage.setItem('token',JSON.stringify(action.payload.token));
            state.authData = action.payload.user;
            state.isLoggedIn = true;
        },
        logout(state){
            localStorage.clear();
            state.authData = null;
            state.isLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;