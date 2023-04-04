import React from "react";

const MovieCard = ({ movie, activeX, activeY, elemX, elemY }) => {
  return (
    <div className={("movie") + (activeX === elemX && activeY === elemY ? ' active' : '')}>
      <div>
        <p>{movie.Year}</p>
      </div>
      <div>
        <img className="movie__img" src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title} />
      </div>
      <div>
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;