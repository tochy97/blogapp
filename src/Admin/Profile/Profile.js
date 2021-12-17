import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

const Profile = () => {
    const dispatch = useDispatch();

    const {user} = useSelector(
        (state) =>({
            user:state.auth.user,
        }), shallowEqual);

    return (
        <div>
            <h1 className='text-center mt-5'>Profile Page: Coming Soon....</h1>
        </div>
    )
}

export default Profile
