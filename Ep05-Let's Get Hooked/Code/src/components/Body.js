import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import restrauntList from "../utils/mockData";

const Body = () => {
  //Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState(restrauntList);

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            setListOfRestaurants([]);
            const filteredList = listOfRestaurants.filter(
              (res) => res.data.avgRating > 4
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restraunt) => (
          <RestaurantCard key={restraunt.data.id} resData={restraunt} />
        ))}
      </div>
    </div>
  );
};

export default Body;
