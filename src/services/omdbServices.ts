import api from "../helpers/axios";
import Movie from "../models/Movie";
import MovieDetail from "../models/MovieDetail";

const searchMovies = async (query: string, page: number): Promise<Movie[]> => {
  const response = await api.get("", {
    params: {
      s: query,
      page: page,
    },
  });
  return response.data.Search;
};

export const getDetails = async (id: string): Promise<MovieDetail> => {
  const response = await api.get("", {
    params: {
      i: id,
    },
  });
  return response.data;
};

export default searchMovies;
