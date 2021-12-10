import * as types from "../types/authTypes";

//goes to authReducer SET_USER
const setUser = (data)=>({
    type:types.SET_USER,
    payload:data
})
const resetUser = ()=>({
    type:types.RESET_USER,
})
export const loginUser = (data) => dispatch=>{
    dispatch(setUser(data));
}
export const logoutUser = () => dispatch=>{
    dispatch(resetUser());
}