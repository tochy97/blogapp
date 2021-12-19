import React, {useEffect} from 'react';
import {Card,Row,Col,Button} from "react-bootstrap";
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import { Divider } from '@mui/material';
import { fetchPost } from '../redux/actionCreators/postActionCreators';

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
                                { 
                                    pst.data.postType === "img"
                                        ?
                                            <Card.Img src={pst.data.post} alt={pst.data.title}/>
                                        :
                                            <Card.Text style={{padding:"13rem"}}>{pst.data.post}</Card.Text>
                                }
                                <Card.Body>
                                    <Card.Title>Title: {pst.data.title}</Card.Title>
                                    <Card.Subtitle  style={{ marginBottom: "5px",}} >Description: {pst.data.desc}</Card.Subtitle>
                                    <Card.Subtitle>Group: {pst.data.group}</Card.Subtitle>
                                    <Card.Footer className="bg-white mt-2">
                                        <div className="d-flex w-100 px-5 py-2 align-items-center">
                                        <p className="py-1 px-2">By: {pst.data.author}</p>
                                        </div>
                                        <Button variant="dark" onClick={()=>histroy(`../post/${pst.id}`, {replace:true})} className="form-control mb-0">See Post</Button>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        ))
                }
            </Row>
        </Card>
    )
}

export default Dashboard;