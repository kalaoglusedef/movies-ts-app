import { FC } from "react";
import Movie from "../../models/Movie";
import ListItem from "./component/ListItem";
import "./index.css";

interface IProps {
  movies: Movie[];
}
const List: FC<IProps> = ({ movies }) => {

  return (
    <>
      {movies.map((x:Movie) => {
        return <ListItem {...x} />;
      })}
    </>
  );
};

export default List;
