import * as types from "../types/authTypes";
import {store} from "../../config/firebase";

//goes to authReducer SET_USER
const setUser = (data)=>({
    type:types.SET_USER,
    payload:data
})
const setReq = ()=>({
    type:types.SET_REQ,
})
const resetUser = ()=>({
    type:types.RESET_USER,
})
const getUser = ()=>({
    type:types.GET_USER,
})
export const loginUser = (data) => dispatch=>{
    dispatch(setUser(data));
}
export const logoutUser = () => dispatch=>{
    dispatch(resetUser());
}
export const checkUser = () => dispatch=>{
    dispatch(getUser());
}
export const checkRequest = (email) => dispatch=>{
    store.collection("mail").get().then(mail=>{
        mail.forEach(mails=>{
            const data = {data:mails.data()};
            if(data.data.to === email){
                dispatch(setReq());
                return;
            }
        })
    })
}
export const createUser = (id, email, displayName, realName) => dispatch=>{
    const data ={
        user_id:id,
        email:email,
        displayName:displayName,
        realName:realName,
        groups:[],
    }
    store.collection('user').add(data)
}
export const setRequest = (req, email, real) => dispatch=>{
    store.collection('mail').add({
        to: email,
        message: {
            subject: 'Account Request from: '+real,
            html: req,
        },
    })
    .then(() =>{
        dispatch(setReq());
    })
}