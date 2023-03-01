import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleCareer = () => {
  const [career, setCareer] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCareer = async () => {
      const response = await axios.get(`/api/singlecareer/${id}`);
      setCareer(response.data);
    };
    fetchCareer();
  }, [id]);

  return (
    <div>
      <h1>{career.name}</h1>
      <img src={career.imageUrl} alt={career.name} />
      <p>{career.description}</p>
      <p>Salary: ${career.salary}</p>
      <p>Time of Completion: {career.timeOfCompletion} years</p>
      <p>Cost: ${career.cost}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default SingleCareer;