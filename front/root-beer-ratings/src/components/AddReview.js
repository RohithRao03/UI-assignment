
import React, { useState } from "react";
import axios from "axios";

const AddReview = ({ drinkId }) => {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);  

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      user_name: userName,
      description,
      rating,
    };

    axios
      .post(`/api/drinks/${drinkId}/reviews`, reviewData)
      .then(() => {
        alert("Review added successfully!");
       
        setUserName("");
        setDescription("");
        setRating(1);
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 p-4 border rounded">
      <h3 className="text-xl mb-4">Add a Review</h3>

      <div className="mb-4">
        <label className="block mb-2">Your Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Review</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit Review
      </button>
    </form>
  );
};

export default AddReview;
