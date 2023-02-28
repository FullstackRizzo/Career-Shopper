import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

function expandHamburger() {
  let e = document.querySelector("#hamburgerLinks");
  let burger = document.querySelector("#burger");
  if (e.style.display === "flex") {
    e.style.display = "none";
    burger.style.backgroundColor = "inherit";
  } else {
    e.style.display = "flex";
    burger.style.backgroundColor = "#ddd";
  }
  // if (e.style.opacity === "1") {
  //   e.style.display = "none";
  //   e.style.opacity = 0;
  // } else {
  //   e.style.display = "block";
  //   e.style.opacity = 1;
  // }
}

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="headerSection">
      <h1 className="cormorantPageTitle">Career Shopper</h1>
      <nav className="navbar-menu">
        <a href="javascript:void(0);" class="icon" id="burger" onClick={expandHamburger}>
          <i className="fa fa-bars"></i>
        </a>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
            <a href="javascript:void(0);" onClick={logoutAndRedirectHome}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <div id="hamburgerLinks">
        <div id="hamburgerLinksTopSection">
          <Link to="/">Home</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/about">About Us</Link>
          <Link to="/account">Account</Link>
        </div>
        <div id="hamburgerLinksBottomSection">
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
