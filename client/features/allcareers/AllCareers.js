import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Careers = () => {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      const response = await axios.get('/api/careers');
      setCareers(response.data);
    };
    fetchCareers();
  }, []);

  return (
    <div>
      <h1>Careers</h1>
      {careers.map((career) => (
        <div key={career.id}>
          <h2>{career.name}</h2>
          <p>{career.description}</p>
          <p>Salary: ${career.salary}</p>
          <p>Time of Completion: {career.timeOfCompletion} years</p>
          <p>Cost: ${career.cost}</p>
          <img src={career.imageUrl} alt={career.name} />
        </div>
      ))}
    </div>
  );
};

export default Careers;
