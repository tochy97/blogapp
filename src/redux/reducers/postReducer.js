import { SET_LOADING, ADD_POST, SET_POST, RESET_POST, ADD_COMMENT, DELETE_POST } from "../types/postTypes";

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
        case DELETE_POST:
            const filteredPosts = state.posts.filter(pst=> pst.id !== payload);
            state={
                ...state,posts:filteredPosts,
            }
            return state;
        case ADD_COMMENT:
            const findPost = state.posts.find(pst=>pst.id === payload.postId);
            console.log(findPost)
            const comments = findPost.data.comments;
            comments.push(payload.comment)
            findPost.data.comments = comments
            state={ ...state, post: state.post.map(pt=>pt.postId = payload.postId? findPost : pt),
            };
            return state;
        default:
            return state;
    }
}

export default postReducer;