import React, { useState } from "react";
import axios from "axios";

const AddPicture = ({ drinkId }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`/api/drinks/${drinkId}/pictures`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Image uploaded successfully!");
        setFile(null);  
      })
      .catch((error) => console.error("Error uploading picture:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 p-4 border rounded">
      <h3 className="text-xl mb-4">Add a Picture</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Upload Picture
      </button>
    </form>
  );
};

export default AddPicture;
