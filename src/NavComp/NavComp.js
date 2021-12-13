import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { getAuth } from "firebase/auth";
import {logoutUser} from "../redux/actionCreators/authActionCreators"   

export const NavComp = () => {
    const dispatch = useDispatch();
    const histroy = useNavigate();
    const { currentUser } = getAuth();

    const logout=()=>{
        auth.signOut();
        dispatch(logoutUser);
        histroy("../../dashboard", {replace:true});
    }
    return (
        <Navbar bg="dark" expand="lg" variant={"dark"} className="navbar-dark" style={{width:"100%"}} >
            <Navbar.Brand as={NavLink} style={{padding: "15px", marginLeft: "5%"}} to="/admin">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            { 
                currentUser ?
                <>
                <Nav.Item>
                    <Nav.Link as={NavLink} style={{padding: "15px", marginLeft: "5%",color:"#fff",}} to="/admin/add">Post</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} style={{padding: "15px", marginLeft: "5%",color:"#fff",}} to="/admin/manage">Manage</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} style={{padding: "15px", marginLeft: "5%",color:"#fff"}} to="/admin/register">Register</Nav.Link>
                </Nav.Item>
                <div>
                    <Button variant="dark" style={{padding: "15px", marginLeft: "5%",color:"#fff"}} type="button" onClick={logout}>Logout</Button>
                </div>
                </>
                :
                <Nav.Item>
                    <Nav.Link as={NavLink} style={{padding: "15px", marginLeft: "5%",color:"#fff"}} to="/login">Login</Nav.Link>
                </Nav.Item>
            }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavComp;