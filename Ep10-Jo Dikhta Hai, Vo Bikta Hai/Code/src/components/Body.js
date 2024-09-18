import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  //Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  console.log("Body rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9352403&lng=77.624532&str=Biryani&trackingId=undefined&submitAction=ENTER&queryUniqueId=30b92518-9086-a42b-8938-90eb3f317fe0&selectedPLTab=RESTAURANT"
    );

    //use in case of trying to bypass cors policy without using cors chrome plugin
    // const data = await fetch(
    //   "https://corsproxy-la3g.onrender.com/full/?url=https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9352403&lng=77.624532&str=Biryani&trackingId=undefined&submitAction=ENTER&queryUniqueId=30b92518-9086-a42b-8938-90eb3f317fe0&selectedPLTab=RESTAURANT"
    // );

    const json = await data.json();

    // console.log(json);

    setListOfRestaurants(
      json?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
    );
    setFilteredRestaurant(
      json?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please Check Your internet connection.
      </h1>
    );

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              console.log(searchText);

              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.card.card.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.card.card.info.avgRating > 4
              );
              setListOfRestaurants(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.card.card.info.id}
            to={"/restaurants/" + restaurant.card.card.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;