import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import instagram from './imgs/instagram.png';
import linkedin from './imgs/linkedin.png';
import facebook from './imgs/facebook.png';
import github from './imgs/github.png';
import { Divider } from '@mui/material';

const Footer = () => {
    return (
        <Container style={{borderRight:0, borderLeft:0, borderBottom:0, marginTop:"2rem", }}>
            <Divider light/>
            <Row style={{marginTop:"1rem", padding:"1rem", bottom:0, left:0, width:"full"}}>
                <Col style={{marginLeft:"3rem"}}>
                    <p><NavLink to="/aboutSite" style={{color:"black", textDecoration:0}}>About Site</NavLink></p>
                    <p><NavLink to="/aboutCreator" style={{color:"black", textDecoration:0}}>About Creator</NavLink></p>
                    <p><NavLink to="/aboutCreator" style={{color:"black", textDecoration:0}}>Other Projects</NavLink></p>
                    <p><NavLink to="/req" style={{color:"black", textDecoration:0}}>Contact Me</NavLink></p>
                </Col>
                <Col className="flex items-center">
                                    <a aria-label="Instagram"  href="https://www.instagram.com/tokyo_hippie/">
                                            <img style={{width:"2rem", margin:"2rem"}} src= {instagram} alt = ""/>
                                    </a>
                                    <a aria-label="Youtube"  href="https://www.youtube.com/channel/UCzoJQ8_IB-ELiaxY2W9OQGA">
                                            <img style={{width:"2rem", margin:"2rem"}} src= {linkedin} alt = ""/>
                                    </a>
                                    <a aria-label="Facebook"  href="https://www.instagram.com/tokyo_hippie/">
                                            <img style={{width:"2rem", margin:"2rem"}} src= {facebook} alt = ""/>
                                    </a>
                                    <a aria-label="Twitch"  href="https://www.instagram.com/tokyo_hippie/">
                                            <img style={{width:"2rem", margin:"2rem"}} src= {github} alt = ""/>
                                    </a>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer
