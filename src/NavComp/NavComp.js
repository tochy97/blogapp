import React from 'react'
import { Navbar, Nav, NavDropdown, Container, Offcanvas } from 'react-bootstrap'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { getAuth } from "firebase/auth";
import {logoutUser} from "../redux/actionCreators/authActionCreators"   
import { Divider } from '@mui/material'

export const NavComp = () => {
    const dispatch = useDispatch();
    const histroy = useNavigate();
    const { currentUser } = getAuth();

    const {isLoading, isLoggedin, user} = useSelector(
        (state) =>({
            isLoggedin:state.post.isLoading, 
            isLoading:state.post.isLoading, 
            user:state.auth.user,
        }), shallowEqual
    );

    const logout=()=>{
        auth.signOut();
        dispatch(logoutUser);
        histroy("../../dashboard", {replace:true});
    }
    return (
        <Navbar bg="light" expand={false} variant="light" style={{padding: "20px",color:"#fff", borderRight:0}} >
            { 
                !isLoading 
                ?
        <Container fluid>
        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" style={{border:0}}>Options</Navbar.Toggle>
            <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            >
            <Offcanvas.Header closeButton>
                {   
                    currentUser
                    ?
                        <Offcanvas.Title id="offcanvasNavbarLabel">Hello, {user.displayName}</Offcanvas.Title>
                    :
                        <Offcanvas.Title id="offcanvasNavbarLabel">Hello, guest</Offcanvas.Title>
                }
            </Offcanvas.Header>
            <Offcanvas.Body>
                { 
                    currentUser 
                    ?
                    <>  
                        <Nav.Item  style={{marginLeft:"1rem"}}>
                            <Nav.Link href="/admin/managepost" style={{color:"black"}}>Manage</Nav.Link>
                        </Nav.Item>
                        <Divider style={{margin:"1rem"}}/>
                        <Nav.Item  style={{marginLeft:"1rem"}}>
                            <Nav.Link href="/admin/addpost" style={{color:"black"}}>Add</Nav.Link>
                        </Nav.Item>
                        <Divider style={{margin:"1rem"}}/>
                        <Nav.Item  style={{marginLeft:"1rem"}}>
                            <Nav.Link href="/admin/register" style={{color:"black"}}>Register</Nav.Link>
                        </Nav.Item>
                        <Divider style={{margin:"1rem"}}/>
                        <Nav.Item  style={{marginLeft:"1rem"}}>
                            <Nav.Item  placement="end"  variant="light" style={{color:"#878787", padding:"1rem"}} type="button" onClick={logout}>Logout</Nav.Item>
                        </Nav.Item>
                    </>
                    :
                    <>
                        <Nav.Item  style={{marginLeft:"15px"}}>
                            <Nav.Link href="/login" style={{color:"black"}}>Login</Nav.Link>
                        </Nav.Item>
                        <Divider style={{margin:"1rem"}}/>
                        <Nav.Item  style={{marginLeft:"15px"}}>
                            <Nav.Link href="/req" style={{color:"black"}}>Request Account</Nav.Link>
                        </Nav.Item>
                    </>
                }
            </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
        :
        <></>
        }
        </Navbar>
    )
}

export default NavComp;