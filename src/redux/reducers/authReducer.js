import { SET_USER, RESET_USER, SET_REQ, GET_USER } from "../types/authTypes";

const initialState = {
    isLoggedIn: false,
    user: null,
    user_id: null,
    req: false,
}

const authReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case SET_USER:
            state={ ...state,
                isLoggedIn:true,
                user:payload.user,
                user_id:payload.id,
            }
            return state;
        case SET_REQ:
            state={ ...state,
                req: true
            }
            return state;
        case RESET_USER:
            state=initialState;
            return state;
        case GET_USER:
            return state;
        default:
            return state;
    }
}

export default authReducer;