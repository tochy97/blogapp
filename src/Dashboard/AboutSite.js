import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { Divider } from '@mui/material';

const AboutSite = () => {
    return (
        <Card className="py-4 text-center" style={{border:0}}>
            <Row className="px-5 my-6 gap-5">
                <Col lg={10}  className="mx-auto" style={{alignItems: "center"}}>
                    <Divider><h1>About Site</h1></Divider>
                    <Card.Text>This is a sample website created by <NavLink to="/aboutcreator" style={{color:"black", textDecoration:''}}><b>Tochukwu Egeonu</b></NavLink>.<br/>Thank you. - Tochy </Card.Text>
                </Col>
            </Row>
        </Card>
    )
}

export default AboutSite
