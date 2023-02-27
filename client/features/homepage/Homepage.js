import React from 'react';
import { useSelector } from 'react-redux';

const Homepage = () =>{
    const isLoggedIn = useSelector((state) => !!state.auth.me.id);
    return(
        <div id = 'homepage-container'>
            <h1>LOOKING FOR A CAREER?</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
do eiusmod tempor incididunt ut labore et dolore magna 
aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse 
cillum dolore eu fugiat nulla pariatur. Excepteur sint 
occaecat cupidatat non proident, sunt in culpa qui officia 
deserunt mollit anim id est laborum.</p>
    </div>
    )
}

export default Homepage