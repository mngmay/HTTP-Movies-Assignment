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
  console.log("movie state", movie);
  console.log(props.location.pathname);

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

  console.log(movie);

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

  return (
    <div>
      <form onSubmit={updateMovie}>
        <input
          type="text"
          placeholder="Title"
          name="name"
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
        <button onClick={updateMovie}>Submit</button>
      </form>
    </div>
  );
};

export default MovieForm;
