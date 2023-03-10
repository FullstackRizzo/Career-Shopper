import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const Account = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const isAdmin = useSelector((state) => state.auth.me.admin);

  return (
    <div class="homepage-container">
      <h1>Welcome, {username}</h1>
      {isAdmin ?(<div className='admin-options'>
        <h3><Link to = '/viewcareers'>View Careers</Link></h3>
        <h3><Link to = '/viewallusers'>View All Users</Link></h3>
      </div>):(<div className='user-options'>
        <h3><Link to = '/orderhistory'>Order History</Link></h3>
        <div></div>
        <h3>Your Cart</h3>
      </div>)}
    </div>
  );
};

export default Account;
