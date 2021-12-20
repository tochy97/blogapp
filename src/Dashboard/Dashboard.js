import React, { useEffect } from 'react';
import { Card, Row, Button } from "react-bootstrap";
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import { Divider } from '@mui/material';
import { fetchPost } from '../redux/actionCreators/postActionCreators';
import { checkUser } from '../redux/actionCreators/authActionCreators';

export const Dashboard = () => {
    const {isLoading, post, userID} = useSelector(
        (state) =>({
            isLoading:state.post.isLoading, 
            post:state.post.posts,
            user:state.auth.user_id,
        }), shallowEqual);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(isLoading){
            dispatch(fetchPost());
        }
    }, [isLoading,dispatch]);
    useEffect(() => {
        if(!userID){
            dispatch(checkUser());
        }
    }, [userID,dispatch]);

    const myPosts = post;
    const histroy = useNavigate();

    return (
        <Card className="py-4" style={{border:0}}>
            <Row className="px-5 my-6 gap-5">
                { 
                    isLoading 
                        ? 
                        <Card style={{height:"100vh"}}>
                            <Divider><h1>Loading...</h1></Divider> 
                        </Card>
                    : post.length < 1 || myPosts.length < 1 
                        ?
                        <Card style={{height:"100vh"}}>
                             <Divider><h1>No Post Found</h1></Divider>
                        </Card>
                    :
                        myPosts.map((pst, index) =>(
                            <Card className="col-md-5 mx-aut px-0" key={index}>
                            <Card.Header style={{padding:"2rem"}}>Title: {pst.data.title} <br/> Description: {pst.data.desc } <br/> By: {pst.data.author}</Card.Header>
                                <Card.Body>
                                { 
                                    pst.data.postType === "img"
                                        ?
                                            <Card.Img src={pst.data.post} alt={pst.data.title}/>
                                        :
                                            <Card.Text style={{padding:"5rem"}}>{pst.data.post}</Card.Text>
                                }
                                </Card.Body>
                                    <Card.Footer style={{padding:"1rem", bottom:0, position:"absolute", width:"100%"}} className="bg-white mt-2">
                                        <Button variant="dark"  onClick={()=>histroy(`../../post/${pst.id}`, {replace:true})} className="form-control mb-0">View Post</Button>
                                    </Card.Footer>
                            </Card>
                        ))
                }
            </Row>
        </Card>
    )
}

export default Dashboard;