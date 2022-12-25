import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MovieDetail from "../../models/MovieDetail";
import { getDetails } from "../../services/omdbServices";
import loading from "../../img/loadingGif.gif";
import {
  Activity,
  ArrowLeft,
  Calendar,
  Clock,
  Edit3,
  Film,
  Users,
} from "react-feather";
import SendMailModal from "../../components/SendMailModal";
import FavoriteToggle from "../../components/FavoriteToggle";
import Comments from "../../components/Comments";
import AddCommentModal from "../../components/AddCommentModal";
import "./index.css";
import { getComments, getFavorites } from "../../helpers/localStorage";

const MoviesDetail = () => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  let { id } = useParams();
  useEffect(() => {
    getDetails(id!).then((e: MovieDetail) => {
      if (e) {
        setMovieDetail(e);
      }
    });
  }, []);

  const myFavorites = getFavorites();
  const myComments: any[] = getComments();

  return movieDetail ? (
    <>
      <div className="detailContainer">
        <div className="imgContainer">
          <img src={movieDetail.Poster} />
        </div>
        <div className="rightContainer">
          <div className="details">
            <h2 style={{ color: "#89030a" }}>{movieDetail.Title}</h2>
            <p style={{ maxWidth: "600px" }} className="fst-italic">
              {movieDetail.Plot}
            </p>
            <div style={{ gap: "6px" }} className="d-flex align-items-center">
              <Users color="#89030a" size={16} />
              <div style={{ gap: "4px" }} className="d-flex align-items-center">
                <p className="fw-bold" style={{ margin: "0" }}>
                  Actors:
                </p>
                <span>{movieDetail.Actors}</span>
              </div>
            </div>
            <div style={{ gap: "6px" }} className="d-flex align-items-center">
              <Film color="#89030a" size={16} />
              <div style={{ gap: "4px" }} className="d-flex align-items-center">
                <p className="fw-bold m-0">Type: </p>
                <span>{movieDetail.Type}</span>
              </div>
            </div>
            <div style={{ gap: "6px" }} className="d-flex align-items-center">
              <Activity color="#89030a" size={16} />
              <div style={{ gap: "4px" }} className="d-flex align-items-center">
                <p className="fw-bold m-0">IMDB: </p>
                <span>{movieDetail.imdbRating}</span>
              </div>
            </div>
            <div style={{ gap: "6px" }} className="d-flex align-items-center">
              <Clock color="#89030a" size={16} />
              <div style={{ gap: "4px" }} className="d-flex align-items-center">
                <p className="fw-bold m-0">Time:</p>
                <span> {movieDetail.Runtime}</span>
              </div>
            </div>
            <div style={{ gap: "6px" }} className="d-flex align-items-center">
              <Calendar color="#89030a" size={16} />
              <div style={{ gap: "4px" }} className="d-flex align-items-center">
                <p className="fw-bold m-0">Released:</p>
                <span>{movieDetail.Released}</span>
              </div>
            </div>
            <div style={{ gap: "6px" }} className="d-flex align-items-center">
              <Edit3 color="#89030a" size={16} />
              <div style={{ gap: "4px" }} className="d-flex align-items-center">
                <p className="fw-bold m-0">Writer:</p>
                <span>{movieDetail.Writer}</span>
              </div>
            </div>
          </div>

          <div className="shareAndFavoriteButton ">
            <SendMailModal
              movie={{
                Title: movieDetail.Title,
                Year: movieDetail.Year,
                imdbID: movieDetail.imdbID,
                Type: movieDetail.Type,
                Poster: movieDetail.Poster,
              }}
            />
            <AddCommentModal
              movie={{
                Title: movieDetail.Title,
                Year: movieDetail.Year,
                imdbID: movieDetail.imdbID,
                Type: movieDetail.Type,
                Poster: movieDetail.Poster,
              }}
            />
            <FavoriteToggle
              isDefaultFavorite={
                myFavorites.findIndex((x) => x.imdbID === movieDetail.imdbID) >
                -1
              }
              movie={{
                Title: movieDetail.Title,
                Year: movieDetail.Year,
                imdbID: movieDetail.imdbID,
                Type: movieDetail.Type,
                Poster: movieDetail.Poster,
              }}
            />
          </div>
        </div>
      </div>
      <Comments
        comment={myComments
          .filter((x) => x.imdbID === movieDetail.imdbID)
          .map((x) => x.comment)}
      />
    </>
  ) : (
    <div className="loadingContainer">
      <img src={loading} width={128} height={128}></img>
    </div>
  );
};

export default MoviesDetail;
