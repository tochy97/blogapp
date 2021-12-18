import React from 'react'
import { Navbar, Nav, Button, NavDropdown, Container } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { getAuth } from "firebase/auth";
import {logoutUser} from "../redux/actionCreators/authActionCreators"   

export const NavComp = () => {
    const dispatch = useDispatch();
    const histroy = useNavigate();
    const { currentUser } = getAuth();
    const isLoading = useSelector(state => state.post.isLoading);

    const logout=()=>{
        auth.signOut();
        dispatch(logoutUser);
        histroy("../../dashboard", {replace:true});
    }
    return (

        <Navbar bg="light" expand="lg" variant="light" style={{padding: "20px",color:"#fff", borderRight:0}} >
            { 
                !isLoading ?
                <Container>
                {   
                    currentUser ?
                        <Navbar.Brand href="../../">Hello, {currentUser.providerData[0].displayName}</Navbar.Brand>
                    :
                        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
                }
                <Nav className="me-auto">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    { 
                        currentUser ?
                        <>
                            <NavDropdown title="Posts"  style={{marginLeft:"15px"}}>
                                <NavDropdown.Item href="/admin/addpost">Add</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/managepost">Manage</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item  style={{marginLeft:"15px"}}>
                                <Nav.Link href="/admin/register">Register</Nav.Link>
                            </Nav.Item>
                            <Nav.Item  style={{marginLeft:"15px"}}>
                                <Nav.Item  placement="end"  variant="light" style={{color:"#878787"}} type="button" onClick={logout}>Logout</Nav.Item>
                            </Nav.Item>
                        </>
                        :
                        <>
                            <Nav.Item  style={{marginLeft:"15px"}}>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item  style={{marginLeft:"15px"}}>
                                <Nav.Link href="/req">Request Account</Nav.Link>
                            </Nav.Item>
                        </>
                    }
                    </Navbar.Collapse>
                </Nav>
                </Container>
            :<></>
            }
        </Navbar>
    )
}

export default NavComp;