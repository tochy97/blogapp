import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { getAuth } from "firebase/auth";
import {logoutUser} from "../redux/actionCreators/authActionCreators"   

export const NavComp = () => {
    const dispatch = useDispatch();
    const histroy = useNavigate();
    const { currentUser } = getAuth();

    const {isLoading, user} = useSelector(
        (state) =>({
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

        <Navbar bg="light" expand="lg" variant="light" style={{padding: "20px",color:"#fff", borderRight:0}} >
            { 
                !isLoading 
                ?
                <Container>
                {   
                    currentUser 
                    ?
                        <Navbar.Brand href="../../">Hello, {user.displayName}</Navbar.Brand>
                    :
                        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
                }
                <Nav className="me-auto">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    { 
                        currentUser 
                        ?
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
            :   <></>
            }
        </Navbar>
    )
}

export default NavComp;