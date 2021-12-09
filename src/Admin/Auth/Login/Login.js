import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Form, Button, Card, Alert} from "react-bootstrap";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {auth} from "../../../config/firebase"
import {loginUser} from "../../../redux/actionCreators/authActionCreators"

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
                histroy("../register", {replace:true});
        })
        .catch(err=>{
            setError("Failed to create account with : " + err.response.status + " error");
        })
    }

    return (
        <Card className="py-4">
            <Row>
                <h1 className="font-weight-bold text-center py-4">Login</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Col md={6} sm={12} xm={12} className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" rvalue={password} onChange={e=>setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button className="w-100 mt-3" variant="dark" type="submit">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}

export default Login;
