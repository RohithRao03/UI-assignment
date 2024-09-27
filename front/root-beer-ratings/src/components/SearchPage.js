
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('query');  

  useEffect(() => {
    if (query) {
      axios
        .get(`api/drinks?offset=0&length=10&name=${query}`)
        .then((response) => setResults(response.data.items))
        .catch((error) => console.error("Error searching drinks:", error));
    }
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((drink) => (
            <Link to={`/drink/${drink.id}`} key={drink.id}>
              <div className="p-4 border rounded shadow-sm">
                <h3 className="text-xl font-bold">{drink.name}</h3>
                <p>{drink.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No results found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchPage;
