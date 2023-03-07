import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Homepage = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  return (
    <div class="homepage-container">
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
        <Link to="/careers/1">Doctor</Link>
        <Link to="/careers/8">Auto Mechanic</Link>
        <Link to="/careers/3">Engineer</Link>
        <Link to="/careers/6">Teacher</Link>
        <Link to="/careers/7">Nurse</Link>
        <Link to="/careers/10">Psycologist</Link>
      </div>
    </div>
  );
};

export default Homepage;
