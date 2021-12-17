import React, { useState } from 'react';
import {Row, Col, Form, Button, Card, Alert} from "react-bootstrap";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {auth} from "../../config/firebase"
import {loginUser} from "../../redux/actionCreators/authActionCreators"

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
                histroy("../dashboard", {replace:true});
        })
        .catch(err=>{
            const text = err.message.split("(");
            setError(err.message.split("(")[0]);
        })
    }

    return (
        <Card className="py-4" style={{borderRight:0}}>
            <Row className="px-5 my-6 gap-5">
                <h1 className="font-weight-bold text-center py-4">Login</h1>
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
