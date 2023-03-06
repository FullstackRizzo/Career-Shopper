import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ContactForm = ({ name, email, message }) => {};

const contact = () => {
  return (
    <div id="homepage-container" class="contactArea">
      <div class="container">
        <form action="action_page.php">
          <div>
            <label for="name">Name</label>
            <input type="text" id="contactName" name="name" />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="text" id="contactEmail" name="email" />
          </div>
          <div>
            <label for="message">Message</label>
            <textarea id="contactMessage" name="message"></textarea>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default contact;
