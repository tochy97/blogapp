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
                    <Card.Text>This is a site for those who want to post their creativity without the fear of unwanted outsiders. Each user must be created by an existing user. The owner of the site reserves the right to delete any accounts he wants. <b>No illegal content will be allowed.</b> To request an account, click <NavLink to="/req" style={{color:"black", textDecoration:''}}>here</NavLink> or the "Contact Me" link below. <br/>Thank you. - Tochy </Card.Text>
                </Col>
            </Row>
        </Card>
    )
}

export default AboutSite
