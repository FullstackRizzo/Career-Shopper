import React from "react";
import firstImage from "../../../Images/bioPictures/firstImage.png";
import secondImage from "../../../Images/bioPictures/secondImage.png";
import thirdImage from "../../../Images/bioPictures/thirdImage.png";
import fourthImage from "../../../Images/bioPictures/fourthImage.png";

const AboutUs = () => {
  return (
    <div id="homepage-container">
      <h1>Our Mission</h1>
      <p>To provide burgeoning new professionals with a comprehensive and easy to understand list of career paths</p>
      <h1>About</h1>
      <p>At Careerior, we strive to lorem ipsum.</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
      <h1>Leadership</h1>
      <div id="teamContainer">
        <div id="CEO">
          <img id="wilsonYuImage" src={firstImage} />
          <h2>Wilson Yu</h2>
          <h3>Chief Executive Officer</h3>
          <p>
            Now, this is a story all about how my life got flipped-turned upside down, and I'd like to take a minute,
            just sit right there; I'll tell you how I became the prince of a town called Bel-Air
          </p>
        </div>
        <div id="CFO">
          <img src={secondImage} />
          <h2>Stephen Supe</h2>
          <h3>Chief Financial Officer</h3>
          <p>
            In West Philadelphia born and raised, on the playground was where I spent most of my days. Chillin' out,
            maxin', relaxin', all cool and all shootin' some b-ball outside of the school when a couple of guys who were
            up to no good started making trouble in my neighborhood. I got in one little fight and my mom got scared she
            said, "You're movin' with your auntie and uncle in Bel-Air"
          </p>
        </div>
        <div id="CTO">
          <img src={thirdImage} />
          <h2>Bryan Pokriki</h2>
          <h3>Chief Technology Officer</h3>
          <p>
            I whistled for a cab and when it came near The license plate said, "Fresh" and it had dice in the mirror If
            anything I could say that this cab was rare But I thought "Nah, forget it, yo, holmes to Bel Air"
          </p>
        </div>
        <div id="COO">
          <img src={fourthImage} />
          <h2>James Thayer</h2>
          <h3>Chief Operations Officer</h3>
          <p>
            I pulled up to the house about seven or eight And I yelled to the cabbie, "Yo holmes, smell ya later" I
            looked at my kingdom I was finally there To sit on my throne as the prince of Bel-Air
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
