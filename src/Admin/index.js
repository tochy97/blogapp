import React, {useEffect} from 'react'
import { Routes ,Route, useNavigate } from "react-router-dom"
import Login from "./Auth/Login/Login"
import Register from "./Auth/Register/Register"
import AddPost from "./AddPost/AddPost"
import ManagePost from "./ManagePost/ManagePost"
import ViewPost from '../Dashboard/ViewPost';
import Dashboard from "../Dashboard/Dashboard";
import { auth } from '../config/firebase'
import { loginUser } from '../redux/actionCreators/authActionCreators'
import { useSelector, useDispatch } from 'react-redux';
  
const Admin = () => {
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const histroy = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user=>{
            if(user === null){
                histroy("login", {replace:true});
                return;
            }
            const data = {
                user:user.providerData[0],
                id:user.uid,
            }
            dispatch(loginUser(data));
        })
    }, []);
    return (
        <>
        <Routes>
            <Route exact path="/*" element={<Dashboard/>}/>
            <Route exact path="dashboard" element={<Dashboard/>}/>
            <Route exact path="post/:postId" element={<ViewPost/>}/>
            <Route path="add" element={<AddPost/>}/>
            <Route path="manage" element={<ManagePost/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
        </Routes>
        </>
    );
};

export default Admin;