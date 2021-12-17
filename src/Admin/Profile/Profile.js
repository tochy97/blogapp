import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

const Profile = () => {
    const dispatch = useDispatch();

    const {user} = useSelector(
        (state) =>({
            user:state.auth.user,
        }), shallowEqual);
        console.log(user)

    return (
        <div>
            {}
        </div>
    )
}

export default Profile
