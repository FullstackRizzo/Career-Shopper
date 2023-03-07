import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ContactForm = ({ name, email, message }) => {};

const contact = () => {
  return (
    <div class="homepage-container contactArea">
      <div class="container">
        <form action="action_page.php">
          <div>
            <label for="name">Name</label>
            <input class="contactInput" type="text" id="contactName" name="name" />
          </div>
          <div>
            <label for="email">Email</label>
            <input class="contactInput" type="text" id="contactEmail" name="email" />
          </div>
          <div>
            <label for="message">Message</label>
            <textarea class="contactInput" id="contactMessage" name="message"></textarea>
          </div>
          <input class="contactSubmit" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default contact;
