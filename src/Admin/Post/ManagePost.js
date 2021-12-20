import React, {useEffect} from 'react';
import {Card,Row,Col,Button} from "react-bootstrap";
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { fetchPost, removePost } from '../../redux/actionCreators/postActionCreators';
import {useNavigate} from "react-router-dom"
import { Divider } from '@mui/material';

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
        <Card className="py-4" style={{border:0}}>
            <Row className="px-5 my-6 gap-5">
                { 

                    isLoading 
                        ? 
                            <Card className="py-4" style={{height:"70vh"}}>
                                <Divider><h1>Loading...</h1></Divider> 
                            </Card>
                    : post.length < 1 || myPosts.length < 1 
                        ? 
                            <Card className="py-4" style={{height:"70vh"}}>
                                <Divider><h1>You have no posts</h1></Divider>
                            </Card>
                    :
                        myPosts.map((pst, index) =>(
                            <Card className="col-md-5 mx-auto px-0" key={index}>
                            <Card.Header style={{padding:"2rem"}}>Title: {pst.data.title} <br/> Description: {pst.data.desc } <br/> By: {pst.data.author}</Card.Header>
                                <Card.Body className='mb-5'>
                                { 
                                    pst.data.postType === "img"
                                        ?
                                            <Card.Img src={pst.data.post} alt={pst.data.title}/>
                                        :
                                            <Card.Text style={{padding:"5rem"}}>{pst.data.post}</Card.Text>
                                }
                                </Card.Body>
                                    <Card.Footer style={{padding:"1rem", bottom:0, position:"absolute", width:"100%"}} className="bg-white mt-2">
                                        <Button variant="dark"  onClick={()=>histroy(`../../post/${pst.id}`, {replace:true})} className="form-control mb-0">See Post</Button>
                                        <Button variant="danger" onClick={()=>[dispatch(removePost(pst.id,pst.data.post)), histroy("../dashboard", {replace:true})]} className="form-control my-1 mb-0">Delete Post</Button>
                                    </Card.Footer>
                            </Card>
                        ))
                }
            </Row>
        </Card>
    )
}

export default ManagePost;