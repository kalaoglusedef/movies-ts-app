import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  NavDropdown,
  ListGroup,
} from "react-bootstrap";
import { Home, LogOut, Settings, ThumbsUp, User } from "react-feather";
import Icon from "../../img/s-icon.png";
import Movie from "../../models/Movie";
import searchMovies from "../../services/omdbServices";
import { debounce } from "lodash";
import "./index.css";

function Layout() {
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [search, setSearchData] = useState<Movie[]>([]);

  useEffect(() => {
    if (searchText) {
      searchMovies(searchText, pageNumber).then((e: Movie[]) => {
        if (e) {
          setSearchData(e);
        }
      });
    }
  }, [searchText]);

  return (
    <div className="">
      <Navbar
        className="navbarContainer navbar navbar-light bg-lightd-flex justify-content-between align-items-center "
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#89030a" , padding:'0 26px' }}
      >
        <Nav>
          <Navbar.Brand href="/">
            <img src={Icon} />
          </Navbar.Brand>
         
            <Nav className="align-items-center mb-2">
              <Nav.Link href="/">Home page</Nav.Link>
              <Nav.Link href="/myFavorites">Favorites</Nav.Link>
            </Nav>
       
        </Nav>
        <div className="searchContainer">
          <Form style={{ gap: "10px",  }} className="d-flex">
            <FormControl
              name="search"
              type="text"
              placeholder="Search"
              className="mr-sm-5"
              onChange={debounce(function (e: any) {
                setSearchText(e.target.value);
              }, 350)}
            />
          </Form>
          <ListGroup variant="flush" className="listGroup">
            {search.slice(0, 2).map((x) => {
              return (
                <ListGroup.Item action href={`/moviesDetail/${x.imdbID}`}>
                  <div className="listItemContainer">
                    <img width={"80px"} src={x.Poster} />
                    <div className="listItemDetail">
                      <p className="listItemTitle">{x.Title}</p>
                      <p className="listItemYear">Year:{x.Year}</p>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
            {search.length > 1 && (
              <ListGroup.Item
                style={{ color: "#bb070f" }}
                action
                href={`/searchDetail?searchText=${searchText}`}
              >
                View more results..
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
        <Nav className="">
          <NavDropdown align="end" title={<User />} id="basic-nav-dropdown">
            <Link style={{ textDecoration: "none" }} to="/signIn">
              <NavDropdown.Item href="/signIn">
                <LogOut size={18} /> Sign out
              </NavDropdown.Item>
            </Link>
          </NavDropdown>
        </Nav>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Layout;
