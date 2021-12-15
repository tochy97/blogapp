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

    const logout=()=>{
        auth.signOut();
        dispatch(logoutUser);
        histroy("../../dashboard", {replace:true});
    }
    return (

        <Navbar bg="light" expand="lg" variant="light" style={{padding: "15px",color:"#fff", borderRight:0}} >
            <Container>
            {   
                currentUser ?
                    <Navbar.Brand href="/admin/profile">Hello, {currentUser.providerData[0].displayName}</Navbar.Brand>
                :
                    <Navbar.Brand href="/">Home</Navbar.Brand>
            }
            <Nav className="me-auto">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            { 
                currentUser ?
                <>
                    <Nav.Item>
                        <Nav.Link href="/">Dashboard</Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="Posts">
                        <NavDropdown.Item href="/admin/add">Add</NavDropdown.Item>
                        <NavDropdown.Item href="/admin/manage">Manage</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item>
                        <Nav.Link href="/admin/register">Register</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Item  placement="end"  variant="light" style={{color:"#878787"}} type="button" onClick={logout}>Logout</Nav.Item>
                    </Nav.Item>
                </>
                :
                <>
                    <Nav.Item>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav.Item>
                </>
            }
            </Navbar.Collapse>
            </Nav>
            </Container>
        </Navbar>
    )
}

export default NavComp;