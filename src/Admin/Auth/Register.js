import React, { useState } from 'react';
import {Row, Col, Form, Button, Card, Alert} from "react-bootstrap";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {auth} from "../../config/firebase"
import {loginUser, createUser} from "../../redux/actionCreators/authActionCreators"

export const Register = () => {
    const [username,setUsername] = useState("");
    const [realname,setRealname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const histroy = useNavigate();


    function handleSubmit(e){
        e.preventDefault();
        setError("")
        if(password !== confirm){
            return setError("Wait! Pawword did not match");
        }
        if(realname.split(" ").length < 2) {
            return setError("Wait! Please enter your first and last name");
        }
        if(username.length > 16) {
            return setError("Wait! Username must by 16 charecters or less");
        }
        auth.createUserWithEmailAndPassword(email,password)
        .then(()=>{
            auth.currentUser.updateProfile({
                displayName:username,
            }).then(()=>{
                const user = auth.currentUser
                const data = {
                    user: user.providerData[0],
                    id: user.uid,
                    }
                    dispatch(createUser(data.id, data.user.email, data.user.displayName,realname));
                    dispatch(loginUser(data));
                    histroy("../dashboard", {replace:true});
            })
            .catch(err=>{
                setError(err.message.split("(")[0]);
            })
        })
        .catch(err=>{
            setError("Failed to create account: " + err.response.status + " error");
        })
    }
    return (
        <Card className="py-4" style={{borderRight:0}}>
            <Row className="px-5 my-6 gap-5">
                <h1 className="font-weight-bold text-center py-4">Register</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Col lg={10} className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Floating id="username">
                            <Form.Control type="text" placeholder="User Name" value={username} onChange={e=>setUsername(e.target.value)} required></Form.Control>
                            <Form.Label>User Name</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="realname" style={{marginTop: "1rem"}} >
                            <Form.Control type="text" placeholder="First and Last Name" value={realname} onChange={e=>setRealname(e.target.value)} required></Form.Control>
                            <Form.Label>Real Name</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="email" style={{marginTop: "1rem"}} >
                            <Form.Control type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required></Form.Control>
                            <Form.Label>Email</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="password" style={{marginTop: "1rem"}} >
                            <Form.Control type="password" placeholder="Password" rvalue={password} onChange={e=>setPassword(e.target.value)} required></Form.Control>
                            <Form.Label>Password</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="confirm" style={{marginTop: "1rem"}} >
                            <Form.Control type="password" placeholder="Password Conrimation" value={confirm} onChange={e=>setConfirm(e.target.value)} required></Form.Control>
                            <Form.Label>Password Conrimation</Form.Label>
                        </Form.Floating>
                        <Button className="w-100 mt-4" variant="dark" type="submit">Register User</Button>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}

export default Register;
