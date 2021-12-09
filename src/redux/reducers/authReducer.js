import * as types from "../types/authType"

const initialState = {
    isLoggedIn: false,
    user: null,
    user_id: null,
}

const authReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case type.SET_USER:
            state={
                isLoggedIn:true,
                user:payload.user,
                user_id:payload.id
            }
            return state;
        case type.RESET_USER:
            state=initialState;
            return state;
        default:
            return state;
    }
}

export default authReducer;