import { MAKE_GROUP, SET_GROUP, DELETE_GROUP, JOIN_GROUP, REMOVE_USER, REMOVE_POST, INSERT_POST } from "../types/groupTypes";

const initialState = {
    isMember: false,
    isAdmin: false,
    isCreator: false,
    group: null
}

const groupReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case MAKE_GROUP:
            state={ 
                isMember: true,
                isAdmin: true,
                isCreator: true,
                group:[...state.groups,payload],
            }
            return state;
        case SET_GROUP:
            state =initialState;
            return state;
        case DELETE_GROUP:
            state =initialState;
            return state;
        case JOIN_GROUP:
            state =initialState;
            return state;
        case REMOVE_USER:
            state =initialState;
            return state;
        case REMOVE_POST:
            state =initialState;
            return state;
        case INSERT_POST:
            state =initialState;
            return state;
        default:
            return state;
    }
}

export default groupReducer;