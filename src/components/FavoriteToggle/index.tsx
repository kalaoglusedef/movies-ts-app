import { useState } from "react";
import { Button } from "react-bootstrap";
import { ThumbsUp } from "react-feather";
import { addFavorite, removeFavorite } from "../../helpers/localStorage";
import Movie from "../../models/Movie";

interface FavoriteToggleProps {
  isDefaultFavorite?: boolean;
  movie:Movie;
}

const FavoriteToggle: React.FC<FavoriteToggleProps> = ({
  isDefaultFavorite = false,
  movie
}) => {
  const [isFavorite, setFavorite] = useState<boolean>(isDefaultFavorite);

  const toggleFavorite = () => {
    if(isFavorite){
      removeFavorite(movie)
    }
    else{
      addFavorite(movie);
    }
    setFavorite(!isFavorite);

  };

  return (
    <Button
      style={{
        borderRadius: "30px",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
      }}
      variant={
        !isFavorite
          ? "outline-secondary favoriteButton"
          : "success favoriteButton"
      }
      onClick={toggleFavorite}
    >
      <ThumbsUp size={16} />
    </Button>
  );
};
export default FavoriteToggle;
