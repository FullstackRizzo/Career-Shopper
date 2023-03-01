import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./AllCareers"

const AllCareers = () => {
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    const fetchCareers = async () => {
      const response = await axios.get("/api/careers");
      setCareers(response.data);
      setFilteredCareers(response.data);
    };
    fetchCareers();
  }, []);

  useEffect(() => {
    const sortCareers = () => {
      if (sortType === 'salary') {
        const sortedCareers = [...filteredCareers].sort((a, b) => b.salary - a.salary);
        setFilteredCareers(sortedCareers);
      } else if (sortType === 'time') {
        const sortedCareers = [...filteredCareers].sort((a, b) => a.timeOfCompletion - b.timeOfCompletion);
        setFilteredCareers(sortedCareers);
      } else if (sortType === 'cost') {
        const sortedCareers = [...filteredCareers].sort((a, b) => a.cost - b.cost);
        setFilteredCareers(sortedCareers);
      }
    };
    sortCareers();
  }, [sortType, filteredCareers]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = careers.filter((career) => {
      return career.name.toLowerCase().includes(searchTerm);
    });
    setFilteredCareers(filtered);
  };

  return (

    <div className="homepage-container">
      <h1>All Careers</h1>
      <div className="search-sort-container">
        <div className="search-container">
          <label htmlFor="search">Search:</label>
          <input type="text" id="search" value={searchTerm} onChange={handleSearch} />
        </div>
        <div className="sort-container">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="">--Select--</option>
            <option value="salary">Salary</option>
            <option value="time">Time of Completion</option>
            <option value="cost">Cost</option>
          </select>
        </div>
      </div>
      <div className="career-list">
        {filteredCareers.map((career) => (
          <div key={career.id} className="careerBox">
            <h1><Link to={`/careers/${career.id}`}>{career.name}</Link></h1>
            <h2>
            <img src={career.imageUrl} alt={career.name} className="career-image" />
            </h2>
            <p>Cost: ${career.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default AllCareers;