import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { shallowEqual,useSelector,useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { getAuth } from "firebase/auth";
import {logoutUser} from "../redux/actionCreators/authActionCreators"

export const NavComp = () => {
    const dispatch = useDispatch();
    const histroy = useNavigate();
    const { currentUser } = getAuth()

    const logout=()=>{
        auth.signOut();
        dispatch(logoutUser);
        histroy("../login", {replace:true});
    }
    return (
        <Navbar bg="dark" sticky="top" variant={"dark"} className="navbar-dark">
            <Navbar.Brand as={NavLink} style={{padding: "15px", marginLeft: "5%"}} to="/dashboard">Home</Navbar.Brand>
            <Nav.Item>
                <Nav.Link as={NavLink} style={{padding: "15px", marginLeft: "5%",color:"#fff"}} to="/admin/addpost">Post</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} style={{padding: "15px", marginLeft: "5%",color:"#fff"}} to="/admin/register">Register</Nav.Link>
            </Nav.Item>
            { !currentUser &&
            <Nav.Item>
                <Nav.Link as={NavLink} style={{padding: "15px", marginLeft: "5%",color:"#fff"}} to="/login">Login</Nav.Link>
            </Nav.Item>}
                        <div>
                            { currentUser && <Button variant="dark" type="button" onClick={logout}>Logout</Button>}
                        </div>
        </Navbar>
    )
}

export default NavComp;