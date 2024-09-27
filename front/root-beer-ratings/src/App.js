import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DrinkDetails from "./components/DrinkDetails";
import AddDrink from "./components/AddDrink";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Root Beer Ratings</h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/drink/:id" element={<DrinkDetails />} />
          <Route path="/add" element={<AddDrink />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        

      </div>
    </Router>
  );
}

export default App;
