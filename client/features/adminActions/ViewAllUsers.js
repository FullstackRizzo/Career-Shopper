import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchUsersAsync, selectUsers } from './viewAllUsersSlice';

const ViewUsers =() =>{
    const allUsers = useSelector(selectUsers);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchUsersAsync());
    },[dispatch])

    return(
        <div className='allUsers-container'>
            <h1>Users</h1>
            {allUsers.map((user)=>(
                <div key = {user.id}>
                    <h2>{user.username}</h2>
                </div>
            ))}
        </div>
    )
}

export default ViewUsers;