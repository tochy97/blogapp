import React, {useEffect, useState} from 'react';
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
import { Container, Row, Card, Form, Button, Alert } from 'react-bootstrap';
import { doComment, fetchPost } from '../redux/actionCreators/postActionCreators';
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import { undoComment } from '../redux/actionCreators/postActionCreators';

const ViewPost = () => {
    const postId = window.location.pathname.split("/")[2];
    const [comment,setComment] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const { currentUser } = getAuth();

    const {isLoading,post} = useSelector((state) => ({
        isLoading:state.post.isLoading,
        post:state.post.posts,
    }),shallowEqual);

    useEffect(() => {
      if(isLoading){
        dispatch(fetchPost());
      }
    }, [isLoading,dispatch]);

    const currentPost = !isLoading && post.length > 0 && post.find((pst) =>pst.id === postId);

    function handleSubmit(e){
        e.preventDefault();
        if(currentUser){
            try{
                if(!comment || comment.length > 255){
                    return setError("Please enter a comment no more than 255 charecters");
                }
                setError("");
                const data={
                    id:postId,
                    author: currentUser.displayName,
                    createdBy: currentUser.uid,
                    createdDate: new Date(),
                    comment:comment,
                }
                dispatch(doComment(data,postId,currentPost.data.comments));
            }
            finally{
                setComment(" ");
            }
        }
        else{
            return setError("You are not logged in");
        }
    }

    function deleteComment(e, index, id, comments){
        e.preventDefault();
        dispatch(undoComment(index,id,comments))
    }
    
    return (
        <>
        { 
            (post.length < 1 || !isLoading) && !currentPost
                ? <Divider><h1>No Post Found</h1></Divider>
            :
                <Container>
                    <Row>
                        <Card className="mb-2 mt-2 p-2">
                            { 
                                currentPost.data.postType === "img"
                                ?
                                    <Card.Img src={currentPost.data.post} alt={currentPost.data.title}/>
                                :
                                currentPost.data.postType === "mp4"
                                ?
                                    <video width="auto" controls auto>
                                        <source src={currentPost.data.post} type="video/mp4"/>
                                    Your browser does not support HTML video.
                                    </video>
                                :
                                    <Card.Text style={{padding:"5rem"}}>{currentPost.data.post}</Card.Text>
                            }
                            <Card.Body>
                                <Card.Title>Title: {currentPost.data.title}</Card.Title>
                                <Card.Subtitle  style={{ marginBottom: "5px",}} >Description: {currentPost.data.desc}</Card.Subtitle>
                                <Card.Subtitle>Group: {currentPost.data.group}</Card.Subtitle>
                                {
                                    currentUser
                                    ?   
                                    <>
                                        {
                                            currentPost.data.comments.length < 1
                                            ?   <Card className="p-2 mt-2">
                                                    <Divider className="text-center">No Comments Found</Divider>
                                                </Card>
                                            :
                                            currentPost.data.comments.map((comment,index)=>(
                                                <Card className="p-3 mt-2" key={index}>
                                                    <Card.Title style={{ marginBottom: "5px",}} >From: {comment.author}</Card.Title>
                                                    <Card.Text>{comment.comment} </Card.Text>
                                                    {
                                                        comment.createdBy === currentUser.uid || currentPost.data.createdBy === currentUser.uid
                                                        ?
                                                            <Button style={{width:"auto", alignSelf:"center", borderColor:"red", backgroundColor:"white", color:"red"}} onClick={e => {deleteComment(e, index,currentPost.id,currentPost.data.comments)}}>Delete</Button>
                                                        :
                                                            <></>
                                                    }
                                                </Card>
                                            ))
                                        }
                                        <Form className='mt-2' onSubmit={handleSubmit}>
                                            {error && <Alert variant="danger">{error}</Alert>}
                                            <Form.Group id="comment">
                                                <textarea className="form-control mb-2" value={comment} onChange={e=>{setComment(e.target.value)}} style={{height: "105px", marginTop: "1rem"}} placeholder="Leave a comment..." required/>
                                            </Form.Group>
                                            <Button className="w-100 mt-3" variant="dark" type="submit">Post Comment</Button>
                                        </Form>
                                    </>
                                    :
                                    <>
                                        {
                                            currentPost.data.comments.length < 1
                                            ?   
                                                <Card className="p-2 mt-2">
                                                    <Divider className="text-center">No Comments Found</Divider>
                                                </Card>
                                            :
                                                currentPost.data.comments.map((comment,index)=>(
                                                    <Card className="p-3 mt-2" key={index}>
                                                        <Card.Title style={{ marginBottom: "5px",}} >{comment.comment}</Card.Title>
                                                        <Card.Text>From: {comment.author} </Card.Text>
                                                    </Card>
                                                ))
                                        }
                                        <Link to="../../login">
                                            <Button className="w-100 mt-3" variant="dark" type="submit">Login to comment</Button>
                                        </Link>
                                    </>
                                }
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
        }
        </>
    )
}

export default ViewPost
