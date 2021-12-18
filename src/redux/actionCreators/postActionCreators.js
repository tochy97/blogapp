import * as types from "../types/postTypes";
import {storage, store} from "../../config/firebase";

const setLoading = data =>({
    type:types.SET_LOADING,
    payload:data,
})

const addPost = data =>({
    type:types.ADD_POST,
    payload:data,
})

const getPost = data =>({
    type:types.SET_POST,
    payload:data,
})

const resetPost = data =>({
    type:types.RESET_POST,
    payload:data,
})

const deletePost = data =>({
    type:types.DELETE_POST,
    payload:data,
})

const addComment = data =>({
    type:types.ADD_COMMENT,
    payload:data,
})

const deleteComment = data =>({
    type:types.DELETE_COMMENT,
    payload:data,
})

export const doPost = (data, post, setProgress) =>dispatch=>{
    store.collection("post").add(data).then(async res=>{
        const document = await res.get();
        const postData = {data: document.data(),id: document.id};
        const uploadRef = storage.ref(`posts/${data.group}/${document.id}`);

        uploadRef.put(post).on("state_change", (snapshot) =>{
            const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
            setProgress(progress);
        },(err) =>{
            console.log(err);
        },async () =>{
            const url = await uploadRef.getDownloadURL();
            console.log(url);
            store.collection("post").doc(document.id).update({
                post:url,
            })
            .then(()=>{
                postData.data.post = url;
                dispatch(addPost(postData));
                console.log("Success");
            })
            .catch((err) =>{
                console.log(err);
            })
        });
    })
    .catch(err=>{
        console.log(err);
    })
}   

export const fetchPost =() =>dispatch=>{
    dispatch(setLoading(true));
    store.collection("post").get().then(posts=>{
        const allPost = [];

        posts.forEach(post => {
            const data = {data:post.data(),id:post.id};
            allPost.push(data);
        });
        dispatch(getPost(allPost));
        dispatch(setLoading(false));
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const doComment = (comment,postId,prev)=>(dispatch)=>{
    const old = prev;
    old.push(comment);
    store.collection("post").doc(postId).update({
        comments:old,
    })
    .then(()=>{
        dispatch(addComment({ postId, data:old }));
    })
    .catch((err) =>{
        console.log(err);
    })
}

export const undoComment = (index,postId,prev)=>(dispatch)=>{
    const old = prev.filter((cmt,id)=> id !== index);
    console.log(old)
    store.collection("post").doc(postId).update({
        comments:old,
    })
    .then(()=>{
        dispatch(deleteComment({ postId, index }));
    })
    .catch((err) =>{
        console.log(err);
    })
}

export const removePost = (postId,imgUrl) => (dispatch)=> {
    storage.refFromURL(imgUrl).delete()
    .then(()=>{
        store.collection("post").doc(postId).delete()
        .then(()=>{
            dispatch(deletePost(postId));
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}