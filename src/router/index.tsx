import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import MoviesDetail from "../pages/MoviesDetail";
import MyFavorites from "../pages/MyFavorites";
import SearchDetail from "../pages/SearchDetail";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="myFavorites" element={<MyFavorites />} />
        <Route path="moviesDetail/:id" element={<MoviesDetail />} />
        <Route path="searchDetail" element={<SearchDetail />} />
      </Route>
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
    </Routes>
  );
};
export default Router;
