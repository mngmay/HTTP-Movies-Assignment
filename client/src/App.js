import React, { useState, useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  //use effect, forEach saved list, match ids,
  const movies = axios.get("http://localhost:5000/api/movies");
  useEffect(() => {
    axios.get("http://localhost:5000/api/movies").then(res => {
      res.data.forEach(movie => {
        savedList.forEach(sMovie => {
          if (movie.id === sMovie.id) {
            const newSavedList = savedList.filter(
              savedMovie => savedMovie !== sMovie
            );
            setSavedList([...newSavedList, movie]);
          }
        });
      });
    });
  }, [movies]);

  return (
    <>
      <NavLink to="/add-movie" className="add-movie-btn">
        Add Movie
      </NavLink>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path="/update-movie/:id" component={MovieForm} />
      <Route path="/add-movie" component={MovieForm} />
    </>
  );
};

export default App;
