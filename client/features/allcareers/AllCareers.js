import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Careers = () => {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      const response = await axios.get("/api/careers");
      setCareers(response.data);
    };
    fetchCareers();
  }, []);

  return (
    <div className="homepage-container">
      <h1>Careers</h1>
      {careers.map((career) => (
        <div key={career.id} className="careerBox">
          <h2>
            <Link to={`/careers/${career.id}`}>{career.name}</Link>
          </h2>
          <img src={career.imageUrl} alt={career.name} />
          <p>Cost: ${career.cost}</p>
        </div>
      ))}
    </div>
  );
};

export default Careers;
