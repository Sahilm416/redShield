import { createSlice ,PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username : string | null,
    isLoggedIn : boolean
}

const initialState : UserState = {
    username: "test",
    isLoggedIn: false
}
const userSlice = createSlice({
    name: "nnrjr",
    initialState: initialState,
    reducers: {
         addUser: (state , action : PayloadAction<UserState> )=>{
               state.username = action.payload.username;
               state.isLoggedIn = action.payload.isLoggedIn;
               return state;
        }   
    }
})
export const {addUser} = userSlice.actions;
export default userSlice.reducer;