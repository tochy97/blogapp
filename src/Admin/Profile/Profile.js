import React, { useEffect }  from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Divider } from '@mui/material';
import { checkUser } from '../../redux/actionCreators/authActionCreators';

const Profile = () => {
    const dispatch = useDispatch();

    const {user} = useSelector(
        (state) =>({
            user:state.auth.user,
        }), shallowEqual);
    useEffect(() => {
        if(!user){
            dispatch(checkUser());
        }
    }, [user,dispatch]);
    console.log(user)
    return (
        <Container>
            <Card className="py-4 align-center">
                <Col style={{borderStyle:"solid"}}>
                    <Row>Username</Row>
                    <Row>Email</Row>
                    <Row></Row>
                </Col>
                <Col style={{borderStyle:"solid"}}>
                    <Row></Row>
                    <Row></Row>
                    <Row></Row>
                </Col>
            </Card>
        </Container>
    )
}

export default Profile
