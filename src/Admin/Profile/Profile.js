import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Divider } from '@mui/material';

const Profile = () => {
    const dispatch = useDispatch();

    const {user} = useSelector(
        (state) =>({
            user:state.auth.user,
        }), shallowEqual);

    return (
        <Card className="py-4 align-center" style={{border:0, height:"70vh"}}>
            <Divider className='text-center mt-5'><h1>Profile Page: Coming Soon....</h1></Divider>
        </Card>
    )
}

export default Profile
