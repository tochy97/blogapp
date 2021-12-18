import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {Row, Col, Form, Button, Card, Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { Divider } from '@mui/material';

const CreateGroup = () => {
    const [name,setName] = useState("");
    const [desc,setDesc] = useState("");
    const [req,setReq] = useState("");
    const [error,setError] = useState("");
    function handleSubmit(e){
        e.preventDefault();
        if(desc.length > 100) {
            return setError("Description must be less than 100 charecters.");
        }
    }
    return (
        <Card className="py-4 align-center" style={{border:0, height:"70vh"}}>
            <Row className="px-5 my-6 gap-5">
                <Divider className="font-weight-bold text-center py-4"><h1>Create Group</h1></Divider>
                {error && <Alert variant="danger">{error}</Alert>}
                <Col lg={10} className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Floating id="realname">
                            <Form.Control type="text"value={name} placeholder="Group Name" onChange={e=>setName(e.target.value)} required></Form.Control>                            
                            <Form.Label>Group Name</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="desc" style={{marginTop: "1rem"}} >
                            <textarea className="form-control" value={desc} onChange={e=>setDesc(e.target.value)} style={{height: "105px", marginTop: "1rem"}} placeholder="Description" required/>
                            <Form.Label>Descriptionn</Form.Label>
                        </Form.Floating>
                        <Button className="w-100 mt-4" variant="dark" type="submit">Create Group</Button>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}

export default CreateGroup
