import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import { Row, Col, Form, Button, Card, Alert, ProgressBar, FloatingLabel } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { Divider } from '@mui/material';
import { storage, store } from "../../config/firebase";
import { addPost } from '../../redux/actionCreators/postActionCreators';

export const AddPost = () => {
    const { currentUser } = getAuth();
    const [title,setTitle] = useState("");
    const [postId, setpostId] = useState("");
    const [postType, setPostType] = useState("txt");
    const [desc,setDesc] = useState("");
    const [group,setGroup] = useState("");
    const [post,setPost] = useState("");
    const [vis,setVis] = useState("true");
    const [progress,setProgress] = useState(0);
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const histroy = useNavigate();
    
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
        if(postType === "txt"){   
            const data = {
                title:title,
                author: currentUser.displayName,
                createdBy: currentUser.uid,
                group:group,
                createdDate: new Date(),
                desc:desc,
                post:post,
                comments:[],
                postType:postType,
                vis:vis,
            }
            store.collection("post").add(data).then(async res=>{
                const document = await res.get();
                setpostId(document.id)
                setProgress(100);
                const postData = {data: document.data(),id: document.id};
                dispatch(addPost(postData));
            })
            .catch(err=>{
            })
        }
        else{
            const data = {
                title:title,
                author: currentUser.displayName,
                createdBy: currentUser.uid,
                group:group,
                createdDate: new Date(),
                desc:desc,
                post:"",
                comments:[],
                postType:postType,
                vis:vis,
            }
            store.collection("post").add(data).then(async res=>{
                const document = await res.get();
                setpostId(document.id)
                const postData = {data: document.data(),id: document.id};
                const uploadRef = storage.ref(`posts/${data.group}/${document.id}`);
        
                uploadRef.put(post).on("state_change", (snapshot) =>{
                    const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
                    setProgress(progress);
                },(err) =>{
                },async () =>{
                    const url = await uploadRef.getDownloadURL();
                    store.collection("post").doc(document.id).update({
                        post:url,
                    })
                    .then(()=>{
                        postData.data.post = url;
                        dispatch(addPost(postData));
                    })
                    .catch((err) =>{
                    })
                });
            })
            .catch(err=>{
            })
        }
    }

    return (
        <Card className="py-4" style={{border:0}}>
            <Row className="px-5 my-6 gap-5">
                <Divider className="font-weight-bold text-center py-4"><h1>Add Post</h1></Divider>
                {error && <Alert variant="danger">{error}</Alert>}
                <Col lg={10} className="mx-auto">
                    {
                        progress > 0 && progress < 100
                        ? 
                            <> 
                                <Divider className="font-weight-bold text-center py-4"><h1>Uploading Post {progress} % </h1></Divider>  <ProgressBar now={progress} max={100}/> 
                            </> 
                        : progress === 100 
                        ? 
                            <> 
                                <Divider className="font-weight-bold text-center py-4"><h1>Post uploaded succcessfully</h1></Divider>
                                <Button variant="dark"  onClick={()=>histroy(`../../post/${postId}`, {replace:true})} className="form-control mb-0">View Post</Button>
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
                                <FloatingLabel controlId="floatingSelect" label="Type" style={{marginTop: "1rem"}}>
                                    <Form.Select value={postType} onChange={e=>setPostType(e.target.value)} aria-label="Floating label select example">
                                        <option value="txt">Text</option>
                                        <option value="img">Image</option>
                                        <option value="mp4">MP4 Video</option>
                                    </Form.Select>
                                </FloatingLabel>
                                {
                                    postType === "img"
                                    ?
                                        <Form.Group id="post">
                                            <Form.Control type="file" accept=".png, .jpg, .jpeg, .gif, .heic" onChange={e=>setPost(e.target.files[0])} style={{marginTop: "1rem"}}/>
                                        </Form.Group>
                                    :
                                    postType === "mp4"
                                    ?
                                        <Form.Group id="post">
                                            <Form.Control type="file" accept=".mp4" onChange={e=>setPost(e.target.files[0])} style={{marginTop: "1rem"}}/>
                                        </Form.Group>
                                    :
                                        <Form.Floating id="post">
                                            <textarea className="form-control" value={post} onChange={e=>setPost(e.target.value)} style={{height: "105px", marginTop: "1rem"}}placeholder="Whats on your mind...?"/>
                                            <Form.Label htmlFor="floatingInputCustom">Whats on your mind...?</Form.Label>
                                        </Form.Floating>
                                }
                                <FloatingLabel controlId="floatingSelect" label="Visibility" style={{marginTop: "1rem"}}>
                                    <Form.Select value={postType} onChange={e=>setVis(e.target.value)} aria-label="Floating label select example">
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