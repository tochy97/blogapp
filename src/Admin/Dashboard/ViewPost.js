import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router'
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { doComment, fetchPost } from '../../redux/actionCreators/postActionCreators';
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';

const ViewPost = () => {
    const {postId} = useParams();
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

    const currentPost = !isLoading && post.length > 0 && post.find((pst) =>pst.postId === postId);

    function handleSubmit(e){
        e.preventDefault();
        if(currentUser)
        {
            if(!comment || comment.length > 255){
                return setError("Please enter a comment no more than 255 charecters");
            }
            setError("");
            const data={
                postId:postId,
                author: currentUser.displayName,
                createdBy: currentUser.uid,
                createdDate: new Date(),
                comment:comment,
            }
            console.log(data)
            dispatch(doComment(data,postId,currentPost.postData.comments))
        }
        else
        {
            return setError("You are not logged in");
        }
    }
    return (
        <>
        { 
            isLoading 
                ? <h1>Loading...</h1> 
            : post.length < 1 || !isLoading && !currentPost
                ? <h1>No Post Found</h1>
            :
                <Container>
                    <Row>
                        <Card className="mb-2 mt-2">
                            <Card.Img style={{padding: "15px",}} src={currentPost.postData.post} alt={currentPost.postData.title} />
                            <Card.Body>
                                <Card.Title>Title: {currentPost.postData.title}</Card.Title>
                                <Card.Subtitle  style={{ marginBottom: "5px",}} >Description: {currentPost.postData.desc}</Card.Subtitle>
                                <Card.Subtitle>Group: {currentPost.postData.group}</Card.Subtitle>
                                <Card className="p-3 mt-2"> 
                                    {
                                        currentUser
                                            ?    <Form className='mt-2' onSubmit={handleSubmit}>
                                                    {error && <Alert variant="danger">{error}</Alert>}
                                                    <Form.Group id="comment">
                                                        <textarea className="form-control mb-2" value={comment} onChange={e=>setComment(e.target.value)} style={{height: "105px", marginTop: "1rem"}} placeholder="Leave a comment..."/>
                                                    </Form.Group>
                                                    <Button className="w-100 mt-3" variant="dark" type="submit">Post Comment</Button>
                                                </Form>
                                            :
                                                <Link to="../../login">
                                                    <Button className="w-100 mt-3" variant="dark" type="submit">Login to comment</Button>
                                                </Link>
                                    }
                                    {
                                        currentPost.postData.comments.length < 1
                                            ?   <Card className="p-2 mt-2">
                                                    <h1 className="text-center">No Comments Found</h1>
                                                </Card>
                                        :
                                            currentPost.postData.comments.map((comment,index)=>(
                                                <Card className="p-2 mt-2" key={index}>
                                                    <Card.Title>By: {comment.author}</Card.Title>
                                                    <Card.Subtitle  style={{ marginBottom: "5px",}} >Description: {comment.comment}</Card.Subtitle>
                                                </Card>
                                            ))
                                    }
                                </Card>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
        }
        </>
    )
}

export default ViewPost
