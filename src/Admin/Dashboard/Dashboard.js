import React from 'react'
import {Routes,Route,Navigate} from "react-router-dom"; 
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import { auth } from '../../config/firebase';
import { logoutUser } from '../../redux/actionCreators/authActionCreators';
import {Row, Col, Form, Button, Card, Alert} from "react-bootstrap";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const histroy = useNavigate();
    const logout=()=>{
        auth.signOut();
        dispatch(logoutUser);
        histroy("../login", {replace:true});
    }
    return (
        <Card className="py-4">
            <Row>
                <Col md={6} sm={12} xm={12} className="mx-auto">
                    Dashboard
                </Col>
            </Row>
        </Card>
    )
}

export default Dashboard;