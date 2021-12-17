import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {Row, Col, Form, Button, Card, Alert, ProgressBar, FloatingLabel} from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { doPost } from '../../redux/actionCreators/postActionCreators';

export const AddPost = () => {
    const { currentUser } = getAuth();
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [group,setGroup] = useState("");
    const [post,setPost] = useState("");
    const [vis,setVis] = useState("");
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
            createdBy: currentUser.uid,
            group:group,
            createdDate: new Date(),
            desc:desc,
            post:"",
            comments:[],
            vis:vis,
        }
        dispatch(doPost(data,post,setProgress))
    }

    return (
        <Card className="py-4" style={{borderRight:0}}>
            <Row className="px-5 my-6 gap-5">
                <h1 className="font-weight-bold text-center py-4">Add Post</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Col lg={10} className="mx-auto">
                    {
                        progress > 0 && progress < 100? 
                            <> <h1>Uploading Post {progress} % </h1>  <ProgressBar now={progress} max={100}/> </> 
                            : progress === 100 
                                ? <> <h1>Post uploaded succcessfully</h1>
                                    <h4>Please refresh page</h4>
                                </> 
                            :
                                <Form onSubmit={handleSubmit}>
                                    <Form.Floating> 
                                        <Form.Control type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
                                        <Form.Label htmlFor="floatingInputCustom">Title</Form.Label>
                                    </Form.Floating>
                                    <Form.Floating id="desc">
                                        <textarea className="form-control" value={desc} onChange={e=>setDesc(e.target.value)} style={{height: "105px", marginTop: "1rem"}} placeholder="Enter description..."/>
                                        <Form.Label htmlFor="floatingInputCustom">Description</Form.Label>
                                    </Form.Floating>
                                    <Form.Floating id="group"> 
                                        <Form.Control type="text" value={group} onChange={e=>setGroup(e.target.value)} style={{marginTop: "1rem"}} placeholder="Group"/>
                                        <Form.Label htmlFor="floatingInputCustom">Group</Form.Label>
                                    </Form.Floating>
                                    <Form.Group id="file">
                                        <Form.Control type="file" onChange={e=>setPost(e.target.files[0])} style={{marginTop: "1rem"}}/>
                                    </Form.Group>
                                    <FloatingLabel controlId="floatingSelect" label="Set Post Visibility" style={{marginTop: "1rem"}}>
                                        <Form.Select aria-label="Floating label select example">
                                            <option value="true">Public</option>
                                            <option value="false">Private</option>
                                            <option value="false">Group</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    <Button className="w-100 mt-3" variant="dark" type="submit">Upload</Button>
                                </Form>
                    }
                </Col>
            </Row>
        </Card>
    )
}

export default AddPost;