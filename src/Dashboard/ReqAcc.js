import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {Row, Col, Form, Button, Card, Alert, Container} from "react-bootstrap";
import { setRequest, checkRequest } from '../redux/actionCreators/authActionCreators';
import { Divider } from '@mui/material';

const ReqAcc = () => {
    const [realname,setRealname] = useState("");
    const [email,setEmail] = useState("");
    const [req,setReq] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();

    const { isReq } = useSelector(
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
        <Card className="py-4 align-center" style={{border:0}}>
            <Row className="px-5 my-6 gap-5">
        { 
            isReq ?
                <Divider><h1 className='text-center mt-5'>Request Sent</h1></Divider>
            :
                <>
                <Divider className="font-weight-bold text-center py-4"><h1>Contact Me</h1></Divider>
                {error && <Alert variant="danger">{error}</Alert>}
                <Col lg={10} className="mx-auto">
                    <Container className='p-2 m-2'>
                        <Divider>Phone: (469) - 658 - 6413 </Divider>
                        <Divider>Email: tochyegeonu97@hotmail.com </Divider>
                    </Container>
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
                            <textarea className="form-control" value={req} onChange={e=>setReq(e.target.value)} style={{height: "105px", marginTop: "1rem"}} placeholder="Enter your messages" required/>
                            <Form.Label>Enter your message</Form.Label>
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
