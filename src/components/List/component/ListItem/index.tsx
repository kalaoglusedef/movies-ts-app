import { FC,  } from "react";
import { Button, Card } from "react-bootstrap";
import { ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import FavoriteToggle from "../../../FavoriteToggle";
import Movie from "../../../../models/Movie";
import { getFavorites } from "../../../../helpers/localStorage";

const ListItem: FC<Movie> = ({ Title, Year, imdbID, Type, Poster }) => {
  const myFavorites = getFavorites();

  return (
    <Card className="listContainer">
      <Card.Img style={{height:'450px'}} variant="top" src={Poster} />
      <Card.Body>
        <Card.Title style={{height:'48px'}}>{Title}</Card.Title>
        <div className="d-flex justify-content-between mt-3">
          <Link
            style={{ textDecoration: "none" }}
            to={`/moviesDetail/${imdbID}`}
          >
            <Button className="d-flex align-items-center " variant="danger">
              Detail <ChevronRight style={{ marginLeft: "4px" }} size={16} />
            </Button>
          </Link>
          <FavoriteToggle
            isDefaultFavorite={myFavorites.findIndex(
              (x) => x.imdbID === imdbID
            ) > -1}
            movie={{ Title, Year, imdbID, Type, Poster }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListItem;
