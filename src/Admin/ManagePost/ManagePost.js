import React, {useEffect} from 'react';
import {Card,Row,Col,Button} from "react-bootstrap";
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { fetchPost, removePost } from '../../redux/actionCreators/postActionCreators';
import {useNavigate} from "react-router-dom"

export const ManagePost = () => {
    const histroy = useNavigate();
    const dispatch = useDispatch();

    const {isLoading, post, userID} = useSelector(
        (state) =>({
            isLoading:state.post.isLoading, 
            post:state.post.posts,
            userID:state.auth.user_id,
        }), shallowEqual);
    
    useEffect(() => {
        if(isLoading){
            dispatch(fetchPost());
        }
    }, [isLoading,dispatch]);

    const myPosts = post && post.filter((pst) => pst.data.createdBy === userID);

    return (
        <Card className="py-4">
            <Row className="px-5 my-6 gap-5">
                { 

                    isLoading 
                        ? <h1>Loading...</h1> 
                    : post.length < 1 || myPosts.length < 1 
                        ? <h1>You have no posts</h1>
                    :
                        myPosts.map((pst, index) =>(
                            <Card className="col-md-5 mx-aut px-0" key={index}>
                                <Card.Img src={pst.data.post} alt={pst.data.title}/>
                                <Card.Body>
                                    <Card.Title>Title: {pst.data.title}</Card.Title>
                                    <Card.Subtitle  style={{ marginBottom: "5px",}} >Description: {pst.data.desc}</Card.Subtitle>
                                    <Card.Subtitle>Group: {pst.data.group}</Card.Subtitle>
                                    <Card.Footer className="bg-white mt-2">
                                        <div className="d-flex w-100 px-5 py-2 align-items-center">
                                        <p>By: {pst.data.author} </p>
                                        </div>
                                        <Button variant="dark"  onClick={()=>histroy(`../post/${pst.id}`, {replace:true})} className="form-control mb-0">See Post</Button>
                                        <Button variant="danger" onClick={()=>[dispatch(removePost(pst.id,pst.data.post)), histroy("../dashboard", {replace:true})]} className="form-control my-1 mb-0">Delete Post</Button>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        ))
                }
            </Row>
        </Card>
    )
}

export default ManagePost;