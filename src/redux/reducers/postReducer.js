import * as types from "../types/postType"

const initialState = {
    isLoading: true,
    post: null,
}

const postReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case type.SET_LOADGING:
            state={ ...state,
                isLoading: payload,
                post: null,
            }
            return state;
        case type.ADD_POST:
            state={ ...state,
                posts:[...state.posts,payload]
            }
            return state;
        default:
            return state;
    }
}

export default postReducer;