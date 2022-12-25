import Movie from "../models/Movie";

export const addFavorite = (param: Movie) => {
  const myFavorite: Movie[] | null = JSON.parse(
    localStorage.getItem("favorites")!
  );
  if (myFavorite) {
    myFavorite.push(param);
    localStorage.setItem("favorites", JSON.stringify(myFavorite));
  } else {
    localStorage.setItem("favorites", JSON.stringify([param]));
  }
};

export const removeFavorite = (param: Movie) => {
  const getAllFavorites = getFavorites();
  const removeFavorites = getAllFavorites.filter(
    (x) => x.imdbID !== param.imdbID
  );
  localStorage.setItem("favorites", JSON.stringify(removeFavorites));
};

export const getFavorites = () => {
  const myFavorite: Movie[] | null = JSON.parse(
    localStorage.getItem("favorites")!
  );

  return myFavorite || [];
};

export const addComment = (param: Movie, comment: string) => {
  const addComments: any | null = JSON.parse(
    localStorage.getItem("comments")!
  );
  if (addComments) {
    addComments.push({ ...param, comment: comment });
    localStorage.setItem("comments", JSON.stringify(addComments));
  } else {
    localStorage.setItem(
      "comments",
      JSON.stringify([{ ...param, comment: comment }])
    );
  }
};

export const getComments = () => {
  const addComments: any | null = JSON.parse(
    localStorage.getItem("comments")!
  );

  return addComments || [];
};
