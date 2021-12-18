import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <Card style={{borderRight:0, borderLeft:0, borderBottom:0, marginTop:"2rem"}}>
            <Row style={{marginTop:"1rem", padding:"1rem", position:"static", bottom:0, left:0, width:"full"}}>
                <Col>
                    <p>This is some content in sticky footer</p>
                    <p>This is some content in sticky footer</p>
                    <p>This is some content in sticky footer</p>
                    <p>This is some content in sticky footer</p>
                </Col>
                <Col>
                    <p>This is some content in sticky footer</p>
                    <p>This is some content in sticky footer</p>
                    <p>This is some content in sticky footer</p>
                    <p>This is some content in sticky footer</p>
                </Col>
                <Col>
                    <p>This is some content in sticky footer</p>
                    <p>This is some content in sticky footer</p>
                    <p>This is some content in sticky footer</p>
                    <p>This is some content in sticky footer</p>
                </Col>
            </Row>
        </Card>
    )
}

export default Footer
