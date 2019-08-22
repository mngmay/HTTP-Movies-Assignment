import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const MovieForm = props => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        console.log(res.data);
        let currMovie = res.data;
        setMovie({
          id: currMovie.id,
          title: currMovie.title,
          director: currMovie.director,
          metascore: currMovie.metascore,
          stars: currMovie.stars
        });
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const updateMovie = e => {
    e.preventDefault();
    let update = {
      ...movie,
      metascore: Number(movie.metascore),
      stars: [movie.stars]
    };
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, update)
      .then(res => {
        console.log(res.data);
        setMovie(initialMovie);
        props.history.push("/");
      })
      .catch(err => {
        err.response.status === 422 && props.history.push("/");
        console.log(err.response);
      });
  };

  const addMovie = e => {
    e.preventDefault();
    let add = {
      ...movie,
      metascore: Number(movie.metascore),
      stars: [movie.stars]
    };
    console.log(movie);
    axios
      .post(`http://localhost:5000/api/movies`, add)
      .then(res => {
        console.log(res.data);
        setMovie(initialMovie);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const submit = e => {
    props.location.pathname === "/add-movie" ? addMovie(e) : updateMovie(e);
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={movie.title}
        />
        <input
          type="text"
          placeholder="Director"
          name="director"
          onChange={handleChange}
          value={movie.director}
        />
        <input
          type="number"
          placeholder="Metascore"
          name="metascore"
          onChange={handleChange}
          value={movie.metascore}
        />
        <input
          type="text"
          placeholder="Stars"
          name="stars"
          onChange={handleChange}
          value={movie.stars}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default MovieForm;
