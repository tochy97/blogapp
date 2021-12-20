import React from 'react'
import { Card, Row, Col} from 'react-bootstrap';
import { Divider } from '@mui/material';
import me from "./me.png"

const AboutCreator = () => {
    return (
        <Card className="py-4 text-center" style={{border:0}}>
            <Row className="px-5 my-6 gap-5">
                <Col lg={10}  className="mx-auto" style={{alignItems: "center"}}>
                    <Divider><h1>About Creator</h1></Divider>
                    <Card.Text>My name is Tochukwu Egeonu, or Tochy for short. I am a University of Texas at Arlington graduate of 2022, with my bachelor’s in computer science. I am originally from Nigeria, but I have lived in the US since the age of three. I was raised in the DFW area, specifically Grand Prairie, Texas. I spend my free time creating/updating little projects such as this one. If you like the look and feel of this site and want one of your own, feel free to contact me for a consultation. Feel free to check out my links below.</Card.Text>
                    <Card.Img src={me} alt="me" style={{width:"10rem", alignSelf: "center"}}></Card.Img>
                    <Card.Subtitle className='mt-2'>Phone: (469) - 658 - 6413 </Card.Subtitle>
                    <Card.Subtitle className='mt-2'>Email: tochyegeonu97@hotmail.com </Card.Subtitle>
                </Col>
            </Row>
        </Card>
    )
}

export default AboutCreator
