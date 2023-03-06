import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const categories = ["Medical", "Construction", "Engineering", "Legal", "Education", "Hospitality", "Skilled Trades"];

const AllCareers = () => {
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchCareers = async () => {
      const response = await axios.get("/api/careers");
      setCareers(response.data);
      setFilteredCareers(response.data);
    };
    fetchCareers();
  }, []);


  const handleSearch = (e) => {

  
const handleSearch = (e) => {

    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = careers.filter((career) => {
      const includesSearchTerm = career.name.toLowerCase().includes(searchTerm);
      const includesCategory = categoryFilter === "" || career.category === categoryFilter;
      return includesSearchTerm && includesCategory;
    });
    setFilteredCareers(filtered);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
    const filtered = careers.filter((career) => {
      const includesSearchTerm = career.name.toLowerCase().includes(searchTerm);
      const includesCategory = category === "" || career.category === category;
      return includesSearchTerm && includesCategory;
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
          <label htmlFor="category">Filter by category:</label>
          <select id="category" value={categoryFilter} onChange={handleCategoryChange}>

            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

  <option value="">All categories</option>
  {categories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>

  </div>
    </div>

      <div className="career-list">
        {filteredCareers.map((career) => (
          <div key={career.id} className="careerBox">
            <h1>
              <Link to={`/careers/${career.id}`}>{career.name}</Link>
            </h1>
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
