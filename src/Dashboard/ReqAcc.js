import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {Row, Col, Form, Button, Card, Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { setRequest, checkRequest } from '../redux/actionCreators/authActionCreators';

const ReqAcc = () => {
    const [realname,setRealname] = useState("");
    const [email,setEmail] = useState("");
    const [req,setReq] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const histroy = useNavigate();

    const {isReq, post, userID} = useSelector(
        (state) =>({
            isReq:state.auth.req, 
        }), shallowEqual);

    function handleSubmit(e){
        e.preventDefault();
        dispatch(checkRequest(email));
        if(realname.split(" ").length < 2) {
            return setError("Wait! Please enter your first and last name.");
        }
        if(req.length > 100) {
            return setError("Reason must be less than 100 charecters.");
        }
        if(isReq){
            return setError("You cannot send multiple requests.");
        };
        dispatch(setRequest(req, email, realname));
    }
    return (
        <Card className="py-4 align-center" style={{borderRight:0}}>
            <Row className="px-5 my-6 gap-5">
        { 
            isReq ?
                <h1 className='text-center mt-5'>You cannot send 2 requests</h1>
            :
                <>
                <h1 className="font-weight-bold text-center py-4">Request an Account</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Col lg={10} className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Floating id="realname">
                            <Form.Control type="text"value={realname} placeholder="First and Last Name" onChange={e=>setRealname(e.target.value)} required></Form.Control>                            
                            <Form.Label>First and Last Name</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="email"  style={{marginTop: "1rem"}} >
                            <Form.Control type="email" style={{marginTop: "1rem"}} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required></Form.Control>                    
                            <Form.Label>Email</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="desc" style={{marginTop: "1rem"}} >
                            <textarea className="form-control" value={req} onChange={e=>setReq(e.target.value)} style={{height: "105px", marginTop: "1rem"}} placeholder="Why do you want an account?..." required/>
                            <Form.Label>Description</Form.Label>
                        </Form.Floating>
                        <Button className="w-100 mt-4" variant="dark" type="submit">Send Request</Button>
                    </Form>
                </Col>
                </>
        }
        </Row>
    </Card>
    )
}

export default ReqAcc
