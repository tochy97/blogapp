import React,{useEffect} from 'react'
import {Routes,Route,Navigate} from "react-router-dom"
import {Card} from "react-bootstrap"
import Login from "./Auth/Login/Login"
import Register from "./Auth/Register/Register"
import Dashboard from "./Dashboard/Dashboard"
import AddPost from "./AddPost/AddPost"
import {auth} from "../config/firebase"
import { getAuth } from "firebase/auth";
import {useNavigate} from "react-router-dom"
  
const Admin = () => {
    const PrivateRegister = () => {
        const { currentUser } = getAuth()
        return currentUser ? <Register /> : <Navigate to="../login" />;
    
    }
    const PrivatePost = () => {
        const { currentUser } = getAuth()
        return currentUser ? <AddPost /> : <Navigate to="../login" />;
    
    }
    return (
        <>
        <Routes>
            <Route exact path="/*" element={<Dashboard/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="addpost" element={<PrivatePost/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<PrivateRegister/>}/>
        </Routes>
        </>
    );
};

export default Admin;