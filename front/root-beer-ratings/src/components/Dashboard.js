
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [drinks, setDrinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate(); 

  useEffect(() => {
   
    axios
      .get("/api/drinks?offset=0&length=10")
      .then((response) => setDrinks(response.data.items))
      .catch((error) => console.error("Error fetching drinks:", error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
   
    navigate(`/search?query=${searchQuery}`); 
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Recently Added Root Beers</h2>
        <Link to="/add">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Add Root Beer</button>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search for a root beer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {drinks.map((drink) => (
          <Link to={`/drink/${drink.id}`} key={drink.id}>
            <div className="p-4 border rounded shadow-sm">
              <h3 className="text-xl font-bold">{drink.name}</h3>
              <p>{drink.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
