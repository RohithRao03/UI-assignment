
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview";
import AddPicture from "./AddPicture"; 

const DrinkDetails = () => {
  const { id } = useParams();
  const [drink, setDrink] = useState(null);
  const [reviews, setReviews] = useState([]);  
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get(`/api/drinks/${id}`)
      .then((response) => setDrink(response.data))
      .catch((error) => console.error("Error fetching drink details:", error));
  }, [id]);

 
  useEffect(() => {
    axios
      .get(`/api/drinks/${id}/reviews?offset=0&length=10`)
      .then((response) => {
        setReviews(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, [id]);

  if (!drink) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{drink.name}</h2>
      <p>{drink.description}</p>

      {/* Display Reviews */}
      <div className="my-4">
        <h3 className="text-xl">Reviews</h3>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="p-2 border-b">
              <p><strong>{review.user_name}</strong>: {review.description}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Add Review Form */}
      <AddReview drinkId={id} />

      {/* Display Pictures */}
      <div className="my-4">
        <h3 className="text-xl">Pictures</h3>
        {drink.Pictures?.map((pic) => (
          <img key={pic.id} src={pic.path} alt={pic.name} className="w-32 h-32" />
        ))}
      </div>

      {/* Add Picture Form */}
      <AddPicture drinkId={id} />
    </div>
  );
};

export default DrinkDetails;
