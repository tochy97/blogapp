import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import linkedin from './imgs/linkedin.png';
import github from './imgs/github.png';
import { Divider } from '@mui/material';

const Footer = () => {
    return (
        <Container style={{borderRight:0, borderLeft:0, borderBottom:0, marginTop:"2rem", }}>
            <Divider light/>
            <Row style={{marginTop:"1rem", padding:"1rem", bottom:0, left:0, width:"full"}}>
                <Col style={{marginLeft:"3rem"}}>
                    <p><NavLink to="/aboutSite" style={{color:"black", textDecoration:0}}>About site</NavLink></p>
                    <p><NavLink to="/req" style={{color:"black", textDecoration:0}}>Contact me</NavLink></p>
                    <a href='https://github.com/tochy97/blogapp' style={{color:"black", textDecoration:0}}>Repo for this site</a>
                </Col>
                <Col className="flex items-center">
                    <a aria-label="Linkedin"  href="https://www.linkedin.com/in/tochukwu-egeonu-79935a127/">
                        <img style={{width:"2rem", margin:"1rem"}} src= {linkedin} alt = "linkedin"/>
                    </a>
                    <a aria-label="Github"  href="https://github.com/tochy97">
                        <img style={{width:"2rem", margin:"1rem"}} src= {github} alt = "github"/>
                    </a>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer
