import * as type from "../types/authType";

//goes to authReducer SET_USER
const setUser = (data)=>({
    type:type.SET_USER,
    payload:data
})
const resetUser = ()=>({
    type:type.RESET_USER,
})
export const loginUser = (data) => dispatch=>{
    dispatch(setUser(data));
}
export const logoutUser = () => dispatch=>{
    dispatch(resetUser());
}