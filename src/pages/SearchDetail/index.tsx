import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import List from "../../components/List";
import Movie from "../../models/Movie";
import searchMovies from "../../services/omdbServices";
import "./index.css";
const SearchDetail = () => {
  const [data, setData] = useState<Movie[]>([]);
  let [searchParams] = useSearchParams();
  useEffect(() => {
    searchMovies(searchParams.get("searchText")!, 1).then((e: Movie[]) => {
      if (e) {
        setData(e);
      }
    });
  }, []);

  return (
    <div className="searchDetailPageContainer">
      <List movies={data} />
    </div>
  );
};
export default SearchDetail;
