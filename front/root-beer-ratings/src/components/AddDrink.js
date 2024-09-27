
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  

const AddDrink = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/drinks", { name, description })
      .then(() => navigate("/"))  
      .catch((error) => console.error("Error adding drink:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-2xl mb-4">Add a New Root Beer</h2>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Root Beer
      </button>
    </form>
  );
};

export default AddDrink;
