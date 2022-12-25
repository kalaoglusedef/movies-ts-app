import { useEffect, useState } from "react";
import List from "../../components/List";
import { getFavorites } from "../../helpers/localStorage";
import "./index.css";

const MyFavorites = () => {
  const myFavorites = getFavorites();
  const [data, setData] = useState(myFavorites);

  useEffect(() => {
    if (myFavorites) {
      setData(myFavorites);
    }
  }, []);

  return (
    <div className="myFavoritesPage ">
      <h1>Favorites</h1>
      <div className="myFavoritesItemContainer ">
        {data.length > 0 ? (
          <List movies={data} />
        ) : (
          <h5>You haven't added any favorites yet.</h5>
        )}
      </div>
    </div>
  );
};
export default MyFavorites;
