import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const [restarauntInfo, setRestaurantInfo] = useState(null);

  const { resId } = useParams();
  // console.log(resId);

  useEffect(() => {
    fecthData();
  }, []);

  const fecthData = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setRestaurantInfo(json.data);
    console.log(json.data);
  };

  const { name, cuisines, costForTwoMessage } =
    restarauntInfo?.cards[2]?.card?.card?.info || {};

  const { itemCards } =
    restarauntInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card || [];

  return restarauntInfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(",")} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} -{" Rs."}
            {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
