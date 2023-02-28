import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Homepage = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  return (
    <div id="homepage-container">
      <h1 className="underline pageHeading">LOOKING FOR A CAREER?</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
      <h1 className="underline pageHeading">Careers</h1>
      <div id="homepageBodyLinkSection">
        <Link to="">Doctor</Link>
        <Link to="">Auto Mechanic</Link>
        <Link to="">Developer</Link>
        <Link to="">Locksmith</Link>
        <Link to="">Nurse</Link>
        <Link to="">Plumber</Link>
      </div>
    </div>
  );
};

export default Homepage;
