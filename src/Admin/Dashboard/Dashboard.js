import React from 'react'
import {Routes,Route,Navigate} from "react-router-dom"; 
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import { auth } from '../../config/firebase';
import { logoutUser } from '../../redux/actionCreators/authActionCreators';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const histroy = useNavigate();
    const logout=()=>{
        auth.signOut();
        dispatch(logoutUser);
        histroy("../login", {replace:true});
    }
    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard;