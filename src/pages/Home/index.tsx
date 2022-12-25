import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import List from "../../components/List";
import Movie from "../../models/Movie";
import searchMovies from "../../services/omdbServices";
import "./index.css";
const Home = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageNumber]);

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNumber(pageNumber + 1);
    }
  }

  useEffect(() => {
    searchMovies("god", pageNumber).then((e: Movie[]) => {
      if (e) {
        if (pageNumber === 1) {
          setData(e);
        } else {
          const allData = data.concat(e);
          setData([...allData]);
        }
      }
    });
  }, [pageNumber]);

  return (
    <div className="homePageContainer">
      <List movies={data} />
      <Outlet />
    </div>
  );
};
export default Home;
