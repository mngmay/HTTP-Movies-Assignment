import React from "react";
import Movie from "./Movie";

const MovieForm = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Director" />
        <input type="number" placeholder="Metascore" />
        <input type="text" placeholder="Stars" />
      </form>
    </div>
  );
};

export default MovieForm;
