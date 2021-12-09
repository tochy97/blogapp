import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Row, Col, Form, Button, Card, Alert, ProgressBar} from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { doPost } from '../../redux/actionCreators/postActionCreators';

export const AddPost = () => {
    const { currentUser } = getAuth();
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [group,setGroup] = useState("");
    const [post,setPost] = useState("");
    const [progress,setProgress] = useState(0);
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    
    function handleSubmit(e) {
        e.preventDefault();
        if(!title || title.length > 50){
            return setError("Please enter a title no more than 100 charecters")
        }
        if(!group){
            return setError("Please select a group")
        }
        if(!desc || desc.length > 255){
            return setError("Please enter a description no more than 255 charecters")
        }
        if(!post){
            return setError("Please select a file")
        }
        const data = {
            title:title,
            author: currentUser.displayName,
            group:group,
            createdDate: new Date(),
            desc:desc,
            post:"",
        }
        dispatch(doPost(data,post,setProgress))
    }

    function handleChange(e) {
        e.preventDefault();
    }
    return (
        <Card className="py-4">
            <Row>
                <Col md={6} sm={12} xm={12} className="mx-auto">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {
                        progress > 0 && progress < 100? 
                            <> <h1>Uploading Post {progress} % </h1>  <ProgressBar now={progress} max={100}/> </> 
                            : progress === 100 ?
                            <> <h1>Post uploaded succcessfully</h1></> 
                            :
                        <Form className='textforms' onSubmit={handleSubmit}>
                            <h4>Upload File</h4>  
                            <Form.Group id="title"> 
                                <Form.Control type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
                            </Form.Group>
                            <Form.Group id="desc">
                                <textarea className="form-control" value={desc} onChange={e=>setDesc(e.target.value)} style={{height: "105px", marginTop: "1rem"}} placeholder="Enter description..."/>
                            </Form.Group>
                            <Form.Group id="group"> 
                                <Form.Control type="text" value={group} onChange={e=>setGroup(e.target.value)} style={{marginTop: "1rem"}} placeholder="Group"/>
                            </Form.Group>
                            <Form.Group id="file">
                                <Form.Control type="file" onChange={e=>setPost(e.target.files[0])} style={{marginTop: "1rem"}} type="file"/>
                            </Form.Group>
                            <Button className="w-100 mt-3" variant="dark" type="submit">Upload</Button>
                        </Form>
                    }
                </Col>
            </Row>
        </Card>
    )
}

export default AddPost;