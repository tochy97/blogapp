import React, { useState, useEffect } from 'react';
import {Row, Col, Form, Button, Card, Alert} from "react-bootstrap";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {auth} from "../../config/firebase"
import { Divider } from '@mui/material';
import {loginUser, logoutUser} from "../../redux/actionCreators/authActionCreators";

export const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const histroy = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then(()=>{
            const user = auth.currentUser
            const data = {
                user: user.providerData[0],
                id: user.uid,
                }
                dispatch(loginUser(data));
                histroy("../../", {replace:true});
        })
        .catch(err=>{
            setError(err.message.split("(")[0]);
        })
    }

    useEffect(() => {
        auth.signOut();
        dispatch(logoutUser);
    }, [dispatch]);

    return (
        <Card className="py-4" style={{border:0}}>
            <Row className="px-5 my-6 gap-5">
                <Divider className="font-weight-bold text-center py-4"><h1>Login</h1></Divider>
                {error && <Alert variant="danger">{error}</Alert>}
                <Col lg={10}  className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Floating id="email">
                            <Form.Control type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}></Form.Control>
                            <Form.Label>Email</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="password" style={{marginTop: "1rem"}} >
                            <Form.Control type="password" placeholder="Password" rvalue={password} onChange={e=>setPassword(e.target.value)}></Form.Control>
                            <Form.Label>Password</Form.Label>
                        </Form.Floating>
                        <Button className="w-100 mt-4" variant="dark" type="submit">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}

export default Login;
