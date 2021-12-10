import { SET_LOADING, ADD_POST, SET_POST, RESET_POST, ADD_COMMENT } from "../types/postTypes";

const initialState = {
    isLoading: true,
    post: null,
}

const postReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case SET_LOADING:
            state={ ...state,
                isLoading: payload,
                post: null,
            }
            return state;
        case ADD_POST:
            state={ ...state,
                posts:[...state.posts,payload]
            }
            return state;
        case SET_POST:
            state={...state,posts:payload}
            return state;
        case RESET_POST:
            state=initialState;
            return state;
        case ADD_COMMENT:
            const findPost = state.post.find(pst=>pst.postId = payload.postId);
            const comments = findPost.postData.comments;
            comments.push(payload.comment)
            findPost.postData.comment = comments
            state={ ...state, post: state.post.map(pt=>pt.postId = payload.postId? findPost : pt),
            };
            return state;
        default:
            return state;
    }
}

export default postReducer;